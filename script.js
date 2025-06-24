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


  // Create a download button
  const downloadBtn = document.createElement("button");
  downloadBtn.innerText = "Download Meme";
  downloadBtn.classList.add("download-meme");

  downloadBtn.addEventListener("click", () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  let newTab;
  if (isIOS) {
    // Open the tab IMMEDIATELY on click, before async starts
    newTab = window.open();
  }

  html2canvas(memeContainer).then(canvas => {
    const imgData = canvas.toDataURL("image/png");

    if (isIOS) {
      if (newTab) {
        newTab.document.body.style.margin = "0";
        newTab.document.body.style.background = "#000";
        newTab.document.body.innerHTML = `
          <img src="${imgData}" style="width:100%; max-width:100%; height:auto; display:block; margin:0 auto;" />
          <p style="color:white; text-align:center;">👆 Tap and hold the image to save it.</p>
        `;
      } else {
        alert("⚠️ Please allow popups to download the meme on iPhone.");
      }
    } else {
      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = imgData;
      link.target = "_self";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert("✅ Meme downloaded successfully!");
    }
  });
});

  // Create a container to hold the buttons
  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("meme-buttons");

  // Add both buttons inside the wrapper
  buttonWrapper.appendChild(deleteBtn);
  buttonWrapper.appendChild(downloadBtn);

  // Then add the wrapper to the memeContainer
  memeContainer.appendChild(buttonWrapper);


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


