const {
  create_the_expense,
  get_the_expenses,
  update_the_expense,
  delete_the_expense,
} = require("../services/serv");

const create_expense = (req, res) => {
  const data = req.body;
  const expense = create_the_expense(data);
  res.status(201).json(expense);
};
const get_expenses = (req, res) => {
  res.json(get_the_expenses());
};
const delete_expense = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = delete_the_expense(id);
  if (deleted === false) {
    res.status(404).json({ error: "Error deletng expense" });
  } else {
    res.status(200).json({ message: "Expense deleted successfully" });
  }
};

const update_expense = (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  const updated = update_the_expense(id, data);
  if (updated === false) {
    res.status(404).json({ error: "Error updating expense" });
  } else {
    res.status(200).json({ message: "Expense updated successfully" });
  }
};

module.exports = {
  create_expense,
  get_expenses,
  delete_expense,
  update_expense,
};
