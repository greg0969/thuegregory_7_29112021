let searchBar = document.querySelector(".form-control");
let relevantRecipe = [];
let ingredientContent ;
let relevantIngredient = [] ;
const listItemContainer = document.querySelector(".listeItem"); 

searchBar.addEventListener("keyup", () => {

    const recipeContainer = document.querySelector(".recipeList");
    searchBarValue = searchBar.value.toLowerCase() ;
    const tagListContainer = document.querySelector(".currentTagList");
    const tagList = document.querySelectorAll(".filter-style");
    let tagRemaining ;
    tagList.forEach((tagContent) => {
        tagRemaining = recipes.filter((recipe) => recipe.ingredients.some((ingredientArray) => 
        ingredientArray.ingredient.toLowerCase() == tagContent.textContent.toLowerCase()));
    });

    if (searchBarValue.length == 0) {
        recipeContainer.innerHTML = "" ;
        displayRecipe(recipes);
        displayIngredient(recipes);
        displayUstensils(recipes);
        displayAppliance(recipes);
        if (tagListContainer.childElementCount > 0) {
            recipeContainer.innerHTML = "" ;
            displayRecipe(tagRemaining) ;
            sortRecipeByTag();
        }
    }

    if (searchBarValue.length < 3) {
        console.log("Veuillez entrer au minimum 3 caractères");
        displayIngredient(recipes);
        displayUstensils(recipes);
        displayAppliance(recipes);
        
    }

    if (searchBarValue.length > 2) {
        searchRecipe(searchBarValue);
        recipeContainer.innerHTML = "" ;
        listItemContainer.innerHTML = "" ;
        displayIngredient(relevantRecipe);
        displayUstensils(relevantRecipe);
        displayAppliance(relevantRecipe);
        displayRecipe(relevantRecipe);
        sortRecipeByTag();
        if (tagListContainer.childElementCount > 0 ) {
            recipeContainer.innerHTML = "" ;
            displayRecipe(tagRemaining) ;
            sortRecipeByTag();
        }
        if (relevantRecipe.length == 0){    
            const noRecipeMessage = document.createElement("div");
            noRecipeMessage.id = "message" ;
            recipeContainer.appendChild(noRecipeMessage) ;
            noRecipeMessage.innerHTML = "Aucune recette ne correspond à votre critère… vous pouvez chercher 'tarte aux pommes', 'poisson', 'etc' " ; 
        }
        
    }
})


//
function searchRecipe(searchBarValue) {

    let searchBar = document.querySelector(".form-control");
    searchBarValue = searchBar.value.toLowerCase() ;

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

    
}


let init = async () => {
    displayRecipe(recipes);
    
  };
  init();
  