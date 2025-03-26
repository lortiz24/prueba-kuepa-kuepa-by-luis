import { app } from "@/atoms/kuepa";
import { Input } from "@/components/ui/input";
import { LeadForm } from "@/components/ui/LeadForm";
import { LeadTable } from "@/components/ui/LeadTable";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export interface LeadsProps {}

export default function Leads(props?: LeadsProps) {
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
              <LeadForm />
            </div>
            <div className="lg:col-span-2">
              <LeadTable />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
