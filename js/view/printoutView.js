class PrintoutView{
    constructor (container, model){
        this.container = container;
        this.model = model;
        this.update = this.update.bind(this);
        this.model.subscribe(this.update);
    }
    update(data){
        const dishes = [];
        $(".numberOfGuests").text(this.model.getNumberOfGuests());
        $(".totalPrice").text(this.model.getTotalMenuPrice());
        for (let i=0; i<this.model.order.length; i++){
			dishes.push(this.model.getDish(this.model.order[i]));
        }
        const father = $("#printoutDishes", this.container);
        father.empty();
        dishes.forEach(dish => {
            const row = $(`<div class="row"></div>`);
            const div =$(`<div class="col-md-2">
            <div id="dishPicture">
                <a href="#">
                    <img src="images/${dish.image}" alt="${dish.name}">
                </a>
            </div>
        </div>`)
            const div1 = $(`<div class="col-md-3">
            <div class="titledish">
                <h2>${dish.name}</h2>
            </div>
            <div class="text">
                <p>${dish.description}</p>
            </div>
        </div>`);
            const prep = $(`<div class="col-md-7">
            <div>
                <h4>Preparation </h4>
            </div>
            <div class="text">
                <p>Cras pharetra felis vitae venenatis cursus. Sed vitae enim pulvinar, aliquam magna mollis, molestie urna. Cras lorem ligula, tincidunt ut ullamcorper auctor, cursus et massa. Cras pharetra felis vitae venenatis cursus. Sed vitae enim pulvinar, aliquam magna mollis, molestie urna. Cras lorem ligula, tincidunt ut ullamcorper auctor, cursus et massa. Cras pharetra felis vitae venenatis cursus. Sed vitae enim pulvinar, aliquam magna mollis, molestie urna. Cras lorem ligula, tincidunt ut ullamcorper auctor, cursus et massa.
                    Cras pharetra felis vitae venenatis cursus. Sed vitae enim pulvinar, aliquam magna mollis, molestie urna. Cras lorem ligula, tincidunt ut ullamcorper auctor, cursus et massa. 
                </p>
                <p>Cras pharetra felis vitae venenatis cursus. Sed vitae enim pulvinar, aliquam magna mollis, molestie urna. Cras lorem ligula, tincidunt ut ullamcorper auctor, cursus et massa. Cras pharetra felis vitae venenatis cursus. Sed vitae enim pulvinar, aliquam magna mollis, molestie urna. Cras lorem ligula, tincidunt ut ullamcorper auctor, cursus et massa. Cras pharetra felis vitae venenatis cursus. Sed vitae enim pulvinar, aliquam magna mollis, molestie urna. Cras lorem ligula, tincidunt ut ullamcorper auctor, cursus et massa.
                    Cras pharetra felis vitae venenatis cursus.  
                </p>
            </div>
        </div>`);
        father.append(row, div, div1, prep);
        });
    }
    /*<div class="col-md-2">
					<div id="dishPicture">
						<a class="picsize" target="_blank" href="C:\Users\Justyna\Documents\GitHub\dinnerplanner-html\images\bakedbrie.jpg">
							<img src="C:\Users\Justyna\Documents\GitHub\dinnerplanner-html\images\bakedbrie.jpg" alt="Cinque Terre" width="100" height="100">
						</a>
					</div>
				</div>
				<div class="col-md-3">
					<div class="titledish">
						<h2>Lasagne </h2>
					</div>
					<div class="text">
						<p>Cras pharetra felis vitae venenatis cursus. Sed vitae enim pulvinar, aliquam magna mollis, molestie urna. Cras lorem ligula, tincidunt ut ullamcorper auctor, cursus et massa. </p>
					</div>
				</div>
				<div class="col-md-7">
					<div>
						<h4>Preparation </h4>
					</div>
					<div class="text">
						<p>Cras pharetra felis vitae venenatis cursus. Sed vitae enim pulvinar, aliquam magna mollis, molestie urna. Cras lorem ligula, tincidunt ut ullamcorper auctor, cursus et massa. Cras pharetra felis vitae venenatis cursus. Sed vitae enim pulvinar, aliquam magna mollis, molestie urna. Cras lorem ligula, tincidunt ut ullamcorper auctor, cursus et massa. Cras pharetra felis vitae venenatis cursus. Sed vitae enim pulvinar, aliquam magna mollis, molestie urna. Cras lorem ligula, tincidunt ut ullamcorper auctor, cursus et massa.
							Cras pharetra felis vitae venenatis cursus. Sed vitae enim pulvinar, aliquam magna mollis, molestie urna. Cras lorem ligula, tincidunt ut ullamcorper auctor, cursus et massa. 
						</p>
						<p>Cras pharetra felis vitae venenatis cursus. Sed vitae enim pulvinar, aliquam magna mollis, molestie urna. Cras lorem ligula, tincidunt ut ullamcorper auctor, cursus et massa. Cras pharetra felis vitae venenatis cursus. Sed vitae enim pulvinar, aliquam magna mollis, molestie urna. Cras lorem ligula, tincidunt ut ullamcorper auctor, cursus et massa. Cras pharetra felis vitae venenatis cursus. Sed vitae enim pulvinar, aliquam magna mollis, molestie urna. Cras lorem ligula, tincidunt ut ullamcorper auctor, cursus et massa.
							Cras pharetra felis vitae venenatis cursus.  
						</p>
					</div>
				</div>*/ 
}
//boiler plate