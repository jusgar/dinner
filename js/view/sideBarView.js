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
class SideBarView {
    constructor (container, model) {
		this.container=container;
		this.model=model;
		this.update = this.update.bind(this);
		this.model.subscribe(this.update);
		$("#numberOfGuests", this.container).attr("value", this.model.getNumberOfGuests());
	}
	update(data){
		$("#sideBarViewTable", this.container).empty();
		$("#numberOfGuests", this.container).attr("value", this.model.getNumberOfGuests());
		const dishes = [];
		const guests = this.model.getNumberOfGuests();
		for(let i = 0; i<this.model.order.length; i++){
			dishes.push(this.model.getDish(this.model.order[i]));
		}
		if(dishes.length > 0){
			let dinnerTotal = 0;
			dishes.forEach(dish => {
				let total = 0;
				dish.ingredients.forEach(ingredient => {
					total += (ingredient.price * guests);
				})
				const row = $(`<div class="row"><div style="border:1px solid" class="title2"><h4 style="text-align:left">${dish.name}</h4><h4 style="text-align:right" class="cost">${total.toFixed(2)}</h4></div></div>`);
				$("#sideBarViewTable", this.container).append(row);
				dinnerTotal += total;
			});
			const row2 = $(`<div class="row"><h4 style="text-align:right">SEK ${dinnerTotal.toFixed(2)}</h4></div>`);
			$("#sideBarViewTable", this.container).append(row2);
			$("#confirmDinnerButton", this.container).removeClass("confirmButtonDisabled").addClass("createNewbutton");
		} else {
			$("#confirmDinnerButton", this.container).removeClass("createNewbutton").addClass("confirmButtonDisabled");
		}
	}
	/*				<div class="row">
					<div style="border:1px solid" class="title2">
						<h4 style="text-align:left"> Dish name </h4>
						<h4 style="text-align:right" class="cost"> Cost </h4>
					</div>
				</div>
				<div class="row">
					<h4 style="text-align:right"> SEK 0.00 </h4>
				</div> */
}

 
