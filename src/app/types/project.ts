export interface MemberProject {
  userId: number;
  name: string;
  avatar: string;
}

export interface ProjectItem {
  members: MemberProject[];
  creator: {
    id: number;
    name: string;
  };
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: boolean;
}

export interface CreateProject {
  projectName: string;
  description?: string;
  categoryId: number;
}
