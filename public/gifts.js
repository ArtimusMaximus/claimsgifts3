
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@8/src/sweetalert2.js'

window.addEventListener("load", () => {

    
    let eventname = document.getElementById('ename').innerHTML
    let username = document.getElementById('usernameid').innerHTML
    let userid = document.getElementById('userid').innerHTML
    let cby = document.getElementById('creator').innerHTML
    
    
    
    
    // fetch(`/dashboarduser/${cby}`)
    // .then((res) => {
    //     return res.json();
    // })
    // .then((data) => {
    //     gainData(data)
    // })
    // .catch((err) =>{
    //     console.warn(err)
    // })
            
    
    // const gainData = data => {
    //     let { createdby } = data
    //     let cr8by = document.getElementById('creatorname')
    //     cr8by.innerHTML = 'Event Created by ' + createdby
    // }
    
    const fetchList = () => {
        fetch(`/dashboard/${userid}/${eventname}`)
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
            // let btn3 = document.createElement('button')
            // btn3.className = "btn btn-outline-danger"
            btn2.className = "btn btn-lg btn-outline-danger"
            // btn3.id = "btn3"
            btn.className = "btn btn-lg btn-outline-danger"
            btn.innerHTML = "Remove Gift"
            btn2.innerHTML = 'Claim Gift'
            btn2.id = 'claimbtn'
            // btn3.innerHTML = 'Add a Gift'
            let dataDiv = document.getElementById('data')
            let coData = data[i]
            console.log('codata: ', coData);
            console.log('type of codata: ', typeof(coData));
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

            console.log(typeof('type of giftz' + giftz));
            let divCard = document.createElement('div')
            divCard.className = "card w-100 p-3"
            divCard.innerHTML = `<div class="card-body">
            <h1 class="card-title">${giftz}</h1>
            <p class="card-text"><h1> <a href="${giftLinkz}">${giftLinkz}</a></h1></p>
            </div>`

            console.log(userid, id)
            
            // if (username === data[i].username) 
            dataDiv.appendChild(divCard)
            dataDiv.appendChild(btn)
            dataDiv.appendChild(btn2)
            

            
            let isClaimed = document.getElementById('claimee')
            let claimeeInner = isClaimed.innerHTML
                
            btn2.addEventListener('click', () => {
                console.log(data[i].claimee)
                console.log(data[i].claimee.length)
                console.log(username)
                if(data[i].claimee.length === 0 || data[i].claimee[0] === ''){

                    (async () => {
                        let { value: isConfirmed } = await Swal.fire({
                            title: `Claim this gift with your name ${username} on it?`,
                            confirmButtonColor: 'crimson',
                            showCancelButton: true,
                        })
                        if(isConfirmed){
                            Swal.fire({
                                title:    `Item claimed by ${username}`,
                                confirmButtonColor: 'crimson',
                                confirmButtonText: 'Got it',
                            })

                            data[i].claimee[0] = username

                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

                            const urlencoded = new URLSearchParams();
                            urlencoded.append('claimee', `${username}`)
                            urlencoded.append("claimed", true)

                            fetch(`/dashboard/${id}`, {
                                method: 'PUT',
                                headers: myHeaders,
                                body: urlencoded,
                                redirect: 'follow',
                            })
                        }
          
                    })()

                } else if(data[i].claimee[0] === username) { //data[i].claimee.toString()
                    Swal.fire({
                        title: '<h1 style="color: crimson;">You have already claimed this item!</h1>',
                        text: 'Do you wish to unclaim it?',
                        confirmButtonColor: 'crimson',
                        confirmButtonText: 'Cancel',
                        showCancelButton: true,
                        cancelButtonText: 'Unclaim Gift',
                    }).then((result) => {
                        if(result.dismiss){
                            data[i].claimee[0] = ''
                            // claimeeInner = ''
                            const urlencoded = new URLSearchParams();
                            // urlencoded.append("claimee", [])
                            urlencoded.append("claimed", false)
                            fetch(`/dashboard/${id}`, {
                                method: 'PUT',
                                body: urlencoded
                            })
                            // fetch(`/dashboarduser/${id}`, {
                            //     method: 'DELETE',
                            //     body: urlencoded
                            // })
                            Swal.fire('Gift has been unclaimed')
                            
                            
                        }
                    })
                } else {
                    Swal.fire({
                       title: `This item has already been claimed by user ${data[i].claimee}`,
                       confirmButtonColor: 'crimson',
                    })
                }
                console.log('username: ' + typeof(username), 'data[i].claimee ' + typeof(data[i].claimee))

                // const urlencoded = new URLSearchParams();
                // urlencoded.append('claimed', true)

                // fetch(`/dashboarduser/${id}`, {
                //     method: 'PUT',
                //     body: urlencoded
                // })

            }) // end for loop of initial appended data

            btn.addEventListener('click', () => {
                fetch(`/dashboarduser/${id}`, {
                    method: 'DELETE',
                })
                .then
                console.log('Gift entry Deleted.')
                dataDiv.removeChild(divCard)
                dataDiv.removeChild(btn)
                dataDiv.removeChild(btn2)
                // dataDiv.removeChild(btn3)
            });


        } // end for loop
        
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
    } // end of append data func expression
}) // end of window event listener fetch, append data

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

            // if(gift.length === 0 || giftLink.length === 0){
            //     return
            // }

            if(gift === '' || giftLink === ''){
                // return alert('Plz fill out both') 
                Swal.fire({
                // icon:'warning',
                // iconColor: 'crimson',
                title: 'Oops...',
                html: '<h1><strong>Both fields must contain a value!</strong></h1>',
                // color: 'crimson',
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> <h1>Great!<h1>',
                confirmButtonColor: 'crimson',
                });
                return
            }
            
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
            };

            fetch("/dashboarduser/:username/:userID/:events1", requestOptions)
            .then(response => response.json())
            
            .then(result => {
 
                const id = result._id
                const btn = document.createElement('button')
                const btn2 = document.createElement('button')
                
                btn2.className = "btn btn-lg btn-outline-danger"
                btn.className = "btn btn-lg btn-outline-danger"
                btn.innerHTML = 'Remove Gift'
                btn2.innerHTML = 'Claim Gift'
                btn2.id = 'claimbtn'

                // let giftLinkFiltered = giftLink.filter(Boolean)
                // let giftFiltered = gift.filter(Boolean)

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

                document.getElementById('datainput1').value = ""
                document.getElementById('datainput2').value = ""


                let claimedStatus1 = document.getElementById('claimedstatus')
                let claimedStatusInner = claimedStatus1.innerHTML
                let isClaimed = document.getElementById('claimee')
                let claimeeInner = isClaimed.innerHTML
                console.log(claimeeInner === true) //initial status = false
                console.log(claimeeInner.length) // initial status = 0
                console.log(typeof(claimeeInner))
                console.log(claimedStatusInner)
                console.log(claimedStatusInner === true)
                console.log(typeof(claimedStatusInner))
                // try using split on claimeeInner and then taking it from there

                btn2.addEventListener('click', () => {
                    // let claimee = result.claimee
                    // console.log('claimee length' + claimee.length)
                    // console.log('claimee length' + claimee)
                    if(claimeeInner.length === 0 || claimeeInner === ''){ //claimeeInner.length === 0 //claimedStatusInner

                        (async () => {
                            let { value: isConfirmed } = await Swal.fire({
                                title: `Claim this gift with your name ${result.username} on it?`,
                                confirmButtonColor: 'crimson',
                                showCancelButton: true,
                            })
                            if(isConfirmed){
                                Swal.fire({
                                    title: `Item claimed by ${result.username}`,
                                    confirmButtonColor: 'crimson',
                                    confirmButtonText: 'Got it',
                                })

                                const urlencoded = new URLSearchParams();
                                urlencoded.append('claimee', `${result.username}`)
                                urlencoded.append("claimed", "true")

                                fetch(`/dashboard/${id}`, {
                                    method: 'PUT',
                                    body: urlencoded
                                })
                                claimeeInner = `${result.username}`
                            }
                                    
                        })()

                    } else if(result.username === claimeeInner) {
                        Swal.fire({
                            title: '<h1 style="color: crimson;">You have already claimed this item!</h1>',
                            text: 'Do you wish to unclaim it?',
                            confirmButtonColor: 'crimson',
                            confirmButtonText: 'Cancel',
                            showCancelButton: true,
                            cancelButtonText: 'Unclaim Gift',
                        }).then((result) => {
                            if(result.dismiss){
                                claimeeInner = ''
                                const urlencoded = new URLSearchParams();
                                urlencoded.append("claimee", [])
                                urlencoded.append("claimed", false)
                                fetch(`/dashboard/${id}`, {
                                    method: 'PUT',
                                    body: urlencoded
                                })
                                // fetch(`/dashboarduser/${id}`, {
                                //     method: 'DELETE',
                                //     body: urlencoded
                                // })
                                Swal.fire('Gift has been unclaimed')
                                
                            }
                        })
                    } else {
                        Swal.fire({
                        title: `This item has already been claimed by user ${claimeeInner}`,
                        confirmButtonColor: 'crimson',
                        })
                    }
                    // console.log('result.username ' + typeof(result.username), 'result.claimee ' + typeof(claimee))
                    // console.log('result.username ' + result.username, 'result.claimee ' + claimee)
                    // console.log('result.username ' + result.username, 'result.claimee length ' + claimee.length)
                    // console.log('result.username ' + result.username, 'result.claimee type of tostring ' + typeof(claimee.toString()))
                    // console.log('result.username ' + result.username, 'result.claimee tostring ' + claimee.toString())
                    // console.log('result.username result.claimee equal? ' + result.username === claimee.toString())
                    // console.log(claimeeInner)
                })

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

        }) // end of submit button POST, append, & DEL


const shareLinkBtn = document.getElementById('sharelink')
shareLinkBtn.addEventListener('click', () => {
    let url = location.href
    navigator.clipboard.writeText(url)
})


// console.log(globalThis)
// console.log(window)
let ql = document.querySelector('h1')
// console.log(ql);
console.log(location.href);
// remember outerHeight and outerWidth for your background

// look into benchmarking queries from mongodb, and also indexing Simple and Compound! ANswered by a PRO

