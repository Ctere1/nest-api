import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return newProduct;
    }

    getProducts() {
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const [product] = this.findProduct(productId);
        return { ...product };
    }

    updateProduct(id: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(id);
        const updateProduct = { ...product };
        if (title) {
            updateProduct.title = title;
        }
        if (desc) {
            updateProduct.description = desc;
        }
        if (price) {
            updateProduct.price = price;
        }
        this.products[index] = updateProduct;

    }

    deleteProduct(productId: string) {
        const [product, index] = this.findProduct(productId);
        this.products.splice(index, 1);
        return { message: 'Product deleted' };
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex((product) => product.id === id);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find product.');
        }
        return [product, productIndex];
    }
}