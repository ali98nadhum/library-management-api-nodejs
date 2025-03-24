const { getAllBooks } = require("../controllers/BookController");

const router = require("express").Router();

router
  .route("/")
  .get(getAllBooks);


module.exports = router;
