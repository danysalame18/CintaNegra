require ('dotenv').config()
dbData = {
    dbUser: process.env.DB_USER,
    dbPasword: process.env.DB_PASWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
};
const config= {
    db:{
        url: `mongodb+srv://${dbData.dbUser}:${dbData.dbPasword}@${dbData.dbHost}/${dbData.dbName}?retryWrites=true&w=majority`
    },
    port : process.env.PORT
}


module.exports = { config }