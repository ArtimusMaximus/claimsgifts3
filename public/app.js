// import Swal from 'sweetalert2'


window.addEventListener("load", () => {
    
    
    const fetchList = () => {
        fetch('/contact')
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
            let giftz = data[i].company.gift
            let giftLinkz = data[i].company.giftLink

            console.log('company.gift' , data[i].company.gift);
            console.log('company.giftLink' , data[i].company.giftLink);
            // let gift = data[i].firstName
            // giftArray.push(gift)
            // let giftLink = data[i].lastName
            // linkArray.push(giftLink)
            let id = data[i]._id
            let id2 = data[i].company._id
            console.log('id2: ' , id2);
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
                fetch(`/contact/${id}`, {
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
    const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const submitButton = document.getElementById('submitbutton')
        submitButton.addEventListener('click', () => {
            
            const dataDiv = document.getElementById('data')
            let giftLink = document.getElementById("datainput1").value
            let gift = document.getElementById("datainput2").value
            

            console.log('gift, giftlink', gift, giftLink);
            
            

            submitButton.onclick = document.getElementById('datainput1').value = ""
            submitButton.onclick = document.getElementById('datainput2').value = ""
            // const raw = JSON.stringify({firstName, lastName})
            // const raw2 = JSON.stringify({gift, giftLink})
            // console.log('raw', raw2)
            
            console.log('type', typeof(giftLink));

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            // urlencoded.append("firstName", "URL Encoded");
            // urlencoded.append("lastName", "test2");
            urlencoded.append("company.giftLink", `${giftLink}`);
            urlencoded.append("company.gift", `${gift}`);
            // urlencoded.append("phone", "33333");

            

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
            };

            fetch("/contact", requestOptions)
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

                }
                
                
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


                const giftzz = result.company
                // console.log('giftz = result.company: ', giftz);
                // console.log('giftz.gift ' + giftz.gift)

                const divCard = document.createElement('div')
                divCard.className = "card w-100 p-3"
                divCard.innerHTML = `<div class="card-body">
                <h1 class="card-title">${giftzz.gift}</h1>
                <p class="card-text"><h1> <a href="${giftzz.giftLink}">${giftzz.giftLink}</a></h1></p>
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

//this checks if form data is entered
// const subButton = document.getElementById("submitbutton")
//     subButton.addEventListener("click", () => {
//         let dataInput1 = document.getElementById("datainput1").value
//         let dataInput2 = document.getElementById("datainput2").value

//         // if(dataInput2 === '' || datainput1 === ''){
//         //     return alert('You must enter a value in both fields.')
//         // }
         
//         console.log(dataInput1, dataInput2)
//         console.log('successful post button click')
//         // let subform = document.getElementById('subform')
//         // subform.reset()
        
        
//     });



const deleteFunc = () => {
        fetch(`/contact/${id}`, {
            method: 'DELETE',
            
        })
        console.log('del complete')
        container.removeChild(p)
        container.removeChild(btn)
    }


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded")
const putButton = document.getElementById("btn2")
// putButton.addEventListener('click', addGiftToList())
function putGiftToList() {
    fetch(`/contact/${id}`, {
        method: 'PUT',
    })
    .then(response => {
        return response.json()
    })
    .then(result => {
        if(firstName === '' || lastName === ''){
            return Swal.fire({
                icon:'warning',
                iconColor: 'crimson',
                title: 'Oops...',
                html: '<h1><strong>Both fields must contain a value!</strong></h1>',
                color: 'crimson',
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> <h1>Great!<h1>',
                confirmButtonColor: 'crimson',
                
            });
        }
    const putArray = [];
    putArray.push(result)
    console.log(result);
    }).catch(err => {console.log(err)})
}





function mapGiftArray(array){
    let create = document.createElement('P')
    let dataDiv = document.getElementById('data')
    dataDiv.appendChild(create)
    array.map(gift => {
        return create.innerHTML = gift
    })
}






var addedToGiftArray = [];
let putInput = document.getElementById('putinput')
let putInput2 = document.getElementById('putinput2')
function addGiftButton() {
    putInputValue = putInput.value
    putInputValue2 = putInput2.value
    addedToGiftArray.push(putInputValue, putInputValue2)
    console.log('added to gift array: ' + addedToGiftArray);
    
}