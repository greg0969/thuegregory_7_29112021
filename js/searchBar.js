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

    for (let i = 0; i < recipes.length; i++) {
        for (let u = 0; u < recipes[i].ustensils.length; u++) {
            for (let j = 0; j < recipes[i].ingredients.length; j++) {

                if (recipes[i].name.toLowerCase().includes(searchBarValue) 
                || recipes[i].description.toLowerCase().includes(searchBarValue) 
                || recipes[i].ingredients[j].ingredient.toLowerCase().includes(searchBarValue)) { //ameliroer le if pour eviter les doublons
                    relevantRecipe.push(recipes[i])
                    //console.log(recipes[i])

                }    
            }
            //console.log(recipes[i].ustensils[u])
        }
    }


    // permet de filtrer pour ne pas avoir de doublons
    filteredRecipe = relevantRecipe.filter(function(ele , pos){
        return relevantRecipe.indexOf(ele) == pos;
        
    }) 
    console.log(filteredRecipe)
    if (relevantRecipe == undefined){
        console.log("aucune recette trouvée");
    }
}


const init = async () => {
    displayRecipe(recipes);
  };
  init();
  