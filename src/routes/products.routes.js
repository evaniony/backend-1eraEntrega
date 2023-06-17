import  express  from "express";
export const routerProducts = express.Router();
import { ProductManager } from "../ProductManager.js";
import fs from "fs";


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
    const {title, description, price, thumbnail, code, stock, category} = req.body;
    const addProduct = await productManager.addProduct(title, description, price, thumbnail, code, stock, category);

    if (addProduct) {
        return res.status(201).json(
            {message: "product created!",    
             data: req.body
            });
    }else{
        return res.status(404).json(
            {error: "error, bad response",    
             data: {}
            });
    };
});

//comentar de que actualiza, pero no pisa la propiedad
//suma una propiedad "prop", con el nuevo value; 
routerProducts.put("/:pid", async (req, res) =>{
    let id = parseInt(req.params.pid);
    let {prop, value} = req.body;
    console.log(prop, value);

    const update = await productManager.updateProduct(id, prop, value);

    if (update) {
        return res.status(201).json(
            {message: `${id}, modified product!`,    
             data: req.body
            });
    }else{
        return res.status(404).json(
            {error: "An error has occurred.",
            //lo agregue para visualizar los valores ingresados momentaneamente;   
             data: `${id}??? ${req.body.prop}, ${req.body.value}`
            });
    };
});


//elimina correctamente, pero ocurre errores??
//ocurrio un error?
routerProducts.delete("/:pid", async (req, res)=>{
    let id = parseInt(req.params.pid);
    const deleteProd = await productManager.deleteProduct(id);

    if (deleteProd){
        return res.status(201).json(
            {message: "product delete!",    
             data: {}
            });
    }else{
        return res.status(404).json(
            {error: "An error has occurred.",    
             data: {}
            });
    }
})