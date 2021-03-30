var developmentDatabase = {
    postgres: {
        host: 'localhost',
        port: 5432,
        database: 'dbkua4cqlj4kc7',
        user: 'fszytgnluebmcv',
        password: '4602a6ccc48c21bb120247c6770e3a894a448bf21d1f9db97cb44a1d02ae46de'
    }
}

var connectionString = "postgres://fszytgnluebmcv:4602a6ccc48c21bb120247c6770e3a894a448bf21d1f9db97cb44a1d02ae46de@ec2-18-214-208-89.compute-1.amazonaws.com:5432/dbkua4cqlj4kc7postgressql://user:password@host:port/databasename?ssl=true";
if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
        developmentDatabase =
            parseConnectionString(process.env.DATABASE_URL);
    } else {
        console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
        developmentDatabase = parseConnectionString(connectionString);
    }
} else {
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
}
function parseConnectionString(connectionString) {
    if (connectionString) {
        var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
        var match = myRegexp.exec(connectionString);
        if (match.length == 6) {
            developmentDatabase.postgres.user = match[1];
            developmentDatabase.postgres.password = match[2];
            developmentDatabase.postgres.host = match[3];
            developmentDatabase.postgres.port = Number(match[4]);
            developmentDatabase.postgres.database = match[5];
            developmentDatabase.postgres.ssl = true;
            return developmentDatabase;
        }
    }
    console.log("connectionString cannot be parsed");
    return null;
}
module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
        postgres: developmentDatabase.postgres
    }
}
