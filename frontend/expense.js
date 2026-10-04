const form = document.getElementById("expense-form");
const expenses_list = document.getElementById("expenses");
const submit_button = document.getElementById("sumit_button");
const total_expense_element = document.getElementById("total");
const total_count_element = document.getElementById("expense-count");
const category_filter = document.getElementById("category-filter");

let editing_id = null;

function createExpenseCard(expense) {
  const expense_card = document.createElement("div");
  expense_card.classList.add("expense-card");
  const h3 = document.createElement("h3");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const section1 = document.createElement("div");
  const section2 = document.createElement("div");
  const del_but = document.createElement("button");
  const edit_button = document.createElement("button");

  del_but.dataset.id = expense.id;
  edit_button.dataset.id = expense.id;

  section1.classList.add("section1");
  section2.classList.add("section2");

  h3.textContent = expense.title;
  p1.textContent = expense.amount;
  p2.textContent = expense.date;
  p3.textContent = expense.category;
  del_but.textContent = "Delete";
  edit_button.textContent = "Edit";
  edit_button.classList.add("edit-button");

  section1.appendChild(h3);
  section1.appendChild(p1);
  section2.appendChild(p2);
  section2.appendChild(p3);

  expense_card.appendChild(section1);
  expense_card.appendChild(section2);
  expense_card.appendChild(del_but);
  expense_card.appendChild(edit_button);
  expenses_list.appendChild(expense_card);

  del_but.addEventListener("click", async (e) => {
    const id = e.target.dataset.id;
    const response = await fetch(`/expenses/${id}`, {
      method: "DELETE",
    });

    getExpenses();
  });

  edit_button.addEventListener("click", () => {
    document.getElementById("title").value = expense.title;
    document.getElementById("amount").value = expense.amount;
    document.getElementById("date").value = expense.date;
    document.getElementById("category").value = expense.category;
    submit_button.textContent = "Save changes";

    editing_id = expense.id;
    form.scrollIntoView({
      behavior: "smooth",
    });
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const error = document.getElementById("error");

  error.innerText = "";

  if (title === "" && amount !== "") {
    error.innerText = "please add a title";
    return;
  } else if (title !== "" && amount === "") {
    error.innerText = "please add an amount";
    return;
  } else if (title === "" && amount === "") {
    error.innerText = "please add a title and an amount";
    return;
  } else if (title !== "" && amount !== "" && date === "") {
    error.innerText = "please add a date";
    return;
  }

  const expense = {
    title: title,
    amount: amount,
    category: category,
    date: date,
  };

  if (editing_id === null) {
    const response = await fetch("/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });

    const data = await response.json();

    getExpenses();

    form.reset();
  } else {
    const response = await fetch(`/expenses/${editing_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });

    const data = await response.json();
    getExpenses();
    editing_id = null;
    form.reset();
    submit_button.textContent = "Add Expense";
  }
});

let all_expenses = [];

async function getExpenses() {
  expenses_list.innerHTML = "";

  const response = await fetch("/expenses");

  const data = await response.json();

  all_expenses = data;

  const expense_total = data.reduce((total, expense) => {
    return total + Number(expense.amount);
  }, 0);
  total_expense_element.textContent = `₦${expense_total}`;

  const expense_count = data.length;
  total_count_element.textContent = expense_count;

  for (const expense of data) {
    createExpenseCard(expense);
  }
}

getExpenses();

category_filter.addEventListener("change", () => {
  const selected_category = category_filter.value;

  const filtered_expenses = all_expenses.filter((expense) => {
    if (selected_category === "All") {
      return true;
    } else {
      return selected_category === expense.category;
    }
  });

  expenses_list.innerHTML = "";

  filtered_expenses.forEach((expense) => {
    createExpenseCard(expense);
  });

  const expense_total = filtered_expenses.reduce((total, expense) => {
    return total + Number(expense.amount);
  }, 0);
  total_expense_element.textContent = `₦${expense_total}`;

  const expense_count = filtered_expenses.length;
  total_count_element.textContent = expense_count;
});
