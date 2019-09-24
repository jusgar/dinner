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
class IngredientsView {
    constructor (container, model) {
	    this.container=container;
        this.model=model; 
        this.update = this.update.bind(this);
        this.model.subscribe(this.update); /*observer part */
        $("#people", this.container).text(this.model.getNumberOfGuests());  
        this.errorDiv = $(".error", this.container);
    }

    update(data){
        if (this.model.hasError()) {
            this.container.find('#ingredientsTable').empty().append('error!');
            return;
        }
        if (this.model.isLoading()){
            this.container.find('#ingredientsTable').empty().append('loading...');
        } else {       
            const container = $("#ingredientsTable", this.container);
            container.empty();
            //const dish = model.getDish(tmpId);
            const dish = this.model.getFullDish(this.model.getCurrentDish());
            if (dish) {
                const guests = this.model.getNumberOfGuests();
                let total = 0;
                $("#dishName").text(dish.title);
                $("#dishPicture").attr("src", dish.image);
                $("#dishPicture").attr("alt", dish.title);
                //$("#dishNote").text(dish.description);
                $("#dishPrep").text(dish.instructions);
                dish.extendedIngredients.forEach(ingredient => {
                    const tr = $(`<tr></tr>`);
                    const td = $(`<td class="weights">${(ingredient.amount * guests).toFixed(1)} ${ingredient.unit}</td>`);
                    const td1 = $(`<td>${ingredient.name}</td>`);
                    const td2 = $(`<td>SEK</td>`);
                    const td3 = $(`<td>${(guests).toFixed(2)}</td>`);
                    tr.append(td, td1, td2, td3);
                    container.append(tr);
                    total += guests;
                });
                const el = $(`<tr><th><div class="addtoMenu"><button id="${dish.id}" type="button" class="addtoMenu">Add to menu</button></div></th><th></th> <th>SEK</th><th>${total.toFixed(2)}</th></tr>`);
                container.append(`<br>`, el);
                $("#people", this.container).text(this.model.getNumberOfGuests()); 
            }
        }  
        
    }

    /* console.log(this.model.getCurrentDish());
    const currentDish = this.model.getCurrentDish();
    if (currentDish>0){
        const dish = this.model.getDish(currentDish);
        const dishName = container.getElementById("dishName");
        const dishPicture = container.getElementById("dishPicture");
        const dishNote = container.getElementById("dishNote");
        const dishPrep = container.getElementById("dishPrep");
        if(dish){
            dishName.innerText = dish.name;
            dishNote.innerText = dish.description;
        }
    }
    else{
        console.log("error");
    } not correct code*/ 


	

    // in lab 2, the Observer update method will come here

}
