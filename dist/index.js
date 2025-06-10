import 'dotenv/config';
import express from "express";
import DBConnection from "./db/connect-db.js";
const app = express();
DBConnection();
app.get('/name', (_req, res) => {
    res.status(200).json({
        name: 'Mussaddiq'
    });
});
app.use((err, _, res, _next) => {
    var _a, _b;
    res.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).json({
        message: (_b = err.message) !== null && _b !== void 0 ? _b : 'Something went wrong'
    });
});
app.listen(3000, () => {
    console.log("server is runing on port 3000");
});
