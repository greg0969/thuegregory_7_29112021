
function displayRecipe(recipe) {
    recipes.forEach((recipe) => {
        const recipeContainer = document.querySelector(".recipeList");
        let currentRecipe = new Recipe(recipe);
        recipeContainer.innerHTML += currentRecipe.recipeCard();
        
    })
}
