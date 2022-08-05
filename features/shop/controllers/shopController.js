const shopService = require('../service/ShopService');
const AuthService = require("../../user/services/AuthServices")
const jwt = require("jsonwebtoken");


const get = async (req, res) => {
    try{
        const shop = await shopService.getShop(req.params.id);
        if (!shop) return res.Status(400).send('There are no shop with this id');
        return res.send(shop);
    }catch (error){      
    console.log("🚀 ~ file: shopController.js ~ line 12 ~ get ~ error", error)
    }
}

const create = async (req, res) => {
    try{
        const token = req.cookies.access_token || req.headers.access_token;    
        const { email} = await jwt.verify(
          token,
          process.env.SECRET_KEY
        );
        req.email = email;
        const userId = (await AuthService.findOne(email)).id;
        if(!req.body) return res.sendStatus(400);
        
        const checkShop = await shopService.getShop(req.params.id);
        if(checkShop) return res.status(400).send("created a shop");

        const shop = await shopService.createShop(req.body,userId);
        if(!shop) return res.sendStatus(500);
        return res.send(shop);
    }catch(error){
    console.log("🚀 ~ file: shopController.js ~ line 32 ~ create ~ error", error)
    return res.sendStatus(500); 
    }
}

const deleteData = async (req, res) => {
    try {
        const shop = await shopService.deleteShop(req.params.id);
        console.log("🚀 ~ file: shopController.js ~ line 40 ~ deleteData ~ shop", shop)
        return res.send(shop);
    }
    catch(error){
        console.log("🚀 ~ file: shopController.js ~ line 44 ~ deleteData ~ error", error)
        return res.sendStatus(500);
    }
}

const update = async (req, res) => {
    try{
        if(!req.params.id) return "This id could not be found";

        if(!req.body) return res.sendStatus(400);

        const shop = await shopService.updateShop(req.params.id, req.body);

        if(!shop) return res.sendStatus(500);
        return res.status(200).send(shop);
    }catch(error){
    console.log("🚀 ~ file: shopController.js ~ line 60 ~ update ~ error", error)
    }
}

module.exports = {
    create,
    get,
    update,
    deleteData,
}