/* eslint-disable no-unused-vars */
// Function to display the contact modal.
// eslint-disable-next-line no-unused-vars
function displayModal() {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

// Function to build and display the header modal with photographer name.
async function headerModal() {
	// eslint-disable-next-line no-undef
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

document.querySelector("form").addEventListener("submit", function (event) {
	event.preventDefault();
	window.location.href = "index.html";
});
