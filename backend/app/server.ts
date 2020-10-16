import * as express from 'express';
import { Application, Response, Request } from 'express';
import * as mongoose from "mongoose";

const app: Application = express();

const uri: string = "mongodb://my_mongo_service:27017/local";

mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Successfully Connected!");
  }
});

app.route('/').get((req: Request, res: Response) => {
  res.status(200).send('<h1>Hello World!</h1>');
});

app.listen(8090, () => {
    console.log('Server is running...')
});