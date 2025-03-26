import { memo } from "react";
import { Paper, TextInput, Title, Button } from "@mantine/core";
import { useLeadForm } from "../hooks/useLeadForm";
import { ProgramSelect } from "./ProgramSelect";
import { TLead } from "../types/lead.type";

type Props = {
  isSaving: boolean;
  createLead: (
    newLead: Omit<TLead, "interestProgram" | "full_name"> & {
      interestProgram: string;
    }
  ) => Promise<void>;
};

const LeadTable: React.FC<Props> = memo(({ createLead, isSaving }) => {
  const form = useLeadForm();

  const handleSubmit = async (
    newLead: Omit<TLead, "interestProgram" | "full_name"> & {
      interestProgram: string;
    }
  ) => {
    try {
      await createLead(newLead);
      form.reset();
    } catch (error) {
      console.error("Ocurrió un error al crear el lead");
    }
  };

  return (
    <Paper shadow="sm" p="md" withBorder className="bg-white">
      <Title order={3} className="text-purple-800 mb-4">
        Registrar Nuevo Lead
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
        <TextInput
          required
          label="Primer nombre"
          {...form.getInputProps("first_name")}
          placeholder="Nombre del estudiante"
          className="mb-3"
        />
        <TextInput
          required
          label="Apellido"
          {...form.getInputProps("last_name")}
          placeholder="Apellido del estudiante"
          className="mb-3"
        />
        <TextInput
          required
          label="Correo electrónico"
          {...form.getInputProps("email")}
          placeholder="Correo electrónico"
          className="mb-3"
        />
        <TextInput
          required
          label="Teléfono móvil"
          {...form.getInputProps("mobile_phone")}
          placeholder="Número de teléfono móvil"
          className="mb-3"
        />
        <ProgramSelect
          value={form.values.interestProgram}
          onChange={(value) => form.setFieldValue("interestProgram", value)}
        />
        <Button loading={isSaving} type="submit" color="purple">
          Registrar Lead
        </Button>
      </form>
    </Paper>
  );
});

export default LeadTable;
