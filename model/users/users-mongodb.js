import mongoose from "mongoose";
import DBMongoDB from "../DBMongoDB.js";
import unlink from "fs-extra";
import path from "path";


const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone: String,
    photo: String,
    role: {
        type: String,
        default: 'user',
    },
    status: {
        type: String,
        default: 'active',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
},
{
    versionKey: false
}
);

const UsersModel = mongoose.model('users', userSchema);


class UserModelMongoDB {

    // CRUD - C: CREATE
    async createUser(user) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const newUser = new UsersModel(user);
            await newUser.save();
            return DBMongoDB.getObjectWithId(newUser.toObject());
        } catch (error) {
            console.error(`Error al intentar dar de alta el usero: ${error.message}`);
            return {};
        }
    }

    // CRUD - R: READ
    async readUsers() {
        if (! await DBMongoDB.connectDB()) {
            return [];
        }
        try {
            const users = await UsersModel.find({}).lean();
            return DBMongoDB.getObjectWithId(users);
        } catch (error) {
            console.error(`Error al intentar obtener los useros: ${error.message}`);
            return [];
        }
    }

    async readUser(id) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const user = await UsersModel.findById(id).lean() || {};
            return DBMongoDB.getObjectWithId(user);
        } catch (error) {
            console.error(`Error al intentar obtener el usero: ${error.message}`);
            return {};
        }
    }

    // CRUD - U: UPDATE
    async updateUser(id, user) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            /* 
            const userToUpdate = await UsersModel.findById(id).lean() || {};

            await unlink.pathExists(path.resolve('./public/' + userToUpdate.images.portada)) ? unlink.remove(path.resolve('./public/' + userToUpdate.images.portada)) : console.log ("portada false"); ;
            await unlink.pathExists(path.resolve('./public/' + userToUpdate.images.galeria0)) ? unlink.remove(path.resolve('./public/' + userToUpdate.images.galeria0)) : console.log ("galeria0 false");
            await unlink.pathExists(path.resolve('./public/' + userToUpdate.images.galeria0)) ? unlink.remove(path.resolve('./public/' + userToUpdate.images.galeria0)) : console.log ("galeria0 false");
            await unlink.pathExists(path.resolve('./public/' + userToUpdate.images.galeria1)) ? unlink.remove(path.resolve('./public/' + userToUpdate.images.galeria1)) : console.log ("galeria1 false");
            await unlink.pathExists(path.resolve('./public/' + userToUpdate.images.galeria2)) ? unlink.remove(path.resolve('./public/' + userToUpdate.images.galeria2)) : console.log ("galeria2 false");
            */
            const updatedUser = await UsersModel.findByIdAndUpdate(id, { $set: user }, {
                returnDocument: 'after'
            }).lean();
            return DBMongoDB.getObjectWithId(updatedUser);
        } catch (error) {
            console.error(`Error al intentar actualizar el usero: ${error.message}`);
            return {};
        }
    }

    // CRUD - D: DELETE
    async deleteUser(id) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const userToDelete = await UsersModel.findById(id).lean() || {};
            unlink.remove(path.resolve('./public/' + userToDelete.images.portada));

            await unlink.pathExists(path.resolve('./public/' + userToDelete.images.galeria0)) ? unlink.remove(path.resolve('./public/' + userToDelete.images.galeria0)) :  console.log ("galeria0 false");
            await unlink.pathExists(path.resolve('./public/' + userToDelete.images.galeria1)) ? unlink.remove(path.resolve('./public/' + userToDelete.images.galeria1)) :  console.log ("galeria1 false");
            await unlink.pathExists(path.resolve('./public/' + userToDelete.images.galeria2)) ? unlink.remove(path.resolve('./public/' + userToDelete.images.galeria2)) :  console.log ("galeria2 false");

            const deletedUser = await UsersModel.findByIdAndDelete(id).lean();
            return DBMongoDB.getObjectWithId(deletedUser);
        } catch (error) {
            console.error(`Error al intentar eliminar el usero: ${error.message}`);
            return {};
        }
    }

}

export default UserModelMongoDB;
