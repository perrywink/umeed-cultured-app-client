import { Post } from "../../../types/Post";
import React, { useMemo } from 'react'
import { useTable, usePagination, Column } from 'react-table'
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";


interface Props {
    tabData: Post[];
}


const MyPostTable = ({ tabData }: Props) => {
    const data = useMemo(() => tabData, []);

    const columns = React.useMemo(
        () => [
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Author",
                accessor: "author",
            },
        ] as Column<Post>[],
        []
    );
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, usePagination);

    return (
        <div className="w-full">
                <table className="w-full table-auto my-10 border-collapse " {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr className="border-b-2 border-gray-200 text-left" {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th className="py-4 px-12" {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="" {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td className="border-b-2 border-gray-200 py-4 px-12" {...cell.getCellProps()}> {cell.render("Cell")} </td>
                                    ))}
                                    <td  className="border-b-2 border-gray-200 px-6"> <PencilSquareIcon className="h-6 w-6 text-gray-500"/></td>
                                    <td  className="border-b-2 border-gray-200 px-6" > <TrashIcon className="h-6 w-6 text-gray-500"/></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
        </div>
    )
}

export default MyPostTable;