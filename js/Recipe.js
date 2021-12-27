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
        <div class="ingredients"></div>
        <div class="desc">${this.description}</div>
    </figcaption>
    </figure>
        `;
  }
  
  displayIngredient() {
    return `
    <div>
      oui
    </div>
        `;
  }
  displayAppareils() {
    return `
    <div>
      oui
    </div>
        `;
  }
  displayUstensils() {
    return `
    <div>
      oui
    </div>
        `;
  }

}

