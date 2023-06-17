import express from "express";
export const routerCart = express.Router();
import { ProductManager } from "../ProductManager.js";
import { CartManager } from "../CartManager.js";

const cartManager = new CartManager('cart.json');

routerCart.post("/", async (req, res)=>{
    const {idCart} = req.body;
    const createProd = await cartManager.createCart(idCart);

    if (createProd) {
        return res.status(201).json(
            {message: "product add successfully!",    
             data: req.body
            });
    }else{
        return res.status(404).json(
            {error: "error, bad response",    
             data: {}
            });
    };

});

routerCart.get("/:cid", async (req, res)=>{
    const cid = req.params.cid;
    const prodCart = await cartManager.getCart(cid);

    if(prodCart != undefined){
        return res.status(201).json(
            {message: "Producto del carrito: ",    
             data: prodCart
            }); 
    }else{    
        return res.status(404).json(
        {message: "No existe el producto con el id: " + cid,    
         data: {}
        });
    }
});

routerCart.post("/:cid/products/:pid", async (req, res) =>{
    let cid = req.params.cid;
    let pid = req.params.pid;

    cid = req.body;
    pid = req.body;

    //console.log(cid, pid);

    const addprod = await cartManager.addItem(cid, pid);

    if(addprod != undefined){
        return res.status(201).json(
            {message: "add successully!",    
             data: addprod
            }); 
    }else{    
        return res.status(404).json(
        {message: `bad request ${cid}, ${pid}`,    
         data: {}
        });
    }
})