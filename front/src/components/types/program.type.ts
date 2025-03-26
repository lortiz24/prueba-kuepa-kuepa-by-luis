export type TProgram = {
  _id?: string;
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
  deleted?: boolean;
  deletedAt?: Date | null;
};
