const storeModel = require('../../../Database/models/Store');


const find = async (id) =>{
    try{
        const store = await storeModel.findById(id);
        return store;
    } catch(error){
    console.log("🚀 ~ file: StoreRepository.js ~ line 9 ~ find ~ error", error)
    }
};

const findOneByOptions = async (Options) => {
    try {
      const store = await storeModel.findOne(Options);
      return store;
    } catch (error) {
    console.log("🚀 ~ file: StoreRepository.js ~ line 18 ~ findOneByOptions ~ error", error)
    }
  };

const findAllByOptions = async (Options) => {
    try {
      const store = await storeModel.find(Options);
      return store;
    } catch (error) {
    console.log("🚀 ~ file: StoreRepository.js ~ line 27 ~ findAllByOptions ~ error", error)
    }
};
  
const create = async (data, userId) =>{
    try{
        const store = await storeModel.create({
            name : data.name,
            address : data.address,
            imgUrl: data.imgUrl,
            userId: userId,
        })
        return store;
    } catch(error){
    console.log("🚀 ~ file: StoreRepository.js ~ line 41 ~ create ~ error", error)
    }
}
const update = async (id, data) =>{
    try{
        const update = await storeModel.findByIdAndUpdate(id, data);
        return update;
    } catch(error){
    console.log("🚀 ~ file: StoreRepository.js ~ line 49 ~ update ~ error", error)
    }
}
const deleteData = async (id) =>{
    try{
        const deletedStore = await storeModel.findByIdAndDelete(id);
        return deletedStore;
    } catch(error){
    console.log("🚀 ~ file: StoreRepository.js ~ line 57 ~ deleteData ~ error", error)
    }
}
module.exports = {
    find,
    create,
    update,
    deleteData,
    findByOptions: findOneByOptions,
    findAllByOptions,
};