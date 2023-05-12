import { Post } from "../../../types/Post";
import React, { useMemo } from 'react'
// import { useTable, usePagination, Column } from 'react-table'
import { PencilSquareIcon, TrashIcon, ArrowSmallRightIcon, ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import {
    Table as ReactTable,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    ColumnDef,
    flexRender,
} from '@tanstack/react-table'
import { Button } from "../../../components";

interface Props {
    tabData: Post[];
}

const MyPostTable = ({ tabData }: Props) => {
    const data = useMemo(() => tabData, []);

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
                                        )} </td>
                                ))}
                                <td className="border-b-2 border-gray-200 px-6"> <PencilSquareIcon className="h-6 w-6 text-gray-500" /></td>
                                <td className="border-b-2 border-gray-200 px-6" > <TrashIcon className="h-6 w-6 text-gray-500" /></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div />
            <div className="flex justify-between items-center w-full ">

                <div >
                    <Button
                        styles="ml-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >   
                        <div className="flex align-center gap-1">
                        <ArrowSmallLeftIcon className="w-6 h-6"/>
                        Previous Page
                        </div>
                    </Button>
                </div>
                <div >
                    <span >
                        Page 
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </strong>
                    </span>
                    <span >
                        | Go to page:
                        <input
                            type="number"
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                table.setPageIndex(page)
                            }}
                            className="border p-1 rounded w-16"
                        />
                    </span>

                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                        className="h-8 mx-2 border"
                    >
                        {[5, 10].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <div >
                    <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >   
                        <div className="flex align-center gap-1">
                            Next Page
                            <ArrowSmallRightIcon className="w-6 "/>
                        </div>
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default MyPostTable;