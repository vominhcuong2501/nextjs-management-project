export interface CreateTaskProps {
	projectId?: number
	description?: string
	taskName?: string
	statusId?: 0
	priorityId?: number
	typeId?: number
	listUserAsign?: number[]
	timeTrackingSpent?: number
	timeTrackingRemaining?: number
	originalEstimate?: number
	lstComment?: CommentListProps[]
	taskId?: number | string
	assigness?: any
}

interface CommentListProps {
	id?: number
	idUser?: number
	name?: string
	avatar?: string
	commentContent?: string
}

export interface UserCommentTask {
	user: {
		userId: number
		name: string
		avatar: string
	}
	id: number
	userId: number
	taskId: number
	contentComment: string
	deleted: boolean
	alias: string
	name: string
}
