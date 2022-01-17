let modal;
document.addEventListener('click', (e) => {
    if(e.target.className === "modal-open"){
        modal = document.getElementById(e.target.dataset.id)
        openModal(modal)
    } else if (e.target.className === "modal-close"){
        closeModal(modal)
    } else {
        return
    }
});

const openModal = (modal) => {
    document.body.style.overflow = "hidden";
    modal.setAttribute("open", "true");
    document.addEventListener("keydown", escClose);
    let overlay = document.createElement('div')
    overlay.id = "modal-overlay";
    document.body.appendChild(overlay)
}

const closeModal = (modal) => {
    document.body.style.overflow = "auto";
    modal.removeAttribute("open");
    document.removeEventListener("keydown");
    document.body.removeChild(document.getElementById("modal-overlay"))
}

const escClose = (e) => {
    if(e.code == 27) {
        closeModal();
    }
}

const divModal = document.createElement('div')
divModal.innerHTML = `<div id="demo-modal" class="modal" role="dialog" tabindex="-1">
<div class="model-inner">
  <div class="modal-header">
    <h3>Hello World</h3>
    <button class="modal-close" data-id="demo-modal" aria-label="Close">
      &times;
    </button>
  </div>
  <p>
    FIller words
  </p>
</div>
</div>
<button class="modal-open" data-id="demo-modal">Display Modal</button>`
document.body.appendChild(divModal)
//end modal

window.addEventListener('load', () => {
    const button = document.createElement('button')
    button.setAttribute("data-toggle", "modal")
    button.setAttribute("data-target", "loginbutton")
    button.setAttribute("type", "button")
    button.className = "btn btn-primary"
    button.innerHTML = "Login"
    document.body.appendChild(button)


})


//modal styling
// .modal {
//     display: none;
//     align-items: center;
//     justify-content: center;
//     position: fixed;
//     z-index: 1;
//     width: 100%;
//     height: 100%;
//   }
//   .modal[open] {
//     display: flex;
//   }
//   .model-inner {
//     background-color: white;
//     border-radius: 0.5em;
//     max-width: 600px;
//     padding: 2em;
//     margin: auto;
//   }
//   .modal-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     border-bottom: 2px solid black;
//   }
//   #modal-overlay {
//     width: 100%;
//     height: 100%;
//     position: fixed;
//     top: 0;
//     left: 0;
//     z-index: 0;
//     background-color: black;
//     opacity: 0.5;  
//   }