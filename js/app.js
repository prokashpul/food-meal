// button event handeler

const foodLoad = async() => {
    const dataInput = document.getElementById('search-input');
    const dataInputValue = dataInput.value;
    // input data clear
    dataInput.value = '';
    if (dataInputValue == '') {
        alert('Error')
    } else {
        // dynamic url
        const foodUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${dataInputValue}`;
        console.log(foodUrl)
            // api get
        const responce = await fetch(foodUrl);
        const data = await responce.json();
        foodDataDisplay(data);

    }

}
document.getElementById('search-btn').addEventListener('click', foodLoad);


// data display 
const foodDataDisplay = (foodData) => {
    console.log(foodData)
    const foodCard = document.getElementById('foodCard');
    foodCard.textContent = '';
    // foreach loop
    foodData.meals.forEach(food => {
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100" onclick='showDetails(${food.idMeal})'>
                    <img src="${food.strMealThumb}" class="card-img-top" alt="${food.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${food.strMeal}</h5>
                        <p class="card-text">${food.strInstructions.slice(0,200)}</p>
                    </div>
                </div>
        `

        foodCard.appendChild(div)
    });
}


const showDetails = async(details) => {

    const urlId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`

    const responce = await fetch(urlId);
    const data = await responce.json();
    displayDetails(data.meals[0])

}

const displayDetails = (foodDetails) => {
    console.log(foodDetails.strMeal)
    const show = document.getElementById('show');
    show.innerHTML = `
            <div class="card w-50 ">
            <img src="${foodDetails.strMealThumb}" class="card-img-top" alt="${foodDetails.strMeal}">
                <div class="card-body">
              <h5 class="card-title">${foodDetails.strMeal}</h5>
                <p class="card-text">${foodDetails.strInstructions.slice(0,100)}</p>
        <button class="btn btn-primary" onclick="closeDetels()">Close</button>
    </div>
   </div>
    `
}

const closeDetels = () => {
    const show = document.getElementById('show');
    show.textContent = '';

}