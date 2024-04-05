// function toggleImage(imgElement, originalSrc, clickedSrc) {
//     if (imgElement.getAttribute('src').includes(clickedSrc)) {
//         imgElement.setAttribute('src', originalSrc);
        
//     } else {
//         imgElement.src = clickedSrc;
//     }
// }

// document.querySelectorAll('.postscontainer > .postfooter').forEach(function(footer) {
//     const postContainerElement = document.querySelector('.postscontainer');
//     const postId = postContainerElement.getAttribute('data-postid');

//     footer.querySelector('.upbit').addEventListener('click', async function () {
//         toggleImage(this.querySelector('.upbit img'), '/static/img/up-arrow-regular-24.png', '/static/img/up-arrow-solid-24.png');
//         footer.querySelector('.downbit img').setAttribute('src', '/static/img/down-arrow-regular-24.png');
//         try {
//             const response = await fetch(`/updatevote/` + postId, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ 
//                     type: 'upvote',
//                     id: postId,
//                  }) // Indicate the type of vote
//             });
//             if (!response.ok) {
//                 console.error('Error updating vote:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error updating vote:', error);
//         }
//     }); 
//     footer.querySelector('.downbit').addEventListener('click', async function() { 
//         toggleImage(this.querySelector('.downbit img'), '/static/img/down-arrow-regular-24.png', '/static/img/down-arrow-solid-24.png');
//         footer.querySelector('.upbit img').setAttribute('src', '/static/img/up-arrow-regular-24.png');

//         try {
//             const response = await fetch(`/updatevote/` + postId, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ 
//                     type: 'downvote',
//                     id: postId
//                 })
//             });
//             if (response.ok) {
//                 location.reload();
//             }
//             else {
//                 console.log("Error updating vote");
//             }
//         } catch (error) {
//             console.error('Error updating vote:', error);
//         }
//     });
// });