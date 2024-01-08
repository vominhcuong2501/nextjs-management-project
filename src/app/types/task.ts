export interface CreateTaskProps {
	projectId?: number;
	description?: string;
	taskName?: string;
	statusId?: 0;
	priorityId?: number;
	typeId?: number;
	listUserAsign?: [];
	timeTrackingSpent?: number;
	timeTrackingRemaining?: number;
	originalEstimate?: number;
}
