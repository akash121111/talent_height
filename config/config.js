const config={
    production :{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default : {
        SECRET: 'mysecretkey',
        DATABASE: 'mongodb+srv://talent:kamal1234@cluster0.walu6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        bucketName : 'talenthigh',
        accessKeyId : 'APKAI6M6TG7O3SEMQYIQA',
        secretAccessKey : '',
    }
}


exports.get = function get(env){
    return config[env] || config.default
}