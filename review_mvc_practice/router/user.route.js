
const controller = require('../controller/user.crtl.js');

const userRoute = (router) => {

    return (
        router.get('/users',controller.getUsers),
        router.post('/user/create',controller.createUser)
    )
}


module.exports = userRoute