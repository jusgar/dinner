/** ExampleView Object constructor
 * 
 * This object represents one specific view (in this case the Example view). 
 * 
 * It is responsible for:
 * - constructing the view (e.g. if you need to create some HTML elements procedurally) 
 * - populating the view with the data
 * - updating the view when the data changes
 * 
 * You should create a view class like this for every view in your UI.
 * 
 * @param {Object} container - references the HTML parent element that contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */
class DishContainerView {
    constructor (container, model) {
		this.container=container;
		this.model=model;
		this.update = this.update.bind(this);
		this.model.subscribe(this.update);
        this.errorDiv = $(".error", this.container);
	}

	update(data){
        if (this.model.hasError()) {
			alert("There's something wrong with the Internet");
			return;
        }
        if (this.model.isLoading()){
			this.container.find('#dishContainerView').empty().append('loading...');
        } else {
			const container = $("#dishContainerView", this.container);
			const dishes = this.model.getDishes();
			container.empty();
			if (dishes.length === 0){
				container.append($(`<p>no results</p>`));
			} else {
				dishes.forEach(dish => {
					const div = $(`<div class="col-sm-6 col-md-2"></div>`);
					const div1 = $(`<div class="thumbnail"></div>`);
					const img = $(`<img src="${model.getBaseURI()}${dish.image}" alt="${dish.title}">`);
					const div2 = $(`<div class="caption" style="text-align: center">`);
					const h5 = $(`<h5>${dish.title}</h5>`);
					const p = $(`<p> <a href="#" id="${dish.id}" class="btn btn-default mydishes" role="button">Show details</a></p>`);
					div.append(div1);
					div1.append(img);
					div1.append(div2);
					div2.append(h5);
					div2.append(p);
					container.append(div);
				});
			}
		}
	}
}
 
/*function generateDishes(dishes) {
		const container = $("#dishContainerView");
		container.empty();
		if (dishes.length === 0){
			container.append($(`<p>no results</p>`));
			return;
		}
		dishes.forEach(dish => {
			const div = $(`<div class="col-sm-6 col-md-2"></div>`);
			const div1 = $(`<div class="thumbnail"></div>`);
			const img = $(`<img src="${model.getBaseURI()}${dish.image}" alt="${dish.title}">`);
			const div2 = $(`<div class="caption" style="text-align: center">`);
			const h5 = $(`<h5>${dish.title}</h5>`);
			const p = $(`<p> <a href="#" id="${dish.id}" class="btn btn-default mydishes" role="button">Show details</a></p>`);
			div.append(div1);
			div1.append(img);
			div1.append(div2);
			div2.append(h5);
			div2.append(p);
			container.append(div);
		});
		$(".mydishes").on("click", function(event){
			model.setCurrentDish(event.currentTarget.id);
			ingredients();
			model.notify();
		});
	}*/