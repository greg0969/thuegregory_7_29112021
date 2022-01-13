let searchBar = document.querySelector(".form-control");
let relevantRecipe = [];
let ingredientContent ;
let relevantIngredient = [] ;

searchBar.addEventListener("keyup", () => {

    const recipeContainer = document.querySelector(".recipeList");
    searchBarValue = searchBar.value.toLowerCase() ;

    if (searchBarValue.length == 0) {
        recipeContainer.innerHTML = "" ;
        displayRecipe(recipes)
    }

    if (searchBarValue.length < 3) {
        console.log("Veuillez entrer au minimum 3 caractères")
    }

    if (searchBarValue.length > 2) {
        searchRecipe();
        recipeContainer.innerHTML = "" ;
        displayRecipe(relevantRecipe);
        
    }
})


//
function searchRecipe() {

    const nameFilter = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchBarValue)
    );
 
    const ingredientFilter = recipes.filter((recipe) =>
        recipe.ingredients.some((ingredientArray) =>
        ingredientArray.ingredient.toLowerCase().includes(searchBarValue)
        
        )
    );
    
    const descFilter = recipes.filter((recipe) =>
        recipe.description.toLowerCase().includes(searchBarValue)
    );
    
    relevantRecipe = nameFilter.concat(
        ingredientFilter,
        descFilter
    );
    relevantRecipe = [...new Set(relevantRecipe)];

    if (relevantRecipe == undefined){
        console.log("aucune recette trouvée");
    }
}


let init = async () => {
    displayRecipe(recipes);
  };
  init();
  