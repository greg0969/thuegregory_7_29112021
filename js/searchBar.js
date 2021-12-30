let searchBar = document.querySelector(".form-control");
let relevantRecipe = [];
let filteredRecipe ;
searchBar.addEventListener("keyup", () => {

    const recipeContainer = document.querySelector(".recipeList");
    searchBarValue = searchBar.value.toLowerCase() ;
    

    if (searchBarValue.length < 3) {
        console.log("Veuillez entrer au minimum 3 caractères")
    }

    if (searchBarValue.length >= 3) {
        searchRecipe();
        recipeContainer.innerHTML = "" ;
        displayRecipe(filteredRecipe);
        
    }
})



//
function searchRecipe() {
    
    //console.log(relevantRecipe)
    for (let i = 0; i < recipes.length; i++) {
        
        if (recipes[i].name.toLowerCase().includes(searchBarValue) || recipes[i].appliance.toLowerCase().includes(searchBarValue)) { //ameliroer le if pour eviter les doublons
            relevantRecipe.push(recipes[i])        
        }
    }
    filteredRecipe = relevantRecipe.filter(function(ele , pos){
        return relevantRecipe.indexOf(ele) == pos;
    }) 
    console.log(filteredRecipe);
    if (relevantRecipe == undefined){
        console.log("aucune recette trouvée");
    }
    
}


const init = async () => {
    displayRecipe(recipes);
  };
  init();
  