
/*
const user = function(username, userhandle, userrole, userbits, userimg, userdescription) {
    this.username = username;
    this.userhandle = userhandle;
    this.userrole = userrole;
    this.userbits = userbits;
    this.userimg = userimg;
    this.userdescription = userdescription;
}*/



document.addEventListener("DOMContentLoaded", function() {
    window.scrollTo(0, 0);

    console.log("document loaded");
   document.querySelector(".editbutton a").addEventListener("click", function(e) {
    e.preventDefault();

    let profiledescription = document.querySelector(".profiledesc");
    var textBox = document.createElement("input");
    //textBox.setAttribute("type", "text");
    textBox.value = profiledescription.innerText;
    profiledescription.appendChild(textBox);
    textBox.focus();
    let submitbutton = document.querySelector(".editbutton button");
    submitbutton.style.display = "block";
    document.querySelector(".editbutton button").addEventListener("click", function(e) {
        e.preventDefault();

        console.log("submitted!");
        submitbutton.style.display = "none"; // Hide the submit button after editing
        document.querySelector(".profiledesc p").innerText = textBox.value;
        
            // Revert back to the original content
        //textBox.replaceWith(profiledescription);
        textBox.remove();
        
    });
   });
});