import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8000;

//* Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) =>{
    res.send('Hello World');
})

//* Import routes
import ApiRoutes from "./routes/api.js";
app.use('/api', ApiRoutes);
app.listen(port, () => console.log(`server listening on ${port}`));