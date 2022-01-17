
const selectBox = document.querySelectorAll(".selectBox");
const inputGroup = document.querySelectorAll(".form-select");
const chevron = document.querySelectorAll(".chevron");
const selectedOption = document.querySelectorAll(".selectedOption");
let ingredientArray = [] ;
let applianceArray = [];
let ustensilsArray = [] ;

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

function displayIngredient() {
    const ingredientDropdown = document.querySelector(".listeItemIngredient")
    let ingredientContainer;
    


    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            ingredientArray.push(recipes[i].ingredients[j].ingredient.toLocaleLowerCase());


        }

    }

    ingredientArray = [...new Set(ingredientArray)];
    ingredientArray.sort();
    for (let i = 0; i < ingredientArray.length; i++) {
        ingredientContainer = document.createElement("p");
        ingredientContainer.classList.add("ingredient-container", "listeItem-container");
        ingredientDropdown.appendChild(ingredientContainer);
        ingredientContainer.innerHTML = ingredientArray[i]
    }
}

function displayUstensils() {
    const ustensilsDropdown = document.querySelector(".listeItemUstensils");
    let ustensilsContainer;
  
    //ustensilsArray.push(recipes.map(recipe => recipe.ustensils));


    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ustensils.length; j++) {
            ustensilsArray.push(recipes[i].ustensils[j].toLocaleLowerCase());
        }
    }


    for (let i = 0; i < ustensilsArray.length; i++) {
        ustensilsArray = [...new Set(ustensilsArray)];
        ustensilsContainer = document.createElement("p");
        ustensilsContainer.classList.add("ustensils-container", "listeItem-container");
        ustensilsDropdown.appendChild(ustensilsContainer);
        ustensilsContainer.innerHTML = ustensilsArray[i];
    }
}

function displayAppliance() {
    const applianceDropdown = document.querySelector(".listeItemAppareils");
    let applianceContainer;

    recipes.forEach((recipe) => {
        applianceArray.push(recipe.appliance);
    });
    for (let i = 0; i < applianceArray.length; i++) {
        applianceArray = [...new Set(applianceArray)];
        applianceContainer = document.createElement("p");
        applianceContainer.classList.add("appliance-container", "listeItem-container");
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
            itemContainerAttr = itemContainer.getAttribute("class") ;

            ingredientFilter = recipes.filter((recipe) => recipe.ingredients.some((ingredientArray) => 
            ingredientArray.ingredient.toLowerCase() == itemContainerContent.toLowerCase()));

            applianceFilter = recipes.filter((recipe) => recipe.appliance.toLowerCase() == itemContainerContent.toLowerCase());

            ustensilsFilter = recipes.filter((recipe) => recipe.ustensils.some((ustensilsArray) => 
            ustensilsArray.toLowerCase() == itemContainerContent.toLowerCase()));

            recipeContainer.innerHTML = "";
            addTag(itemContainerContent);

            if (itemContainerAttr = "ingredient-container") {
                
                displayRecipe(ingredientFilter);
            }
            if (itemContainerAttr = "appliance-container") {

                displayRecipe(applianceFilter);
            }

            if (itemContainerAttr = "ustensils-container") {
               
                displayRecipe(ustensilsFilter);
            }

           
           
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

            /* On vérifie dans quelle selecbox on est */
            
            if (input.getAttribute("id") == "ingredients") {
                listItemContainer = document.querySelectorAll(".ingredient-container");
                sortItem(listItemContainer);
                    
            }

            if (input.getAttribute("id") == "appareils") {
                listItemContainer = document.querySelectorAll(".appliance-container");
                sortItem(listItemContainer);
            }

            if (input.getAttribute("id") == "ustensils") {
                listItemContainer = document.querySelectorAll(".ustensils-container");
                sortItem(listItemContainer);
            }

        });


        function sortItem(listItemContainer) {
            let itemArray = [] ;
                     
            for (let i = 0; i < listItemContainer.length; i++) {
                itemArray.push(listItemContainer[i].textContent);
                //const regex = new RegExp(itemArray[i]);

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
    const recipeContainer = document.querySelector(".recipeList");
    const tagListContainer = document.querySelector(".currentTagList");
    const tagContainer = document.createElement("div");

    tagContainer.classList.add("filter-style",);
    tagListContainer.appendChild(tagContainer);
    tagContainer.style.backgroundColor = "#3282f7";
    tagContainer.innerHTML = currentTag;

    tagContainer.addEventListener("click", () => {
        tagListContainer.removeChild(tagContainer)
        recipeContainer.innerHTML = "";
        displayRecipe(recipes);
    });
}

init = async () => {
    displaySelectBox();
    displayIngredient();
    displayUstensils();
    displayAppliance();
    sortRecipeByTag();
    inputSearch();
};
init();
