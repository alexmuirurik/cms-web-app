import PageHeader from '@/components/layouts/PageHeader'
import { Button } from '@/components/ui/button'
import { auth } from '@/auth'
import { getCompanyById } from '@/actions/companyController'
import { redirect } from 'next/navigation'
import { getInvoices } from '@/actions/invoiceController'
import CardInvoices from '@/components/cards/cardInvoices'

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
                        className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2"
                        placeholder="Search"
                    />
                    <Button className="bg-teal-500 hover:bg-teal-700 px-8">
                        <span className="text-nowrap">Add Funds</span>
                    </Button>
                </div>
            </PageHeader>
            <div className="page-body">
                <CardInvoices invoices={invoices} />
            </div>
        </div>
    )
}

export default Invoices
