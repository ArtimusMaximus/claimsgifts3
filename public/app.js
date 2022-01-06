

window.addEventListener("load", () => {

    const subButton = document.getElementById("submitbutton")
    subButton.addEventListener("click", () => {
        let dataInput1 = document.getElementById("datainput1").value
        let dataInput2 = document.getElementById("datainput2").value

        if(dataInput2 === '' || datainput1 === ''){
            return alert('you must enter a value')
        }
         
        console.log(dataInput1, dataInput2)
        console.log('successful post button click')
        // let subform = document.getElementById('subform')
        // subform.reset()

        
    });
    
    
    
    
    
    const loadList = document.getElementById('loadlist')
    loadList.addEventListener("click", () => {
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
        loadList.style.display = 'none'
        const buttonDiv = document.getElementById('buttondiv')
        const hideButton = document.createElement('button')
        hideButton.innerHTML = 'Hide List'
        buttonDiv.appendChild(hideButton)
        hideButton.onclick = () => {
            loadList.style.display = 'block'
            buttonDiv.removeChild(hideButton)
        }


    const appendData = data => {
        
        const container = document.getElementById('data')
        for(let i = 0; i < data.length; i++){
            let p = document.createElement('P')
            let btn = document.createElement('button')
            let gift = data[i].firstName
            let giftLink = data[i].lastName
            let id = data[i]._id
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
                
            })

            
            
        }

        const toggleList = () => {
            const container = document.getElementById('tableofdata')
            const loadList = document.getElementById('loadlist')
            if(container.style.display == 'block'){
                container.style.display = 'none'
                loadList.innerHTML = 'Show List'
            } else {
                container.style.display = 'block'
                loadList.innerHTML = 'Hide List'
            }
        }
        toggleList()
        
        
    }
    

    })
    

    
    
    
    
})



