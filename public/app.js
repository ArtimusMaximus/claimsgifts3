


window.addEventListener("load", () => {

    const subButton = document.getElementById("submitbutton")
    subButton.addEventListener("click", () => {
        let arr = [];
        let dataInput = document.getElementById("datainput").value
        console.log(dataInput)
        
        arr.push(dataInput)
        console.log(arr)

    
       return document.getElementById("data").innerText = dataInput
        

    });

    

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

    const appendData = data => {
        const container = document.getElementById('data')
        for(let i = 0; i < data.length; i++){
            let p = document.createElement('P')
            let gift = data[i].firstName
            let giftLink = data[i].lastName
            p.innerHTML = `${gift}     <a href="${giftLink}">${giftLink}</a>`
            container.appendChild(p)
            
        }
    }
    
    
})



