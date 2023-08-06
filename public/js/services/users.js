import http from '/js/clients/http.client.js';

class UserService {
    
    URL_USERS = '/api/users/'

    async getUser(id) {
        const user = await http.get(this.URL_USERS, id);
        return user;
    }

    async getUsers() {
        const users = await http.get(this.URL_USERS);
        return users;
    }

    async saveUser(user, mode) {
        const savedUser = await http.post(this.URL_USERS, user, mode);
        return savedUser;
    }

    async updateUser(id, user, mode) {
        const updatedUser = await http.put(this.URL_USERS, id, user, mode);
        return updatedUser;
    }

    async deleteUser(id) {
        const deletedUser = await http.delete(this.URL_USERS, id);
        return deletedUser;
    }
}

const userService = new UserService();

export default userService;
