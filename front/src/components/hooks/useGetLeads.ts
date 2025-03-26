import { useEffect, useState } from "react";
import { TLead } from "../types/lead.type";
import { TPagination } from "../types/pagination.type";
import { leadService } from "@/services/leadService";
import {
  LIMIT_DEFAULT,
  OFFSET_DEFAULT,
} from "../constants/pagination.constants";

export const useGetLeads = () => {
  const [leads, setLeads] = useState<TLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [pagination, setPagination] = useState<TPagination>({
    limit: LIMIT_DEFAULT,
    offset: OFFSET_DEFAULT,
  });

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await leadService.list(pagination);
        setLeads(response.list);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage("No se pudo obtener el listado de least");
      }
    };
    fetchLeads();
  }, [pagination.limit, pagination.offset]);

  return {
    leads,
    isLoading,
  };
};
