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
            location.reload()
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
            })
        
    
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
        })
        const mainPageResponse = await fetch('/mainpage_logged');
        if (mainPageResponse.ok) {
            window.location.href = '/mainpage_logged';
        } else {
            console.error('Failed to fetch mainpage_logged after deleting post');
        }

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
        location.reload()
    }catch(err){
        console.error(err)
    }
});