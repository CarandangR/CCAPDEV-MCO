const editButton = document.querySelector('.editbutton');
const deleteButton = document.querySelector('.deletebutton');
const editPostForm = document.querySelector('.edit-post-form');
const editTextarea = document.querySelector('.edit-textarea');
const editPostarea = document.querySelector('.edit-postarea');
const saveButton = document.querySelector('.save-button');
const hiddenValue = document.getElementById('hiddenValue').value;

const editReplyButtons = document.querySelectorAll('.editreplybutton')
const deleteReplyButtons = document.querySelectorAll('.deletereplybutton')
const saveReplyButtons = document.querySelectorAll('.savereplybutton')
const editReplyForm = document.querySelectorAll('.edit-reply-form')
let replyId
editReplyButtons.forEach(editReplyButton => {
    editReplyButton.addEventListener('click', () => {
        // Find the corresponding edit reply form
        const editReplyForm = editReplyButton.closest('.replycontainer').querySelector('.edit-reply-form');
        const replyContentElement = editReplyButton.closest('.replycontainer').querySelector('.replyvalue');
        const replyContent = replyContentElement.textContent.trim();
        editReplyForm.style.display = 'block';
        editReplyForm.querySelector('.edit-textarea').value = replyContent
        // Get the replyId of the clicked reply
        replyId = editReplyButton.closest('.replycontainer').querySelector('#replyId').value;
    });
});

saveReplyButtons.forEach(saveReplyButton => {
    saveReplyButton.addEventListener('click', async () => {
        const editReplyForm = saveReplyButton.closest('.replycontainer').querySelector('.edit-reply-form');
        const editedReplyContent = editReplyForm.querySelector('.edit-textarea').value;
        editReplyForm.style.display = 'none';
        console.log(replyId)
        console.log(editedReplyContent);

        try{
            const response = await fetch('/editreply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({editedReplyContent: editedReplyContent, replyId: replyId}) 
            });
            window.location.href = "/samplepost1/"+ hiddenValue;
        }catch(err){
            console.error(err)
        }


    })

})

deleteReplyButtons.forEach(deleteReplyButton => {
    deleteReplyButton.addEventListener('click', async () => {
        replyId = deleteReplyButton.closest('.replycontainer').querySelector('#replyId').value;
        try{
            const response = await fetch ('/deletereply/'+replyId, {
                method: 'DELETE'
            });
        
            location.reload()// not triggering
        }catch(err){
            console.error(err)
        }
    })
    
})

editButton.addEventListener('click', () => {
    editPostForm.style.display = 'block';
    let postContent = document.getElementById('postcontent').innerText
    editPostarea.value = postContent
});

deleteButton.addEventListener('click', async() => {
    console.log('Delete button clicked');
    try{
        const response = await fetch ('/deletepost/'+hiddenValue, {
            method: 'DELETE',
        });
        window.location.href = "/mainpage_logged";

    }catch (err){
        console.error(err)
    }
});

saveButton.addEventListener('click', async () => {
    const editedPost = editPostarea.value;
    console.log("Save button trigger")
    console.log('Save button clicked, edited post:', editedPost);
    editPostForm.style.display = 'none';
    try{
        const response = await fetch('/editpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({editedPost: editedPost, hiddenValue: hiddenValue}) 
        });
        window.location.href = "/samplepost1/"+ hiddenValue;
    }catch(err){
        console.error(err)
    }
});


// attempt at implementation of upvote/downvote
// For replies: 
// Get the replyId of the clicked reply
// replyId = editReplyButton.closest('.replycontainer').querySelector('#replyId').value;


function toggleImage(imgElement, originalSrc, clickedSrc) {
    if (imgElement.getAttribute('src').includes(clickedSrc)) {
        imgElement.setAttribute('src', originalSrc);
        
    } else {
        imgElement.src = clickedSrc;
    }
}

//For the Post
document.querySelectorAll('.postinfocontainer .footer').forEach(function(postfooter) {
    // const postContainerElement = footer.closest('.postscontainer');
    // const postId = postContainerElement.getAttribute('data-postid');
    // let isRegular = true;
    postfooter.querySelector('.upbit').addEventListener('click', async function () {
        console.log("Upbit Clicked");
        if(postfooter.querySelector('.upbit img').getAttribute('src').includes('/static/img/up-arrow-regular-24.png')) {
            console.log("icnrease votes by 1 cuz regular img");
            postfooter.querySelector('.upbit img').setAttribute('src', '/static/img/up-arrow-solid-24.png');
            try {
                    const response = await fetch(`/updatepostvote/` + hiddenValue, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            type: 'upvote',
                            id: hiddenValue,
                         })
                    });
                    if (!response.ok) {
                        console.error('Error updating vote:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error updating vote:', error);
                }
                isRegular = false;
        }
        else if(postfooter.querySelector('.upbit img').getAttribute('src').includes('/static/img/up-arrow-solid-24.png')) {
            console.log("decrease votes by 1 cuz solid img");
            postfooter.querySelector('.upbit img').setAttribute('src', '/static/img/up-arrow-regular-24.png');
            try {
                const response = await fetch(`/updatepostvote/` + hiddenValue, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        type: 'upvote reduce',
                        id: hiddenValue,
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
    postfooter.querySelector('.downbit').addEventListener('click', async function() { 
         console.log("Downbit Clicked");
         if(postfooter.querySelector('.downbit img').getAttribute('src').includes('/static/img/down-arrow-regular-24.png')) {
            postfooter.querySelector('.downbit img').setAttribute('src', '/static/img/down-arrow-solid-24.png');
            try {
                const response = await fetch(`/updatepostvote/` + hiddenValue, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        type: 'downvote',
                        id: hiddenValue,
                     })
                });
                if (!response.ok) {
                    console.error('Error updating vote:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating vote:', error);
            }
        }
        else if(postfooter.querySelector('.downbit img').getAttribute('src').includes('/static/img/down-arrow-solid-24.png')) {
            postfooter.querySelector('.downbit img').setAttribute('src', '/static/img/down-arrow-regular-24.png');
            try {
                const response = await fetch(`/updatepostvote/` + hiddenValue, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        type: 'downvote reduce',
                        id: hiddenValue,
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

// For replies

document.querySelectorAll('.replycontainer .footer').forEach(function(replyfooter) {
    // const postContainerElement = footer.closest('.postscontainer');
    // const postId = postContainerElement.getAttribute('data-postid');
    // let isRegular = true;
    let currReplyId = replyfooter.closest('.replycontainer').querySelector('#replyId').value;
    replyfooter.querySelector('.upbit').addEventListener('click', async function () {
        console.log("Upbit Clicked");
        if(replyfooter.querySelector('.upbit img').getAttribute('src').includes('/static/img/up-arrow-regular-24.png')) {
            console.log("icnrease votes by 1 cuz regular img");
            replyfooter.querySelector('.upbit img').setAttribute('src', '/static/img/up-arrow-solid-24.png');
            try {
                    const response = await fetch(`/updatereplyvote/` + currReplyId, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            type: 'upvote',
                            id: currReplyId,
                         })
                    });
                    if (!response.ok) {
                        console.error('Error updating vote:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error updating vote:', error);
                }
                isRegular = false;
        }
        else if(replyfooter.querySelector('.upbit img').getAttribute('src').includes('/static/img/up-arrow-solid-24.png')) {
            console.log("decrease votes by 1 cuz solid img");
            replyfooter.querySelector('.upbit img').setAttribute('src', '/static/img/up-arrow-regular-24.png');
            try {
                const response = await fetch(`/updatereplyvote/` + currReplyId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        type: 'upvote reduce',
                        id: currReplyId,
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
    replyfooter.querySelector('.downbit').addEventListener('click', async function() { 
         console.log("Downbit Clicked");
         if(replyfooter.querySelector('.downbit img').getAttribute('src').includes('/static/img/down-arrow-regular-24.png')) {
            replyfooter.querySelector('.downbit img').setAttribute('src', '/static/img/down-arrow-solid-24.png');
            try {
                const response = await fetch(`/updatereplyvote/` + currReplyId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        type: 'downvote',
                        id: currReplyId,
                     })
                });
                if (!response.ok) {
                    console.error('Error updating vote:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating vote:', error);
            }
        }
        else if(replyfooter.querySelector('.downbit img').getAttribute('src').includes('/static/img/down-arrow-solid-24.png')) {
            replyfooter.querySelector('.downbit img').setAttribute('src', '/static/img/down-arrow-regular-24.png');
            try {
                const response = await fetch(`/updatereplyvote/` + currReplyId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        type: 'downvote reduce',
                        id: currReplyId,
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


