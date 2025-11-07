import PageHeader from '@/components/layouts/PageHeader'
import CreateCompany from '@/components/forms/createcompany'
import { Button } from '@/components/ui/button'
import { auth } from '@/auth'
import { getCompany } from '@/actions/companyController'

const Settings = async () => {
    const session = await auth()
    const user = session?.user
    const company = await getCompany(user?.id as string)
    return (
        <div className="page-wrapper">
            <PageHeader title="Settings" description="new" />
            <div className="page-body flex gap-4">
                <div className="border w-full p-4">
                    <CreateCompany user={user} company={company} />
                </div>
                <div className="border w-full sm:w-5/12 md:w-4/12 p-4">
                    <div className="flex flex-col justify-between w-full h-full">
                        <div className="space-y-4">
                            <h1 className="text-xl font-bold">
                                Billing & Payments
                            </h1>
                            <p className="text-sm text-gray-500 space-y-4">
                                <span>
                                    Manage your payments and billing here.
                                </span>
                                <br />
                                <span>
                                    You can add funds to your account and view
                                    payments.
                                </span>
                                <br />
                                <span>
                                    We'll send you an email when payments are
                                    received.
                                </span>
                            </p>
                        </div>
                        <Button className="w-full bg-teal-500 hover:bg-teal-700 align-bottom">
                            Add Funds
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
