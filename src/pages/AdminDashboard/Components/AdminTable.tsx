import React from "react";
import { PostTable } from "../../../types/Post";
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

interface Props {
  tabData: PostTable[];
}

const AdminTable = ({ tabData }: Props) => {
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
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "author",
      header: () => "Author",
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "status",
      header: "Status",
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "accept",
      header: "",
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "reject",
      header: "",
      footer: (props) => props.column.id,
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

    // <div>
    //   {tableContent.map((content: Post) => (
    //     <div className='grid md:grid-cols-5'>
    //       <div>
    //         <h3> {content.title}</h3>
    //       </div>
    //       <div>
    //         <h3> {content.author}</h3>
    //       </div>
    //       <div>
    //         <h3> {content.status}</h3>
    //       </div>

    //       {content.status == "REJECTED" && (
    //         <div>
    //           <button> {"Manage"}</button>
    //         </div>
    //       )}

    //       {content.status == "IN_REVIEW" && (
    //         <div className='grid md:grid-cols-2'>
    //           <div>
    //             <button> {"Accept"}</button>
    //           </div>

    //           <div>
    //             <button> {"Reject"}</button>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   ))}
    // </div>
  );
};

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
                  return (
                    <>
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;
