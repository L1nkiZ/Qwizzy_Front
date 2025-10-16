export type ShopStatus = "draft" | "active" | "suspended" | "archived";

export interface ShopSpecificData {
	label: string;
	value: string | number | boolean | Date;
	type: "string" | "number" | "boolean" | "date" | "money";
	change?: Change;
}

export type Change = {
	value: number;
	percent?: boolean;
};

export interface Shop {
	id: number;
	name: string;
	description: string;
	status: ShopStatus;
	version?: number;
	service: string;
	agent: string;
	createdAt: string;
	updatedAt: string;
	specificData?: ShopSpecificData[];
}
