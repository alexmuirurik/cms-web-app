'use server'
import { slugify } from '@/lib/utils'
import prisma from '@/prisma/prisma'
import { taskFormSchema, writeTaskFormSchema } from '@/prisma/schema'
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

export const getTask = async (slug: string) => {
    try {
        const task = await prisma.task.findUnique({
            where: {
                slug: slug,
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
        })

        return tasks
    } catch (err) {
        console.log('We faced an error getting folder tasks ' + err)
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
                status: data.status,
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
                slug: data.slug,
            },
            data: {
                title: data.title,
                content: data.content,
            },
        })

        return updatetask
    } catch (err) {
        console.log('We faced an error updating a task ' + err)
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
