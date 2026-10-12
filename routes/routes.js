const express = require("express");
const router = express.Router();
const {
  create_expense,
  get_expenses,
  delete_expense,
  update_expense,
} = require("../controller/control");

router.post("/", create_expense);
router.get("/", get_expenses);
router.delete("/:id", delete_expense);
router.put("/:id", update_expense);
module.exports = router;
