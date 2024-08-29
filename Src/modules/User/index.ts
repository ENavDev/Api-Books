import { Request, Response, Router } from "express";
import {
  createbook,
  getAllBooks,
  getBooksById,
} from "./controller/book.controller";
import { Types } from "mongoose";
import { SchemaValidator } from "../../middleware/schema.middleware";
import { bookSchemaCreate } from "./schemas/book.schema";

const bookRouter = Router();
let books: any[] = [];

bookRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const book = await getBooksById(id);
  if (!book) {
    res.status(404).send({
      msg: "Book not found",
    });
  } else {
    res.status(200).send(book);
  }
});

bookRouter.post(
  "/",
  SchemaValidator(bookSchemaCreate),
  async (req: Request, res: Response) => {
    try {
      console.log("Enter to route");
      const body = req.body;
      const newBook = await createbook;
      res.status(201).send({ msg: "Creado con exito", book: newBook });
    } catch (error) {
      res.status(400).send({
        msg: "Error al crear el libro",
      });
    }
  }
);

bookRouter.get("/", async (req: Request, res: Response) => {
  try {
    const books = await getAllBooks();
    res.status(200).send({
      books: books,
    });
  } catch (error) {
    res.sendStatus(500).send({
      msg: " could not get the books",
    });
  }
});

bookRouter.patch("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const book = books.find((book) => book.id === id);
  if (!book) {
    res.status(404).send({
      msg: "Book not found",
    });
  } else {
    const body = req.body;
    books = books.map((item) => {
      if (item.id === book.id) {
        return { ...book, ...body };
      }
      return item;
    });
    res.status(200).send({msg: " actualizado con exito"});
  }
});

export { bookRouter };
