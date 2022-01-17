
let jumboContainer = document.createElement('div')
jumboContainer.className = "jumbotron jumbotron-fluid"
jumboContainer.innerHTML = `<div class="container"><h1 class="display-3">&nbsp;</h1></div>`
document.body.appendChild(jumboContainer)



let h1 = document.createElement('H1')
h1.innerHTML = `<strong>Welcome, please log in.</strong>`
h1.className = "title"
document.body.appendChild(h1)


const userNameInput = document.createElement('input')
const userPassInput = document.createElement('input')
const inputDivs1 = document.createElement('div')
const inputDivs2 = document.createElement('div')
const inputDivs3 = document.createElement('div')
const inputDivs4 = document.createElement('div')
const inputDivs5 = document.createElement('div')
const inputDivs6 = document.createElement('div') //sign up div
const inputDivs7 = document.createElement('div') //container for sign up
const loginButton = document.createElement('button')
const formSection = document.createElement('form')

inputDivs1.className = "container col-12-md"
inputDivs2.className = "row"
inputDivs3.className = "col-12-sm d-block"
inputDivs4.className = "row present col-12-md"
inputDivs5.className = "footer col-12-md"
inputDivs6.className = "row col-12"
inputDivs7.className = "container sign col-12-md"

userNameInput.className = "d-block"
userNameInput.id = "userinput"
userPassInput.className = "d-block"
userPassInput.id = "passinput"


userNameInput.setAttribute("type", "text")
userNameInput.setAttribute("name", "username")
userNameInput.setAttribute("placeholder", "Username")

userPassInput.setAttribute("style", "margin-top: 5px;")
userPassInput.setAttribute("type", "password")
userPassInput.setAttribute("name", "password")
userPassInput.setAttribute("placeholder", "Password")


loginButton.setAttribute("style", "margin-top: 10px; border-radius: 5px;")
loginButton.setAttribute("type", "submit")
loginButton.setAttribute("value", "login")

inputDivs4.setAttribute("style", "margin-top: 10px;")

formSection.setAttribute("action", "//localhost:4000/login")
formSection.setAttribute("method", "post")

loginButton.innerHTML = "Log In"
inputDivs4.innerHTML = `<h1><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="crimson" class="bi bi-gift-fill" viewBox="0 0 16 16">
<path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7h6zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9H2.5z"/>
</svg></h1>`
inputDivs5.innerHTML = `<a href="mailto:" style="color: black; text-decoration: none;">Report a</a> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bug" viewBox="0 0 16 16">
<path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z"/>
</svg>`
inputDivs6.innerHTML = `<p>New user?&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
<path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
</svg>&nbsp;&nbsp;<a href="/newuser"><strong>Sign Up</strong></a></p>`



appendYaChild(inputDivs1)
appendYaChild(inputDivs2)
appendYaChild(inputDivs3)
appendYaChild(inputDivs4)
appendYaChild(inputDivs5)
appendYaChild(inputDivs7) // container for signup
appendYaChild(inputDivs6)

// document.body.appendChild(inputDivs1)
// document.body.appendChild(inputDivs2)
// document.body.appendChild(inputDivs3)

inputDivs1.appendChild(inputDivs2)
inputDivs2.appendChild(inputDivs3)
// inputDivs2.appendChild(inputDivs6) //sign up div

inputDivs3.appendChild(formSection)//inputs appended to form
formSection.appendChild(userNameInput)
formSection.appendChild(userPassInput)
formSection.appendChild(loginButton)

inputDivs3.appendChild(inputDivs4)
inputDivs7.appendChild(inputDivs6) //container appending sign up div





function appendYaChild(child){
    return document.body.appendChild(child)
}

