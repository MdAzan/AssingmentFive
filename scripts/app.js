const searchFoodForm = document.getElementById('searchFoodForm');
const foodName = document.getElementById('foodName');
const foodArea = document.getElementById('foodArea');
let showPhoto = document.querySelector('.showPhoto img');
let showName = document.querySelector('.showName');
let showTitle = document.querySelector('.showTitle');
let showList = document.getElementById('showList');



// creat food container
// div#foodArea > child > (photoBox>img + 
function foodContainer(data){
    const foodColllections = data.meals;
    const totalFood = data.meals.length;
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
        // creating title for foodName
        const title = document.createElement('div');
        title.innerHTML = `<p class='text-center my-3 titles'>${foodName} foods item</p>`;
        // Ingradients
        let ul = document.createElement('ul');
        ul.className = "d-none";
        let i1 = elements.strIngredient1;
        let i2 = elements.strIngredient2;
        let i3 = elements.strIngredient3;
        let i4 = elements.strIngredient4;
        let i5 = elements.strIngredient5;
        let i6 = elements.strIngredient6;
        let i7 = elements.strIngredient7;
        let i8 = elements.strIngredient8;
        let i9 = elements.strIngredient9;
        let i10 = elements.strIngredient10;

        listElements = [i1,i2,i3,i4,i5,i6,i7,i8,i9,i10]
        for(i=0; i<listElements.length; i++){
            let li = document.createElement('li');
            li.innerHTML = listElements[i];
            ul.appendChild(li);
            if(listElements[i] == "" || listElements[i] == null || listElements[i] == undefined){
                li.innerHTML = "will be updated very soon";
            }
        }
        // insert elements to their parent div
        child.appendChild(photosParent);
        child.appendChild(title);
        child.appendChild(ul);
        foodArea.appendChild(child);
    }));
}



// validation
function validation(data){
    if(foodArea.children[0]){
        let childrens = document.querySelectorAll('.child');
        for(var i = 0; i< childrens.length; i++){
         childrens[i].remove();
        }
        foodContainer(data);  
    }else{
        foodContainer(data);
    }
}



// search food and show food in container
function searchFoods(){
    searchFoodForm.addEventListener('submit', (e) => {
        if(foodName.value == ""){
            foodName.style.border = "2px solid red";
            foodName.setAttribute('placeholder', 'Please insert a food name!');
            foodName.style.color = "red";
        }
        else
        {
            const firstLetterOfFoods = foodName.value;
            if(firstLetterOfFoods.length == 1){
                if(showList.parentElement){
                    showList.parentElement.classList.add('d-none');
                }
                // fetch data
                const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetterOfFoods}`;
                fetch(url)
                .then(res => res.json())
                .then(data => {
                // if data is not null, show food items else return error
                if(data.meals){
                        new Promise((resolve, reject) => {
                            validation(data);
                            resolve("successfully created")
                        })
                        .then(() => {
                            //let childs = document.querySelectorAll('.child');
                            foodArea.addEventListener('click', (e) => {
                                let father = e.target.parentElement.parentElement;
                                if(father.classList.contains('child')){
                                    if(showList.parentElement.classList.contains('d-none')){
                                        showList.parentElement.classList.remove('d-none');
                                    }

                                    const imgSrc = e.target.getAttribute('src');
                                    showPhoto.setAttribute("src", `${imgSrc}`);
                                    showPhoto.style.height = "350px";
                                    showName.innerHTML = father.children[1].children[0].innerText;
                                    showName.classList.add('my-4')
                                    showTitle.innerText = "Ingradients";
                                    // show ingdredients

                                    
                                    if(showList.children[0]){
                                        let listi = document.querySelectorAll('.listi');
                                        for(let i = 0; i < listi.length; i++){
                                            listi[i].remove();
                                        }
                                    }

                                    for(let i = 0; i < 10; i++){
                                        if(father.children[2].children[i]){
                                            let li = father.children[2].children[i];
                                            let lis = document.createElement('li');
                                            lis.className = "listi";
                                            lis.innerHTML = li.innerText;
                                            showList.appendChild(lis); 
                                        }
                                    }     
                                }
                            })
                        })
                }
                })
            }else{
                foodName.style.borderColor = "red";
                foodName.value = 'type a single letter like a, b, c....., z ! Just use one letter of 26';
                foodName.style.color = "red";
            }
        }
        e.preventDefault();
    })
}searchFoods();



// another warnings
foodName.addEventListener('keyup', (e) => {
    if(foodName.value != ""){
        foodName.style.borderColor = "green";
        foodName.setAttribute('placeholder', 'type a single letter like a, b, c....., z!');
        foodName.style.color = "green";
    }
})
