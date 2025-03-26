import { TPagination } from "@/components/types/pagination.type";
import { get, post } from "../util/http";
import {
  LIMIT_DEFAULT,
  OFFSET_DEFAULT,
} from "@/components/constants/pagination.constants";
import { TLead } from "@/components/types/lead.type";
const api = "/lead";
export const leadService = {
  api,
  get: async ({ _id }: { _id: string }) => {
    return await get({ api: `${api}/get/${_id}` });
  },
  list: async (pagination?: TPagination) => {
    return await get({
      api: `${api}/`,
      pagination,
    });
  },
  upsert: async (newLead: TLead) => {
    return await post({
      api: `${api}/upsert`,
      options: {
        data: newLead,
      },
    });
  },
};
