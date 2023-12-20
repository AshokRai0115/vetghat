const sessionUserId = sessionStorage.getItem('loggedInUser');
    
if(sessionUserId != null){
    fetch("http://localhost:8000/api/v1/user/getUsers").then(response => response.json())
    .then((data) => {
        console.log(data)
        userInfo = data.filter(user => user.id == sessionUserId)
        const username = document.getElementById("username");
        username.innerText = userInfo[0].username
        const profilePic = document.getElementById("profile-pic")   
        profilePic.src = "./images/" + (userInfo[0].username.split(" ")[0]).toLowerCase() + ".jpg"

        })
        .catch((err) => {
            console.error(err);
        });
}