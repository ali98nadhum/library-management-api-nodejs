const { getAllBooks, createNewBook } = require("../controllers/BookController");
const AuthService = require("../utils/token/AuthService");
const uploadPhoto = require("../middlewares/configUploadImage");
const router = require("express").Router();

router
  .route("/")
  .get(getAllBooks);


router
  .route("/add-book")
  .post(AuthService.protect,AuthService.allowedTo("admin"),uploadPhoto.single("image"),createNewBook)


module.exports = router;
