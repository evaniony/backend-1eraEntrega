import express from "express";
import { routerProducts } from "./routes/products.routes.js";
import { routerCart } from "./routes/cart.routes.js"
const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

app.use("/products", routerProducts);
app.use("/carts", routerCart);



app.use("*", (req, res)=>{
    res.status(400).send(
        {status: "error",
        msg: "Error, la ruta no existe;",
        data: {}})
})





app.listen(8080, () =>{
    console.log("port is on 8080!");
})