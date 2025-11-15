import { Task } from '@prisma/client'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const toTitleCase = (slug: string) => {
    var letters = slug.split('-')
    for (var i = 0; i < letters.length; i++) {
        var word = letters[i]
        letters[i] = word.charAt(0).toUpperCase() + word.slice(1)
    }

    return letters.join(' ')
}

export const trimWords = (string: string, maxWords: number) => {
    var strippedString = string.trim()
    var array = strippedString.split(' ')
    var wordCount = array.length
    var string = array.splice(0, maxWords).join(' ')

    if (wordCount > maxWords) {
        string += '...'
    }

    return string
}

export const slugify = (input: string) => {
    if (!input) return ''
    var slug = input.toLowerCase().trim()
    slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    slug = slug.replace(/[^a-z0-9\s-]/g, ' ').trim()
    slug = slug.replace(/[\s-]+/g, '-')
    return slug
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getDaysAgo = (givenDate: Date) => {
    const currentDate = new Date()
    const timeDifference = currentDate.getTime() - givenDate.getTime()
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24
    const daysAgo = Math.floor(timeDifference / oneDayInMilliseconds)
    if (daysAgo > 0) {
        return `${daysAgo} days ago`
    }

    const hours = Math.floor(timeDifference / oneDayInMilliseconds / 24)
    if (hours > 0) {
        return `${hours} hours ago`
    }

    const minutes = Math.floor(timeDifference / oneDayInMilliseconds / 24 / 60)
    if (minutes > 0) {
        return `${minutes} minutes ago`
    }

    const seconds = Math.floor(
        timeDifference / oneDayInMilliseconds / 24 / 60 / 60
    )

    if (seconds > 0) {
        return `${seconds} seconds ago`
    }

    return 'Just now'
}

export const getDeadline = (task: Task) => {
    const createdAt = new Date(task.createdAt)
    const deadlineDate = createdAt.setDate(createdAt.getDate() + task.deadline)
    const diffMs = new Date(deadlineDate).getTime() - new Date().getTime()
    console.log(diffMs)
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60)
    const seconds = Math.floor((diffMs / 1000) % 60)

    if (days > 0) {
        return `${days} days ${hours} hours`
    }

    if (hours > 0) {
        return `${hours} hours ${minutes} minutes`
    }

    if (minutes > 0) {
        return `${minutes} minutes ${seconds} seconds`
    }

    return `${seconds} seconds`
}
