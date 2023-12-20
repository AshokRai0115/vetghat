
var form = document.getElementById("signup-form")

// const userAPI = "http://localhost:8000/api/v1/user";

form.addEventListener('submit', (e) => {
  e.preventDefault()
  var username = document.getElementById("username").value
  var email = document.getElementById("email").value
  var password = document.getElementById("password").value
  var cpassword = document.getElementById("cpassword").value
  if (password != cpassword) {
    document.querySelector("#err").innerHTML = "Password didn't match"
    return
  }

  fetch("http://localhost:8000/api/v1/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password
    }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.id) {
        console.log(data.id)
        document.querySelector("#err").innerHTML = "";
        window.sessionStorage.setItem("loggedInUser", data.id);
        window.location.href = "/frontend/signin.html";
      }
    })
    .catch((err) => {
      console.error(err);
      document.querySelector("#err").innerHTML = "Signup failed";
    });
})
