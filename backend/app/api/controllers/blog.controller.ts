import { NextFunction, Request, RequestHandler, Response } from 'express';

import { BlogModel } from "../../db/model/initBlogModel";
import { Blog } from "../../../model/blog-model";
import { apiOnSuccess } from '../apiOnSuccess';
import { blogModelValidation, mongoIdValidation } from '../../service/validation-service';
import { ErrorBlock } from '../../../model/error-block-model';

/**
 * Create blog in db and send result of the operation
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns Promise
 */
export async function apiCreateBlog(req: Request, res: Response, next: NextFunction): Promise<Response<RequestHandler> | undefined> {

  try {
    const reqBody: Blog = req.body;
    blogModelValidation(reqBody);

    const newBlog = new BlogModel({
      title: reqBody.title,
      snippet: reqBody.snippet,
      body: reqBody.body
    });

    const result = await newBlog.save();
    const resultObj = result.toJSON() as Blog;

    const successMessage = `New blog '${resultObj.title}' created successfully in DB`;
    return apiOnSuccess(res, result, successMessage, __filename);
  }
  catch (err) {
    err.title = 'Error on create blog';
    err.path = __filename;
    next(err);
  }

}

/**
 * Getting all blogs from db and send as response
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns Promise
 */
export async function apiGetAllBlog(req: Request, res: Response, next: NextFunction): Promise<Response<RequestHandler> | undefined | any> {

  try {
    const resultObj = await BlogModel.find().lean() as Blog[];
    const successMessage = `All blogs get successfully from DB`;
    return apiOnSuccess(res, resultObj, successMessage, __filename);
  }
  catch (err) {
    err.title = 'Error on getting all blogs';
    err.path = __filename;
    next(err);
  }

}

/**
 * Getting one blog with the given id send as response
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns Promise
 */
export async function apiGetBlogById(req: Request, res: Response, next: NextFunction): Promise<Response<RequestHandler> | undefined> {

  try {
    const blogId = req.params.id.toString();
    mongoIdValidation(blogId);

    const resultObj = await BlogModel.findById(blogId).lean() as Blog;
    if (resultObj) {
      const successMessage = `Blog with Id '${resultObj._id}' get successfully from DB`;
      return apiOnSuccess(res, resultObj, successMessage, __filename);
    }else{
      const error: Partial<ErrorBlock> = {
        status: 404,
        message: `Couldn't find blog with Id '${blogId}' in DB`
      }
      throw error;
    }
  }
  catch (err) {
    err.title = 'Error on getting blog';
    err.path = __filename;
    next(err);
  }

}

/**
 * Delete blog with the given id and send result of the operation
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns Promise
 */
export async function apiRemoveBlog(req: Request, res: Response, next: NextFunction): Promise<Response<RequestHandler> | undefined> {

  try {
    const blogId = req.params.id.toString();
    mongoIdValidation(blogId);

    const resultObj = await BlogModel.findByIdAndDelete(blogId);
    if (resultObj) {
      const successMessage = `Blog with Id '${resultObj._id}' removed successfully`;
      const successObj = {
        result: 'OK',
        message: successMessage
      };
      return apiOnSuccess(res, successObj, successMessage, __filename);
    }else{
      const error: Partial<ErrorBlock> = {
        status: 404,
        message: `Couldn't find blog with Id '${blogId}' in DB`
      }
      throw error;
    }
  }
  catch (err) {
    err.title = 'Error on remove blog';
    err.path = __filename;
    next(err);
  }

}

/**
 * Update blog with the given id and send result of the operation
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns Promise
 */
export async function apiUpdateBlog(req: Request, res: Response, next: NextFunction): Promise<Response<RequestHandler> | undefined> {

  try {
    const blogId = req.params.id.toString();
    mongoIdValidation(blogId);
    
    const reqBody: Blog = req.body;
    blogModelValidation(reqBody);

    const resultObj = await BlogModel.findByIdAndUpdate(blogId, reqBody, {new: true});
    if (resultObj) {
      const successMessage = `Blog with Id '${resultObj._id}' updated successfully`;
      return apiOnSuccess(res, resultObj, successMessage, __filename);
    }else{
      const error: Partial<ErrorBlock> = {
        status: 404,
        message: `Couldn't find blog with Id '${blogId}' in DB`
      }
      throw error;
    }
  }
  catch (err) {
    err.title = 'Error on update blog';
    err.path = __filename;
    next(err);
  }

}