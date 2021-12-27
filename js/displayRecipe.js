
function displayRecipe() {
    recipes.forEach((recipe) => {
        const recipeContainer = document.querySelector(".recipeList");
        let currentRecipe = new Recipe(recipe);
        recipeContainer.innerHTML += currentRecipe.recipeCard();
        
    })
}

function displayFilteredRecipe(relevantName, relevantIngredient, relevantAppareil) {
    const recipeContainer = document.querySelector(".recipeList");
    let currentRecipe = new Recipe(relevantName);
    recipeContainer.innerHTML += currentRecipe.recipeCard();
}