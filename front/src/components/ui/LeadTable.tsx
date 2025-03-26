import { useGetLeads } from "../hooks/useGetLeads";

export const LeadTable = () => {
  const {} = useGetLeads();
  return <div>Leads</div>;
};
