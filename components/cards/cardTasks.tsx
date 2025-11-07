import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { FaBuffer, FaChartBar } from 'react-icons/fa'
import { Checkbox } from '../ui/checkbox'
import Link from 'next/link'
import { Task } from '@prisma/client'
import { trimWords } from '@/lib/utils'

const CardTasks = ({ tasks }: { tasks: Task[] }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow className="">
                    <TableCell className="border-e border-gray-200 w-px p-1 pe-2 rounded-none">
                        <FaChartBar className="me-2 border-gray-400 data-[state=checked]:bg-teal-600 " />
                    </TableCell>
                    <TableCell className="flex items-center gap-2 font-bold rounded-none capitalize">
                        <FaBuffer className="text-base" />
                        Tasks
                    </TableCell>
                    <TableCell className="font-bold rounded-none">
                        Description
                    </TableCell>
                    <TableCell className="font-bold rounded-none">
                        Word Count
                    </TableCell>
                    <TableCell className="font-bold text-center rounded-none">
                        Status
                    </TableCell>
                </TableRow>
            </TableHeader>
            <TableBody className="border-t border-gray-200 rounded-md">
                {tasks.map(task => (
                    <TableRow key={task.slug} className="items-center">
                        <TableCell className="border-e border-gray-200 w-px p-1 pe-2">
                            <Checkbox className="me-2 border-gray-400 data-[state=checked]:bg-teal-600 " />
                        </TableCell>
                        <TableCell className="flex items-center gap-2 font-medium capitalize">
                            <Link
                                className="flex items-center gap-2 text-neutral-500 hover:text-blue-950 font-bold"
                                href={`/tasks/${task.slug}`}
                            >
                                <FaBuffer className="text-base text-blue-600" />
                                {task.title}
                            </Link>
                        </TableCell>
                        <TableCell>{trimWords(task.instructions, 10)}</TableCell>
                        <TableCell>{task.wordcount}</TableCell>
                        <TableCell className="text-end">
                            <span className="bg-teal-200 border border-neutral-400 text-neutral-500 text-sm rounded-md px-2 py-1">
                                {task.status.replaceAll('-', ' ')}
                            </span>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default CardTasks
