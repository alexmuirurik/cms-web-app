import { FaBuildingCircleCheck } from 'react-icons/fa6'
import { FaFileCircleQuestion } from 'react-icons/fa6'
import { FaRoadCircleExclamation } from 'react-icons/fa6'
import { BsFillWrenchAdjustableCircleFill } from 'react-icons/bs'

const TitleCards = () => {
    return (
        <div className="row md:grid-cols-2 lg:grid-cols-4">
            <div className="col flex items-center gap-2 border p-3 cursor-pointer">
                <div className="bg-teal-100 border p-2">
                    <FaBuildingCircleCheck className="h-6 w-6" />
                </div>
                <div className="pt-2">
                    <h4 className="font-bold text-sm leading-3 mb-0">
                        0 Completed
                    </h4>
                    <small className="text-xs">in the last 7 days</small>
                </div>
            </div>
            <div className="col flex items-center gap-2 border p-3 cursor-pointer">
                <div className="bg-teal-100 border p-2">
                    <BsFillWrenchAdjustableCircleFill className="h-6 w-6" />
                </div>
                <div className="pt-2">
                    <h4 className="font-bold text-sm leading-3 mb-0">
                        0 In Progress
                    </h4>
                    <small className="text-xs">in the last 7 days</small>
                </div>
            </div>
            <div className="col flex items-center gap-2 border p-3 cursor-pointer">
                <div className="bg-teal-100 border p-2">
                    <FaRoadCircleExclamation className="h-6 w-6" />
                </div>
                <div className="pt-2">
                    <h4 className="font-bold text-sm leading-3 mb-0">
                        0 Pending Payment
                    </h4>
                    <small className="text-xs">in the last 7 days</small>
                </div>
            </div>
            <div className="col flex items-center gap-2 border p-3 cursor-pointer">
                <div className="bg-teal-100 border p-2">
                    <FaFileCircleQuestion className="h-6 w-6" />
                </div>
                <div className="pt-2">
                    <h4 className="font-bold text-sm leading-3 mb-0">
                        0 Rejected
                    </h4>
                    <small className="text-xs">in the last 7 days</small>
                </div>
            </div>
        </div>
    )
}

export default TitleCards
