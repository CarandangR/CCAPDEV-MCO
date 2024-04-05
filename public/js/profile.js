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

    let profiledescription = document.querySelector(".profiledescinput input");
    let submitbutton = document.querySelector(".editbutton button");
    document.querySelector(".editbutton a").addEventListener("click", function(e) {
        e.preventDefault();
        profiledescription.style.display = "block";
        submitbutton.style.display = "block";
    
   });

   submitbutton.addEventListener("click", async () => {
    const newProfileDescContent = profiledescription.value;
    console.log("Edit into: " + newProfileDescContent);
    console.log("submitted!");
    submitbutton.style.display = "none"; // Hide the submit button after editing
    profiledescription.style.display = "none";     //hide input area again after submitting edit
    const username = document.querySelector(".profiledisplayname span").innerText;
    console.log(username);
    try {
        const response = await fetch(`/submiteditprofile/` + username, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ profileDescription: newProfileDescContent })
        });

        if (response.ok) {
            // If the response is successful, reload the page to reflect the updated profile
            location.reload();
        } else {
            // If there's an error, log it
            console.error('Error:', response.statusText);
        }
    } catch (err) {
        console.error(err);
    }
    
});
});