import mongoose from "mongoose";

const initDataBase = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("Database conected succes");
  } catch (error) {
    console.error(error);
    console.error("could not conect to database");
  }
};

export {initDataBase};
