type criteria = "Enfant" | "Adulte" | "Senior";
type registrationCondition =
	| "Savoir nager"
	| "Test de natation"
	| "Certificat médical";

export interface Activity {
	id: number;
	shopId?: number;
	name: string;
	time: string;
	poolId: number;
	levelId: number;
	criteria?: criteria[];
	registrationConditions?: registrationCondition[];
	duration: number; // in minutes
	load: string;
	createdAt?: string;
	updatedAt?: string;
}
