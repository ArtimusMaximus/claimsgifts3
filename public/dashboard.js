



let jumboContainer = document.createElement('div')
jumboContainer.className = "jumbotron jumbotron-fluid"
jumboContainer.innerHTML = `<div class="container"><h1 class="display-3">&nbsp;</h1></div>`
document.body.appendChild(jumboContainer)


let dynamicUserName = `<%= user %>`



// const h1 = document.createElement('h1')

const div1 = document.createElement('div')
const div2 = document.createElement('div')
const div3 = document.createElement('div')
const div4 = document.createElement('div')
const div5 = document.createElement('div')
const div6 = document.createElement('div')
const div7 = document.createElement('div')

const rowDiv1 = document.createElement('div')

const button = document.createElement('button')

const span1 = document.createElement('span')
const span2 = document.createElement('span')
const span3 = document.createElement('span') //placeholders
const span4 = document.createElement('span') //placeholders
const span5 = document.createElement('span') //placeholders

// h1.className = "title"
// h1.id = "h1title"

div1.className = "container"
div2.className = "row"
div3.className = "col-3 d-flex calendarweek"
div4.className = "col-3 d-flex calendarweek"
div5.className = "col-2 box" //placeholder
div6.className = "col-2 box" //placeholder
div7.className = "col-2 box" //placeholder

rowDiv1.className = "row"

span1.className = "col-3 col-xs-6 d-flex calendarspan"
span2.className = "col-3 col-xs-6 d-flex calendarspan"
span3.className = "col-2 d-flex calendarspan" //place holder
span4.className = "col-2 d-flex calendarspan" //place holder
span5.className = "col-2 d-flex calendarspan" //place holder


// h1.innerHTML = `Hello , welcome to your Dashboard.`
div3.innerHTML = `<a href="" style=" color: black; text-decoration: none;"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-calendar-plus" viewBox="0 0 16 16">
<path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"/>
<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
</svg></a>`
div4.innerHTML = `<a href="" style=" color: black; text-decoration: none;"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-calendar4-week" viewBox="0 0 16 16">
<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z"/>
<path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
</svg></a>`
span1.innerHTML = "<h5><b>Create a New Event</b></h5>"
span2.innerHTML = "<h5><b>Load Existing Event</b></h5>"
span3.innerHTML = "&nbsp;"
span4.innerHTML = "&nbsp;"
span5.innerHTML = "&nbsp;"

div5.innerHTML = "&nbsp;" //placeholder
div6.innerHTML = "&nbsp;" //placeholder
div7.innerHTML = "&nbsp;" //placeholder

rowDiv1.innerHTML = "row div"






// document.body.appendChild(h1)
document.body.appendChild(div1)
document.body.appendChild(div2)
document.body.appendChild(div3)
document.body.appendChild(div4)
// document.body.appendChild(div5) //placeholder



h1 = document.getElementById('h1title')
div1.appendChild(h1)

div1.appendChild(div2)
div2.appendChild(div5) //placeholder
div2.appendChild(div3)
div2.appendChild(div6) //placeholder
div2.appendChild(div4)
div2.appendChild(div7) //placeholder

div2.appendChild(span3) //placeholder
div2.appendChild(span1) 
div2.appendChild(span4) //placeholder
div2.appendChild(span2)
div2.appendChild(span5) //placeholder



div3.addEventListener('click', () => {
    alert('this has been clicked')
    
})

div4.addEventListener('click', () => {
    alert('this has been clicked')
    
})