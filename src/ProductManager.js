import fs from "fs";

export class ProductManager{
    constructor(path){
        this.path = path;

        if(!fs.existsSync(this.path)){
            fs.writeFileSync(this.path, "[]");
        }
    }

    async #read(){
        const readFile = await fs.promises.readFile(this.path, "utf-8");
        const parse = JSON.parse(readFile);

        return parse;
    }
    async #write(action){
        const writeFile = await fs.promises.writeFile(this.path, JSON.stringify(action));
        return writeFile;
    }



    async addProduct(title, description, price, thumbnail, code, stock, category){
        let newProduct = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            category: category,
            status: true
        }
            const parse = await this.#read();
            let id = parse.length;
            newProduct = {id: id,  ...newProduct};

            if((!newProduct.title) || (!newProduct.description) || (!newProduct.price) || (!newProduct.thumbnail) || (!newProduct.code) || (!newProduct.stock) || (!newProduct.category)){
                console.log("Falta ingresar un valor!");
                return {};
            }

            parse.push(newProduct);
            await this.#write(parse);
                return newProduct;
    }

    async getProducts(){
        const read = await this.#read();
            return read;
    }

    async getProductById(id){
            const read = await this.#read();

            if(read){
                const product = read.find(e => e.id === id);
                return product;
            }else{
                return "Not found";
            }
    }

    async updateProduct(id, prop, value){
        if((prop !== id) && (value !== undefined || null || "")){
            //let read = this.#read();
            const readFile = await fs.promises.readFile(this.path, "utf-8");
            const parse = JSON.parse(readFile);
            
            const updateIndex = parse.findIndex(prod => prod.id == id);
            const toUpdate = parse[updateIndex];
                  parse[updateIndex] = {... toUpdate, prop: value}
            await fs.promises.writeFile(this.path, JSON.stringify(parse));

                    //await this.#write(read);

        }else{
            const error = console.log("Ocurrio un error: Falta completar un campo");
            return error, null;
            //mantendra el valor asignado antes;
        };
    }

    

    async deleteProduct(id){
        const read = await this.#read();
        const readParse = read.filter(e => e.id !== id);

        await this.#write(readParse);
            //return rewrite;
        
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
