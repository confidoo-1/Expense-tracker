const express = require("express");
const router = require("./routes/routes");
const app = express();
app.use(express.json());
app.use(express.static("frontend"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend/expense.html");
});

app.use("/expenses", router);

app.listen(2000, () => console.log("server dey work well"));
