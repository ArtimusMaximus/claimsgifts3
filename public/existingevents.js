

window.addEventListener('load', () => {
    (() => {
            fetch('/dashboarduser/events')
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
           const allEvents = data[i].eventname
           eventArray.append(data[i].eventname)
           let eventsRow = document.getElementById('eventsrow')
           let p = document.createElement('p')
           p.innerHTML = `<p>${allEvents}<p>`
           eventsRow.appendChild(div1)
        }
    }
})