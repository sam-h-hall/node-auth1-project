const db = require("../data/db-config");

const findAll = () => {
  return db("users")
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id")
    return findById(id);
  } catch (err) {
    throw err;
  }
}

const findBy = (filter) => {
  return db("users").where(filter).orderBy("id");
}

const findById = (id) => {
  return db("users").where({
    id
  }).first();
}

module.exports = {
  findAll,
  findById,
  findBy,
  add,
}