import PageHeader from '@/src/components/layouts/PageHeader'
import { Button } from '@/src/components/ui/button'
import { auth } from '@/auth'
import { getCompanyById } from '@/src/actions/companyController'
import { redirect } from 'next/navigation'
import { getInvoices } from '@/src/actions/invoiceController'
import CardInvoices from '@/src/components/cards/cardInvoices'
import { userCanAddFunds } from '@/src/lib/tastLib'
import { SessionUser } from '@/prisma/types'

const Invoices = async () => {
    const session = await auth()
    const company = await getCompanyById(session?.user?.companyId as string)
    if (!company) return redirect('/settings')

    const invoices = (await getInvoices(company.id)) ?? []
    
    return (
        <div className="page-wrapper">
            <PageHeader title="Invoices" description={`${invoices.length}`}>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2 w-full"
                        placeholder="Search"
                    />
                    {userCanAddFunds(session?.user as SessionUser, company) && (
                        <Button className="bg-teal-500 hover:bg-teal-700 px-8 w-full">
                            <span className="text-nowrap">Add Funds</span>
                        </Button>
                    )}
                </div>
            </PageHeader>
            <div className="page-body border">
                <CardInvoices invoices={invoices} />
            </div>
        </div>
    )
}

export default Invoices
