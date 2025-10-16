FROM node:lts-alpine AS base

# Loading pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Ensure a clean working directory
RUN rm -rf /app && mkdir -p /app

# Set the working directory
WORKDIR /app

# Copy the application files
COPY . /app

# Expose the port the app runs on
EXPOSE 3000

# Run infinite loop to keep the container running
CMD ["tail", "-f", "/dev/null"]

FROM base AS development

USER 1000

ENV "CI"=true

# Serve the app with dependency check
CMD ["sh", "-c", "echo '🔄 Checking and installing dependencies...' && if [ ! -d 'node_modules' ] || [ 'pnpm-lock.yaml' -nt 'node_modules' ]; then echo '📦 Installing/updating dependencies...' && pnpm install; else echo '✅ Dependencies are up to date'; fi && echo '🚀 Starting development server...' && pnpm dev"]

FROM base AS preprod

CMD ["sh", "-c", "pnpm i && pnpm build && node .output/server/index.mjs"]