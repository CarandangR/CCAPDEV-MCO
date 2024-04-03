const editButton = document.querySelector('.editbutton');
const deleteButton = document.querySelector('.deletebutton');
const editPostForm = document.querySelector('.edit-post-form');
const editTextarea = document.querySelector('.edit-textarea');
const saveButton = document.querySelector('.save-button');
const hiddenValue = document.getElementById('hiddenValue').value;

// Add event listener to edit button
editButton.addEventListener('click', () => {
    // Show the edit post form
    editPostForm.style.display = 'block';
});

// Add event listener to delete button
deleteButton.addEventListener('click', () => {
    // Implement delete functionality here
    console.log('Delete button clicked');
});

// Add event listener to save button
saveButton.addEventListener('click', async () => {
    // Implement save functionality here
    const editedPost = editTextarea.value;
    console.log('Save button clicked, edited post:', editedPost);
    // Hide the edit post form after saving
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