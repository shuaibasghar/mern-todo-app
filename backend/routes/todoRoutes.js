const express = require("express");
const {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
} = require("../Controllers/todoController");
const router = express.Router();
router.route("/api/item").post(createTodo);
router.route("/api/items").get(getTodos);
router.route("/api/item/:id").put(updateTodo);
router.route("/api/item/:id").delete(deleteTodo);

module.exports = router;
