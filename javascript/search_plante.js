function getPlantes() {
	const data = new FormData();
	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/pages/plantes/php/get_plantes.php", true);
	const receiver = document.getElementById("plantes-tbody");
	xhr.onload = () => {
		if (xhr.status == 200 && xhr.readyState === 4) {
			receiver.innerHTML = xhr.response;
		} else if (xhr.readyState === 4) {
			console.log("Error occured");
		}
	};
	xhr.send(data);
}
