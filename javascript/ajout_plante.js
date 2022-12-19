const addForm = document.getElementById("addForm");
addForm.addEventListener("input", addPlant);

function addPlant() {
	const send = new FormData(addForm);
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
