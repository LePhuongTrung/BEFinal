const { ADMIN_ROLE, SELLER_ROLE } = require("../constansts/role");
const jwt = require("jsonwebtoken");
const AuthService = require("../features/user/services/AuthServices")
const bookService = require("../features/book/service/BookService")
const shopModel = require("../Database/models/Shop");

const canDeleteBook = async (req, res, next) => {
  const token = req.cookies.access_token || req.headers.access_token;    
    const { email} = await jwt.verify(
      token,
      process.env.SECRET_KEY
    );
  req.email = email;
  const Id = (await AuthService.findOne(email)).id;
  const shop = await shopModel.findOne({userId : Id});
  if (!shop) return res.status(400).send('you have no shop');
  const book = await bookService.getOneBook(req.params.id);
  if(!book) return res.status(400).send('There are no books with this id');
  
  if (req.role === ADMIN_ROLE || shop.id === book.shopId) {
    return next();
  }

  return res.sendStatus(403);
};

const canCreateBook = (req, res, next) => {
  if (req.role === SELLER_ROLE) {
    return  next();
  }

  return res.sendStatus(403);
};

module.exports = {
  canDeleteBook,
  canCreateBook,
};
