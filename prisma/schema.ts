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
})

export const writeTaskFormSchema = z.object({
    slug: z.string(),
    title: z.string(),
    content: z.string(),
})

export const messageFormSchema = z.object({
    message: z.string(),
})
