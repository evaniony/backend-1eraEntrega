import fs from "fs";
import { ProductManager } from "./ProductManager.js";

const productManager = new ProductManager("product.json")

export class CartManager{
    constructor(path){
        this.cart = [];
        this.path = path;

        if(!fs.existsSync(this.path)){
            fs.writeFileSync(this.path, "[]");
        }
    }

    //crear CARRITO
    async createCart(idCart){
        let newCart = {
            idCart: idCart,
            product: []
        };
        const readFile = await fs.promises.readFile(this.path, "utf-8");
        let parse = JSON.parse(readFile);
        parse.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(parse))


    }

    async addItem(cartId, prodId) {
        const cartRead = await fs.promises.readFile(this.path, "utf-8");
        const cartParse = JSON.parse(cartRead);
    
        // pasar a números
        cartId = parseInt(cartId);
        prodId = parseInt(prodId);
    
        // llamar a todos los productos
        const allProducts = await productManager.getProducts();
    
        const foundProd = allProducts.find(prod => prod.id == prodId);
        console.log(foundProd);
        
        if (foundProd) {
            // si encuentra el producto, buscar también en el carrito
            const findCart = cartParse.find(cart => cart.cartId == cartId);
            console.log(findCart);
    
            if (!findCart) {
                // si no encuentra el carrito...
                this.createCart(cartId);
                // findCart = cartParse.find((cart) => cart.cartId == cartId);
            }
    
            const productsFound = findCart.products.find(product => product.idProduct == prodId);
    
            if (productsFound) {
                productsFound.quantity++;
    
                let cartString = JSON.stringify(cartParse);
                await fs.promises.writeFile(this.path, cartString);
                return true;
            } else {
                const products = {
                    idProduct: prodId,
                    quantity: 1,
                };
    
                findCart.products.push(products);
                let cartString = JSON.stringify(cartParse);
                await fs.promises.writeFile(this.path, cartString);
                return true;
            }
        } else {
            return undefined;
        }
    }
}
