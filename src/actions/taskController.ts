'use server'
import { TaskStatus } from '@/src/lib/taskTypes'
import { slugify } from '@/src/lib/utils'
import prisma from '@/prisma/prisma'
import {
    assignWriterFormSchema,
    submitTaskFormSchema,
    taskFormSchema,
    writeTaskFormSchema,
} from '@/prisma/schema'
import { z } from 'zod'

export const getTaskById = async (taskId: string) => {
    try {
        const task = await prisma.task.findUnique({
            where: {
                id: taskId,
            },
            include: {
                category: true,
                writer: true,
                editor: true,
                invoice: true,
            },
        })

        return task
    } catch (err) {
        console.log('We faced an error getting a single task ' + err)
    }
}


export const getTasks = async (companyId: string) => {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                companyId: companyId,
            },
            orderBy: {
                status: 'asc',
            },
        })

        return tasks
    } catch (err) {
        throw new Error('We faced an error getting folder tasks ' + err)
    }
}

export const claimTask = async (
    data: z.infer<typeof assignWriterFormSchema>
) => {
    try {
        const claimTask = await prisma.task.update({
            where: {
                id: data.taskId,
            },
            data: {
                writerId: data.writerId,
                status: TaskStatus.IN_PROGRESS,
                claimedAt: new Date(),
            },
        })

        return claimTask
    } catch (err) {
        throw new Error('We faced an error claiming a task ' + err)
    }
}

export const createTask = async (data: z.infer<typeof taskFormSchema>) => {
    try {
        const createtask = await prisma.task.create({
            data: {
                slug: slugify(data.title),
                title: data.title,
                instructions: data.instructions,
                wordcount: Number(data.wordcount),
                deadline: Number(data.deadline),
                status: data.status as TaskStatus,
                company: {
                    connect: {
                        id: data.companyId,
                    },
                },
            },
        })

        return createtask
    } catch (err) {
        console.log('We faced an error creating a task ' + err)
    }
}

export const updateTask = async (data: z.infer<typeof writeTaskFormSchema>) => {
    try {
        const updatetask = await prisma.task.update({
            where: {
                id: data.taskId,
            },
            data: {
                title: data.title,
                content: data.content,
                writerId: data.writerId,
                editorId: data.editorId,
                invoiceId: data.invoiceId,
                status: data.status as TaskStatus,
            },
        })

        return updatetask
    } catch (err) {
        console.log('We faced an error updating a task ' + err)
    }
}

export const submitContent = async (data: z.infer<typeof submitTaskFormSchema>) => {
    try {
        const submitContent = await updateTask(data)
        return submitContent
    } catch (err) {
        console.log('We faced an error submitting content ' + err)
    }
}

export const deleteTask = async (taskId: string) => {
    try {
        const deletetask = await prisma.task.delete({
            where: {
                id: taskId,
            },
        })

        return deletetask
    } catch (err) {
        console.log('We faced an error deleting a task ' + err)
    }
}
