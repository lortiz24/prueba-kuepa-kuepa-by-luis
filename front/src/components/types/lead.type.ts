export interface TLead {
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_phone: string;
  interestProgram: TInterestProgram;
}

export type TInterestProgram = {
  _id: string;
  name: string;
};
