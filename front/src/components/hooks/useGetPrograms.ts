import { useState, useEffect } from "react";
import { programService } from "@/services/programService";
import { TProgram } from "../types/program.type";

export const useGetPrograms = () => {
  const [programs, setPrograms] = useState<TProgram[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchPrograms = async () => {
      setIsLoading(true);

      try {
        const response = await programService.list();
        console.log('response', response)
        setPrograms(response.list);
      } catch (error) {
        setErrorMessage("No se pudo obtener el listado de programas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  return {
    programs,
    isLoading,
    errorMessage,
  };
};
