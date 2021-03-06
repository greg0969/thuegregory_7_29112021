
const selectBox = document.querySelectorAll(".selectBox");
const inputGroup = document.querySelectorAll(".form-select");
const chevron = document.querySelectorAll(".chevron");
const selectedOption = document.querySelectorAll(".selectedOption");
let itemContainerContent;
let ingredientList = [] ;
let applianceList = [];
let ustensilsList = [] ;


/* Permet d'ouvrir ou de fermer les selectBox */

function displaySelectBox() {
    let isAriaPopUp = "false";
    for (let i = 0; i < inputGroup.length; i++) {
        const liste = document.querySelectorAll(".listeItem");
        let placeHolder = inputGroup[i].placeholder;
        let tempo = null;

        inputGroup[i].addEventListener("click", () => {

            if (inputGroup[i].readOnly == true) {
                inputGroup[i].readOnly = false;
                inputGroup[i].focus();
            }

            if (isAriaPopUp == "false") {
                liste[i].style.display = "flex";
                selectedOption[i].setAttribute("aria-haspopup", "true");
                selectedOption[i].style.width = "43.1em";
                chevron[i].className = "fas fa-chevron-up chevron";
                inputGroup[i].placeholder = "Rechercher un " + placeHolder.toLowerCase().replace(/.$/, '');
                inputGroup[i].style.fontStyle = "italic";
                isAriaPopUp = "true"
            }

            else {
                isAriaPopUp = "false"
                liste[i].style.display = "none";
                selectedOption[i].style.width = "unset"
                selectedOption[i].setAttribute("aria-haspopup", "false");
                chevron[i].className = "fas fa-chevron-down chevron";
                inputGroup[i].placeholder = placeHolder;
                inputGroup[i].style.fontStyle = "initial";

                inputBlur(inputGroup[i]);
                tempo = null;
            }

            function inputBlur() {

                if (inputGroup[i].readOnly == false) {
                    inputGroup[i].readOnly == true;
                }
            }

        });

    }
}

/* Permet d'ins??rer les ??l??ment correspondant dans chaque selectBox  */

function displayIngredient(recipeArray) {
    const ingredientDropdown = document.querySelector(".listeItemIngredient")
    let ingredientContainer;
    ingredientDropdown.innerHTML = "" ;
    let ingredientArray = [] ;

    for (let i = 0; i < recipeArray.length; i++) {
        for (let j = 0; j < recipeArray[i].ingredients.length; j++) {
            ingredientArray.push(recipeArray[i].ingredients[j].ingredient.toLocaleLowerCase());
        }

    }

    ingredientArray = [...new Set(ingredientArray)];
    ingredientArray.sort();
    for (let i = 0; i < ingredientArray.length; i++) {
        ingredientContainer = document.createElement("li");
        ingredientContainer.classList.add("listeItem-container");
        ingredientContainer.id = "ingredient-container" ;

        ingredientDropdown.appendChild(ingredientContainer);
        ingredientContainer.innerHTML = ingredientArray[i]
    }
}

function displayUstensils(recipeArray) {
    const ustensilsDropdown = document.querySelector(".listeItemUstensils");
    let ustensilsContainer;
    ustensilsDropdown.innerHTML = "" ;
    let ustensilsArray = [];


    for (let i = 0; i < recipeArray.length; i++) {
        for (let j = 0; j < recipeArray[i].ustensils.length; j++) {
            ustensilsArray.push(recipeArray[i].ustensils[j].toLowerCase());
        }
    }


    for (let i = 0; i < ustensilsArray.length; i++) {
        ustensilsArray = [...new Set(ustensilsArray)];
        ustensilsContainer = document.createElement("li");
        ustensilsContainer.classList.add("listeItem-container");
        ustensilsContainer.id = "ustensils-container" ;
        ustensilsDropdown.appendChild(ustensilsContainer);
        ustensilsContainer.innerHTML = ustensilsArray[i];
    }
    
}

function displayAppliance(recipeArray) {
    
    const applianceDropdown = document.querySelector(".listeItemAppareils");
    let applianceContainer;
    applianceDropdown.innerHTML = "" ;
    let applianceArray = [];

    
    recipeArray.forEach((recipe) => {
        applianceArray.push(recipe.appliance.toLowerCase());
    });
    for (let i = 0; i < applianceArray.length; i++) {
        applianceArray = [...new Set(applianceArray)];
        applianceContainer = document.createElement("li");
        applianceContainer.classList.add("listeItem-container");
        applianceContainer.id = "appliance-container" ;
        applianceDropdown.appendChild(applianceContainer);
        applianceContainer.innerHTML = applianceArray[i];
    }
}

/* Permet de trier les recettes selon le tag */

function sortRecipeByTag() {
    const listItemContainer = document.querySelectorAll(".listeItem-container");
    const recipeContainer = document.querySelector(".recipeList");
    
    listItemContainer.forEach((itemContainer) => {
        itemContainer.addEventListener("click", () => {
            
            let ingredientFilter ;
            let applianceFilter ;
            let ustensilsFilter ;
            let filteredRecipe ;

            itemContainerContent = itemContainer.textContent;

            ingredientFilter = recipes.filter((recipe) => recipe.ingredients.some((ingredientArray) => 
            ingredientArray.ingredient.toLowerCase() == itemContainerContent.toLowerCase()));
            applianceFilter = recipes.filter((recipe) => recipe.appliance.toLowerCase() == itemContainerContent.toLowerCase());

            ustensilsFilter = recipes.filter((recipe) => recipe.ustensils.some((ustensilsArray) => 
            ustensilsArray.toLowerCase() == itemContainerContent.toLowerCase()));

            recipeContainer.innerHTML = "";
            addTag(itemContainerContent);
            removeTag();


            /* On verifie si l'??l??ment sur lequel on clique est un ingredient, un appareil ou un ustensils */
            if (itemContainer.getAttribute("id") === "ingredient-container") {
                displayRecipe(ingredientFilter);
                displayIngredient(ingredientFilter);
                displayUstensils(ingredientFilter);
                displayAppliance(ingredientFilter);
                
                if (searchBar.value.length > 0) {
                    recipeContainer.innerHTML = "" ;
                    filteredRecipe = relevantRecipe.filter((recipe) => recipe.ingredients.some((ingredientArray) => 
                    ingredientArray.ingredient.toLowerCase() == itemContainerContent.toLowerCase()));
                    displayRecipe(filteredRecipe);
                    displayIngredient(filteredRecipe);
                    displayAppliance(filteredRecipe);
                    displayUstensils(filteredRecipe);
                    
                }
            }

            if (itemContainer.getAttribute("id") === "appliance-container") {
                displayRecipe(applianceFilter);
                displayAppliance(applianceFilter);
                displayIngredient(applianceFilter);
                displayUstensils(applianceFilter);

                if (searchBar.value.length > 0) {
                    recipeContainer.innerHTML = "" ;
                    filteredRecipe = relevantRecipe.filter((recipe) => recipe.appliance.toLowerCase() == itemContainerContent.toLowerCase());
                    displayRecipe(filteredRecipe);
                    displayIngredient(filteredRecipe);
                    displayAppliance(filteredRecipe);
                    displayUstensils(filteredRecipe);
                    
                }
            }

            if (itemContainer.getAttribute("id") === "ustensils-container") {
                displayRecipe(ustensilsFilter);
                displayUstensils(ustensilsFilter);
                displayAppliance(ustensilsFilter);
                displayIngredient(ustensilsFilter);

                if (searchBar.value.length > 0) {
                    recipeContainer.innerHTML = "" ;
                    filteredRecipe = relevantRecipe.filter((recipe) => recipe.ustensils.some((ustensilsArray) => 
                    ustensilsArray.toLowerCase() == itemContainerContent.toLowerCase()));
                    displayRecipe(filteredRecipe);
                    displayIngredient(filteredRecipe);
                    displayAppliance(filteredRecipe);
                    displayUstensils(filteredRecipe);
                    
                }
            }

            
            sortRecipeByTag();

        });
        
    });
    
}


    /* Permet de chercher en ??crivant dans l'input  */

function inputSearch() {

    let listItemContainer ;

    inputGroup.forEach((input) => {
        let inputValue ;

        input.addEventListener("keyup", () => {
            inputValue = input.value ;
            
            /* On v??rifie dans quelle selectbox on est */
            
            if (input.getAttribute("id") == "ingredients") {
                listItemContainer = document.querySelectorAll("#ingredient-container");
                sortItem(listItemContainer);
            }

            if (input.getAttribute("id") == "appareils") {
                listItemContainer = document.querySelectorAll("#appliance-container");
                sortItem(listItemContainer);
            }

            if (input.getAttribute("id") == "ustensils") {
                listItemContainer = document.querySelectorAll("#ustensils-container");
                sortItem(listItemContainer);
                
            }

        });


        function sortItem(listItemContainer) {
            let itemArray = [] ;
              
            for (let i = 0; i < listItemContainer.length; i++) {
                itemArray.push(listItemContainer[i].textContent);
                
                if (!itemArray[i].includes(inputValue)) {
                    listItemContainer[i].style.display = "none";
                }

                if (itemArray[i].includes(inputValue) || inputValue.length == 0) {
                    listItemContainer[i].style.display = "flex" ;
                }
                
            }
                       
        }
    });
}

    /* Permet d'ajouter le tag et de le retirer */

function addTag(currentTag) {
    
    const tagListContainer = document.querySelector(".currentTagList");
    const tagContainer = document.createElement("li");
    const listItemContainer = document.querySelectorAll(".listeItem-container");

    tagContainer.classList.add("filter-style");
    tagListContainer.appendChild(tagContainer);
    tagListContainer.className = "currentTagList" ;
    
    tagContainer.innerHTML = currentTag;

   listItemContainer.forEach((itemContainer) => {

        if (itemContainer.getAttribute("id") === "ingredient-container") {
            ingredientList.push(itemContainer.textContent);
        }

        if (itemContainer.getAttribute("id") === "appliance-container") {
            applianceList.push(itemContainer.textContent);
        }

        if (itemContainer.getAttribute("id") === "ustensils-container") {
            ustensilsList.push(itemContainer.textContent);
        }
   });
        
    
    if (ingredientList.includes(itemContainerContent)) {
        tagContainer.style.backgroundColor = "#3282f7";
        tagContainer.id = "ingredient-tag" ;
    }

    if (applianceList.includes(itemContainerContent)) {
        tagContainer.style.backgroundColor = "#68d9a4";
        tagContainer.id = "appliance-tag" ;

    }

    if (ustensilsList.includes(itemContainerContent)) {
        tagContainer.style.backgroundColor = "#ed6454";
        tagContainer.id = "ustensils-tag" ;

    }



    
}

function removeTag() {
    
    
    const tagContainer = document.querySelectorAll(".filter-style");
    
    tagContainer.forEach((tag) => {
        tag.addEventListener("click", (e) => {
            
            const tagListContainer = document.querySelector(".currentTagList");
            const recipeContainer = document.querySelector(".recipeList");
            const searchBar = document.querySelector(".form-control");
            console.log(tag)
            console.log(tagListContainer)
            //tagListContainer.removeChild(tag) ;
            e.target.remove();
            //tag.parentNode.removeChild(tag);
            tagListContainer.className = "currentTagList" ;
           
            // recuperer la liste des tags 
    
            const tagList = document.querySelectorAll(".filter-style");
            let tagRemaining ; 
            
            
            recipeContainer.innerHTML = "";
            displayRecipe(relevantRecipe);
            let tagContentValue ;
            tagList.forEach((tagContent) => {

                tagContentValue = tagContent.textContent ;

                /* Re filtre les recettes selon le tag restant */
                if (tagContent.getAttribute("id") === "ingredient-tag") {
                    tagRemaining = relevantRecipe.filter((recipe) => recipe.ingredients.some((ingredientArray) => 
                    ingredientArray.ingredient.toLowerCase() == tagContent.textContent.toLowerCase()));
                    
                }

                if (tagContent.getAttribute("id") === "appliance-tag") {
                    tagRemaining = relevantRecipe.filter((recipe) => recipe.appliance.toLowerCase() == tagContent.textContent.toLowerCase());
                }

                if (tagContent.getAttribute("id") === "ustensils-tag") {
                    tagRemaining = relevantRecipe.filter((recipe) => recipe.ustensils.some((ustensilsArray) => 
                    ustensilsArray.toLowerCase() == tagContent.textContent.toLowerCase()));

                }

                if (searchBar.value.length == 0 && tagListContainer.childElementCount == 1) {
                    recipeContainer.innerHTML = "" ;
                    
                    //Il faut verifier si le tag restant est un ingredient, un ustensils ou un appareils et filtr?? 
                    if (tagContent.getAttribute("id") === "ingredient-tag") {
                        tagRemaining = recipes.filter((recipe) => recipe.ingredients.some((ingredientArray) => 
                        ingredientArray.ingredient.toLowerCase() == tagContentValue.toLowerCase())); 
                    }
    
                    if (tagContent.getAttribute("id") === "appliance-tag") {
                        tagRemaining = recipes.filter((recipe) => recipe.appliance.toLowerCase() == tagContentValue.toLowerCase());
                    }
    
                    if (tagContent.getAttribute("id") === "ustensils-tag") {
                        tagRemaining = recipes.filter((recipe) => recipe.ustensils.some((ustensilsArray) => 
                        ustensilsArray.toLowerCase() == tagContentValue.toLowerCase()));
    
                    }
    
    
                    displayRecipe(tagRemaining);
                    displayIngredient(tagRemaining);
                    displayAppliance(tagRemaining);
                    displayUstensils(tagRemaining);
                    
                }
            });
            //console.log(tagRemaining)

            if (searchBar.value.length == 0 && tagListContainer.childElementCount == 0) {
                recipeContainer.innerHTML = "" ;
                displayRecipe(recipes);
                displayIngredient(recipes);
                displayAppliance(recipes);
                displayUstensils(recipes);
            }

            

            if (searchBar.value.length > 0 && tagListContainer.childElementCount == 0) {
                recipeContainer.innerHTML = "" ;
                displayRecipe(relevantRecipe);
                displayIngredient(relevantRecipe);
                displayAppliance(relevantRecipe);
                displayUstensils(relevantRecipe);
            }
            
            if (searchBar.value.length > 0 && tagListContainer.childElementCount == 1) {
                recipeContainer.innerHTML = "" ;
                displayRecipe(tagRemaining) 
            }
            sortRecipeByTag()
        });
    });
}

init = async () => {
    displaySelectBox();
    displayIngredient(recipes);
    displayUstensils(recipes);
    displayAppliance(recipes);
    sortRecipeByTag();
    inputSearch();

};
init();
