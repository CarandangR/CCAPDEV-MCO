var button = document.querySelector('.followButton');

var filterNew = document.querySelector('.newposts')
var filterHot = document.querySelector('.hotposts')

var communityname = document.querySelector('.comhandle').innerText
let parts = communityname.split('/'); 
let result = parts[1];
var toCreatePost = document.querySelector('.posttext')

toCreatePost.addEventListener('click', function(){

    window.location = "/Create_Post"
})
filterNew.addEventListener('click', async function (){

    
    window.location.href = "/newpostscommunity/"+result;


})

filterHot.addEventListener('click', async function (){

    
    window.location.href = "/hotpostscommunity/"+result;


})
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