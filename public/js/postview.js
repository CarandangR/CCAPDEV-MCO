function toggleImage(imgElement, originalSrc, clickedSrc) {
    if (imgElement.getAttribute('src').includes(clickedSrc)) {
        imgElement.setAttribute('src', originalSrc);
        
    } else {
        imgElement.src = clickedSrc;
    }
}

document.querySelectorAll('.postfooter').forEach(function(footer) {
    footer.querySelector('.upbit').addEventListener('click', function () {
        toggleImage(this.querySelector('.upbit img'), '../public/img/up-arrow-regular-24.png', '../public/img/up-arrow-solid-24.png');
        footer.querySelector('.downbit img').setAttribute('src', '../public/img/down-arrow-regular-24.png');
    }); 
    footer.querySelector('.downbit').addEventListener('click', function() { 
        toggleImage(this.querySelector('.downbit img'), '../public/img/down-arrow-regular-24.png', '../public/img/down-arrow-solid-24.png');
        footer.querySelector('.upbit img').setAttribute('src', '../public/img/up-arrow-regular-24.png');
    });
})