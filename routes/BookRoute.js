const { getAllBooks, createNewBook, getBook, deleteBook } = require("../controllers/BookController");
const { createBookValidator , getBookValidator, deleteBookValidator } = require("../utils/vaildators/bookValidator");
const AuthService = require("../utils/token/AuthService");
const uploadPhoto = require("../middlewares/configUploadImage");
const router = require("express").Router();

router
.route("/")
.get(getAllBooks);


router
.route("/:id")
.get(getBookValidator,getBook);

router
  .route("/add-book")
  .post(
    AuthService.protect,
    AuthService.allowedTo("admin"),
    uploadPhoto.single("image"),
    createBookValidator,
    createNewBook
  );


  router
  .route("delete-book/:id")
  .delete(
    AuthService.protect,
    AuthService.allowedTo("admin"),
    deleteBookValidator ,
    deleteBook
  );

module.exports = router;
