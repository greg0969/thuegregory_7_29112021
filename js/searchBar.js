let searchBar = document.querySelector(".form-control");
searchBar.addEventListener("keydown", () => {
    
    const recipeContainer = document.querySelector(".recipeList");
    searchBarValue = searchBar.value.toLowerCase() ;
    

    if (searchBarValue.length < 3) {
        console.log("Veuillez entrer au minimum 3 caractères")
    }

    if (searchBarValue.length >= 3) {
        const search = searchRecipe();
        recipeContainer.innerHTML = "" ;
        displayRecipe(search);
        
    }
})

//
function searchRecipe() {
    let relevantName ;
    let relevantIngredient ;
    let relevantAppareil ;
    let relevantUstensil ;
    let ustensilsList ;
    let ingredientList ;

    for (let i = 0; i < recipes.length; i++) {

        relevantName = recipes.filter(recipeName => recipeName.name.toLowerCase().includes(searchBarValue));
        relevantAppareil = recipes.filter(recipeAppliance => recipeAppliance.appliance.toLowerCase().includes(searchBarValue));

        ustensilsList = recipes[i].ustensils ;
        relevantUstensil = ustensilsList.filter(ustensil => ustensil.toLowerCase().includes(searchBarValue));

        ingredientList = recipes[i].ingredients
        relevantIngredient = ingredientList.filter(ingredients => ingredients.ingredient.toLowerCase().includes(searchBarValue));
        //console.log(ingredientsList)
    }
    if (relevantName == undefined || relevantAppareil == undefined || relevantUstensil == undefined || relevantIngredient == undefined){
        console.log("aucune recette trouvée");
    }
    // console.log(relevantName)
    // console.log(relevantAppareil)
    // console.log(relevantUstensil)
    console.log(relevantIngredient)
    
    
}


const init = async () => {
    displayRecipe();
  };
  init();
  