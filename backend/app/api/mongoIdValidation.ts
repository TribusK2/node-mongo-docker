import * as mongoose from "mongoose";

import { ErrorBlock } from "../../model/error-block-model";

export function mongoIdValidation(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error: Partial<ErrorBlock> = {
      status: 400,
      message: `Value '${id}' isn't a valid id`
    }
    throw error;
  }
}