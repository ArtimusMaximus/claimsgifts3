
window.addEventListener("load", () => {
    

    const fetchList = () => {
        fetch('/contact')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
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
        const container = document.getElementById('data')
        for(let i = 0; i < data.length; i++){
            let p = document.createElement('P')
            p.className = "giftp"
            let btn = document.createElement('button')
            btn.className = "btn btn-outline-danger btn-large"
            let gift = data[i].firstName
            giftArray.push(gift)
            let giftLink = data[i].lastName
            linkArray.push(giftLink)
            let id = data[i]._id
            idArray.push(id)
            p.innerHTML = `${gift} <a href="${giftLink}">${giftLink}</a>`
            btn.innerHTML = "Remove Gift"
            container.appendChild(p)
            container.appendChild(btn)


            btn.addEventListener('click', () => {
                fetch(`/contact/${id}`, {
                    method: 'DELETE',
                    
                })
                console.log('del complete')
                container.removeChild(p)
                container.removeChild(btn)
            });

            

        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const dataDiv = document.getElementById('data')
        const submitButton = document.getElementById('submitbutton')
        submitButton.addEventListener('click', () => {
            let firstName = document.getElementById("datainput1").value
            let lastName = document.getElementById("datainput2").value
            const raw = JSON.stringify({firstName, lastName})
            submitButton.onclick = document.getElementById('datainput1').value = ""
            submitButton.onclick = document.getElementById('datainput2').value = ""
            console.log('raw', raw)

            fetch('/contact', {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                // redirect: 'follow'
            })
            .then((response) => { 
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
                        confirmButtonColor: 'crimson'
                    })
                    // return alert('Both fields must contain a value!')
                }
                const id = result._id
                const p = document.createElement('P')
                p.className = "giftp"
                const btn = document.createElement('button')
                btn.className = "btn btn-outline-danger btn-large"
                p.innerHTML = `${result.firstName} <a href="${result.lastName}">${result.lastName}</a>`
                btn.innerHTML = 'Remove Gift'

                const divCard = document.createElement('div')
                    divCard.className = "card w-50 p-3"
                    divCard.innerHTML = `<div class="card-body">
                    <h1 class="card-title">${result.firstName}</h1>
                    <p class="giftp"> <a href="${result.lastName}">${result.lastName}</a></p>
                    <a href="#" class="btn btn-outline-danger btn-large">Remove Gift</a>
                    </div>`

                dataDiv.appendChild(divCard)
                // dataDiv.appendChild(p)
                // dataDiv.appendChild(btn)
                
                console.log('this is the result', result)

                btn.addEventListener('click', () => {
                    
                    fetch(`/contact/${id}`, {
                        method: 'DELETE'
                    })
                    dataDiv.removeChild(p)
                    dataDiv.removeChild(btn)
                    dataDiv.removeChild(divCard)

                })
                
            }).catch(err => console.log(err))
        })
        
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
    console.log(giftArray, linkArray)


    
    

        // loadList.style.display = 'none'
        // const buttonDiv = document.getElementById('buttondiv')
        // const hideButton = document.createElement('button')
        // hideButton.innerHTML = 'Hide List'
        // buttonDiv.appendChild(hideButton)
        // hideButton.onclick = () => {
        //     loadList.style.display = 'block'
        //     buttonDiv.removeChild(hideButton)
        // }

})
//this checks if form data is entered
const subButton = document.getElementById("submitbutton")
    subButton.addEventListener("click", () => {
        let dataInput1 = document.getElementById("datainput1").value
        let dataInput2 = document.getElementById("datainput2").value

        // if(dataInput2 === '' || datainput1 === ''){
        //     return alert('You must enter a value in both fields.')
        // }
         
        console.log(dataInput1, dataInput2)
        console.log('successful post button click')
        // let subform = document.getElementById('subform')
        // subform.reset()
        
        
    });



