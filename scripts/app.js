const searchFoodForm = document.getElementById('searchFoodForm');
const foodName = document.getElementById('foodName');
const foodArea = document.getElementById('foodArea');




// showing foods after search by a single charecter
function showAllFoods(data) {
    // foodCollections is an array which is containing all food details in particular index
    const foodColllections = data.meals;
    // this forEach loop works one time for every single & giving food's Information
    foodColllections.forEach((elements => {
        // Getting foodNames and foodPhotos
        const foodPhoto = elements.strMealThumb;
        const foodName = elements.strMeal;
        // creating a box for particular single food img and title
        const child = document.createElement('div');
        child.className = 'child';
        // createing a div for storing photo
        const photosParent = document.createElement('div');
        photosParent.className = 'childsPhoto';
        // inserting image into child div
        photosParent.innerHTML = `<img alt='Photo is not found' src=${foodPhoto}>`;
        const pTagForFoodName = document.createElement('p');
        pTagForFoodName.className = "text-center mt-2 dishName";
        pTagForFoodName.innerHTML = foodName;
        // Create ul for storing strIngredients
        let ul = document.createElement('ul');
        ul.className = "d-none";
        // get ingredients dinamically with for loop
        for (k = 0; k < 10; k++) {
            let b = k + 1;
            strIngredient = elements[`strIngredient${b}`];
            // create li
            const li = document.createElement('li');
            if (strIngredient === '' || strIngredient == null || strIngredient == undefined) {
                li.innerHTML = "This Ingredient name is empty";
            } else {
                li.innerHTML = strIngredient;
            }
            ul.appendChild(li);
        }
        // insert elements to their parent div
        child.appendChild(photosParent);
        child.appendChild(pTagForFoodName);
        child.appendChild(ul);
        // finally storing informations of a single food
        foodArea.appendChild(child);
    }));
}



// validation
function validation(data) {
    if (foodArea.children[0]) {
        let childrens = document.querySelectorAll('.child');
        for (var i = 0; i < childrens.length; i++) {
            childrens[i].remove();
        }
        showAllFoods(data);
    } else {
        showAllFoods(data);
    }
}



// show warnings
function showWarnings(color, msg) {
    foodName.style.border = "2px solid red";
    foodName.setAttribute('placeholder', `${msg}`);
    foodName.style.color = `${color}`;
}

// show alert
function showAlert(alert){
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alertDiv';
    alertDiv.innerHTML = `<p>${alert}</p>`;
    document.body.appendChild(alertDiv);
    setTimeout(()=>{
        document.querySelector('.alertDiv').remove();
    },1500)
}


// keyup search validation
foodName.addEventListener('keyup', (e) => {
    let ingredient3 = document.getElementById('ingredients');
    foodArea.classList.add('d-none');
    ingredient3.classList.add('d-none');
})

function freeContainer(){
    if(foodArea.classList.contains('d-none')){
        foodArea.classList.remove('d-none');
    }
}


function freeIngredient(){
    let ingredient3 = document.getElementById('ingredients');
    if(ingredient3.classList.contains('d-none')){
        ingredient3.classList.remove('d-none');
    }
}




// add Ingredients
function addIngredients(ul) {
    let showList = document.getElementById('showList');
    let listParent = ul;
    for (let i = 0; i < 10; i++) {
        let lis = document.createElement('li');
        lis.className = "listi";
        if (ul.children[i].innerText == "This Ingredient name is empty") {
            lis.innerText = "This Ingredient name is empty";
            lis.style.color = "red";
        }else{
            lis.innerHTML = listParent.children[i].innerHTML;
        }
        showList.appendChild(lis);
    }
}
// remove existing gredients
function remAddIngredients(ul) {
    if (showList.children[0]) {
        let listi = document.querySelectorAll('.listi');
        for (let i = 0; i < listi.length; i++) {
            listi[i].remove();
        }
        addIngredients(ul);
    }else{
        addIngredients(ul);
    }
}
// show food functions
function showSingleFood(imgSrc, name, ul) {
    let showPhoto = document.querySelector('.showPhoto img');
    showPhoto.setAttribute('src', `${imgSrc}`);
    showPhoto.style.height = "350px";
    document.querySelector('.showName').innerHTML = `${name}`;
    document.querySelector('.showTitle').innerHTML = "Ingredeints";
    remAddIngredients(ul);
}


// described food
function describedFood() { 
    foodArea.addEventListener('click', (e) => {

        if (e.target.classList.contains('child')) {
            let imgSrc = e.target.children[0].children[0].getAttribute('src');
            let name = e.target.children[1].innerText;
            let ul = e.target.children[2];
            showSingleFood(imgSrc, name, ul);
        }

        if (e.target.parentElement.parentElement.classList.contains('child')) {
            let imgSrc = e.target.getAttribute('src');
            let name = e.target.parentElement.parentElement.children[1].innerText;
            let ul = e.target.parentElement.parentElement.children[2];
            showSingleFood(imgSrc, name, ul);
        }

        if (e.target.parentElement.classList.contains('child')) {
            let imgSrc = e.target.parentElement.children[0].children[0].getAttribute('src');
            let name = e.target.innerText;
            let ul = e.target.parentElement.children[2];
            showSingleFood(imgSrc, name, ul);
        }

        freeIngredient();

    })
}





// fetch data is the part of else in next function
async function fetchData() {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${foodName.value}`;
    const Data = await fetch(url);
    const response = await Data.json();
    const data = await response;
    if (data) {
        validation(data);
        describedFood();
        freeContainer();
    }

}





// search food and show food in container
function searchFoods() {
    searchFoodForm.addEventListener('submit', (e) => {
        const foodNameLength = foodName.value.length;
        if (foodName.value == "") {
            showAlert("Please Insert a single charecter bewtween A-Z");
        }
        else if (foodNameLength > 1) {
            showAlert('You can only insert a single Charecter like a or b or z');
        } else {
            // we are the part of else
            fetchData();
            
        }
        e.preventDefault();
    })
} searchFoods();












