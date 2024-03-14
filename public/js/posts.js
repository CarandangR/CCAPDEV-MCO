// Focus first on Reply feature, making use of reply object (?) just like the flashcard


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
    const upvote = document.querySelector('div.upbit');
    const downvote = document.getElementById('div.downbit');
    //usign the flashcard approach, it assumes that there is a way to input the text and all requirements before pressing the button.
    // --> this means that I need to implement a way to input the required data (text, since profile information is obtained
    // through the current login details (?)
    document.querySelector(".replybutton").addEventListener("click", function(e) { 
		e.preventDefault();
        
        console.log("Reply clicked");
        let replytext = document.querySelector("input#replytextcontent").value;
        let webUser = document.querySelector('.profiledisplayname span').textContent.trim();
        let webUserhandle = document.querySelector('.profilehandlename span').textContent.trim();
        let userimgdir = document.querySelector('.profileiconholder img').getAttribute('src');


        if(replytext != "") {
            let newReply = new reply(webUser, webUserhandle, 99999, userimgdir, replytext);
            replies.push(newReply);
            replycount = replycount + 1;
            displayReplies(replies);
            document.querySelector("#replytextcontent").value = "";
        }
    });
    
    function displayReplies(replies) { 
        document.querySelector("div.replycontainer").innerText = "";
        const currDate = new Date();
        const day = currDate.getDate();
        const month = currDate.getMonth();
        const year = currDate.getFullYear();
        const formattedDate = monthNames[month] + " " + day + ", " + year;

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
                                        "<div class='replybutton'> <a href=''> Reply </a></div>" +
                                    "</div>" +
                                "</div>"

            document.querySelector("div.replycontainer").innerHTML += currentReply;
        }
    }

    let testing = document.querySelector('.upbit img').getAttribute('src');
    console.log(testing);
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