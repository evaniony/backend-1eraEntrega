//const fs = require("fs");
import fs from "fs";

export class ProductManager{
    constructor(path){
        this.path = path;

        if(!fs.existsSync(this.path)){
            fs.writeFileSync(this.path, "[]");
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock, status, category){
        let newProduct = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            status: true,
            category: category
        }

            const readFile = await fs.promises.readFile(this.path, "utf-8");
            const parse = JSON.parse(readFile);
            let id = parse.length;
            newProduct = {id: id, ...newProduct};

            if((!newProduct.title) || (!newProduct.description) || (!newProduct.price) || (!newProduct.thumbnail) || (!newProduct.code) || (!newProduct.stock) || (!newProduct.category)){
                console.log("Falta ingresar un valor!");
                return {};
            }

            parse.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(parse));
                return newProduct;
    }

    async getProducts(){
        const read = await fs.promises.readFile(this.path, "utf-8");
        const readParse = JSON.parse(read);
            return readParse;
    }

    async getProductById(id){
            const read = await fs.promises.readFile(this.path, "utf-8");

            if(read){
                const readParse = JSON.parse(read);
                const product = readParse.find(e => e.id === id);
                return product;
            }else{
                return "Not found";
            }
    }

    async updateProduct(id, prop, value){
        if((prop !== id) && (value !== undefined || null || "")){
            let read = await fs.promises.readFile(this.path, "utf-8");
            read = JSON.parse(read);

            const updateIndex = read.findIndex(prod => prod.id == id);
            const toUpdate = read[updateIndex];
                  read[updateIndex] = {... toUpdate, [prop]: value}

  	        await fs.promises.writeFile(this.path, JSON.stringify(read));

        }else{
            const error = console.log("Ocurrio un error: Falta completar un campo");
            return error, null;
            //mantendra el valor asignado antes;
        };
    }

    async deleteProduct(id){
        //corregir esto:
        let read = await fs.promises.readFile(this.path, "utf-8");
        let readParse = JSON.parse(read);
            readParse = readParse.filter(e => e.id !== id);
        //let deleteId = readParse.splice(id, 1);
        /* let rewrite = await fs.promises.writeFile(this.path, JSON.stringify(readParse));
            return rewrite; */
        
    }

}

const productManager = new ProductManager("product.json");


/* const production = async () =>{
/* await productManager.addProduct("Maceta", "Maceta de ceramica", 1500, "#", 2020, 5);
await productManager.addProduct("Taza", "Taza de ceramica", 2000, "#", 12, 10);
await productManager.addProduct("Plato", "Plato de vidrio", 1200, "#", 2001, 20); */

/* const modified = await productManager.updateProduct(0, "price", 2500);
console.log(modified); */
/* const deleteId = await productManager.deleteProduct(2);
console.log(deleteId); */

//production();

//module.exports = ProductManager;
