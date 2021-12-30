let searchBar = document.querySelector(".form-control");
searchBar.addEventListener("keyup", () => {
    
    const recipeContainer = document.querySelector(".recipeList");
    searchBarValue = searchBar.value.toLowerCase() ;
    

    if (searchBarValue.length < 3) {
        console.log("Veuillez entrer au minimum 3 caractères")
    }

    if (searchBarValue.length >= 3) {
        
        recipeContainer.innerHTML = "" ;
        
        displayRecipe(relevantRecipe);
        
    }
})

//
function searchRecipe() {
    
    let relevantRecipe = [];
    for (let i = 0; i < recipes.length; i++) {
        
        if (recipes[i].name.toLowerCase().includes(searchBarValue) 
            || recipes[i].appliance.toLowerCase().includes(searchBarValue)) { //ameliroer le if pour eviter les doublons
            
            relevantRecipe.push(recipes[i])
            
        }
    }
    //console.log(relevantRecipe)

    if (relevantRecipe == undefined){
        console.log("aucune recette trouvée");
    }
}

const init = async () => {
    displayRecipe();
  };
  init();
  