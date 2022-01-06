
let tempo = null, objTempo, dblClic = false;
const selectBox = document.querySelectorAll(".selectBox");
const inputGroup = document.querySelectorAll(".form-select");
const chevron = document.querySelectorAll(".fa-chevron-down");

function displaySelectBox() {
    for (let i = 0; i < inputGroup.length; i++) {
        const liste = document.querySelectorAll(".listeItem");
        const selectedOption = document.querySelectorAll(".selectedOption");
    
        chevron[i].addEventListener("click", () => {

            if (liste[i].style.display == "" || liste[i].style.display == "none") {
                liste[i].style.display = "flex";
                selectedOption[i].style.width = "26em";
                chevron[i].className = "fas fa-chevron-up";
                inputGroup[i].style.borderColor = "#68d9a4";

            }
            if (tempo != null) {
                clearTimeout(tempo);

            }
    
            if (inputGroup[i].readOnly == true) {
                inputGroup[i].readOnly = false;
                inputGroup[i].focus();
            }
                
    
            else {
                liste[i].style.display = "none";
                selectedOption[i].style.width = "unset"
                chevron[i].className = "fas fa-chevron-down";
                inputBlur(inputGroup[i]);
                tempo = null;

            }
           
        })
    
        
        function mouseClicTempo() {
            document.getElementById("ingredients").value = objTempo.value;
            document.getElementById("appareils").value = objTempo.value;
            document.getElementById("ustensils").value = objTempo.value;
            gestionListe();
            tempo = null;
        }

        function mouseClic() {

            objTempo = inputGroup[i];

            if (tempo == null && inputGroup[i].readOnly == true) {
                tempo = setTimeout("mouseClicTempo()", "300");
            }

        }



        function inputBlur() {

            if (inputGroup[i].readOnly == false) {
                inputGroup[i].readOnly = true;
            }

        }

        function mouseOver() {
            inputGroup[i].className = "item itemOver";


        }

        function mouseOut() {
            inputGroup[i].className = "item itemOut";


        }
     
    }
    
}


function displayIngredient() {
    const ingredientDropdown = document.querySelector(".listeItemIngredient")
    let ingredientContainer ;
    let ingredientArray = [] ;


    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            ingredientArray.push(recipes[i].ingredients[j].ingredient.toLocaleLowerCase());
            
            
        }  
        
    }
    
    ingredientArray = [...new Set(ingredientArray)];
    for (let i = 0; i < ingredientArray.length; i++) {
        ingredientContainer = document.createElement("p");
        ingredientContainer.classList.add("ingredient-container","listeItem-container");
        ingredientDropdown.appendChild(ingredientContainer) ;
        ingredientContainer.innerHTML = ingredientArray[i]
    }
}
displayIngredient() ;

function displayUstensils() {
    const ustensilsDropdown = document.querySelector(".listeItemUstensils");
    let ustensilsContainer ;
    let ustensilsArray = [] ;
    //ustensilsArray.push(recipes.map(recipe => recipe.ustensils));
    

    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ustensils.length; j++) {
            ustensilsArray.push(recipes[i].ustensils[j].toLocaleLowerCase());
        }   
    }


    for (let i = 0; i < ustensilsArray.length ; i++) {
        ustensilsArray = [...new Set(ustensilsArray)]; 
        ustensilsContainer = document.createElement("p");
        ustensilsContainer.classList.add("ustensils-container","listeItem-container");
        ustensilsDropdown.appendChild(ustensilsContainer) ;
        ustensilsContainer.innerHTML = ustensilsArray[i] ;
    }
}
displayUstensils();

function displayAppliance() {
    const applianceDropdown = document.querySelector(".listeItemAppareils");
    let applianceContainer ;
    let applianceArray = [] ;
   
    recipes.forEach((recipe) => {
        applianceArray.push(recipe.appliance);
    });
    for (let i = 0; i < applianceArray.length ; i++) {
        applianceArray = [...new Set(applianceArray)]; 
        applianceContainer = document.createElement("p");
        applianceContainer.classList.add("appliance-container","listeItem-container");
        applianceDropdown.appendChild(applianceContainer) ;
        applianceContainer.innerHTML = applianceArray[i] ;
    }
}
displayAppliance();   

const listItemContainer = document.querySelectorAll(".listeItem-container");
const recipeContainer = document.querySelector(".recipeList");
let itemContainerContent ;
let applianceFilter ;

    listItemContainer.forEach((itemContainer) => {
        itemContainer.addEventListener("click", () => {
            itemContainerContent = itemContainer.textContent;
            applianceFilter = recipes.filter((recipe) => recipe.appliance.toLowerCase() == itemContainerContent.toLowerCase());
            ingredientsFilter = recipes.filter((recipe) =>recipe.ingredients.some((ingredientArray) => ingredientArray.ingredient.toLowerCase() == itemContainerContent.toLowerCase()));
            ustensilsFilter = recipes.filter((recipe) =>recipe.ustensils.some((ustensilsArray) => ustensilsArray.toLowerCase() == itemContainerContent.toLowerCase()));
            recipeContainer.innerHTML = "" ;
            displayRecipe(applianceFilter) ;
            addTag(itemContainerContent)
        });
    }); 


function addTag(currentTag) {
    const recipeContainer = document.querySelector(".recipeList");
    const tagListContainer = document.querySelector(".currentTagList");
    const tagContainer = document.createElement("p");
    tagContainer.classList.add("filter-style");
    tagListContainer.appendChild(tagContainer);
    tagContainer.style.backgroundColor = "#3282f7";
    tagContainer.innerHTML = currentTag ;
    tagContainer.addEventListener("click", () => {
        tagContainer.style.display = "none";
        recipeContainer.innerHTML = "" ;
        displayRecipe(recipes);
    });
}

init = async () => {
    displaySelectBox();
    
  };
  init();
  