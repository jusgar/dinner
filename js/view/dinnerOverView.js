class DinnerOverView {
    constructor(container, model){
        this.container = container;
        this.model = model;
        this.createOverview = this.createOverview.bind(this);
    }

    createOverview(data){
        const dishes = this.model.getOrder();
        const guests = this.model.getNumberOfGuests();
        const container = $("#dishesOverview", this.container);
        container.empty();
        /*for (let i=0; i<model.order.length; i++){
            dishes.push(model.getDish(model.order[i]));
        }*/
        let total = 0;
        dishes.forEach(dish => {
            const div = $(`<div class="col-sm-6 col-md-2"></div>`);
            const div1 = $(`<div class="thumbnail"></div>`);
            const img = $(`<img src="${dish.image}" alt="${dish.title}" width="114" height="100">`);
            const div2 = $(`<div class="caption" style="text-align: center">`);
            const h5 = $(`<h5>${dish.title}</h5>`);
            total += dish.extendedIngredients.length * guests;
            /*dish.ingredients.forEach(ingredient => {
                total += guests;
            });*/
            const p = $(`<p>Price ${total.toFixed(2)}</p>`);
            div.append(div1);
            div1.append(img);
            div1.append(div2);
            div2.append(h5);
            div2.append(p);
            container.append(div);
        });
        $(".numberOfGuests", this.container).text(guests);
		$(".totalPrice", this.container).text(this.model.getTotalMenuPrice().toFixed(2));
    }
}

/*unction generateDinnerOverview() {
    const dishes = model.getOrder();
    const guests = model.getNumberOfGuests();
    const container = $("#dishesOverview");
    container.empty();
    /*for (let i=0; i<model.order.length; i++){
        dishes.push(model.getDish(model.order[i]));
    }
    dishes.forEach(dish => {
        const div = $(`<div class="col-sm-6 col-md-2"></div>`);
        const div1 = $(`<div class="thumbnail"></div>`);
        const img = $(`<img src="${dish.image}" alt="${dish.title}" width="114" height="100">`);
        const div2 = $(`<div class="caption" style="text-align: center">`);
        const h5 = $(`<h5>${dish.title}</h5>`);
        let total = dish.extendedIngredients.length * guests;
        /*dish.ingredients.forEach(ingredient => {
            total += guests;
        });
        const p = $(`<p>Price ${total.toFixed(2)}</p>`);
        div.append(div1);
        div1.append(img);
        div1.append(div2);
        div2.append(h5);
        div2.append(p);
        container.append(div);
    });*/