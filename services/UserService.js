
const UserService = {
    createUser: async (input) => {
        const regEx = /^[a-zA-Z ][a-zA-Z\s]*$/; 
        if(input.match(regEx)) {
            return {status: true, name:input};
        } else {
            return {status: false};
        }

    }

}

module.exports = UserService;