import Products from '../models/Products';

export default {
    render(product: Products) {
        return {
            id: product.id,
            name: product.name,
            image_url: product.image_url,
            description: product.description
        };
    },

    renderMany(products: Products[]) {
        return products.map(product => this.render(product));
    }
}