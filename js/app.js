/*window.onload= function() {*/
$(function() {
	
	//We instantiate our model
	const model = new DinnerModel();
	
	// And create the instance of ExampleView
	//const exampleView = new ExampleView(document.querySelector("#exampleView")); => changing for jQuery
	const $sideBarView = $("#sideBarView");
	const $dishContainerView = $("#dishContainerView");
	const $ingredientsView = $("#ingredientsView");
	const $searchBarView = $("#searchBarView");
	const $welcomeView = $("#welcomeView");
	const $printoutView = $("#printoutView");
	const $overView = $("#overView");

	/*const sidebarView = new SideBarView(document.querySelector("#sideBarView"), model);*/
	const sidebarView = new SideBarView($sideBarView, model);
	const ingredientsView = new IngredientsView($ingredientsView, model);
	const printoutView = new PrintoutView($printoutView, model); /*
	const dishContainerView = new DishContainerView($dishContainerView, model);
	
	const searchBarView = new SearchBarView($searchBarView, model);*/
	let tmpId = 0;  // stores the id of the current dish
	function tmp() {
		console.log(`value: ${$("#numberOfGuests").val()}`);
		model.setNumberOfGuests(parseInt($("#numberOfGuests").val(), 10));
		console.log(`I updated the model: ${model.getNumberOfGuests()}`);
		model.notify();
	}

	$("#numberOfGuests").on("change", tmp);



	function overview() {
		$sideBarView.hide();
		$dishContainerView.hide();
		$ingredientsView.hide();
		$searchBarView.hide();
		$welcomeView.hide();
		$printoutView.hide();
		$overView.show();
		generateDinnerOverview();
	} 

	function generateDinnerOverview() {
		const dishes = [];
		const guests = model.getNumberOfGuests();
		const container = $("#dishesOverview");
		container.empty();
		for (let i=0; i<model.order.length; i++){
			dishes.push(model.getDish(model.order[i]));
		}
		dishes.forEach(dish => {
			const div = $(`<div class="col-sm-6 col-md-2"></div>`);
			const div1 = $(`<div class="thumbnail"></div>`);
			const img = $(`<img src="images/${dish.image}" alt="${dish.name}" width="114" height="100">`);
			const div2 = $(`<div class="caption" style="text-align: center">`);
			const h5 = $(`<h5>${dish.name}</h5>`);
			let total = 0;
			dish.ingredients.forEach(ingredient => {
				total += (ingredient.price * guests);
			});
			const p = $(`<p>Price ${total.toFixed(2)}</p>`);
			div.append(div1);
			div1.append(img);
			div1.append(div2);
			div2.append(h5);
			div2.append(p);
			container.append(div);
		});
		$(".numberOfGuests").text(guests);
		$(".totalPrice").text(model.getTotalMenuPrice().toFixed(2));

	}

	$("#backToOrder").click({back: true}, showDinner);
	
	$("#confirmDinnerButton").click(function(event){
		if($("#confirmDinnerButton").hasClass("confirmButtonDisabled")){
			event.preventDefault(); 
			return;
		}
		overview();
	});

	function welcome() {
		$sideBarView.hide();
		$dishContainerView.hide();
		$ingredientsView.hide();
		$searchBarView.hide();
		$welcomeView.show();
		$printoutView.hide();
		$overView.hide();
	}  
	welcome();


	function showDinner(event) {
		$sideBarView.show();
		$dishContainerView.show();
		$ingredientsView.hide();
		$searchBarView.show();
		$welcomeView.hide();
		$printoutView.hide();
		$overView.hide();
		if(!event.data.back){
			generateDishes(filterDishes(loadDishes()));
		}
	}
	// $("#showDinnerBtn").on("click", showDinner);
	$("#showDinnerBtn").click({back: false}, showDinner); // event listener
	$(".backtosearch").click({back: true}, showDinner)

	
	function printout() {
		$sideBarView.hide();
		$dishContainerView.hide();
		$ingredientsView.hide();
		$searchBarView.hide();
		$welcomeView.hide();
		$printoutView.show();
		$overView.hide();
	}  


	$("#printoutBtn").click(printout);



	function loadDishes(){
		const container = model.getFullMenu();
		const dishes = container.flat();
		console.log(dishes);
		return dishes;
	}

	function generateIngredients(event) {
		const dish = model.getDish(event.currentTarget.id);
		if(dish){
			console.log(dish);
			$("#dishName").text(dish.name);
			$("#dishPicture").attr("src", "images/" + dish.image);
			$("#dishNote").text(dish.description);
		}
	}

	function ingredients(event) {
		$sideBarView.show();
		$dishContainerView.hide();
		$ingredientsView.show();
		$searchBarView.hide();
		$welcomeView.hide();
		tmpId = event.currentTarget.id;
		generateIngredients(event); 
		generateIngredientsTable(event);
	}
	
	function filterDishes(dishes){
		const keyword = $(`#keyword`).val().toUpperCase();
		const searchType = $(`#searchType`).val();
		const result = [];
		if (searchType === ""){
			result.push(model.getAllDishes("starter", keyword));
			result.push(model.getAllDishes("main dish", keyword));
			result.push(model.getAllDishes("dessert", keyword));
		} else {
			result.push(model.getAllDishes(searchType, keyword));
		}
		return result.flat();		
	}
	$("#searchButton").click(function(){
		return generateDishes(filterDishes(loadDishes()));
	});



	function generateDishes(dishes) {
		const container = $("#dishContainerView");
		container.empty();
		if (dishes.length === 0){
			container.append($(`<p>no results</p>`));
			return;
		}
		dishes.forEach(dish => {
			const div = $(`<div class="col-sm-6 col-md-2"></div>`);
			const div1 = $(`<div class="thumbnail"></div>`);
			const img = $(`<img src="images/${dish.image}" alt="${dish.name}" width="114" height="100">`);
			const div2 = $(`<div class="caption" style="text-align: center">`);
			const h5 = $(`<h5>${dish.name}</h5>`);
			const p = $(`<p> <a href="#" id="${dish.id}" class="btn btn-default mydishes" role="button">Show details</a></p>`);
			div.append(div1);
			div1.append(img);
			div1.append(div2);
			div2.append(h5);
			div2.append(p);
			container.append(div);
		});
		$(".mydishes").on("click", ingredients);
	}

	

/*<div class="col-sm-6 col-md-2">
							<div class="thumbnail">
								<img src="C:\Users\Justyna\Documents\GitHub\dinnerplanner-html\images\bakedbrie.jpg" alt="...">
								<div class="caption" style="text-align: center">
									<h3>Thumbnail label</h3>
									<p> <a href="#" class="btn btn-default" role="button">Show details</a></p>
								</div>
							</div>
						</div>
					*/
/* should be moved into ingredientsView.js */ 
	function generateIngredientsTable() {
		const container = $("#ingredientsTable");
		container.empty();
		const dish = model.getDish(tmpId);
		const guests = model.getNumberOfGuests();
		let total = 0;

		dish.ingredients.forEach(ingredient => {
			const tr = $(`<tr></tr>`);
			const td = $(`<td class="weights">${(ingredient.quantity * guests).toFixed(1)} ${ingredient.unit}</td>`);
			const td1 = $(`<td>${ingredient.name}</td>`);
			const td2 = $(`<td>SEK</td>`);
			const td3 = $(`<td>${(ingredient.price * guests).toFixed(2)}</td>`);
			tr.append(td, td1, td2, td3);
			container.append(tr);
			total += (ingredient.price * guests);
		});
		const el = $(`<tr><th><div class="addtoMenu"><button id="${dish.id}" type="button" class="addtoMenu">Add to menu</button></div></th><th></th> <th>SEK</th><th>${total.toFixed(2)}</th></tr>`);
		container.append(`<br>`, el);
		$(".addtoMenu").click({back: true}, addToMenu); //event listner
	}
	model.subscribe(generateIngredientsTable);

	function addToMenu(event) {
		model.addDishToMenu(event.currentTarget.id);
		model.notify();
		showDinner(event);
	}


	/*function addToMenu(event) {
		//$("#ingredientsTable").empty();
		model.addDishToMenu(event.currentTarget.id);
		showDinner(event);
	}*/

/*<tr>
						<th>
						<div class="addtoMenu">	
							<button type="button" class="addtoMenu">Add to menu</button>
						</div>
						</th>
						<th></th> 
						<th>SEK</th>
						<th>77,20</th>
					</tr>*/
					
	
	
					/*<tr>
		<td class="weights">2tsp</td>
		<td>olive oil</td>
		<td>SEK</td>
		<td>0,20</td>
	</tr>*/

	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * query for elements in the whole document.
	 * In other places you should limit the search only to the children 
	 * of the specific view you're working with (see exampleView.js).
	 */
	
	
	 /*const people = document.getElementById("people");
    const element = document.getElementById("numberOfGuests");
    
    element.addEventListener("change", (event) => {
      let number = event.target.value;
      if (number>0){
      model.setNumberOfGuests(number);
      people.innerText = model.getNumberOfGuests();
    }
    } );
    people.innerText = model.getNumberOfGuests();*/
});
