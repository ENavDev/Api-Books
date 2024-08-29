import express, { Request, Response } from "express";
import { initDataBase } from "../Src/Database/db"
import { Parameters } from "./modules/utils/constants";
import { bookRouter } from "./modules/User";
const app = express();

app.use(express.json());
app.use("/book", bookRouter);




app.get("/", (req: Request, res: Response)=>{
  res.status(400).send({hello: 'reader'});
});

app.post("/",(req: Request, res: Response)=>{
  res.send({reader: "Reading from post route"});
});


app.listen(3000, async () => {
  const url = `mongodb://${Parameters.DATABASE_HOST}:${Parameters.DATABASE_PORT}/${Parameters.DATABASE_NAME}`;
  await initDataBase(url);
  console.log("server running at port 3000");
});
