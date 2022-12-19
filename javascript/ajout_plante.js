const addForm = document.getElementById("addForm");
const planteSubmit = document.getElementById("planteSubmit");
planteSubmit.addEventListener("click", function (e) {
	e.preventDefault;
	const send = new FormData(addForm);
	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/pages/plantes/php/ajout_plante.php", true);
	xhr.onload = () => {
		if (xhr.status === 200 && xhr.readyState === 4) {
			console.log(xhr.responseText);
		}
	};
	xhr.send(send);
});

addForm.addEventListener("input", autoComplete);

function autoComplete() {
	if (
		document.getElementById("famille") != "" &&
		document.getElementById("genre") != "" &&
		document.getElementById("espece") != "" &&
		document.getElementById("nom") != ""
	) {
		const send = new FormData(addForm);
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "/pages/plantes/php/auto_complete.php", true);
		xhr.onload = () => {
			if (xhr.status === 200 && xhr.readyState === 4) {
				console.log(JSON.parse(xhr.responseText));
			}
		};
		xhr.send(send);
	}
}
