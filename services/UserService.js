
const UserService = {
    createUser: async (input) => {
        const regEx = /^[a-z][a-z\s]*$/; 
        if(input.match(regEx)) {
            return {status: true, name:input};
        } else {
            return {status: false};
        }

    }

}

module.exports = UserService;