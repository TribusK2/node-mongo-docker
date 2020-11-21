import * as mongoose from "mongoose";

import { Blog } from "../../model/blog-model";
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

export function blogModelValidation(blog: Blog) {

  let error: Partial<ErrorBlock> = {
    status: 400,
    message: `Missing 'Blog' object`
  }

  if (!blog) {
    throw error;
  } else {
    const patternModel: any = {
      body: 'string',
      title: 'string',
      snippet: 'string',
    }
    const verifiedModel: any = blog;
    error.message = '';

    checkModel(patternModel, verifiedModel, error);

  }

}

function checkModel(pattern: any, model: any, error: Partial<ErrorBlock>){
  for (const property in model) {
    if(!pattern.hasOwnProperty(property)) error.message = `${error.message} ${property};`;
  }
  if (error.message) {
    error.message = `Unexpected fields:${error.message}`;
    throw error;
  }

  for (const property in pattern) {
    if (!model.hasOwnProperty(property)) error.message = `${error.message} ${property};`;
  }
  if (error.message) {
    error.message = `Missing fields:${error.message}`;
    throw error;
  }

  for (const property in model) {
    if (typeof (model[property]) !== pattern[property]) error.message = `${error.message} ${property};`;
  }
  if (error.message) {
    error.message = `Incorrect values of:${error.message}`;
    throw error;
  }
}
