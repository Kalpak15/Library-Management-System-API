const mongoose = require('mongoose')

require('dotenv').config()

const dbConnect = async () =>{
   mongoose
   .connect(process.env.DATABASE_URL,{
   })
   .then(()=>console.log("Database is connect Successfuly"))
   .catch((error)=>{
    console.log("Error Occured During Database Connection")
    console.log(error)
    process.exit(1)
   })
}

module.exports = dbConnect  