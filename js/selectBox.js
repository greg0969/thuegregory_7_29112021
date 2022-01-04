
let tempo = null, objTempo, dblClic = false;


const selectBox = document.querySelectorAll(".selectBox");
const inputGroup = document.querySelectorAll(".form-select");
const chevron = document.querySelectorAll(".fa-chevron-down");


for (let i = 0; i < inputGroup.length; i++) {
    const liste = document.querySelectorAll(".listeItem");
    const selectedOption = document.querySelectorAll(".selectedOption");

    chevron[i].addEventListener("click", () => {
        
        if (liste[i].style.display == "" || liste[i].style.display == "none") {
            liste[i].style.display = "flex";
            selectedOption[i].style.width = "20em";
        }

        else {
            liste[i].style.display = "none";
            selectedOption[i].style.width = "unset"
        }
       
    })
    
    // 
    
   

    inputGroup[i].addEventListener("click", () => {
        if (tempo != null)
            clearTimeout(tempo);

        if (inputGroup[i].readOnly == true) {
            inputGroup[i].readOnly = false;
            inputGroup[i].focus();
        }
        else
            inputBlur(inputGroup[i]);

        tempo = null;
    });



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
            //input.style.textAlign = "center";
            inputGroup[i].style.border = "none";
        }

    }

    function mouseOver() {
        inputGroup[i].className = "item itemOver";


    }

    function mouseOut() {
        inputGroup[i].className = "item itemOut";


    }
}

let ingredientList = [];
let applianceList ;
let ustensilList ; 

// function displayIngredient() {
//     const ingredientDropdown = document.querySelector(".listeItemIngredient")
//     let ingredientContainer ;
//     let ingredientArray ;

//     for (let r = 0; r < recipes.length; r++) {
//         for (let i = 0; i < recipes[r].ingredients.length; i++){
//             ingredientList.push(recipes[r].ingredients[i].ingredient) ;

//             ingredientList = [...new Set(ingredientList)];
            
//             ingredientContainer = document.createElement("p");
//             ingredientContainer.classList.add("ingredient-container");
//             ingredientContainer.innerHTML += ingredientList[i] ;
//             ingredientDropdown.appendChild(ingredientContainer) ;
//             ingredientContainerContent = document.querySelectorAll(".ingredient-container")
            
//             // ingredientContainerContent.appendChild("oneIngredient");
//             console.log(ingredientList)
//         }
//     }
    
    
//     //ingredientList = [...new Set(ingredientList)];
//     //console.log("liste d'ingredient :", ingredientList)


//     // ingredientList.forEach((oneIngredient) => {
//     //     
//     // });

// }

//displayIngredient() ;


function displayAppliance() {
    const applianceDropdown = document.querySelector(".listeItemAppareils")
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



function addTag() {
    const currentTag = document.querySelectorAll(".filter-style");
    currentTag.forEach((tag) => {
        if (tag.textContent == "Coco") {
            tag.style.backgroundColor = "#3282f7";
        }

        tag.addEventListener("click", () => {
            tag.style.display = "none";
        })
    })
}



