let tempo = null, objTempo, dblClic = false;

const selectBox = document.querySelectorAll(".selectBox");
const inputGroup = document.querySelectorAll(".form-select");
const selectGroup = document.querySelectorAll(".fa-chevron-down");

for (let i = 0; i < inputGroup.length; i++) {

    selectGroup[i].addEventListener("click", () => {
        const liste = document.querySelectorAll(".listeItem");
        if (liste[i].style.display == "" || liste[i].style.display == "none") {
            liste[i].style.display = "block";
            selectGroup[i].setAttribute("class","fas fa-chevron-up");
        }

        else {
            liste[i].style.display = "none";
            selectGroup[i].setAttribute("class","fas fa-chevron-down");
        }

    })

    inputGroup[i].addEventListener("click", () => {
        if (tempo != null)
            clearTimeout(tempo);

        if (inputGroup[i].readOnly == true) {
            inputGroup[i].readOnly = false;
            inputGroup[i].style.border = "inset #AAAAAA 1px";
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

const currentTag = document.querySelectorAll(".filter-style");
currentTag.forEach((tag) => {
    if (tag.textContent == "Coco") {
        tag.style.backgroundColor = "#3282f7";
    }

    tag.addEventListener("click", () => {
        tag.style.display = "none";
    })
})
let ingredients = document.querySelector(".listeItemIngredients");
let appareils = document.querySelector(".listeItemAppareils");
let ustensils = document.querySelector(".listeItemUstensils");

// ingredients.innerHTML += displayAppareils();
// appareils.innerHTML += displayAppareils();
// ustensils.innerHTML += displayustensils();
