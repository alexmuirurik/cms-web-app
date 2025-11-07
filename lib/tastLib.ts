import AssignWriter from '@/components/forms/assignWriter'
import DeleteTask from '@/components/forms/deleteTask'
import { WriterWithUser } from '@/prisma/types'
import { Task, Writer } from '@prisma/client'

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

type TaskAction = {
    status: TaskStatus
    actions: {
        value: TaskActions
        authorized: UserRole[]
        component: ({
            task,
            writers,
        }: {
            task: Task
            writers: WriterWithUser[]
        }) => JSX.Element
    }[]
}

export const taskActions: TaskAction[] = [
    {
        status: TaskStatus.PENDING_WRITER,
        actions: [
            {
                value: TaskActions.ASSIGN_WRITER,
                authorized: [UserRole.ADMIN],
                component: AssignWriter,
            },
            {
                value: TaskActions.DELETE_TASK,
                authorized: [UserRole.ADMIN],
                component: DeleteTask,
            },
            {
                value: TaskActions.CLAIM_ARTICLE,
                authorized: [UserRole.WRITER],
                component: DeleteTask,
            },
        ],
    },
    {
        status: TaskStatus.IN_PROGRESS,
        actions: [
            {
                value: TaskActions.APPROVE_CONTENT,
                authorized: [UserRole.EDITOR, UserRole.ADMIN],
                component: DeleteTask,
            },
        ],
    },
    {
        status: TaskStatus.IN_REVIEW,
        actions: [
            {
                value: TaskActions.DELETE_TASK,
                authorized: [UserRole.EDITOR, UserRole.ADMIN],
                component: DeleteTask,
            },
        ],
    },
    {
        status: TaskStatus.APPROVED,
        actions: [
            {
                value: TaskActions.DELETE_TASK,
                authorized: [UserRole.WRITER, UserRole.ADMIN],
                component: DeleteTask,
            },
        ],
    },
    {
        status: TaskStatus.REJECTED,
        actions: [
            {
                value: TaskActions.DELETE_TASK,
                authorized: [UserRole.WRITER, UserRole.ADMIN],
                component: DeleteTask,
            },
        ],
    },
]
