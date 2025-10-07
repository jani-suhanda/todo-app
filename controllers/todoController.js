const Todo = require('../models/todo');

// GET /todos
exports.getAll = async (req, res, next) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

// GET /todos/:id
exports.getOne = async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Not found' });
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

// POST /todos
exports.create = async (req, res, next) => {
  try {
    const { title } = req.body;
    const newTodo = await Todo.create({ title });
    res.status(201).json(newTodo);
  } catch (err) {
    next(err);
  }
};

// PUT /todos/:id
exports.update = async (req, res, next) => {
  try {
    const { title, completed } = req.body;
    const [updated] = await Todo.update(
      { title, completed },
      { where: { id: req.params.id } }
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    const updatedTodo = await Todo.findByPk(req.params.id);
    res.json(updatedTodo);
  } catch (err) {
    next(err);
  }
};

// DELETE /todos/:id
exports.remove = async (req, res, next) => {
  try {
    const deleted = await Todo.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
