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

function handleCloseModalKeyPress(event) {
	// Vérifiez si la touche appuyée est "Entrée" (code 13)
	if (event.key === "Enter" || event.keyCode === 13) {
		closeModal(); // Fermez la modale
	}
}

document.querySelector("form").addEventListener("submit", function (event) {
	event.preventDefault();

	// Début du décompte
	let secondsLeft = 3;
	console.log(`Redirection dans ${secondsLeft} secondes`);

	// Utilisez setInterval pour afficher un message chaque seconde
	const countdownInterval = setInterval(function () {
		secondsLeft--;
		console.log(`${secondsLeft}`);

		// Si le décompte atteint 0, arrêtez l'intervalle et redirigez
		if (secondsLeft === 0) {
			clearInterval(countdownInterval);
			console.log("Redirection vers index.html...");
			window.location.href = "index.html";
		}
	}, 1000); // Répétez toutes les 1000 millisecondes (1 seconde)
});
