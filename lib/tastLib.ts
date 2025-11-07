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
    UNASSIGNED = 'UNASSIGNED',
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

export type ActionsThemselves = {
        value: TaskActions
        authorized: UserRole[]
        component: ({
            task,
            writers,
        }: {
            task: Task
            writers: WriterWithUser[]
        }) => JSX.Element
    }

export type TaskAction = {
    status: TaskStatus
    actions: ActionsThemselves[]
    messages: {
        role: UserRole
        message: string
    }[]
    color: string
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
        messages: [
            {
                role: UserRole.WRITER,
                message: 'You can claim this task and start writing',
            },
            {
                role: UserRole.ADMIN,
                message: 'Assign this task to a writer so they can start writing',
            }
            
        ],
        color: 'bg-blue-600',
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
        messages: [
            {
                role: UserRole.WRITER,
                message: 'You can approve this task and start writing',
            },
            {
                role: UserRole.ADMIN,
                message: 'Wait for the writer to finish writing and review the task',
            }
        ],
        color: 'bg-teal-600',
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
        messages: [
            {
                role: UserRole.ADMIN,
                message: 'I don\'t know who\'s reviewing this task between you and your editor' 
            }
        ],
        color: 'bg-yellow-600',
    },
    {
        status: TaskStatus.APPROVED,
        actions: [
            {
                value: TaskActions.DELETE_TASK,
                authorized: [UserRole.ADMIN],
                component: DeleteTask,
            },
        ],
        messages: [
            {
                role: UserRole.WRITER,
                message: 'Congratulations! You\'ve completed this task',
            },
            {
                role: UserRole.ADMIN,
                message: 'Congratulations! You\'ve completed this task',
            },
        ],
        color: 'bg-green-600',
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
        messages: [
            {
                role: UserRole.WRITER,
                message: 'Sorry, this task was rejected',
            },
            {
                role: UserRole.ADMIN,
                message: 'Sorry, this task wasn\'t up to the standards',
            },
        ],
        color: 'bg-red-600',
    },
]
