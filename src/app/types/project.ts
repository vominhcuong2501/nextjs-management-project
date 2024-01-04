export interface MemberProject {
	userId?: number;
	name?: string;
	avatar?: string;
}

export interface ProjectItem {
	members?: MemberProject[];
	creator?: {
		id?: number;
		name?: string;
	};
	id?: number;
	projectName?: string;
	description?: string;
	categoryId?: number | undefined;
	categoryName?: string;
	alias?: string;
	deleted?: boolean;
	projectCategory?: {
		name?: string;
		id?: number;
	};
}

export interface AddMemberProjectProps {
	projectId: number;
	userId: number;
}
