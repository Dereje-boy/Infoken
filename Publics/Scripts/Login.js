const bkgImage = document.querySelector('.Login-bkg-img');
const title = document.querySelector("title")
title.innerHTML = 'Login to Infoken'
let ImageModifier = '/Images/1.jpg';
bkgImage.addEventListener('click', () => {
    backgroundImageEvent();
})
const forgotButton = document.querySelector('.Forgot-container button');
const loginButton = document.querySelector('.Login-Button-Container button');
const infoBox = document.querySelector('.Info-container p');
const emailInput = document.querySelector('.email-input');
const passwordInput = document.querySelector('.password-input');
const EmailPasswordForm = document.querySelector(".email-password-form")

forgotButton.addEventListener('click', () => {
    forgotButtonEvent();
})
emailInput.addEventListener('keydown', (event) => {
    emailInputListener(event);
})
passwordInput.addEventListener('keyup', (event) => {
    passwordInputListener(event);
})
loginButton.addEventListener('click', () => {
    loginButtonEvent();
})
EmailPasswordForm.addEventListener('submit', (e) => {
    // EmailPasswordFormSubmit(e)
})

function forgotButtonEvent() {
    // console.log('forgotting button')
    const pinput = document.querySelector(".password-input")
    pinput.style.display = 'none';

    const plabel = document.querySelector(".password-label")
    plabel.style.display = 'none';

    loginButton.innerHTML = "Send Code";
    infoBox.style.display = "none";
}

function loginButtonEvent() {
    if (loginButton.innerHTML == "Send Code") {
        // console.log("sending recovery password to your email account")
        infoBox.style.display = 'block';
        infoBox.innerHTML = 'Password recovery code has been sent to your email.' +
            '<br> <strong>please check your Email Inbox</strong>'
        return;
    } else console.log("logging in to your account")

    let message = `Email : ${emailInput.value}<br>
                    Password : ${passwordInput.value}`
    infoBox.style.display = "block";
    infoBox.innerHTML = message;

}

function backgroundImageEvent() {
    console.log('resizing the image')
    bkgImage.style.width = ImageModifier;
    bkgImage.style.height = "auto";
    if (ImageModifier == '/Images/1.jpg')
        ImageModifier = '/Images/2.jpg'
    else ImageModifier = '/Images/1.jpg';
    bkgImage.src = ImageModifier;
    console.log(ImageModifier)
}

function emailInputListener(event) {
    // console.log(emailInput.value);
}

function passwordInputListener(event) {
    // console.log(passwordInput.value);
}

async function EmailPasswordFormSubmit(e) {
    // e.preventDefault();
    sendMessage("checking your email and password....")
    let response = await fetch("/students/all", {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-type': "application/json",
            'Authorization':
                'Bearer eyJhbGciOiJIUzI1NiJ9.YWJkaUBrZGViZQ.5vGhPPC-_xH-UV-dO0WWRG6sRF3-rljDPPA4WHSjlp0'
        }
    })

    if (response.status !== 200)console.log(response)

    let data = await response.json();

    let userEmail = emailInput.value;
    let userPassword = passwordInput.value;

    for (let i = 0; i < data.length; i++) {
        if (userEmail == data[i].studentID) {//email found
            if (userPassword == data[i].password) {
                //email and password match
                sendMessage("welcome " + data[i].firstname)
                // window.location.href = "/students/new"
                let newStudent = await fetch("/students/new",{
                    method:"get",
                    headers:{
                        'Content-type':"application/json",
                        'Authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.YWJkaUBrZGViZQ.5vGhPPC-_xH-UV-dO0WWRG6sRF3-rljDPPA4WHSjlp0'
                    }
                })
                // console.log(await newStudent.json())
                location.href = "/students/new"
            } else {//email match but not password
                sendMessage("please check your password")
            }
            break

        } else {//email not found
            sendMessage("your email is not found")
        }
    }
}
let display;
function sendMessage(message) {
    // clearTimeout(display)
    infoBox.style.display = "block";
    infoBox.style.color = "green";
    infoBox.innerHTML = message;
    // display = setTimeout(()=>{
    //     infoBox.style.display = "none";
    // },3000)
}