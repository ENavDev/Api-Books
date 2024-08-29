import { Request, Response, Router } from "express";
import {
  createbook,
  getAllBooks,
  getBooksById,
} from "./controller/book.controller";
import { Types } from "mongoose";
import { SchemaValidator } from "../../middleware/schema.middleware";
import { bookSchemaCreate } from "./schemas/book.schema";
import { BookModel } from "./models/book.model";

const bookRouter = Router();
let books: any[] = [];

bookRouter.get("/books/:id", async (req: Request, res: Response) => {
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
  "/books",
  SchemaValidator(bookSchemaCreate),
  async (req: Request, res: Response) => {
    try {
      console.log("Enter to route");
      const body = req.body;
      const newBook = await createbook(body);
      res.status(201).send({ msg: "Creado con exito", book: newBook });
    } catch (error) {
      res.status(400).send({
        msg: "Error al crear el libro",
      });
    }
  }
);

bookRouter.get("/books", async (req: Request, res: Response) => {
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

bookRouter.patch("/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).send({ msg: "Invalid book ID" });
  }

  try {
    const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).send({ msg: "Book not found" });
    }

    res
      .status(200)
      .send({ msg: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).send({ msg: "Error updating the book" });
  }
});


bookRouter.delete("/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).send({ msg: "Invalid book ID" });
  }
  try {
    const deletedBook = await BookModel.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send({ msg: "Book not found" });
    }
    res
      .status(200)
      .send({ msg: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    res.status(500).send({ msg: "Error deleting the book" });
  }
});

export { bookRouter };
