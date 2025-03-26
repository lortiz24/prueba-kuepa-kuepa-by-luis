import React from "react";
import { useGetPrograms } from "../hooks/useGetPrograms";
import { Select } from "@mantine/core";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export const ProgramSelect = ({ value, onChange }: Props) => {
  const { programs } = useGetPrograms();

  return (
    <Select
      label="Programa de interés"
      placeholder="Seleccione un programa"
      data={programs.map((program) => ({
        label: program.name,
        value: program._id,
      }))}
      value={value}
      onChange={onChange}
      className="mb-3"
      required
    />
  );
};
