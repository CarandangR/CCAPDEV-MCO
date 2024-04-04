let replies = [];
let replycount = 0;
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
const reply = function(user, userhandle, userbits, userimg, replycontent) {
    this.user = user;
    this.userhandle = userhandle;
    this.userbits = userbits;
    this.userimg = userimg;
    this.replycontent = replycontent;
}

document.addEventListener("DOMContentLoaded", function() {
    window.scrollTo(0, 0);
    document.querySelector(".replybutton").addEventListener("click", function(e) { 
		e.preventDefault();
        
        console.log("Reply clicked");
        let replytext = document.querySelector("input#replytextcontent").value;

        if(replytext != "") {
            document.querySelector("#replytextcontent").value = "";
        }
    });
    
   /* function displayReplies(replies) { 

        const currDate = new Date();
        const day = currDate.getDate();
        const month = currDate.getMonth();
        const year = currDate.getFullYear();
        const formattedDate = monthNames[month] + " " + day + ", " + year;
        document.querySelector("#replytextcontent").innerText = "";


        for(i = 0; i < replies.length; i++) {
            const currentReply = "<div class='replybox'>" +
                                    "<div class = 'replyinfo'> " +
                                        "<div class='replypfp'>" +
                                            "<a href='profilepage2.html'> <img class='userimg' src='"+ replies[i].userimg + "'> </a>" +
                                        "</div>" +
                                        "<p>"+ replies[i].user +"<br><span>"+ replies[i].userhandle +"</span><br>"+ replies[i].userbits + "</p>" +
                                        "<div class='postdate'>" +
                                            "<h5> Posted on: "+ formattedDate +
                                            "<p> Today </p>" +
                                        "</div>" +
                                    "</div>" +
                                    "<div class='replycontent'>" +
                                    "<p>"+ replies[i].replycontent +"<br> </p>" +
                                    "<div class='footer'>" +
                                        "<div class='upbit'>" +
                                            "<img src='../public/img/up-arrow-regular-24.png'/>" +
                                        "</div>" +
                                        "<div class='downbit'>" +
                                            "<img src='../public/img/down-arrow-regular-24.png'/>" +
                                        "</div>" +
                                        "<div class='share'>" +
                                            "<img src='../public/img/share-regular-24.png'/>" +
                                        "</div>" +
                                        "<div class='replybutton'><a href=''> Reply </a></div>" +
                                    "</div>" +
                                "</div>" +
                            "</div>";
            //document.querySelector("div.replycontainer").innerHTML += currentReply;
        }
    };*/
    function toggleImage(imgElement, originalSrc, clickedSrc) {
        if (imgElement.getAttribute('src').includes(clickedSrc)) {
            imgElement.setAttribute('src', originalSrc);
            
        } else {
            imgElement.src = clickedSrc;
        }
    }

    document.querySelectorAll('.footer').forEach(function(footer) {
        footer.querySelector('.upbit').addEventListener('click', function () {
            toggleImage(this.querySelector('.upbit img'), '../public/img/up-arrow-regular-24.png', '../public/img/up-arrow-solid-24.png');
            footer.querySelector('.downbit img').setAttribute('src', '../public/img/down-arrow-regular-24.png');
        }); 
        footer.querySelector('.downbit').addEventListener('click', function() { 
            toggleImage(this.querySelector('.downbit img'), '../public/img/down-arrow-regular-24.png', '../public/img/down-arrow-solid-24.png');
            footer.querySelector('.upbit img').setAttribute('src', '../public/img/up-arrow-regular-24.png');
        });
    })
});