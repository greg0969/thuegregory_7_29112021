let searchBar = document.querySelector(".form-control");
searchBar.addEventListener("change", () => {
    const recipeContainer = document.querySelector(".recipeList");
    searchBarValue = searchBar.value ;
    

    if (searchBarValue.length < 3) {
        console.log("Veuillez entrer au minimum 3 caractères")
    }

    if (searchBarValue.length >= 3) {
        const search = searchRecipe(recipes);
        recipeContainer.innerHTML = "" ;
        displayRecipe(search);
        
    }
})


function searchRecipe(recipes) {
    let relevantName ;
    let relevantIngredient ;
    let relevantAppareil ;
    let relevantUstensil ;
    for (let i = 0; i < recipes.length; i++) {
        relevantName = recipes.find(recipe => recipe.name.toLowerCase().includes(searchBarValue.toLowerCase()));
        relevantAppareil = recipes.find(recipe => recipe.appliance.toLowerCase().includes(searchBarValue.toLowerCase()));

        let ustensilsList = recipes[i].ustensils ;
        relevantUstensil = ustensilsList.filter(ustensilList => ustensilList.toLowerCase().includes(searchBarValue.toLowerCase()));

        let ingredients = recipes[i].ingredients
        relevantIngredient = ingredients.filter(ingredientList => ingredientList.ingredient.toLowerCase().includes(searchBarValue.toLowerCase()));

        //console.log(relevantUstensil)
    }
    if (relevantName == undefined || relevantAppareil == undefined || relevantUstensil == undefined || relevantIngredient == undefined){
        console.log("aucune recette trouvée");
    }
    //console.log(relevantName)
    
    
}


const init = async () => {
    displayRecipe();
  };
  init();
  