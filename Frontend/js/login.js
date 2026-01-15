function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    if (u === "admin" && p === "admin") {
        localStorage.setItem("login", "true");
        window.location.href = "home.html";
    } else {
        alert("Invalid Username or Password");
    }
}
