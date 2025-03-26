// @import_dependencies
import { Request, Response } from "express";

// @import_services

// @import_utilities
import { responseUtility } from "@core/utilities/responseUtility";
import { ProgramService } from "./programService";

// @import_types

class ProgramController {
  private service = new ProgramService();

  constructor() {}

  public list = async (_: Request, res: Response) => {
    const response = await this.service.list();
    return responseUtility.build(res, response);
  };

  public get = async (req: Request, res: Response) => {
    const _params = req._data();
    const response = await this.service.get(_params);
    return responseUtility.build(res, response);
  };
}

export const programController = new ProgramController();
export { ProgramController };
