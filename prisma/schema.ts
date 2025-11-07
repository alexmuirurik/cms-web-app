import { z } from 'zod'

export const inviteWriterFormSchema = z.object({
    email: z.string().email(),
    companyId: z.string(),
    testWriter: z.boolean().default(false),
})

export const companyFormSchema = z.object({
    title: z.string(),
    description: z.string(),
    userId: z.string(),
    location: z.string(),
    website: z.string(),
    payperword: z.string(),
})

export const categoryFormSchema = z.object({
    title: z.string(),
    description: z.string(),
    companyId: z.string(),
})

export const taskFormSchema = z.object({
    title: z.string(),
    instructions: z.string(),
    wordcount: z.string(),
    status: z.string().default('PENDING_WRITER'),
    deadline: z.string(),
    companyId: z.string(),
    categoryId: z.string().optional(),
    writerId: z.string().optional(),
})

export const assignWriterFormSchema = z.object({
    writerId: z.string(),
    taskId: z.string(),
    status: z.string().default('PENDING_WRITER'),
})

export const writeTaskFormSchema = z.object({
    taskId: z.string(),
    title: z.string().optional(),
    content: z.string().optional(),
    writerId: z.string().optional(),
    editorId: z.string().optional(),
    invoiceId: z.string().optional(),
    status: z.string().optional(),
})

export const messageFormSchema = z.object({
    message: z.string(),
})
