const closeButton = document.getElementById("closeMessage");
closeButton.addEventListener("click", () => closeMessage());
//Checks the server for the drawing.png file, if it exists, shows the message
window.onload = async function(){
    const response = await fetch("images/drawings/drawing.png");
    if (response.ok){
        message = document.getElementById("message");
        message.style.display = "block";
    }
}
//Hides the message and tells server to delete the drawing
function closeMessage(){
    message = document.getElementById("message");
    message.style.display = "none";

    fetch("mirror/delete", {
        method:'POST'
    })

}