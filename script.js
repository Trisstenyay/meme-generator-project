const memeForm = document.getElementsByClassName("meme-gen-form")[0];   /* declares variable memeForm & grabs the HTML Element by className ("meme-gen-form") */
 
const topText = document.getElementById("top-text");   /* declares variable topText & grabs the HTML element by Id ("top-text") */

const image = document.getElementById("image");   /* declares variable image & grabs HTML element by Id ("image") */

const bottomText = document.getElementById("bottom-text");   /* declares variable bottomText & grabs HTML element by Id ("bottom-text") */

const meme = document.getElementById("meme");  /* declares variable meme & grabs HTML element by Id ("meme") */



function handleFormSubmit(event){
    event.preventDefault();   /* event.preventDefault() makes sure that your meme opens/runs correctly on the page */
    const top = document.createElement("div");   /* declares variable top & creates HTML element ("div") */
    const bottom = document.createElement("div");   /* declares variable bottom & creates HTML element ("div") */
    const topTextValue = topText.value;   /* declares variable topTextValue & is = topText.value */
    const bottomTextValue = bottomText.value;   /* declares variable bottomTextValue & is = bottomText.value */
    const buttonInputDelete = document.createElement("input");   /* declares variable buttonInput & creates HTML element */
    const imgUrl = image.value;   /* declares variable imgUrl = image.value */
    const memeImage = document.createElement("img");   /* declares variable memeImage & creates HTML element ("img") */
    memeImage.src = imgUrl; 
    buttonInputDelete.type = 'submit';
    top.textContent = topTextValue; 
    bottom.textContent = bottomTextValue; 
    buttonInputDelete.value = 'Delete Meme';
    top.classList.add('top'); 
    bottom.classList.add('bottom'); 
    memeImage.classList.add('image');
    buttonInputDelete.classList.add('delete-meme');

    buttonInputDelete.addEventListener("click", handleMemeDelete);

    meme.appendChild(top);   /* makes the top HTML element appear on the web-page */
    meme.appendChild(memeImage);   /* makes the memeImage HTML element appear on the web-page */
    meme.appendChild(bottom);   /* makes the bottom HTML element appear on the web-page */
    meme.appendChild(buttonInputDelete);  /* makes the button HTML element appear on the web-page */
    
    topText.value = '';
    bottomText.value = '';
    image.value = '';
}

function handleMemeDelete(event){
    event.preventDefault();
    event.target.parentElement.remove();
}

memeForm.addEventListener("submit", handleFormSubmit);   