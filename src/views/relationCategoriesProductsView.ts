import RELATION_Categories_Products from '../models/RELATION_Categories_Products';
import Categories from '../models/Categories';
import Products from '../models/Products';

interface relationView extends RELATION_Categories_Products {
    category: Categories,
    product: Products
}

export default {
    render(relation: relationView) {
        return {
            id: relation.id,
            categories_id: relation.categories_id,
            products_id: relation.products_id,
            category: relation.category,
            product: relation.product
        };
    },

    renderMany(relations: relationView[]) {
        return relations.map(relation => this.render(relation));
    }
}