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
  displayRecipes() {
    return `
      <figure>
          <div class="img"></div>>
          <figcaption>
            ${this.id}
          </figcaption>
        </figure>
        `;
  }
  displayRelevantRecipe() {
    return `
      <figure>
          <div class="img"></div>>
          <figcaption>
            ${this.id}
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

