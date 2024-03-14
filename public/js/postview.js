document.addEventListener('DOMContentLoaded', function() {
    function toggleImage(imgElement, originalSrc, clickedSrc) {
        if (imgElement.getAttribute('src').includes(clickedSrc)) {
            imgElement.setAttribute('src', originalSrc);
            
        } else {
            imgElement.src = clickedSrc;
        }
    }

    document.querySelector('div.upbit').addEventListener('click', function() {
        toggleImage(document.querySelector('.upbit img'), '../public/img/up-arrow-regular-24.png', '../public/img/up-arrow-solid-24.png');
    });

    document.querySelector('div.downbit').addEventListener('click', function() {
        toggleImage(document.querySelector('.downbit img'), '../public/img/down-arrow-regular-24.png', '../public/img/down-arrow-solid-24.png');
    });
});
