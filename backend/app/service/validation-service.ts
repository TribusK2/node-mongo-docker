import * as mongoose from "mongoose";

import { Blog } from "../../model/blog-model";
import { ErrorBlock } from "../../model/error-block-model";

/**
 * Validation of the incoming id with mongo id object
 * @param  {string} id
 * @returns void
 */
export function mongoIdValidation(id: string): void {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error: Partial<ErrorBlock> = {
      status: 400,
      message: `Value '${id}' isn't a valid id`
    }
    throw error;
  }
}

/**
 * Validation of the incoming blog data with db model
 * @param  {Blog} blog
 * @returns void
 */
export function blogModelValidation(blog: Blog): void {

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

/**
 * Common function to check any model
 * @param  {any} pattern
 * @param  {any} model
 * @param  {Partial<ErrorBlock>} error
 * @returns void
 */
function checkModel(pattern: any, model: any, error: Partial<ErrorBlock>): void {
  for (const property in model) {
    if (!pattern.hasOwnProperty(property)) error.message = `${error.message} ${property};`;
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
