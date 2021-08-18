const searchForm = document.querySelector('.form');
const searchResults = document.querySelector('.results');
const container = document.querySelector('.container');
let searchQuery = '';

// Edamam Details
const APP_ID = '45966af3';
const APP_key = 'a42ca5f7ad187f6e88af3f16dfbf26dd'

searchForm.addEventListener('submit', (e) => {
    // prevents the default behaviour of app
    e.preventDefault();

    // grabs the value entered into the search input
    searchQuery = e.target.querySelector('input').value;

    // Clears the search
    document.getElementById('form-data').value = '';

    // Fetches the API
    fetchAPI();
})

// Function that fetches the API
async function fetchAPI () {
    const baseURL = `https://api.edamam.com/api/recipes/v2?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&type=public`
    const response = await fetch(baseURL);
    // converts respose and stores it into a json file
    const data = await response.json();
    generateHTML(data.hits)
    console.log(data);
};
function generateHTML(results){
    // Removes initial class before displaying results
    container.classList.remove('initial');

    let generatedHTML = ''
    results.map(result => {
        generatedHTML +=
        `
        <div class="results__item">
            <img src="${result.recipe.image}" alt="">
                <div class="results__item-content">
                    <h1 class="results__item-content-title">${result.recipe.label}</h1>
                    <a class="results__item-content-recipe" href="${result.recipe.url}" target = "_blank">View Recipe</a>
                </div>
            <p class="results__item-data">Calories: ${result.recipe.calories.toFixed()}</p>
            <p class="results__item-data">Perfect For: ${result.recipe.mealType}</p>
            <p class="results__item-data">Dish Type: ${result.recipe.dishType}</p>
            <p class="results__item-data">Cuisine Type: ${result.recipe.cuisineType}</p>
        </div>
        `
    })

    searchResults.innerHTML = generatedHTML;
}