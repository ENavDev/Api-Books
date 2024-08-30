import express, { Request, Response } from "express";
import { initDataBase } from "../src/database/db"
import { Parameters } from "./modules/utils/constants";
import { bookRouter } from "./modules/User";
const app = express();

app.use(express.json());
app.use("/testBook", bookRouter);




app.get("/", (req: Request, res: Response)=>{
  res.status(400).send({hello: 'reader'});
});

app.post("/",(req: Request, res: Response)=>{
  res.send({reader: "Reading from post route"});
});


app.listen(3000, async () => {
  const url = `${Parameters.DATABASE_HOST}`;
  await initDataBase(url);
  console.log("server running at port 3000");
});
