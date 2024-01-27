import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8000;


app.get('/', (req, res) =>{
    res.send('Hello World');
})


app.listen(port, () => console.log(`server listening on ${port}`));