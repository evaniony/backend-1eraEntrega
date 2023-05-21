import  express  from "express";
export const routerProducts = express.Router();
import { ProductManager } from "../utils/ProductManager.js";


const productManager = new ProductManager('product.json');


routerProducts.get("/", async (req, res)=>{
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    const oneElem = limit ? limit : products.length;
        return res.status(200).json(products.slice(0, oneElem));
});



routerProducts.get("/:pid", async (req, res)=>{

    const pid = req.params.pid;
    const products = await productManager.getProductById(parseInt(pid));

    if(products != undefined){
        return res.status(201).json(
        {message: "Producto con el id: ",    
	     data: products
        });   
    }else{    
        return res.status(404).json(
        {message: "No existe el producto con el id: " + pid,    
         data: {}
        });
    }

});


routerProducts.post("/", async (req, res)=>{
    const prod = req.body;
    console.log(prod);
    const addProduct = await productManager.addProduct();

    if(addProduct){
        return res.status(201).json(
            {message: "product created!",    
             data: addProduct
            })
    }else{
        return res.status(404).json(
            {message: "error, bad response",    
             data: {}
            });
    }
})