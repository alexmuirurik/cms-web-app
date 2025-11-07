import AssignWriter from '@/components/forms/assignWriter'
import DeleteTask from '@/components/forms/deleteTask'
import { TaskAction, TaskActions, TaskStatus, UserRole } from './taskTypes'
import ViewButton from '@/components/forms/viewButton'


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
        color: 'text-blue-600',
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
        messages: [
            {
                role: UserRole.ADMIN,
                message: 'I don\'t know who\'s reviewing this task between you and your editor' 
            }
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
        color: 'text-red-600',
    },
]
