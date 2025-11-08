import { WriterWithUser } from "@/prisma/types"
import { Task, Writer } from "@prisma/client"

export enum TaskActions {
    ACCEPT_TASK = 'ACCEPT_TASK',
    ASSIGN_WRITER = 'ASSIGN_WRITER',
    REASSIGN_TASK = 'REASSIGN_TASK',
    VIEW_WRITER = 'VIEW_WRITER',
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
            writer: Writer
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