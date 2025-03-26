import { isEmail, useForm } from "@mantine/form";
import { TLead } from "../types/lead.type";

export function useLeadForm() {
  const form = useForm<
    Omit<TLead, "interestProgram" | "full_name"> & { interestProgram: string }
  >({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobile_phone: "",
      interestProgram: "",
    },
    validate: {
      first_name: (value) => (value.trim() ? null : "El nombre es obligatorio"),
      last_name: (value) =>
        value.trim() ? null : "El apellido es obligatorio",
      email: isEmail("El correo electrónico es invalido"),
      interestProgram: (value) =>
        value.trim() ? null : "Debe seleccionar un programa de interés",
    },
  });

  return form;
}
