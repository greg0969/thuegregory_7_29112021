
const selectBox = document.querySelectorAll(".selectBox");
const inputGroup = document.querySelectorAll(".form-select");
const chevron = document.querySelectorAll(".chevron");
const selectedOption = document.querySelectorAll(".selectedOption");


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

/* Permet d'insérer les élément correspondant dans chaque selectBox  */

function displayIngredient(recipeArray) {
    let ingredientArray = [] ;
    const ingredientDropdown = document.querySelector(".listeItemIngredient")
    let ingredientContainer;
    ingredientDropdown.innerHTML = "" ;

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
    let ustensilsArray = [] ;
    const ustensilsDropdown = document.querySelector(".listeItemUstensils");
    let ustensilsContainer;
    ustensilsDropdown.innerHTML = "" ;

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
    
    let applianceArray = [];
    const applianceDropdown = document.querySelector(".listeItemAppareils");
    let applianceContainer;
    applianceDropdown.innerHTML = "" ;
    
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
    let itemContainerContent;
    
    listItemContainer.forEach((itemContainer) => {
        itemContainer.addEventListener("click", () => {
            
            let ingredientFilter ;
            let applianceFilter ;
            let ustensilsFilter ;
            itemContainerContent = itemContainer.textContent;

            ingredientFilter = recipes.filter((recipe) => recipe.ingredients.some((ingredientArray) => 
            ingredientArray.ingredient.toLowerCase() == itemContainerContent.toLowerCase()));

            applianceFilter = recipes.filter((recipe) => recipe.appliance.toLowerCase() == itemContainerContent.toLowerCase());

            ustensilsFilter = recipes.filter((recipe) => recipe.ustensils.some((ustensilsArray) => 
            ustensilsArray.toLowerCase() == itemContainerContent.toLowerCase()));

            recipeContainer.innerHTML = "";
            addTag(itemContainerContent);
            removeTag();
            if (itemContainer.getAttribute("id") === "ingredient-container") {
                displayRecipe(ingredientFilter);
                displayIngredient(ingredientFilter);
                
            }

            if (itemContainer.getAttribute("id") === "appliance-container") {
                displayRecipe(applianceFilter);
                displayAppliance(applianceFilter);
            }

            if (itemContainer.getAttribute("id") === "ustensils-container") {
                displayRecipe(ustensilsFilter);
                displayUstensils(ustensilsFilter);
                
            }
            sortRecipeByTag();
        });
    });
}


    /* Permet de chercher en écrivant dans l'input  */

function inputSearch() {

    let listItemContainer ;

    inputGroup.forEach((input) => {
        let inputValue ;

        input.addEventListener("keyup", () => {
            inputValue = input.value ;
            
            /* On vérifie dans quelle selectbox on est */
            
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

    tagContainer.classList.add("filter-style",);
    tagListContainer.appendChild(tagContainer);
    tagListContainer.className = "currentTagList" ;
    tagContainer.style.backgroundColor = "#3282f7" ;
    tagContainer.innerHTML = currentTag;

    
}

function removeTag() {
    
    const tagListContainer = document.querySelector(".currentTagList");
    const tagContainer = document.querySelectorAll(".filter-style");

    tagContainer.forEach((tag) => {
        tag.addEventListener("click", () => {
            const recipeContainer = document.querySelector(".recipeList");
            const searchBar = document.querySelector(".form-control");
            tagListContainer.removeChild(tag) ;

            tagListContainer.className = "currentTagList" ;
            // recuperer la liste des tags 
    
            const tagList = document.querySelectorAll(".filter-style");
            let tagRemaining ;        
    
            // repartir a zero => refaire la recherche globale
    
            // recipeContainer.innerHTML = "";
            // displayRecipe(relevantRecipe);
    
            // filtrer le tableau selon les tags restant
    
            // tagList.forEach((tagContent) => {
            //     tagRemaining = recipes.filter((recipe) => recipe.ingredients.some((ingredientArray) => 
            //     ingredientArray.ingredient.toLowerCase() == tagContent.textContent.toLowerCase()));

            //     if (searchBar.value.length == 0 && tagListContainer.childElementCount == 0) {
            //         recipeContainer.innerHTML = "" ;
            //         displayRecipe(recipes);
            //         console.log("ya rien dans la search bar et ya pas de tags")
            //     }

            //     if (tagListContainer.childElementCount == 0 && searchBar.value.length > 0) {
            //         recipeContainer.innerHTML = "" ;
            //         displayRecipe(relevantRecipe);
            //         console.log("ya plus de tags mais ya un mot dans la search bar")
    
            //     }
                
            //     else {
            //         recipeContainer.innerHTML = "" ;
            //         displayRecipe(tagRemaining) ;
            //         sortRecipeByTag();
        
            //     }
            //     sortRecipeByTag();
               
            // });
            
            
           
            displayIngredient(relevantRecipe);
            displayAppliance(relevantRecipe);
            displayUstensils(relevantRecipe);
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
