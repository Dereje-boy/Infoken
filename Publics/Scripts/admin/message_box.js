const message_container = document.querySelector(".message-container");
const message_box = document.querySelector(".message-box");
const close_message_button = document.querySelector(".button-close-message");
const main_message = document.querySelector(".main-message");


close_message_button.addEventListener("click", (e) => {
    message_container_close();
    clearTimeout(close_message_container);
})

function message_container_close() {
    message_container.style.display = "none";
}

const notificationContainer = document.querySelector(".notification-container");
const tableContainer = document.querySelector(".table-container");

currentPadding = 30;

// setTimeout(hideNotification,3000)

let hideNotificationlet;

// hideNotification;

function hideNotification() {
    hideNotificationlet = setInterval(hideNotification, 67)
    currentPadding--
    if (currentPadding>2){
        notificationContainer.style.paddingTop = currentPadding.toString() + "px";
    }else{
        console.log(notificationContainer.style.paddingTop);
        clearInterval(hideNotificationlet);
        notificationContainer.style.visibility = "hidden";
    }
}