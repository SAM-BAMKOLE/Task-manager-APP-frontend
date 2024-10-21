enum taskState {
    COMPLETED = "COMPLETED",
    UNCOMPLETED = "UNCOMPLETED",
    PENDING = "PENDING",
}
export interface TaskType {
    _id: string;
    title: string;
    description: string;
    datetime: string;
    activities: Array<string | null>;
    status: taskState;
    creator: string;
    createdAt: Date;
    updatedAt: Date;
    __v: string;
}
