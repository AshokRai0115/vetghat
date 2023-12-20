const form = document.getElementById("signin")

// const userAPI = "http://localhost:8000/api/v1/user";

form.addEventListener('submit', function handleSignIn(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = form.querySelector("#password").value;
    fetch("http://localhost:8000/api/v1/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.id) {
          document.querySelector("#err").innerHTML = "";
          window.sessionStorage.setItem("loggedInUser", data.id);
          window.location.href = "/frontend/index.html";
        } else if (data.detail) {
          document.querySelector("#err").innerHTML = data.detail;
        }
      })
      .catch((err) => {
        console.error(err);
        document.querySelector("#err").innerHTML = "Login Failed";
      });
  }
)