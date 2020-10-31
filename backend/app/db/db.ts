import * as mongoose from "mongoose";

const uri: string = "mongodb://bloger:123zxc@my_mongo_service:27017/blog";

export async function connectDb() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB connected");
  }
  catch (err) {
    console.log('Error on db connect -> ', err.message);
  }
}
