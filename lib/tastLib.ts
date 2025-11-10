
import { TaskStatus, UserRole } from './taskTypes'
import { SessionUser } from '@/prisma/types'
import {
    Company,
    Editor,
    Task,
    User,
    Writer,
    WriterStatus,
} from '@prisma/client'
import { getTimeDifference } from './utils'



export const taskTitles = [
    {
        status: TaskStatus.UNASSIGNED,
        title: 'Unassigned',
    },
    {
        status: TaskStatus.PENDING_WRITER,
        title: 'Pending Writer',
    },
    {
        status: TaskStatus.IN_PROGRESS,
        title: 'In Progress',
    },
    {
        status: TaskStatus.IN_REVIEW,
        title: 'In Review',
    },
    {
        status: TaskStatus.APPROVED,
        title: 'Approved',
    },
    {
        status: TaskStatus.REJECTED,
        title: 'Rejected',
    },
]

export const getTaskDeadline = (task: Task) => {
    if (task.status === TaskStatus.UNASSIGNED) {
        return `${task.deadline} days`
    }

    if (task.status === TaskStatus.PENDING_WRITER) {
        return `${task.deadline} days`
    }

    if (task.status === TaskStatus.IN_PROGRESS) {
        return getTimeDifference(task.createdAt, task.createdAt)
    }

    if(task.status === TaskStatus.IN_REVIEW) {
        return `${task.deadline} days`
    }

    if(task.status === TaskStatus.APPROVED) {
        return `${task.deadline} days`
    }

    if(task.status === TaskStatus.REJECTED) {
        return `${task.deadline} days`
    }
}

export const userCanEdit = (user: SessionUser, task: Task) => {
    if (user.role === UserRole.ADMIN) return true
    if (user.role === UserRole.WRITER && task.writerId === user.id) return true
    if (user.role === UserRole.EDITOR && task.editorId === user.id) return true
    return false
}

export const userCanCreate = (user: SessionUser) => {
    if (user.role === UserRole.ADMIN) return true
    return false
}

export const userCanDelete = (user: SessionUser, task: Task) => {
    if (user.role === UserRole.ADMIN) return true
    return false
}

export const userCanView = (user: SessionUser, task: Task) => {
    if (user.role === UserRole.ADMIN) return true
    if (user.role === UserRole.WRITER && task.writerId === user.id) return true
    if (user.role === UserRole.EDITOR && task.editorId === user.id) return true
    return false
}

export const userCanChat = (user: User, writer?: Writer, editor?: Editor) => {
    if (user.role === UserRole.ADMIN) return true
    if (
        user.role === UserRole.WRITER &&
        writer?.status === WriterStatus.APPROVED
    )
        return true
    if (
        user.role === UserRole.EDITOR &&
        editor?.companyId === WriterStatus.APPROVED
    )
        return true
    return false
}

export const userCanAddFunds = (user: SessionUser, company?: Company) => {
    if (user.role === UserRole.ADMIN) return true
    return false
}
