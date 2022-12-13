function getPlantes() {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "/pages/plantes/php/get_plantes.php", true);
	const receiver = document.getElementById("plantes-tbody");
	xhr.onload = () => {
		if (xhr.status == 200 && xhr.readyState === 4) {
			receiver.innerHTML = xhr.response;
		} else if (xhr.readyState === 4) {
			console.log("Error occured");
		}
	};
	xhr.send();
}

const planteSubmitButton = document.getElementById("planteSubmit");
planteSubmitButton.addEventListener("click", getPlantes);
window.onload = getPlantes;

planteSubmitButton.addEventListener("click", function (e) {
	e.preventDefault();
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
	location.reload();
});
