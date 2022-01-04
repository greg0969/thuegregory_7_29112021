class Recipe {
    constructor(recipe) {
      this.id = recipe.id;
      this.name = recipe.name;
      this.servings = recipe.servings;
      this.ingredients = recipe.ingredients;
      this.time = recipe.time;
      this.description = recipe.description;
      this.appliance = recipe.appliance;
      this.ustensils = recipe.ustensils;
    }
    recipeCard() {
      return `
      <figure class="recipeCard">
      <div class="img"></div>
      <figcaption>
          <h1>${this.name}</h1> <div class="time"><i class="far fa-clock"></i> ${this.time} min</div>    
          <ul class="ingredients">${this.ingredients.map(ingredient => {
            ingredientContent = ingredient.ingredient ;
            let quantiteContent = ingredient.quantity ;
            let unitContent = ingredient.unit;
            if (quantiteContent == undefined) {
              quantiteContent = "" ;
            }
            if (unitContent == undefined) {
      
              return `
             <li>${quantiteContent} ${ingredientContent}</li>
             `
             
            }
          else {
            return `
             <li>${ingredientContent} : ${quantiteContent} ${unitContent}</li>
             `
          }
          }).join("")}
          </ul>
            
             
          <div class="desc">${this.description}</div>
      </figcaption>
      </figure>
          `;
    }
    
    
  }
  