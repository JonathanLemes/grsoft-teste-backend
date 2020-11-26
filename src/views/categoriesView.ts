import Categories from '../models/Categories';

export default {
    render(category: Categories) {
        return {
            id: category.id,
            name: category.name,
            url: category.url
        };
    },

    renderMany(categories: Categories[]) {
        return categories.map(category => this.render(category));
    }
}