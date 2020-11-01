import * as mongoose from "mongoose";

function blogModel() {
  const { Schema } = mongoose;

  const blogSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    snippet: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  }, { timestamps: true });

  const Blog = mongoose.model('Blog', blogSchema);

  return Blog;
}

export const BlogModel = blogModel();