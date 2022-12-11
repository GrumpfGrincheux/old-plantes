function getPlantes() {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "/plantes/php/get_plantes.php", true);
	const receiver = document.getElementById("plantes-tbody");
	xhr.onload = () => {
		if (xhr.status == 200 && xhr.readyState === 4) {
			receiver.innerHTML = xhr.response;
		} else if (xhr.readyState === 4) {
			console.log("Error occured");
		}
	};
	xhr.send();
	setTimeout(() => {
		planteIdIncrement();
	}, 100);
}
const planteForm = document.getElementById("planteForm");
const plantSubmitButton = document.getElementById("planteSubmit");
plantSubmitButton.addEventListener("click", getPlantes);
window.onload = getPlantes;

planteForm.addEventListener("submit", function postPlante() {
	// e.preventDefault();
	const data = new FormData(planteForm);
	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/plantes/php/ajout_plante.php", true);
	xhr.onload = () => {
		if (xhr.status === 200 && xhr.readyState === 4) {
			console.log("Status: The plant has been added to the database.");
		} else if (xhr.readyState === 4) {
			console.log("Error occured");
		}
	};
	xhr.send(data);
});

function planteIdIncrement() {
	const plantLines = document.getElementsByClassName("plante-entry").length / 5;
	const planteIdInput = document.querySelector("#input-id");
	planteIdInput.value = plantLines + 1;
	return plantLines;
}

function onSubmitDeletePlante(i) {
	const xhr = new XMLHttpRequest();
	xhr.open("POST", `/plantes/php/delete_plante.php`, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = () => {
		if (xhr.status === 200 && xhr.readyState === 4) {
			console.log("Status: The plant has been deleted.");
		} else if (xhr.readyState === 4) {
			console.log("Error occured");
		}
	};
	xhr.send(`id=${i}`);
}
