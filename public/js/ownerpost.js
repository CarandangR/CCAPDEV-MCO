const editButton = document.querySelector('.editbutton');
const deleteButton = document.querySelector('.deletebutton');
const editPostForm = document.querySelector('.edit-post-form');
const editTextarea = document.querySelector('.edit-textarea');
const saveButton = document.querySelector('.save-button');
const hiddenValue = document.getElementById('hiddenValue').value;

editButton.addEventListener('click', () => {
    editPostForm.style.display = 'block';
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
    const editedPost = editTextarea.value;
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