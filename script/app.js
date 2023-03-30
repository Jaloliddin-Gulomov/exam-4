const $bigCard = document.querySelector(".big_card");
const logOut = document.querySelector("#log-out");

logOut.addEventListener("click", () => {
    const isAgreeToOut = confirm("Haqiqatdan ham chiqib ketmoqchimisiz?");
    if(isAgreeToOut){
        localStorage.removeItem("token")
        window.location.href = "https://elegant-paprenjak-e3c3f1.netlify.app/index.html"
    }
    
})

const getData = () => {
    fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach(product => {
            const productCard = document.createElement("div")
            productCard.className = "card"
            productCard.innerHTML = `
            <img class="image" src="${product.image}" alt="${product.category}">`

            const cardControl = document.createElement("div")
            cardControl.className = "card_control"
            cardControl.innerHTML = `
            <div class="price">
                <h4>${product.title.slice(0, 16)}</h4>
                <strong>${product.price}$</strong>
            </div>
            <p class="card_small_text">${product.description.slice(0, 55)}</p>
            `

            const cardBox = document.createElement('div');
            cardBox.className = "card_box";
            cardBox.innerHTML = `<button data-id="${product.id}" class="box"><i class="fa-sharp fa-solid fa-trash-can"></i></button>`
            productCard.appendChild(cardControl);
            cardControl.appendChild(cardBox)
            $bigCard.appendChild(productCard)

            const star = Math.round(product.rating.rate);
            const arr =[];
            for(i = 1; i <= star; i++){
            arr.push(i)
            }

            const wrapper = document.createElement('div');
            wrapper.className = "wrapper"
            arr.forEach(starCount => {
                starCount = document.createElement('img');
                starCount.setAttribute('src', "icon/star.svg")
                wrapper.appendChild(starCount)
                cardBox.appendChild(wrapper)
            })
        })
    })
}

getData();

$bigCard.addEventListener("click", (e) => {
    if(e.target.className == "box"){
        fetch(`https://fakestoreapi.com/products/${e.target.dataset.id}`, {method: "DELETE"})
        .then(() =>{
            let isAgreeToDelete = confirm(`Haqiqatdan ham o'chirmoqchimisiz?`)
            if(isAgreeToDelete){
                alert("O'chirildi")
                console.log("Deleted")
                getData();
            }
        })     
    }
})



