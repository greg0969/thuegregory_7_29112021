let searchBar = document.querySelector(".form-control");
let relevantRecipe = [];
let filteredRecipe ;
let ingredientContent ;
let ingredientList = [] ;
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
        displayRecipe(filteredRecipe);
        
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
        

    // recipes.forEach(recipe => {
    //     if(recipes.filter(recipe => recipe.name.toLowerCase().include(searchBarValue))){
    //         console.log("oui")
    //     }
        
    // });

    // permet de filtrer pour ne pas avoir de doublons
    filteredRecipe = relevantRecipe.filter(function(ele , pos){
        return relevantRecipe.indexOf(ele) == pos;
        
    }) 
    //console.log(filteredRecipe)
    if (relevantRecipe == undefined){
        console.log("aucune recette trouvée");
    }
}


const init = async () => {
    displayRecipe(recipes);
  };
  init();
  