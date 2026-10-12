const db = require("../database/database");

const create_the_expense = (data) => {
  const insert_expense = db.prepare(
    `INSERT INTO expenses (title, amount, category, date) VALUES (?, ?, ?, ?)`,
  );
  const result = insert_expense.run(
    data.title,
    data.amount,
    data.category,
    data.date,
  );
  const expense = {
    id: result.lastInsertRowid,
    title: data.title,
    amount: data.amount,
    category: data.category,
    date: data.date,
  };
  return expense;
};
const delete_the_expense = (id) => {
  const delete_expense = db.prepare("DELETE FROM expenses WHERE id = ?");
  const result = delete_expense.run(id);

  if (result.changes === 0) {
    return false;
  }
  return true;
};
const get_the_expenses = () => {
  const get_expenses = db.prepare("SELECT * FROM expenses").all();
  return get_expenses;
};
const update_the_expense = (id, data) => {
  const update_expense =
    db.prepare(`UPDATE expenses SET title = ?, amount = ?, category = ?, date = ?
                                    WHERE id = ?;`);

  const result = update_expense.run(data.title, data.amount, data.category, data.date, id);
  if (result.changes === 0) {
    return false;
  }
  return true;
};

module.exports = {
  create_the_expense,
  get_the_expenses,
  update_the_expense,
  delete_the_expense,
};
