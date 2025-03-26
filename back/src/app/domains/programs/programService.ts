
import { Program } from "@app/models";
import { responseUtility } from "@core/utilities/responseUtility";

class ProgramService {
  constructor() {}
  public async list() {
    try {
      const programs = await Program.find().lean();

      return responseUtility.success({ list: programs });
    } catch (error) {
      console.error("Error fetching programs", error);
      return responseUtility.error("program.list_error");
    }
  }

  public async get(_params: { _id: string }) {
    try {
      const program = await Program.findOne({ _id: _params._id }).lean();

      if (!program) return responseUtility.error("program.not_found");

      return responseUtility.success({ program });
    } catch (error) {
      console.error("Error fetching program", error);
      return responseUtility.error("program.get_error");
    }
  }
}

export const programService = new ProgramService();
export { ProgramService };
