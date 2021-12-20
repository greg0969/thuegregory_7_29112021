// const displayRecipes = (recipes) => {
//     //console.log(recipeArray)

//     for (let i = 0; i < recipes.length; i++) {
//         index = i
//     }

//     const recipesContainer = document.querySelector(".recipeList");
//     relevantRecipe = new Recipe();
//     console.log(relevantRecipe)
//     recipesContainer.innerHTML += relevantRecipe.displayRelevantRecipe();

// };




// const init = async () => {
//    // const data = await getData();
//     displayRecipes(recipes) ;
//   };
//   init();

recipes.forEach((recipe) => {
    const recipeContainer = document.querySelector(".recipeList");
    let ingredients = recipe.ingredients;
    for (let i = 0; i < ingredients.length; i++) {
        console.log(ingredients[i])
        recipeContainer.innerHTML +=
        `
        <figure class="recipeCard">
            <div class="img"></div>
            <figcaption>
                <h1>${recipe.name}</h1> <div class="time"><i class="far fa-clock"></i> ${recipe.time} min</div>    
                <div class="ingredients">${ingredients[i]}</div>
                <div class="desc">${recipe.description}</div>
            </figcaption>
        </figure>
      `
    }


})