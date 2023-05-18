import { PostTable } from "../../../types/Post";
import { useEffect, useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "../../../components";
import TablePagination from "../components/TablePagination";
import { useUpdatePost } from "../../../api/post";
import { toast } from "react-toastify";

interface Props {
  tabData: PostTable[];
  refetch: any;
}

const UserPostTable = ({ tabData, refetch }: Props) => {
  const data = tabData || [];
  const [dataUpdate, setDataUpdate] = useState<boolean>(false);
  const { mutateAsync: updatePostStatus } = useUpdatePost();

  useEffect(() => {
    refetch();
    setDataUpdate(false);
  }, [dataUpdate]);

  data.forEach((rowData) => {
    if (rowData.status === "IN_REVIEW") {
      rowData["approve"] = "Approve";
      rowData["reject"] = "Reject";
    } else if (rowData.status === "APPROVED") {
      rowData["reject"] = "Reject";
    } else {
      rowData["approve"] = "Approve";
    }
  });

  data.sort((a, b) => a.id - b.id);

  const columns = useMemo<ColumnDef<PostTable>[]>(
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
        accessorKey: "approve",
        header: "",
      },
      {
        accessorKey: "reject",
        header: "",
      },
    ],
    []
  );

  const handleApproveClick = async (rowData: any) => {
    await updatePostStatus({
      status: "APPROVED",
      id: rowData.id,
    });
    setDataUpdate(true);
    toast.success(`Post "${rowData.title}" is approved! `);
  };

  const handleRejectClick = async (rowData: any) => {
    await updatePostStatus({
      status: "REJECTED",
      id: rowData.id,
    });
    setDataUpdate(true);
    toast.error(`Post "${rowData.title}" is rejected! `);
  };

  const handleClick = (rowData: any) => {
    alert(JSON.stringify(rowData));
  };

  const getCell = (cell: any) => {
    let columnId = cell.getContext().column.id;
    let rowItem = cell.getContext().row.original;
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
    } else if (val == "Approve") {
      ele = (
        <Button
          className='bg-umeed-cyan hover:bg-cyan-200 text-gray-600 px-5 py-1 rounded'
          onClick={() => handleApproveClick(rowItem)}>
          {val}
        </Button>
      );
    } else if (val == "Reject") {
      ele = (
        <Button
          className='bg-umeed-tangerine-100 hover:bg-umeed-tangerine-300 text-gray-600 px-5 py-1 rounded'
          onClick={() => handleRejectClick(rowItem)}>
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
      <td className='border-b border-gray-200 py-4 px-12' key={cell.id}>
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
    <div className='w-full text-gray-700'>
      <table className='w-full table-auto my-10 border-collapse rounded-md border'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              className='border-b bg-gray-50 text-left'
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
