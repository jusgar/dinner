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
    }
    update(data){
        $("#people", this.container).text(this.model.getNumberOfGuests()); 
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
