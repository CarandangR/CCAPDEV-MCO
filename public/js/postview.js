document.addEventListener('DOMContentLoaded', function() {
    const upvote = document.getElementById('upvote');
    const downvote = document.getElementById('downvote');

    function toggleImage(imgElement, originalSrc, clickedSrc) {
        if (imgElement.src.includes(clickedSrc)) {
            imgElement.src = originalSrc;
        } else {
            imgElement.src = clickedSrc;
        }
    }

    upvote.addEventListener('click', function() {
        toggleImage(upvote, '/public/img/up-arrow-regular-24.png', '/public/img/up-arrow-solid-24.png');
    });

    downvote.addEventListener('click', function() {
        toggleImage(downvote, '/public/img/down-arrow-regular-24.png', '/public/img/down-arrow-solid-24.png');
    });
});
