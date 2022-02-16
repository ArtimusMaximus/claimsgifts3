import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@8/src/sweetalert2.js'
// import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.25.0/axios.js';
// import qs from 'https://cdnjs.cloudflare.com/ajax/libs/qs/6.10.3/qs.js';

let innerPara = document.getElementById('userid')
let innerPara2 = document.getElementById('user')
const userid = innerPara.innerHTML
const user = innerPara2.innerHTML
console.log(userid)
console.log('username: ' + user)
let innerEvents = document.getElementById('eventslist')
const userEvents = innerEvents.innerHTML
console.log('innerevents innerhtml: ' + userEvents);
console.log('userevents.split at comma: ' + userEvents.split(","))
console.log(typeof( 'type of' + userEvents)); //user events is type string

let userEventsArr = userEvents.split(",")
console.log('usereventsarr: ' + userEventsArr);


const newEventButton = document.getElementById('div3')
const textValueArray = [];
// textValueArray.push(userEvents.split())
newEventButton.addEventListener('click', () => {
    (async () => {
        let { value: text } = await Swal.fire({
            type: 'question',
            title: 'Name of your event',
            input: 'text',
            inputPlaceholder: 'e.g. Christmas, Birthday, Wedding...',
            confirmButtonColor: 'crimson',
            typeColor: 'crimson',
        })
    if(text){
        Swal.fire({
            type: 'success',
            title: `An event named '${text}' was created.`,
            confirmButtonColor: 'crimson',
            icon: 'crimson'
        })
         //textvalue array spot
        
        textValueArray.push(text)
        let urlencoded = new URLSearchParams();
        // function mapEvents(){
        //     textValueArray.map((events) => {
        //         urlencoded.append('events', `${events}`)
        //     })
        // }
        // mapEvents()
        const filterValueArr = textValueArray.filter(Boolean)
        const filterEventsArr = userEventsArr.filter(Boolean)

        function mapEvents2(arr){
            arr.map((events) => {
                urlencoded.append('events1', `${events}`)
            })
        }
        mapEvents2(filterValueArr)
        if(!filterEventsArr[0] === undefined){
            return
        }
        mapEvents2(filterEventsArr)
        
        
        // urlencoded.append('username', `${user}`)

        console.log('text value array after urlencode append: ' + textValueArray)
        fetch(`/dashboarduser/${userid}`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body: urlencoded,
            redirect: 'follow',
        })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log(error))
        
    }
    })()
    console.log('textvaluearray: ' + textValueArray)
})


const loadExistingEventButton = document.getElementById('div4')

loadExistingEventButton.addEventListener('click', () => {
    (() => {
        fetch('/dashboarduser/:username/:eventname')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            appendData(data)
        })
        .catch((err) => {
            console.log(err)
        })
    })()

    const eventArray = [];
    const appendData = data => {
        for(let i = 0; i < data.length; i++){
           const allEvents = data[i].events
           const eventsId = data[i]._id
           eventArray.push(data[i].events)
           
           let eventsRow = document.getElementById('eventsrow')
           let p = document.createElement('p')
           let btn = document.createElement('button')
           btn.setAttribute("class", "btn-lg")
           p.innerHTML = `<a href='/dashboarduser/${eventsId}'>${allEvents}</a>`
           btn.appendChild(p)
           eventsRow.appendChild(btn)
        }
        console.log(typeof(eventArray), eventArray)
        console.log(eventArray[2])
    }
})


let url = new URL('http://localhost:4000')
console.log('url to string :', url.toString())
let search_params = url.searchParams;

let tempInput = document.getElementById('tempinput')

let cr8tempBtn = document.createElement('button')
cr8tempBtn.id = "tempBtn"
cr8tempBtn.innerHTML = "click for reaction"
document.body.append(cr8tempBtn)
let tempBtn = document.getElementById('tempBtn')


tempBtn.addEventListener('click', () => {
    let userInputValue = 'event'
    let userInputValue2 = 'eventname'
    search_params.set(`${userInputValue}`, `${userInputValue2}`)
    url.search = search_params.toString()
    let newUrl = url.toString()
    console.log(newUrl);
    fetch(`${newUrl}`,  {
        method: "GET",
        redirect: 'follow',
    })
})


let h1EventsRow = document.getElementById('eventsrow')
let h1EventsList = document.getElementById('eventslist')
let h1Inner = h1EventsList.innerHTML
let eventsArr = []
let currentEventsArray = h1Inner.split(',')
currentEventsArray.filter(Boolean) //filters out empty array values
eventsArr.push(currentEventsArray)
console.log(typeof(eventsArr))

console.log('current events array: ' + currentEventsArray[1]);
console.log(currentEventsArray.length);


for(let i=0; i < currentEventsArray.length; i++){
    let events = currentEventsArray[i]

    const card = document.createElement('div')
    card.className = "container col-6"
    card.innerHTML = `<a href="/dashboarduser/${user}/${events}"><h2><div class="card border-danger mb-3" style="max-width: 18rem;">
<div class="card-header">${user}'s Event</div></a>
<div class="card-body text-danger">
  <h5 class="card-title"></h5>
  <p class="card-text">${events}</p>
    
  </div>`
h1EventsRow.appendChild(card)
}


