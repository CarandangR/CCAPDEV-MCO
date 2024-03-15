
document.querySelector('.postscontainer').addEventListener('click', function(event) {
    const target = event.target;

    if (target.classList.contains('upbit')) {

        const postContainer = target.closest('.postscontainer');

        toggleImage(postContainer.querySelector('.upbit img'), '../public/img/up-arrow-regular-24.png', '../public/img/up-arrow-solid-24.png');

        const downbitImg = postContainer.querySelector('.downbit img');
        if (downbitImg.getAttribute('src').includes('../public/img/down-arrow-solid-24.png')) {
            downbitImg.setAttribute('src', '../public/img/down-arrow-regular-24.png');  
        }
    } else if (target.classList.contains('downbit')) {
        const postContainer = target.closest('.postscontainer');
        toggleImage(postContainer.querySelector('.downbit img'), '../public/img/down-arrow-regular-24.png', '../public/img/down-arrow-solid-24.png');
        const upbitImg = postContainer.querySelector('.upbit img');
        if (upbitImg.getAttribute('src').includes('../public/img/up-arrow-solid-24.png')) {
            upbitImg.setAttribute('src', '../public/img/up-arrow-regular-24.png');
        }
    }
});
