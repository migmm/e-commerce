import userService from '/js/services/users.js';

class UserController {

    async getUser(id) {
        const user = await userService.getUser(id);
        return user;
    }

    async getUsers() {
        const users = await userService.getUsers();
        return users;
    }

    async saveUser(user, mode) {
        const savedUser = await userService.saveUser(user, mode);
        return savedUser;
    }

    async updateUser(id, user, mode) {
        const updatedUser = await userService.updateUser(id, user, mode);
        return updatedUser;
    }

    async deleteUser(id) {
        const deletedUser = await userService.deleteUser(id);
        return deletedUser;
    }
}

const userController = new UserController();
export default userController;
