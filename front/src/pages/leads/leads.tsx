import { useEffect, useState, useCallback } from "react";
import { app } from "@/atoms/kuepa";
import { useGetLeads } from "@/components/hooks/useGetLeads";
import { TLead } from "@/components/types/lead.type";
import LeadForm from "@/components/ui/LeadForm";
import { leadService } from "@/services/leadService";
import { Button } from "@mantine/core";
import LeadTable from "@/components/ui/LeadTable";

export interface LeadsProps {}

export default function Leads(props?: LeadsProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { isLoading, leads, refreshLeads, onChangePage, pagination } =
    useGetLeads();

  const createLead = useCallback(
    async (
      newLead: Omit<TLead, "interestProgram" | "full_name"> & {
        interestProgram: string;
      }
    ) => {
      try {
        setIsSaving(true);
        const response = await leadService.upsert({
          ...newLead,
          full_name: `${newLead.first_name} ${newLead.last_name}`,
        });
        refreshLeads();
      } catch (error) {
        console.error("Ocurrió un error al crear el lead", error);
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    []
  );

  useEffect(() => {
    app.set({
      ...(app.get() || {}),
      app: "kuepa",
      module: "leads",
      window: "crm",
      back: null,
      accent: "purple",
      breadcrumb: [
        {
          title: "Leads",
          url: "/leads",
        },
      ],
    });
  }, []);

  return (
    <div className="w-full max-w-full min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <LeadForm createLead={createLead} isSaving={isSaving} />
            </div>
            <div className="lg:col-span-2">
              <LeadTable
                isLoading={isLoading}
                leads={leads}
                onChangePage={onChangePage}
                pagination={pagination}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
