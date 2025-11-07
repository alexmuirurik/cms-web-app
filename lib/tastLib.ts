export enum TaskActions {
    ASSIGN_WRITER = 'ASSIGN_WRITER',
    CLAIM_ARTICLE = 'CLAIM_ARTICLE',
    SUBMIT_CONTENT = 'SUBMIT_CONTENT',
    APPROVE_CONTENT = 'APPROVE_CONTENT',
    DELETE_TASK = 'DELETE_TASK',
}

export enum TaskStatus {
    PENDING_WRITER = 'PENDING_WRITER',
    IN_PROGRESS = 'IN_PROGRESS',
    IN_REVIEW = 'IN_REVIEW',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export enum UserRole {
    ADMIN = 'ADMIN',
    WRITER = 'WRITER',
    EDITOR = 'EDITOR',
}

export const taskActions = [
    {
        status: TaskStatus.PENDING_WRITER,
        actions: [
            {
                value: TaskActions.ASSIGN_WRITER,
                authorized: [UserRole.ADMIN],
            },
            {
                value: TaskActions.DELETE_TASK,
                authorized: [UserRole.ADMIN],
            },
            {
                value: TaskActions.CLAIM_ARTICLE,
                authorized: [UserRole.WRITER],
            }
        ],
    },
    {
        status: TaskStatus.IN_PROGRESS,
        actions: [
            {
                value: TaskActions.APPROVE_CONTENT,
                authorized: [UserRole.EDITOR, UserRole.ADMIN],
            },
        ],
    },
    {
        status: TaskStatus.IN_REVIEW,
        actions: [
            {
                value: TaskActions.DELETE_TASK,
                authorized: [UserRole.EDITOR, UserRole.ADMIN],
            },
        ],
    },
    {
        status: TaskStatus.APPROVED,
        actions: [
            {
                value: TaskActions.DELETE_TASK,
                authorized: [UserRole.WRITER, UserRole.ADMIN],
            },
        ],
    },
    {
        status: TaskStatus.REJECTED,
        actions: [
            {
                value: TaskActions.DELETE_TASK,
                authorized: [UserRole.WRITER, UserRole.ADMIN],
            },
        ],
    },
]
