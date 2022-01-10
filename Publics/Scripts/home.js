console.log("this message is from the home page");
var rightButton = document.querySelector(".button-right");
var leftButton = document.querySelector(".button-left");
var photos = document.querySelector(".photos");

var images = ["1.jpg","2.jpg","3.jpg","4.jpg",
    "5.jpg","6.jpg","7.jpg","8.jpg"]
var imagesPrefix = "/Images/";
var shownImages = [];
let thisIndex = 2;


photos.addEventListener('click',(event)=>{
    rightButtonClick(event)
})

rightButton.addEventListener("click",(event)=>{
    rightButtonClick(event)
})


leftButton.addEventListener("click",(event)=>{
    leftButtonClick(event)
})





function rightButtonClick(event) {
    // console.log("listening click event from right button")
    let thisRandom = Math.floor(Math.random() * 7);
    let thisImage = imagesPrefix+images[thisRandom];
    photos.src = thisImage;
    console.log(thisRandom)
    console.log(thisImage)
    shownImages.push(thisImage)
}
function leftButtonClick(event) {
    // console.log("listening click event from left button")
    if (thisIndex > shownImages.length){
        rightButtonClick();
        return
    }
    let thisImages = shownImages[shownImages.length - thisIndex];
    photos.src = thisImages;
    thisIndex++;
    console.log(thisImages);
}
