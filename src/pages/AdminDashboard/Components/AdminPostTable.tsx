import { Post } from "../../../types/Post";
import React, { useMemo, useState } from 'react'
// import { useTable, usePagination, Column } from 'react-table'
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    ColumnDef,
    flexRender,
} from '@tanstack/react-table'
import TablePagination from "./TablePagination";
import Modal, { IModalItem } from "../../../components/Modal/Modal";

interface Props {
    tabData: Post[];
}


const MyPostTable = ({ tabData }: Props) => {

    const [deletePostId, setDeletePostId] = useState<number>(0);

    const onClick = (data:any) => {

        const hello = flexRender(
            data[0].column.columnDef.header,
            data[0].getContext()
        )
        console.log(hello);
    }

    const handleDelete = () => {
        console.log("deleted")
    }

    const modalItem: IModalItem = {
        icon: <TrashIcon className="h-6 w-6 text-gray-500 hover:text-umeed-beige" />,
        title: "Delete Post",
        body: "Are you sure you want to permanantly delete this post ?",
        action: "Delete",
        onClick: handleDelete
    }

    const data = useMemo(() => tabData, [tabData]);


    const columns = React.useMemo<ColumnDef<Post>[]>(
        () => [
            {
                header: "Title",
                accessorKey: "title",
            },
            {
                header: "Author",
                accessorKey: "author",
            },
        ],
        []
    );
    const table = useReactTable({
        data,
        columns,
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 5 } },
        //
        debugTable: true,
    })

    return (
        <div className="w-full text-gray-600">
            <table className="w-full table-auto my-10 border-collapse ">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr className="border-b-2 border-gray-200 text-left" key={headerGroup.id}>
                            {headerGroup.headers.map((column) => (
                                <th key={column.id} className="py-4 px-12" >
                                    {column.isPlaceholder ? null : (
                                        <div>
                                            {flexRender(
                                                column.column.columnDef.header,
                                                column.getContext()
                                            )}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody >
                    {table.getRowModel().rows.map(row => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td className="border-b-2 border-gray-200 py-4 px-12" key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        
                                        )}
                                    </td>
                                ))}
                                <td className="border-b-2 border-gray-200 px-6"> 
                                    <button><PencilSquareIcon className="h-6 w-6 text-gray-500 hover:text-umeed-beige" /></button>
                                </td>
                                <td className="border-b-2 border-gray-200 px-6" > 
                                    <button onClick={() => onClick(row.getVisibleCells())} ><Modal {...modalItem}></Modal></button>
                                    
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div />
            <TablePagination table={table}></TablePagination>
        </div>
    )
}

export default MyPostTable;