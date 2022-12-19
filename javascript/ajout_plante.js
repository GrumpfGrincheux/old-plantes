const planteSubmit = document.getElementById("planteSubmit");
planteSubmit.addEventListener("click", addPlant);

function addPlant() {
	const send = new FormData(planteSubmit);
	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/pages/plantes/php/ajout_plante.php", true);
	xhr.onload = () => {
		if (xhr.status === 200 && xhr.readyState === 4) {
			console.log(xhr.responseText);
		}
		if (xhr.readyState === 4) {
			console.log("error");
		}
	};
	xhr.send(send);
}
