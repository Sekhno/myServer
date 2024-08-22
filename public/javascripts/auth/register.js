(function(){
    'use strict';

    document
        .getElementById('myForm')
        .addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = {
                firstName: this.querySelector('#firstName').value,
                lastName: this.querySelector('#lastName').value,
                email: this.querySelector('#email').value,
                password: this.querySelector('#password').value
            };

            fetch(this.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
                .then(async (response) => {
                    if (!response.ok) {
                        const error = await response.json()
                        throw new Error(error.message)
                    }

                    return response.json();

                })
                .then(data => {
                    console.log(data)
                })
                .catch(error => {
                    console.error(error)
                });
        });
})()