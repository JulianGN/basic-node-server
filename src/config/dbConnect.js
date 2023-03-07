import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://julian:teste123@cluster0.jubt7vi.mongodb.net/alura-node"
);

const db = mongoose.connection;

export default db;
