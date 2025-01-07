document.addEventListener("DOMContentLoaded", () => {
  fetch("../script/users.json")
    .then((response) => response.json())
    .then((users) => {
      window.users = users;
    })
    .catch((error) => console.error("Error loading users:", error));

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  [usernameInput, passwordInput].forEach((input) => {
    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        login();
      }
    });
  });
});

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorDiv = document.getElementById("error");

  const user = window.users?.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    errorDiv.textContent = "";
    window.location.href = "dashboard.html";
  } else {
    errorDiv.textContent = "Invalid username or password";
  }
}
