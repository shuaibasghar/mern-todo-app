const Item = require("../models/todo");

exports.createTodo = async (req, res) => {
    try {
        // req.body.item = item;

        let item = new Item({
            item: req.body.item,
        });
        //saving in db
        let saveItem = await item.save();
        res.status(200).json({
            success: true,
            message: "Item added Successfully",
            item,
        });
    } catch (err) {
        res.json(err);
    }
};
exports.getTodos = async (req, res) => {
    try {
        let allTodos = await Item.find({});

        res.status(200).json({
            success: true,
            allTodos,
        });
    } catch (err) {
        res.json(err);
    }
};

//update item
exports.updateTodo = async (req, res) => {
    try {
        const updateTodo = await Item.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });

        res.status(200).json({
            success: true,
            message: "Item updated successfully",
            updateTodo,
        });
    } catch (err) {
        res.json(err);
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const deleteTodo = await Item.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Item deleted successfully",
            deleteTodo,
        });
    } catch (err) {
        res.json(err);
    }
};
