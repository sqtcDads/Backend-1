import mongoose from "mongoose";


const mongoAtlas = ""
const mongoLocal = "mongodb://localhost:27017/db"

const connectMongoDB = async () => {

    try {
        await mongoose.connect(mongoLocal)
        console.log("conectado a mongoDB")
    } catch (error) {
        console.log("Error al conectar con MongoDB")
    }
}

export default connectMongoDB