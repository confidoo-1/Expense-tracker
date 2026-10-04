const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("frontend"));
const expenses = [];
let next_id = 1;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend/expense.html");
});

app.post("/expenses", (req, res) => {
  const data = req.body;
  const expense = {
    id: next_id,
    title: data.title,
    amount: data.amount,
    category: data.category,
    date: data.date,
  };

  next_id++;

  expenses.push(expense);
  res.status(201).json(expense);
});

app.get("/expenses", (req, res) => {
  res.json(expenses);
});

app.delete("/expenses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = expenses.findIndex((expense) => expense.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Expense not found" });
  } else {
    expenses.splice(index, 1);
    res.status(200).json({ message: "Expense deleted successfully" });
  }
});
app.put("/expenses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = expenses.findIndex((expense) => expense.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Expense not found" });
  } else {
    const data = req.body;

    expenses[index] = {
      id: expenses[index].id,
      title: data.title,
      amount: data.amount,
      category: data.category,
      date: data.date,
    };
    res.status(200).json(expenses[index]);
  }
});

app.listen(2000, () => console.log("server dey work well"));
