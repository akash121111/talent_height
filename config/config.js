const config={
    production :{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default : {
        SECRET: 'mysecretkey',
        DATABASE: 'mongodb+srv://talent:kamal1234@cluster0.walu6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    }
}


exports.get = function get(env){
    return config[env] || config.default
}