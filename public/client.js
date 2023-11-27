let info = {id: {}, username: {}, password: {}};

function memberlogininit() {
    document.getElementById("memberlogin").onclick = memberlogin;
}

function trainerlogininit() {
    document.getElementById("trainerlogin").onclick = trainerlogin;
}

function adminlogininit() {
    document.getElementById("adminlogin").onclick = adminlogin;
}

function logoutinit() {
    document.getElementById("logout").onclick = logout;
}

function memberlogin() {
    info.username = document.getElementById("username-input").value;
    info.password = document.getElementById("password-input").value;
    console.log("m");

    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if(this.readyState==4 && this.status==200) {
            let x = this.responseText;
            console.log(x);
            alert("You have successfully logged in");
            window.location = "/members/" + x;
        } else if(this.readyState==4 && this.status==400) {
            if (this.responseText == "already logged in") {
                alert("ERROR: You are already logged in");
            } else if (this.responseText == "no username") {
                alert("ERROR: Please enter a username");
            } else if (this.responseText == "no password") {
                alert("ERROR: Please enter a password");
            } else if (this.responseText == "username doesn't exist") {
                alert("ERROR: This username doesn't exist");
            } else if (this.responseText == "not right password") {
                alert("ERROR: This password is not correct");
            }
        }
    };
    req.open("POST", "http://localhost:3000/memberlogin");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(info));
}

function trainerlogin() {
    info.username = document.getElementById("username-input").value;
    info.password = document.getElementById("password-input").value;
    console.log("t");

    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if(this.readyState==4 && this.status==200) {
            let x = this.responseText;
            console.log(x);
            alert("You have successfully logged in");
            window.location = "/trainers/" + x;
        } else if(this.readyState==4 && this.status==400) {
            if (this.responseText == "already logged in") {
                alert("ERROR: You are already logged in");
            } else if (this.responseText == "no username") {
                alert("ERROR: Please enter a username");
            } else if (this.responseText == "no password") {
                alert("ERROR: Please enter a password");
            } else if (this.responseText == "username doesn't exist") {
                alert("ERROR: This username doesn't exist");
            } else if (this.responseText == "not right password") {
                alert("ERROR: This password is not correct");
            }
        }
    };
    req.open("POST", "http://localhost:3000/trainerlogin");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(info));
}

function adminlogin() {
    info.username = document.getElementById("username-input").value;
    info.password = document.getElementById("password-input").value;
    console.log("a");

    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if(this.readyState==4 && this.status==200) {
            let x = this.responseText;
            console.log(x);
            alert("You have successfully logged in");
            window.location = "/adminprofile";
        } else if(this.readyState==4 && this.status==400) {
            if (this.responseText == "already logged in") {
                alert("ERROR: You are already logged in");
            } else if (this.responseText == "no username") {
                alert("ERROR: Please enter a username");
            } else if (this.responseText == "no password") {
                alert("ERROR: Please enter a password");
            } else if (this.responseText == "username doesn't exist") {
                alert("ERROR: This username doesn't exist");
            } else if (this.responseText == "not right password") {
                alert("ERROR: This password is not correct");
            }
        }
    };
    req.open("POST", "http://localhost:3000/adminlogin");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(info));
}

//onclick function for logout button
function logout() {
    let req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (this.readyState==4 && this.status==200) {
            alert("You have successfully logged out");
            window.location = "/login";
        } else if (this.readyState==4 && this.status==400)  {
            alert("ERROR: You are not logged in yet");
        }
    }
	req.open("POST", "http://localhost:3000/logout");
	req.setRequestHeader("Content-Type", "application/json");
	req.send();
}