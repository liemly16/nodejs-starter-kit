module.exports = {
    "name": "ABC",
    "username": "ublmgxojvxmpjg",
    "password": "6a1a00f504bf823e586dbf19e17d758697af1d2393de3c387c925322f316dbd7",
    "database": "df925jgmf3d84r",
    "host": "ec2-184-73-169-151.compute-1.amazonaws.com",
    "dialect": "postgresql",
    // "username": "postgres",
    // "password": "123456",
    // "database": "lotte",
    // "host": "localhost",
    // "dialect": "postgresql",
    "ssl": true,
    "dialectOptions": {
        "ssl": {
            "require": true
        }
    }
    // "dialectOptions": {
    //   "socketPath": `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
    // },
    // "ssl":true,
    // "dialectOptions":{
    //    "ssl":{
    //       "require":true
    //    }
    // }
}