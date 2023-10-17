// Initial References

let result = document.getElementById("result");
let searchBtn = document.getElementById("search-button");
let subBtn = document.querySelector("#sub-btn");
let contect = document.querySelector(".contect");
let closeBtns = document.querySelector("#closeBtn");



subBtn.addEventListener('click', () => {
  contect.style.display = "block"; 
  
  setTimeout(() => {
    contect.style.display = "none";
  }, 2000);
  if(closeBtns.click()){
    
    const modal = document.querySelector('.modal-content');
    modal.style.display = "none";
    const backdrop = document.querySelector('.modal-backdrop');
    backdrop.style.display = "none";
  }

let textInputs = document.querySelector('#textInputs');
let mobileNumbers = document.querySelector('#mobileNumbers');
let emailInputs = document.querySelector('#emailInputs');
  
textInputs.value = "";
mobileNumbers.value = "";
emailInputs.value = "";
  
});


let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
// console.log(url)

let userInp = document.getElementById("user-inp").value;

searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
    setTimeout(() => {
      result.innerHTML = '';
    }, 2000);
  } else {
    result.innerHTML = `<p class="loading">Loading...</p>`;
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let myMeal = data.meals[0];
        let count = 1;
        let ingredients = [];
        console.log(ingredients)
        for (let i in myMeal) {
          let ingredient = "";
          let measure = "";

          if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            // console.log(ingredient)
            measure = myMeal[`strMeasure` + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }

        console.log(ingredients);

        result.innerHTML = `
        <img src=${myMeal.strMealThumb}>
        <div class="details"><h2>${myMeal.strMeal}</h2></div>
        <div class="details"><h4>${myMeal.strArea}</h4></div>
        <div id="ingredient-con"></div>
        <div id="recipe">
        <button id="hide-recipe">X</button>
        <pre id="instructions">${myMeal.strInstructions}</pre>
        </div>

        <button id="show-recipe">View Recipe</button>
        <button class="show-recipes" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Buy Now</button>

        `;

        let ingrdientCon = document.getElementById("ingredient-con");
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");

        ingredients.forEach((i) => {
          let child = document.createElement("li");
          child.innerText = i;
          parent.appendChild(child);
          ingrdientCon.appendChild(parent);
        });

        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
        });

        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      }).catch(() => {
        result.innerHTML = `<h3>Invalid Input</h3>`;
        setTimeout(() => {
          result.innerHTML = '';
        }, 2000);
      })

  }
});



const emailForm = document.getElementById("emailForm");
const emailInput = document.getElementById("emailInput");

emailForm.addEventListener('submit', function (event) {
    if (!emailInput.checkValidity()) {
        alert("Please enter a valid email address.");
        event.preventDefault(); // Prevent form submission if the email is invalid
    }
});