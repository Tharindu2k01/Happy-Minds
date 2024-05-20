import express from "express";
import cors from "cors";
import logger from "./utils/logger";
import "dotenv/config";
import routes from "./api/routes";
import responseHandler from "./utils/response.handler";
import { connect } from "./utils/database.connection";

const app = express();
const PORT = process.env.PORT || "8090";

// Register Middleware Chain
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,PUT,POST,DELETE",
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inject Response Handler
app.use((req, res, next) => {
    req.handleResponse = responseHandler;
    next();
});

//Handle Root API Call
app.get("/", (req, res, next) => {
    res.send(
        "<title>Shopping Management System</title><h1>Welcome to Shopping Management System</h1>"
    );
    next();
});

//Start the Server
app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
    connect();
    routes(app);
});