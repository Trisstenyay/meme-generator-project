// Get the form element so we can listen for its submit event
const memeForm = document.getElementsByClassName("meme-gen-form")[0];

// Get the input elements where the user types the top and bottom meme text and image URL
const topText = document.getElementById("top-text");
const image = document.getElementById("image");
const bottomText = document.getElementById("bottom-text");

// Get the div where the final meme will be added to the page
const meme = document.getElementById("meme");

// This function runs when the user submits the form
function handleFormSubmit(event) {
  // Stop the page from refreshing (default form behavior)
  event.preventDefault();

  // Create a new div that will hold the whole meme (image + text + delete button)
  const memeContainer = document.createElement("div");
  memeContainer.classList.add("meme-container");

  // Create the text elements and the image element
  const top = document.createElement("div");
  const bottom = document.createElement("div");
  const memeImage = document.createElement("img");

  // Get the actual text and image values the user entered into the form
  const topTextValue = topText.value;
  const bottomTextValue = bottomText.value;
  const imgUrl = image.value;

  // Set the text inside the top and bottom divs and the image source
  top.innerText = topTextValue;
  bottom.innerText = bottomTextValue;
  memeImage.src = imgUrl;

  // Apply the CSS classes to style the top and bottom text
  top.classList.add("top");
  bottom.classList.add("bottom");

  // Add the top text, image, and bottom text into the meme container in the correct order
    if (topTextValue.trim() !== "") {
    memeContainer.appendChild(top);
    }

    memeContainer.appendChild(memeImage);

    if (bottomTextValue.trim() !== "") {
    memeContainer.appendChild(bottom);
    }   


  // Create a delete button so the user can remove the meme
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete Meme";
  deleteBtn.classList.add("delete-meme");

  // Add a click event so when the button is clicked, the meme is removed from the page
  deleteBtn.addEventListener("click", function () {
    memeContainer.remove();                // Delete the entire meme
    memeForm.style.display = "block";      // Show the form again so the user can create a new meme
  });

  // Add the delete button to the meme container
  memeContainer.appendChild(deleteBtn);

  // Create a download button
  const downloadBtn = document.createElement("button");
  downloadBtn.innerText = "Download Meme";
  downloadBtn.classList.add("download-meme");

  // Add click event to download meme as image
  downloadBtn.addEventListener("click", () => {
  html2canvas(memeContainer).then(canvas => {
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
  });
  });

  // Append download button to meme container
  memeContainer.appendChild(downloadBtn);


  // Finally, put the whole meme container onto the page inside the main #meme div
  meme.appendChild(memeContainer);

  // Clear the form inputs so they’re empty for the next meme
  topText.value = '';
  bottomText.value = '';
  image.value = '';

  // Hide the form after creating the meme (until the meme is deleted)
  memeForm.style.display = "none";
  }

  // Tell the browser to run our handleFormSubmit function when the form is submitted
  memeForm.addEventListener("submit", handleFormSubmit);


