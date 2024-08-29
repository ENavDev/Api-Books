import { Types } from "mongoose";
import { IBook } from "../interface/book.interface";
import { BookModel } from "../models/book.model";

export const createbook = async (book: IBook)=>{
    try {
       const newBook = new BookModel(book);
       return await newBook.save();
    } catch (error) {
        throw new Error("Could not save in Database");
    }
}

export const getAllBooks = async()=>{
    try {
       return await BookModel.find(); 
    } catch (error) {
        throw new Error("An unexpected error occurred");
    }
}

export const getBooksById = async (id: string) => {
    try {
        return await BookModel.findById(id); 
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Book not found");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}
