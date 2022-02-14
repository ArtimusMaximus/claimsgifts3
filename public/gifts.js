 import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@8/src/sweetalert2.js'

window.addEventListener("load", () => {

    
    let eventname = document.getElementById('ename').innerHTML
    let username = document.getElementById('usernameid').innerHTML
    
    const fetchList = () => {
        fetch(`/dashboarduser/${eventname}`)
        .then((response) => {
            return response.json();
        })
        
        .then((data) => {
            // const giftArray = [];
            // const linkArray = [];
            // const contactList = data
            // linkArray.push(data)
            // linkArray.forEach((item, index, array) => {
            //     console.log(item, index)
            // });
            // linkArray.map((mapped => {
            //     return console.log(mapped)
            // }))
            // mapGiftArray(contactList);
            // console.log(data);
            appendData(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    fetchList();
    

    const idArray = [];
    const giftArray = [];
    const linkArray = [];
    const appendData = data => {
        for(let i = 0; i < data.length; i++){
            let btn = document.createElement('button')
            let btn2 = document.createElement('button')
            let btn3 = document.createElement('button')
            btn3.className = "btn btn-outline-danger"
            btn2.className = "btn btn-outline-danger"
            btn3.id = "btn3"
            btn.className = "btn btn-outline-danger btn-large"
            btn.innerHTML = "Remove Gift"
            btn2.innerHTML = 'Claim Gift'
            btn3.innerHTML = 'Add a Gift'
            let dataDiv = document.getElementById('data')
            let coData = data[i]
            console.log('codata: ', coData);
            let giftz = data[i].giftx
            let giftLinkz = data[i].giftLinkx

            console.log('giftx' , data[i].giftx);
            console.log('giftLinkx' , data[i].giftLinkx);
            // let gift = data[i].firstName
            // giftArray.push(gift)
            // let giftLink = data[i].lastName
            // linkArray.push(giftLink)
            let id = data[i]._id
            // let id2 = data[i].company._id
            // console.log('id2: ' , id2);
            idArray.push(id)

            let divCard = document.createElement('div')
            divCard.className = "card w-100 p-3"
            divCard.innerHTML = `<div class="card-body">
            <h1 class="card-title">${giftz}</h1>
            <p class="card-text"><h1> <a href="${giftLinkz}">${giftLinkz}</a></h1></p>
            </div>`
            
            
            dataDiv.appendChild(divCard)
            dataDiv.appendChild(btn)
            dataDiv.appendChild(btn2)
            dataDiv.appendChild(btn3)
            
            btn.addEventListener('click', () => {
                fetch(`/dashboarduser/:username/:events1/${id}`, {
                    method: 'DELETE',
                    
                })
            // btn.addEventListener('click', () => {
            //     fetch(`/contact/${id2}`, {
            //         method: 'DELETE',
                    
            //     })
                console.log('del complete')
                dataDiv.removeChild(divCard)
                dataDiv.removeChild(btn)
                dataDiv.removeChild(btn2)
                dataDiv.removeChild(btn3)
            });
        }

        
        //Post Method
    
        
        // const toggleList = () => {
        //     const container = document.getElementById('tableofdata')
        //     const loadList = document.getElementById('loadlist')
        //     if(container.style.display == 'block'){
        //         container.style.display = 'none'
        //         loadList.innerHTML = 'Show List'
        //     } else {
        //         container.style.display = 'block'
        //         loadList.innerHTML = 'Hide List'
        //     }
        // }
        // toggleList()
    }
    //post modetho
    // const myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "x-www-form-urlencoded");
        
        

        // loadList.style.display = 'none'
        // const buttonDiv = document.getElementById('buttondiv')
        // const hideButton = document.createElement('button')
        // hideButton.innerHTML = 'Hide List'
        // buttonDiv.appendChild(hideButton)
        // hideButton.onclick = () => {
        //     loadList.style.display = 'block'
        //     buttonDiv.removeChild(hideButton)
        // }
    
    
    
    // btn3.addEventListener('click', () => {
    //     addGiftButton()
    //     console.log('btn3 clicked');
        
    // })
})

const submitButton = document.getElementById('submitbutton1')
        submitButton.addEventListener('click', () => {
            
            const dataDiv = document.getElementById('data')
            let giftLink = document.getElementById("datainput2").value
            let gift = document.getElementById("datainput1").value
            

            console.log('gift, giftlink', gift, giftLink);
            
            let eventname = document.getElementById('ename').innerHTML
    let username = document.getElementById('usernameid').innerHTML

            
            
            // const raw = JSON.stringify({firstName, lastName})
            // const raw2 = JSON.stringify({gift, giftLink})
            // console.log('raw', raw2)
            submitButton.onclick = console.log('it works but wtf')
            
            console.log('type', typeof(giftLink));

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            // urlencoded.append("firstName", "URL Encoded");
            // urlencoded.append("lastName", "test2");
            urlencoded.append("giftLinkx", `${giftLink}`);
            urlencoded.append("giftx", `${gift}`);
            urlencoded.append('event', `${eventname}`)
            urlencoded.append('username', `${username}`)

            // urlencoded.append("phone", "33333");

            

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
            };

            fetch("/dashboarduser/:username/:events1", requestOptions)
            .then(response => response.json())
            
            .then(result => {
                if(gift === "" || giftLink === ""){
                    // return alert('Plz fill out both') 
                    Swal.fire({
                    icon:'warning',
                    iconColor: 'crimson',
                    title: 'Oops...',
                    html: '<h1><strong>Both fields must contain a value!</strong></h1>',
                    color: 'crimson',
                    confirmButtonText: '<i class="fa fa-thumbs-up"></i> <h1>Great!<h1>',
                    confirmButtonColor: 'crimson',
                    });
                    return
                }
                document.getElementById('datainput1').value = ""
                document.getElementById('datainput2').value = ""
                
                const id = result._id
                const btn = document.createElement('button')
                const btn2 = document.createElement('button')
                const btn3 = document.createElement('button')
                btn3.className = "btn btn-outline-danger"
                btn2.className = "btn btn-outline-danger"
                btn.className = "btn btn-outline-danger"
                btn.innerHTML = 'Remove Gift'
                btn2.innerHTML = 'Claim Gift'
                btn3.innerHTML = 'Add a Gift'

                

            
                console.log(id);
                console.log('result: ' + result);

                let giftzz = result
                // const giftzz = result.company
                // console.log('giftz = result.company: ', giftz);
                // console.log('giftz.gift ' + giftz.gift)

                const divCard = document.createElement('div')
                divCard.className = "card w-100 p-3"
                divCard.innerHTML = `<div class="card-body">
                <h1 class="card-title">${giftzz.giftx}</h1>
                <p class="card-text"><h1> <a href="${giftzz.giftLinkx}">${giftzz.giftLinkx}</a></h1></p>
                </div>`

                
                dataDiv.appendChild(divCard)
                dataDiv.appendChild(btn)
                dataDiv.appendChild(btn2)
                // divCard.appendChild(btn)
                // dataDiv.appendChild(p)
                // dataDiv.appendChild(btn)
                
                // console.log('this is the result ', result)
                
                btn.addEventListener('click', () => {
                    
                    fetch(`/contact/${id}`, {
                        method: 'DELETE'
                    })
                    // dataDiv.removeChild(p)
                    // dataDiv.removeChild(btn)
                    dataDiv.removeChild(divCard)
                    dataDiv.removeChild(btn)
                    dataDiv.removeChild(btn2)
                })
                
            }).catch(err => console.log(err))

            
            
        })



