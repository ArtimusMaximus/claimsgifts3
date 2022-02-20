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

let h1EventsRow = document.getElementById('eventsrow')
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
        
        const card1 = document.createElement('div')
            card1.className = "container col-6"
            card1.innerHTML = `<a href="/dashboarduser/${user}/${text}"><h2><div class="card border-danger mb-3" style="max-width: 18rem;">
            <div class="card-header">${user}'s Event</div></a>
            <div class="card-body text-danger">
            <h5 class="card-title">Date Here</h5>
            <p class="card-text">${text}</p>
            </div>
            <div class="row">
            <div class="container col-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                </svg>
            </div>
            <div class="container col-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                </svg>
            </div>
            </div>
            `
            h1EventsRow.appendChild(card1)




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
cr8tempBtn.innerHTML = "test"
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
    card.innerHTML = `<h2><a href="/dashboarduser/${user}/${events}"><div class="card border-danger mb-3" style="max-width: 18rem;">
<div class="card-header">${user}'s Event</div></a></h2>
<div class="card-body text-danger">
  <h5 class="card-title"></h5>
  <p class="card-text">${events}</p>
</div>
<div class="row">
  <div class="container col-12">
    <svg name="${events}" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
    </svg>
    <p>Remove</p>
  </div>
  `

{/* <div class="container col-6">
    <svg id="adddate" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
    </svg>
    <p>Date</p>
    </div>
</div> */}


h1EventsRow.appendChild(card)

// console.log(events)

let remEvent = document.querySelectorAll(`[name="${events}"]`)

remEvent.forEach(link => link.addEventListener('click', () => {
    let arr = [];
    arr.push(link)
    console.log(arr);

    (async () => {
        let { value: isConfirmed } = await Swal.fire({
        title: `Are you sure you want to remove event ${events}?`,
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: '#DC143C',
        cancelButtonColor: '#DC143C',
        confirmButtonText: 'Yes, delete it!'
    })
    if(isConfirmed){
        Swal.fire(
            'Event deleted!',
            'Your event has been removed.',
            'success',
        )
        console.log('aaa ' + isConfirmed) // works

        // fetch

    }
    })()
    
}))

} //end loop

// let dateId = document.querySelectorAll('#adddate')
// console.log(typeof(dateId))
// console.log(dateId.length)
// console.log(dateId)
// console.log(dateId[0])
// console.log(dateId[0].childNodes)
// console.log(dateId[0].childNodes[0])
// console.log(dateId[0].childNodes[0].data)
// console.log(dateId[0].TEXT_NODE)
// console.log(dateId[0].baseURI)

// let dateId = document.querySelectorAll('#adddate')
// console.log(dateId)

// for(let i = 0; i < dateId.length; i++){
//     let arr1 = [];
//     // arr1.push(dateId[i].childNodes[0].data)
//     arr1.push(dateId[i].attributes[1].value)
//     let events3 = dateId[i].attributes[1].value
//     console.log('arr1 ' + arr1)
    
//     // let events2 = dateId[i].childNodes[0].data
//     // console.log('events2 ' + events2)
//     // dateId.name = `${events2}`
    
// // let addDate = document.querySelectorAll(`${events2}`)

// dateId.forEach(date => date.addEventListener('click', () => {
//     (async () => {
//         let { value: text } = await Swal.fire({
//             title: `Set a date for your event ${events3.map(item => item)}:`, //date ?
//             width: 600,
//             input: 'text',
//             inputPlaceholder: 'mm/dd/yyyy',
//             padding: '3em',
//             color: '#DC143C',
//             confirmButtonColor: '#DC143C',
//             confirmButtonText: 'Confirm',
//             background: '#fff url()',
//             backdrop: `
//               rgba(0,0,123,0.4)
//               url("/images/christmasmickeymouse.gif")
//               left top
//               no-repeat
//             `
//         })
//     if(text){
//         Swal.fire({
//             title: 'Date has been "up-Dated"!',
//             type: 'success',
//             iconColor: '#DC143C',
//             confirmButtonColor: '#DC143C',
//         })
        
//         console.log(text)
//     }    

//     })()

// }))

// } // end loop