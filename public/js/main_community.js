var button = document.querySelector('.followButton');

button.addEventListener('click', async function() {
    var buttonText = button.innerText.trim();

    var communityDiv = document.querySelector('.communitydisplayname');

    var spanElement = communityDiv.querySelector('span');

    console.log(spanElement.innerText);
    console.log(buttonText);
    
    try {
        const response = await fetch('/followCommunity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ spanText: spanElement.innerText }) // Assuming communityId is defined somewhere
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        if (buttonText === "FOLLOW") {
            button.innerText = "FOLLOWED";
        } else {
            button.innerText = "FOLLOW";
        }
    } catch (err) {
        console.error(err);
    }
});