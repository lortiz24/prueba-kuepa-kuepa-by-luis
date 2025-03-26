import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useGetLeads } from "../hooks/useGetLeads";
import type { TInterestProgram, TLead } from "../types/lead.type";
import { Input, Pagination, Select, Text } from "@mantine/core";

import { Search } from "lucide-react";
import { TPagination } from "../types/pagination.type";

type Props = {
  isLoading: boolean;
  leads: TLead[];
  onChangePage: (page: number) => void;
  pagination?: TPagination;
};
const LeadTable: React.FC<Props> = ({
  isLoading,
  leads,
  onChangePage,
  pagination,
}) => {
  const [globalFilter, setGlobalFilter] = React.useState("");

  // Definir las columnas de la tabla
  const columns = React.useMemo<ColumnDef<TLead>[]>(
    () => [
      {
        accessorKey: "full_name",
        header: "Nombre Completo",
        cell: (info) => (
          <div className="font-medium text-gray-900">
            {info.getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Correo Electrónico",
        cell: (info) => (
          <div className="text-sm text-gray-600">
            {info.getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "mobile_phone",
        header: "Teléfono Móvil",
        cell: (info) => (
          <div className="text-sm text-gray-600">
            {info.getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "interestProgram",
        header: "Programa de Interés",
        cell: (info) => (
          <div className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-800 inline-block">
            {(info.getValue() as TInterestProgram).name}
          </div>
        ),
      },
    ],
    []
  );

  // Configurar la instancia de la tabla
  const table = useReactTable({
    data: leads || [],
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Renderizar la tabla
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700"></div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No se encontraron leads
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default React.memo(LeadTable);
