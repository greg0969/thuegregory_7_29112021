let searchBar = document.querySelector(".form-control");
let relevantRecipe = [];
let ingredientContent ;
let relevantIngredient = [] ;
const listItemContainer = document.querySelector(".listeItem"); 
const searchBarError = document.querySelector("#searchBarMessage");

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
        //searchBarError.style.display = "block" ;
        displayIngredient(recipes);
        displayUstensils(recipes);
        displayAppliance(recipes);
        
    }

    if (searchBarValue.length > 2) {
        //searchBarError.style.display = "none" ;
        searchRecipe(searchBarValue);
        recipeContainer.innerHTML = "" ;
        listItemContainer.innerHTML = "" ;
        displayIngredient(relevantRecipe);
        displayUstensils(relevantRecipe);
        displayAppliance(relevantRecipe);
        displayRecipe(relevantRecipe);
        sortRecipeByTag();
        if (tagListContainer.childElementCount == 1 ) {
            recipeContainer.innerHTML = "" ;
            displayRecipe(tagRemaining) ;
            sortRecipeByTag();
            console.log("1 seul tags et recherche principale")

        }
        if (relevantRecipe.length == 0) {
            recipeContainer.innerHTML = "" ;    
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
  