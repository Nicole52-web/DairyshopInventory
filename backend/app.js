const express = require ("express");
const mongoose= require ("mongoose");
const app = express();
const morgan = require ("morgan");
const bodyParser = require ("body-parser");
require("dotenv").config();
var cors = require ("cors");


const cookieParser = require("cookie-parser");

app.use(cookieParser(process.env.JWT_SECRET));

// Middlewares
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET,POST,DELETE,PUT,PATCH"],
        credentials: true,
    })
);

//database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(()=>console.log("Database connected")).catch((err)=> console.log(err));
          

//router
const UserRouter = require('./Routes/userRouter');
const AuthRouter = require("./Routes/AuthRouter");
const FreshRouter = require("./Routes/FreshRouter");
const MursikRouter = require("./Routes/MursikRouter");
const ExpensesRouter = require("./Routes/ExpensesRouter");
const DailyreportRouter = require("./Routes/DailyreportRouter");
//connecting route

app.use('/api', UserRouter)
app.use('/api/user', AuthRouter)
app.use('/api/fresh',FreshRouter)
app.use('/api/mursik',MursikRouter)
app.use('/api/expenses',ExpensesRouter)
app.use('/api/dailyreport',DailyreportRouter)

//port
const port = process.env.PORT || 8000

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
});