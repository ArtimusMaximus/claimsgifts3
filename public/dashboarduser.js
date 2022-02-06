import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@8/src/sweetalert2.js'
// import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.25.0/axios.js';
// import qs from 'https://cdnjs.cloudflare.com/ajax/libs/qs/6.10.3/qs.js';

let innerPara = document.getElementById('userid')
const userid = innerPara.innerHTML
console.log(userid)
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
            title: `A new ${text} event was created.`,
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

        function mapEvents2(arr){
            arr.map((events) => {
                urlencoded.append('events', `${events}`)
            })
        }
        mapEvents2(textValueArray)
        mapEvents2(userEventsArr)

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

