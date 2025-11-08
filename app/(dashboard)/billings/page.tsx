import CardBillings from '@/components/cards/cardBillings'
import PageHeader from '@/components/layouts/PageHeader'
import { Button } from '@/components/ui/button'
import { auth } from '@/auth'
import { getCompanyById } from '@/actions/companyController'
import { redirect } from 'next/navigation'
import { getBillings } from '@/actions/billingController'

const Billings = async () => {
    const session = await auth()
    const company = await getCompanyById(session?.user?.companyId as string)
    if (!company) return redirect('/settings')

    const billings = (await getBillings(company.id)) ?? []

    return (
        <div className="page-wrapper">
            <PageHeader title="Billings" description={`${billings.length}`}>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2"
                        placeholder="Search"
                    />
                    <Button className="w-full bg-teal-500 hover:bg-teal-700">
                        <span className="text-nowrap">Add Funds</span>
                    </Button>
                </div>
            </PageHeader>
            <div className="page-body">
                <CardBillings billings={billings} />
            </div>
        </div>
    )
}

export default Billings
