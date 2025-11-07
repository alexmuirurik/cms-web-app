import prisma from "@/prisma/prisma"

export const getBilling = async (billingId: string) => {
    try {
        const billing = await prisma.billing.findUnique({
            where: {
                id: billingId,
            },
            include: {
                company: true,
            },
        })
        return billing
    } catch (err) {
        console.log('We faced an error getting a single billing ' + err)
    }
}

export const getBillings = async (companyId: string) => {
    try {
        const billings = await prisma.billing.findMany({
            where: {
                companyId: companyId,
            },
            include: {
                company: true,
            },
        })
        return billings
    } catch (err) {
        console.log('We faced an error getting folder billings ' + err)
    }
}