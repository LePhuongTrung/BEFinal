const { ADMIN_ROLE, SELLER_ROLE } = require("../constansts/role");
const jwt = require("jsonwebtoken");
const AuthService = require("../features/user/services/AuthServices")
const shopService = require("../features/shop/service/ShopService")

const canDelete = async (req, res, next) => {
  const token = req.cookies.access_token || req.headers.access_token;    
    const { email} =  jwt.verify(
      token,
      process.env.SECRET_KEY
    );
  req.email = email;
  const Id = (await AuthService.findOne(email)).id;
  const shop = await shopService.get(req.params.id);
  if(!shop) return res.status(400).send('you have no shop');
  
  if (req.role === ADMIN_ROLE || Id === shop.userId) {
    return next();
  }

  return res.sendStatus(403);
};

const canCreate = async (req, res, next) => {
  const token = req.cookies.access_token || req.headers.access_token;    
    const { email} =  jwt.verify(
      token,
      process.env.SECRET_KEY
    );
  req.email = email;
  const Id = (await AuthService.findOne(email)).id;
  const shop = await shopService.findByUser(Id);
  if(shop) return res.status(400).send('you had shop');
  if (req.role === SELLER_ROLE) {
    return  next();
  }

  return res.sendStatus(403);
};

module.exports = {
  canDelete,
  canCreate,
};
