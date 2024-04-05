function toggleImage(imgElement, originalSrc, clickedSrc) {
    if (imgElement.getAttribute('src').includes(clickedSrc)) {
        imgElement.setAttribute('src', originalSrc);
        
    } else {
        imgElement.src = clickedSrc;
    }
}
document.addEventListener('DOMContentLoaded', function() {
    console.log("content loaded");
    document.querySelectorAll('.postfooter').forEach(function(footer) {
        const postContainerElement = footer.closest('.postscontainer');
        const postId = postContainerElement.getAttribute('data-postid');
    
        footer.querySelector('.upbit').addEventListener('click', async function () {
            console.log("Upbit Clicked");
            if(footer.querySelector('.upbit img').getAttribute('src').includes('/static/img/up-arrow-regular-24.png')) {
                console.log("icnrease votes by 1 cuz regular img");
                footer.querySelector('.upbit img').setAttribute('src', '/static/img/up-arrow-solid-24.png');
                try {
                        const response = await fetch(`/updatevote/` + postId, {
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
                    const response = await fetch(`/updatevote/` + postId, {
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
            // toggleImage(footer.querySelector('.upbit img'), '/static/img/up-arrow-regular-24.png', '/static/img/up-arrow-solid-24.png');
            // footer.querySelector('.downbit img').setAttribute('src', '/static/img/down-arrow-regular-24.png');
            // try {
            //     const response = await fetch(`/updatevote/` + postId, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({ 
            //             type: 'upvote',
            //             id: postId,
            //          })
            //     });
            //     if (!response.ok) {
            //         console.error('Error updating vote:', response.statusText);
            //     }
            // } catch (error) {
            //     console.error('Error updating vote:', error);
            // }
        }); 
        footer.querySelector('.downbit').addEventListener('click', async function() { 
             console.log("Downbit Clicked");
             if(footer.querySelector('.downbit img').getAttribute('src').includes('/static/img/down-arrow-regular-24.png')) {
                footer.querySelector('.downbit img').setAttribute('src', '/static/img/down-arrow-solid-24.png');
                try {
                    const response = await fetch(`/updatevote/` + postId, {
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
                    const response = await fetch(`/updatevote/` + postId, {
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
        //     toggleImage(footer.querySelector('.downbit img'), '/static/img/down-arrow-regular-24.png', '/static/img/down-arrow-solid-24.png');
        //     footer.querySelector('.upbit img').setAttribute('src', '/static/img/up-arrow-regular-24.png');
    
        //     try {
        //         const response = await fetch(`/updatevote/` + postId, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify({ 
        //                 type: 'downvote',
        //                 id: postId
        //             })
        //         });
        //         if (response.ok) {
        //             //location.reload();
        //         }
        //         else {
        //             console.log("Error updating vote");
        //         }
        //     } catch (error) {
        //         console.error('Error updating vote:', error);
        //     }
        // });
        });
    });
});
