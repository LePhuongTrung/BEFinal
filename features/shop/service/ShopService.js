const shopRepository = require('../repository/ShopRepository');

const getShop = async (id) => {
    try {
        const shop = await shopRepository.findShop(id);
        return shop;
    } catch (error) {
    console.log("🚀 ~ file: BookService.js ~ line 8 ~ getShop ~ error", error)
    }
};

const findByUser = async (data) => {
    try {
      const shop = await shopRepository.findByUserId(data);
      return shop;
    } catch (error) {
    console.log("🚀 ~ file: ShopService.js ~ line 17 ~ findByUser ~ error", error)
    }
  };

const createShop = async (data, userId) => {
    try {
        const shop = await shopRepository.createShop(data,userId);
        return shop;
    }
    catch(error) {
    console.log("🚀 ~ file: BookService.js ~ line 17 ~ createShop ~ error", error)
    }
};
const updateShop = async (id, data) => {
    try {
        const shop = await shopRepository.updateShop(id, data);
        return shop;
    } catch (error) {
        console.log(error);
    }
};
const deleteShop = async (id) => {
    try {
        const shop = await shopRepository.deleteShop(id);
        return shop;
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    getShop,
    createShop,
    updateShop,
    deleteShop,
    findByUser,
};