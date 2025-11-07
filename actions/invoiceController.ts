import prisma from "@/prisma/prisma"

export const getInvoice = async (invoiceId: string) => {
    try {
        const invoice = await prisma.invoice.findUnique({
            where: {
                id: invoiceId,
            },
            include: {
                company: true,
                tasks: true
            },
        })
        return invoice
    } catch (err) {
        console.log('We faced an error getting a single invoice ' + err)
    }
}

export const getInvoices = async (companyId: string) => {
    try {
        const invoices = await prisma.invoice.findMany({
            where: {
                companyId: companyId,
            },
            include: {
                company: true,
                tasks: true
            },
        })
        return invoices
    } catch (err) {
        console.log('We faced an error getting folder invoices ' + err)
    }
}
