import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"; 
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
dotenv.config({});

const app = express();

// Middleware to set Content Security Policy header
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src-elem 'self' https://fonts.googleapis.com;");
    next();
});


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'https://jobportal-fronted-dz9i.onrender.com',
    credentials:true
};
app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000;

// api's
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.listen(PORT,()=>{
    connectDB();
    console.log(`server is runing at port ${PORT}`);
})     
