import ClaimTask from '@/components/forms/claimTask'
import MessageButton from '@/components/cards/messagebutton'
import ViewButton from '@/components/forms/viewButton'
import AssignWriter from '@/components/forms/assignWriter'
import DeleteTask from '@/components/forms/deleteTask'
import { TaskAction, TaskActions, TaskStatus, UserRole } from './taskTypes'

export const taskActions: TaskAction[] = [
    {
        status: TaskStatus.UNASSIGNED,
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
                component: ClaimTask,
            },
        ],
        color: 'text-blue-600',
    },
    {
        status: TaskStatus.PENDING_WRITER,
        actions: [
            {
                value: TaskActions.REASSIGN_TASK,
                authorized: [UserRole.ADMIN],
                component: AssignWriter,
            },
            {
                value: TaskActions.VIEW_WRITER,
                authorized: [UserRole.ADMIN],
                component: ViewButton,
            },
            {
                value: TaskActions.CLAIM_ARTICLE,
                authorized: [UserRole.WRITER],
                component: MessageButton,
            },
        ],
        color: 'text-blue-600',
    },
    {
        status: TaskStatus.IN_PROGRESS,
        actions: [
            {
                value: TaskActions.APPROVE_CONTENT,
                authorized: [UserRole.EDITOR, UserRole.ADMIN],
                component: MessageButton,
            },
            {
                value: TaskActions.SUBMIT_CONTENT,
                authorized: [UserRole.WRITER],
                component: MessageButton,
            },
        ],
        color: 'text-teal-600',
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
        color: 'text-yellow-600',
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
        color: 'text-green-600',
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
        color: 'text-red-600',
    },
]