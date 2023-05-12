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
import { Alert, Button } from "@mui/material";

interface Props {
  tabData: PostTable[];
}

const UserPostTable = ({ tabData }: Props) => {
  const data = tabData || [];

  data.forEach((rowData) => {
    if (rowData.status === "IN_REVIEW") {
      rowData["accept"] = "Accept";
      rowData["reject"] = "Reject";
    }
  });

  const columns = React.useMemo<ColumnDef<PostTable>[]>(() => [
    {
      accessorKey: "title",
      header: () => "Title",
    },
    {
      accessorKey: "author",
      header: () => "Author",
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
  ]);

  return (
    <>
      <Table
        {...{
          data,
          columns,
        }}
      />
    </>
  );
};

const handleClick = (rowData: any) => {
  alert(JSON.stringify(rowData));
};

function getCell(cell: any) {
  let columnId = cell.getContext().column.id;
  let val = cell.getValue();
  let ele;
  if (columnId == "title") {
    ele = <Button onClick={() => handleClick(val)}>{val}</Button>;
  } else if (columnId == "accept") {
    ele = <Button onClick={() => handleClick("Accept clicked")}>{val}</Button>;
  } else if (columnId == "reject") {
    ele = <Button onClick={() => handleClick("Reject clicked")}>{val}</Button>;
  } else {
    ele = val;
  }

  return <td key={cell.id}>{ele}</td>;
}

function Table({
  data,
  columns,
}: {
  data: PostTable[];
  columns: ColumnDef<PostTable>[];
}) {
  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true,
  });

  return (
    <div className='p-2'>
      <div className='h-2' />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
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
    </div>
  );
}

export default UserPostTable;
