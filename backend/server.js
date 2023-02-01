const app = require("./app");
const dotenv = require("dotenv");
const connnectDatabase = require("./config/database");

//config path
dotenv.config({ path: "config/config.env" });

//Connecting to database
connnectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
