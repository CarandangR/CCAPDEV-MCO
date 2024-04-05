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


document.querySelectorAll('.postfooter').forEach(function(footer) {
    const postContainerElement = footer.closest('.postscontainer');
    const postId = postContainerElement.getAttribute('data-postid');

    footer.querySelector('.upbit').addEventListener('click', async function () {
        console.log("Upbit Clicked");
        if(footer.querySelector('.upbit img').getAttribute('src').includes('/static/img/up-arrow-regular-24.png')) {
            console.log("icnrease votes by 1 cuz regular img");
            footer.querySelector('.upbit img').setAttribute('src', '/static/img/up-arrow-solid-24.png');
            try {
                    const response = await fetch(`/updatepostvote/` + postId, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            type: 'upvote',
                            id: postId,
                         })
                    });
                    if (!response.ok) {
                        console.error('Error updating vote:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error updating vote:', error);
                }
        }
        else if(footer.querySelector('.upbit img').getAttribute('src').includes('/static/img/up-arrow-solid-24.png')) {
            console.log("decrease votes by 1 cuz solid img");
            footer.querySelector('.upbit img').setAttribute('src', '/static/img/up-arrow-regular-24.png');
            try {
                const response = await fetch(`/updatepostvote/` + postId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        type: 'upvote reduce',
                        id: postId,
                     })
                });
                if (!response.ok) {
                    console.error('Error updating vote:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating vote:', error);
            }
        }
    }); 
    footer.querySelector('.downbit').addEventListener('click', async function() { 
         console.log("Downbit Clicked");
         if(footer.querySelector('.downbit img').getAttribute('src').includes('/static/img/down-arrow-regular-24.png')) {
            footer.querySelector('.downbit img').setAttribute('src', '/static/img/down-arrow-solid-24.png');
            try {
                const response = await fetch(`/updatepostvote/` + postId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        type: 'downvote',
                        id: postId,
                     })
                });
                if (!response.ok) {
                    console.error('Error updating vote:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating vote:', error);
            }
        }
        else if(footer.querySelector('.downbit img').getAttribute('src').includes('/static/img/down-arrow-solid-24.png')) {
            footer.querySelector('.downbit img').setAttribute('src', '/static/img/down-arrow-regular-24.png');
            try {
                const response = await fetch(`/updatepostvote/` + postId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        type: 'downvote reduce',
                        id: postId,
                     })
                });
                if (!response.ok) {
                    console.error('Error updating vote:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating vote:', error);
            }
        }
    });
});