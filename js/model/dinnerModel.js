//DinnerModel Object constructor
class DinnerModel {

    constructor(){
		this.dishes = []; // to be replaced in lab 3
		this.observers = [];
		
		//TODO Lab 1 implement the data structure that will hold number of guest
		// and selected dishes for the dinner menu
		this.numberOfGuests = 3;
		this.order = [];
		//this.order = [];
		this.cache = new Map();
		// this.limit = 30; // the max amount of dishes stored in the cache
		this.selectedDish = -1;
		this.imageURI = "";
		this.loading = false;
		this.error = false; 
	}

	isLoading() {
		return this.loading;
	}

	hasError() {
		return this.error;
	}
	
	/* Observer Observable Pattern */
	subscribe(elem){
		this.observers.push(elem);
	}
	unsubsribe(elem){
		this.observers.filter(a => a !== elem)
	}
	notify(data){
		this.observers.forEach(observer => observer(data));
	}
	
	getCurrentDish(){
		return this.selectedDish;
	}
	setCurrentDish(id) {
		this.selectedDish=id;
	}
	

	setNumberOfGuests(num) {
		this.numberOfGuests=num;
	}
	
	getNumberOfGuests() {
		return this.numberOfGuests;
	}

	/*
	//Returns the dish that is on the menu for selected type 
	getSelectedDish(type) {
		return this.getAllDishes(type);
	}
	*/

	/*
	//Returns all the dishes on the menu.
	getFullMenu() {
		const dishes = [];
		dishes.push(this.getAllDishes("starter"));
		dishes.push(this.getAllDishes("main dish"));
		dishes.push(this.getAllDishes("dessert"));
		console.log(dishes);
		return dishes;
	}
	*/

	/*
	//Returns all ingredients for all the dishes on the menu.
	getAllIngredients() {
		const dishes = this.getFullMenu();
		const all = [];
		let i=0;
		let j=0;
		for(i=0;i<dishes.length;i++){
			for(j=0;j<dishes[i].length;j++){
				all.push(dishes[i][j].ingredients);
			}
		}
		console.log(all);
		return all;
	}
	*/

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	getTotalMenuPrice() {
	/*let totalPrice = 0;
	for(let i=0;i<this.order.length;i++){
		let dish = this.getDish(this.order[i]);
		let ingredients = dish.ingredients;
		let tmp = 0;
		for(let j = 0;j<ingredients.length;j++){
			tmp+=this.numberOfGuests*ingredients[j].price;
		}
		totalPrice+=tmp;
	}
	console.log(totalPrice);
	return totalPrice;
	*/
		let totalPrice = 0;
		this.order.forEach(dish => {
			totalPrice += dish.extendedIngredients.length * this.numberOfGuests;
		});
		return totalPrice;
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	addDishToMenu(id) {
		/*for (let i = 0; i<this.cache.length; i++){
			console.log(this.cache[i].id)
			if (this.cache[i].id == id){
				this.order.push(this.cache[i]);
			}
		}*/
		this.order.push(this.cache.get(id));
		/*if (this.getDish(id)){
			this.order.push(id);
		}
		console.log(this.order);*/
	}

	/*
	//Removes dish from menu
	removeDishFromMenu(id) {
		let position = -1;
		for(let i = 0; i<this.order.length;i++){
			let k = this.order[i];
			if (k === id){
				position = i;
				break;
			}
		}
		if (position === -1){
			return;
		}
		return this.order.splice(position,1);
	}*/

	getOrder(){
		return this.order;
	}

	getDishes() {
		return this.dishes;
	}
    
	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned

	// By using indexOf() fn we might get wrong results; eg by searching for "ice" we get meatballs as well since
	// one of the ingredient name contains the word "diced"
	/*getAllDishes(type,filter) {
	  return this.dishes.filter(function(dish) {
		let found = true;
		if(filter){
			found = false;
			dish.ingredients.forEach(function(ingredient) {
				if(ingredient.name.toUpperCase().indexOf(filter)!=-1) {
					found = true;
				}
			});
			if(dish.name.toLocaleUpperCase().indexOf(filter) != -1)
			{
				found = true;
			}
		}
	  	return dish.type == type && found;
	  });	
	}*/
	executeInfo(id){
		if(this.cache.has(id)){
			return this.cache.get(id);
		}
		this.loading = true;	
		this.notify();
		fetch(
			/*`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`*/
			`http://sunset.nada.kth.se:8080/iprog/group/66/recipes/${id}/information`, {
			"method": "GET",
			"headers": {
				//"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
				//"x-rapidapi-key": API_KEY
				"X-Mashape-Key": API_KEY
			}
		}).then(response => {
			const data = JSON.parse(response);
			console.log(response);
			console.log(data);
			this.cache.set(id, data);
			this.loading = false;
			this.notify();
		}).catch(err => {
			console.log(err);
			this.error = true;
			this.notify();
		});
		/*const settings = {
			"async": true,
			"crossDomain": true,
			"url": `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
				"x-rapidapi-key": API_KEY
			}
		}
		
		$.ajax(settings).done(function (response) {
			console.log(response);
		});*/
		/*const settings = {
			"async": true,
			"crossDomain": false,
			"url": "info.json",
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
				"x-rapidapi-key": API_KEY
			}
		}
		
		$.ajax(settings).done(function (response) {
			console.log(JSON.parse(response));
			this.cache.push(infoResponse);
		});*/
	}
	executeSearch(query, type){
		this.loading = true;
		/*const settings = {
			"async": true,
			"crossDomain": true,
			"url": `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=18&offset=0&type=${type}&query=${query}`,
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
				"x-rapidapi-key": API_KEY
			}
		}
		
		$.ajax(settings).done(function (response) {
			console.log(response);
		});*/
		fetch(
			/*`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=18&offset=0&type=${type}&query=${query}`*/
			`http://sunset.nada.kth.se:8080/iprog/group/66/recipes/search?number=20&type=${type}&query=${query}`, {
			"method": "GET",
			"headers": {
				//"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
				//"x-rapidapi-key": API_KEY
				"X-Mashape-Key": API_KEY
			}
		}).then(response => {
			const data = JSON.parse(response);
			console.log(response);
			console.log(data);
			this.dishes.push(data);
			this.imageURI = data.baseUri;
			this.loading = false;
			this.notify();
		}).catch(err => {
			console.log(err);
			this.error = true;
			this.notify();
		});
		/*const response = searchResponse;
		this.imageURI = response.baseUri;
		this.dishes = response.results;
		console.log(this.dishes);
		return this.dishes;*/
	}

	valid(type) {
		const dishKind = ["", "main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "drink"];
		for (let i=0; i<dishKind.length ;i++){
			if(dishKind[i] === type){
				return true;
			}
		}
		//main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink.
		return false;
	}

	getAllDishesFromAPI(searchform, type){
		if (searchform === "" || !this.valid(type)){
			console.log("error: no search term inserted, or type not valid.");
			alert("error: no search term inserted, or type not valid.");
			return;
		} else {
			this.executeSearch(searchform, type);
		}
	}

	getBaseURI(){
		return this.imageURI;
	}

	//function that returns a dish of specific ID
	/*getDish (id) {
		for (let i = 0; i<this.dishes.length; i++){
			if (this.dishes[i].id == id){
				return this.dishes[i];
			}
		}
		return undefined;
	    /*for(let dsh of this.dishes){
			if(dsh.id == id) {
				return dsh;
			}
	    }
	    return undefined;
	}*/

	getFullDish (id) {
		return this.cache.get(id);
	}

}

	// the dishes constant contains an array of all the 
	// dishes in the database. Each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	/*
        const dishesConst = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{ 
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{ 
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];*/


