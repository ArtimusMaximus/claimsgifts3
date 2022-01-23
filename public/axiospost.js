




window.addEventListener('load', () => {

  const signUpButton = document.getElementById('signupbutton')

    signUpButton.addEventListener('click', () => {
      const newUserNameInput = document.getElementById('newusername').value
      const newUserEmailInput = document.getElementById('newuseremail').value
      const newUserPassInput = document.getElementById('newuserpass').value
      const newUserPassConfirmInput = document.getElementById('confirmnewuserpass').value

      

      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

      let urlencoded = new URLSearchParams();
      urlencoded.append("email", `${newUserEmailInput}`)
      urlencoded.append("username", `${newUserNameInput}`)
      urlencoded.append("password", `${newUserPassInput}`)

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch('/signup', requestOptions)
        .then(response => response.json())
        .then(result => {
          if (newUserNameInput === "" || newUserPassInput === "") {
            return alert('both fields must be submitted')
          }
          if (newUserPassInput !== newUserPassConfirmInput) {
              return alert('passwords must match!')
          }
          console.log(result);
          
        })
        
        .catch(error => console.log('error', error));
      let fetchUserName;
      fetch('/', {method: 'GET', })


    })


})




