import React from "react";
import { Post, PostTable } from "../../../types/Post";
import {
  Column,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "../../../components";
import TablePagination from "./TablePagination";

interface Props {
  tabData: PostTable[];
}

const UserPostTable = ({ tabData }: Props) => {
  const data = tabData || [];

  data.forEach((rowData) => {
    if (rowData.status === "IN_REVIEW") {
      rowData["accept"] = "Accept";
      rowData["reject"] = "Reject";
    } else if (rowData.status === "APPROVED") {
      rowData["reject"] = "Reject";
    } else {
      rowData["accept"] = "Accept";
    }
  });

  const columns = React.useMemo<ColumnDef<PostTable>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "author",
        header: "Author",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "accept",
        header: "",
      },
      {
        accessorKey: "reject",
        header: "",
      },
    ],
    []
  );

  const handleClick = (rowData: any) => {
    alert(JSON.stringify(rowData));
  };

  const getCell = (cell: any) => {
    let columnId = cell.getContext().column.id;
    let val = cell.getValue();
    let ele;

    if (columnId == "title") {
      ele = (
        <a
          href='#'
          className='font-regular text-slate-600 underline'
          onClick={() => handleClick(val)}>
          {val}
        </a>
      );
    } else if (val == "Accept") {
      ele = (
        <Button
          className='bg-umeed-cyan hover:bg-cyan-200 text-gray-600 px-5 py-1 rounded'
          onClick={() => handleClick("Accept clicked")}>
          {val}
        </Button>
      );
    } else if (val == "Reject") {
      ele = (
        <Button
          className='bg-umeed-tangerine-100 hover:bg-umeed-tangerine-300 text-gray-600 px-5 py-1 rounded'
          onClick={() => handleClick("Reject clicked")}>
          {val}
        </Button>
      );
    } else if (val == "APPROVED") {
      ele = (
        <span className='bg-umeed-cyan text-gray-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded'>
          {val}
        </span>
      );
    } else if (val == "REJECTED") {
      ele = (
        <span className='bg-umeed-tangerine-100 text-umeed-tangerine-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded'>
          {val}
        </span>
      );
    } else if (val == "IN_REVIEW") {
      ele = (
        <span className='bg-gray-200 text-gray-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded'>
          {"IN REVIEW"}
        </span>
      );
    } else {
      ele = val;
    }

    return (
      <td className='border-b-2 border-gray-200 py-4 px-12' key={cell.id}>
        {ele}
      </td>
    );
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
    debugTable: true,
  });

  return (
    <div className='w-full text-gray-600'>
      <table className='w-full table-auto my-10 border-collapse '>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              className='border-b-2 border-gray-200 text-left'
              key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className='py-4 px-12'
                    key={header.id}
                    colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  {
                    return getCell(cell);
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <TablePagination table={table}></TablePagination>
    </div>
  );
};

export default UserPostTable;
