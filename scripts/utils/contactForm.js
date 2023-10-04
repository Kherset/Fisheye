// Function to display the contact modal.
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

// Function to build and display the header modal with photographer name.
async function headerModal() {
  await photographerHeader(); // Asynchronously fetch photographer data.
  const modalTitle = document.getElementById("modal-title");
  const photographerName = document.querySelector(".photographer-name").outerText;
  modalTitle.innerText = `Contactez-moi ${photographerName}`;
}

// Function to close the contact modal.
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
