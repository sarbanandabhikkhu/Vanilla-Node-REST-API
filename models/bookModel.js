let books = require("../data/books");
const { v4: uuidv4 } = require("uuid");

const { writeDataToFile } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(books);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = books.find((p) => p.id === id);
    resolve(product);
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };
    books.push(newProduct);
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./data/books.json", books);
    }
    resolve(newProduct);
  });
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = books.findIndex((p) => p.id === id);
    books[index] = { id, ...product };
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./data/books.json", books);
    }
    resolve(books[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    books = books.filter((p) => p.id !== id);
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./data/books.json", books);
    }
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
