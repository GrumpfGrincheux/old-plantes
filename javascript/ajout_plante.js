const planteSubmitButton = document.getElementById("planteSubmit");
planteSubmitButton.addEventListener("click", function (e) {
	e.preventDefault();
	const planteForm = document.getElementById("planteForm");
	const data = new FormData(planteForm);
	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/pages/plantes/php/ajout_plante.php", true);
	xhr.onload = () => {
		if (xhr.status === 200 && xhr.readyState === 4) {
			console.log(xhr.responseText);
		} else if (xhr.readyState === 4) {
			console.log("Error occured");
		}
	};
	xhr.send(data);
	getInputs("nom", "genre", "espece", "famille");
});
