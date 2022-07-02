const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    passwordHashing: async (password) =>  {
        return await bcrypt.hash(password, 10);
    },
    login: async (body, data) => {
        const result = await bcrypt.compare(body.password, data[0].password)
            if(result) {
                data[0].password = undefined;
                const jsontoken = sign({ result: data }, process.env.KEY, {
                    expiresIn: '1h'
                });
                return {    
                    message: 'logged in',
                    token: jsontoken
                };
            } else return 'Invalid username or password'
    },
    getDate: async() => {
        var date_ob = new Date();
        var day = ("0" + date_ob.getDate()).slice(-2);
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var year = date_ob.getFullYear();
   
        var date = year + "-" + month + "-" + day;
        return date
    }
}