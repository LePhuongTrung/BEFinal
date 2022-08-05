const mongoose = require('mongoose');
require("dotenv").config();
const connectDatabase = async () =>{
    //connect to mongoose
    try{
        const connectingString = `mongodb+srv://Admin:Wq35WcWFIuP28p5i@finalproject.ri4lg.mongodb.net/FinalProject?retryWrites=true&w=majority`;
        const value =  mongoose.connect(connectingString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        if(value)
        console.log(`Connected to database successfully, listening on http://localhost:${process.env.DEV_PORT}`);

    } catch(error){
    console.log("🚀 ~ file: connect.js ~ line 14 ~ connectDatabase ~ error", error)
    }
};
const disconnectDatabase = async () =>{
    //disconnect from mongoose
    try{
        const value = await mongoose.connection.close();
        if(value) console.log('Disconnected from database successfully');
    } catch(error){
        console.log(error)
    }
};

module.exports = {
    connectDatabase,
    disconnectDatabase,
}