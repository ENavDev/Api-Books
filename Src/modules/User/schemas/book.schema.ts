import Joi from "joi";

const title = Joi.string();
const author = Joi.string();
const publicationDate = Joi.date();
const isbn = Joi.string();
const genre = Joi.string();

export const bookSchemaCreate = Joi.object({
title: title.required(),
author: author.required(),
publicationDate: publicationDate.required(),
isbn: isbn.required(),
genre: genre.required()
});


export const bookSchemaUpdate = Joi.object({
title: title,
author: author,
genre: genre
});
