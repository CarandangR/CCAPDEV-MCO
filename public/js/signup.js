
var errorArea = document.querySelector('.errorarea')

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('signUpForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        var formData = new FormData(form);

        let username = formData.get('username')
        let userhandle = formData.get('userhandle')
        let password = formData.get('password')
        let confirmpass = formData.get('confirmpass')

        if (password != confirmpass){
            errorArea.textContent = "Password Mismatch"
        } else{
            try{
                const response = await fetch('/submitsignup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username: username, userhandle: userhandle, password: password}) 
                })
                
                window.location.href = "/mainpage_logged";

            }catch(err){
                console.error(err)
            }
        }
    });
});