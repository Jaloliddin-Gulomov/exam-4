const form = document.querySelector("#register-form")
const loginForm = document.querySelector("#login-form")
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const street = document.querySelector("#street");
const numberInp = document.querySelector("#number");
const zipcode = document.querySelector("#zipcode")
const email = document.querySelector("#email");
const loginUsername = document.querySelector("#login-username");
const nameInp = document.querySelector("#nameInp");
const lastName = document.querySelector("#last-name");
const password = document.querySelector("#password");
const loginPassword = document.querySelector("#login-password");
const phone = document.querySelector("#phone");
const username = document.querySelector("#username");

form.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            address:{
                city: city.value,
                street: street.value,
                number: numberInp.value,
                zipcode: zipcode.value
            },
            email: email.value,
            name:{
                firstname: nameInp.value,
                lastname: lastName.value
            },
            password: password.value,
            phone: phone.value,
            username: username.value
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
})
loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(loginPassword.value)
    fetch("https://fakestoreapi.com/auth/login", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                username: loginUsername.value,
                password: loginPassword.value
            })
    })
            .then(response => response.json())
            .then(data => {
                if(data.token) {
                    localStorage.setItem("token", data.token)
                    if(localStorage.getItem("token")){
                        window.location.href = "https://monumental-biscotti-2ad179.netlify.app/profile.html"
                    }
                }
            })
})

if(localStorage.getItem("token")){
    window.location.href = "https://monumental-biscotti-2ad179.netlify.app/profile.html"
}
