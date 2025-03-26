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

export const LeadTable: React.FC = () => {
  const { isLoading, leads } = useGetLeads();
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pageSize, setPageSize] = React.useState(10);

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

  React.useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  // Renderizar la tabla
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Buscar leads..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Text size="sm" color="dimmed">
              Mostrar
            </Text>
            <Select
              value={pageSize.toString()}
              onChange={(value) => setPageSize(Number(value))}
              data={[
                { value: "5", label: "5" },
                { value: "10", label: "10" },
                { value: "25", label: "25" },
                { value: "50", label: "50" },
              ]}
              style={{ width: 70 }}
            />
            <Text size="sm" color="dimmed">
              por página
            </Text>
          </div>
        </div>
      </div>

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

      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-700">
          Mostrando{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          a{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          de {table.getFilteredRowModel().rows.length} resultados
        </div>

        <Pagination
          total={table.getPageCount()}
          value={table.getState().pagination.pageIndex + 1}
          onChange={(page) => table.setPageIndex(page - 1)}
          size="sm"
          radius="xs"
          withEdges
          /* styles={(theme) => ({
            item: {
              "&[data-active]": {
                backgroundColor: "#6b21a8",
              },
            },
          })} */
        />
      </div>
    </div>
  );
};
