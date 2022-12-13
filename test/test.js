function controlInputs(inputName) {
	let input = document.getElementById(`${inputName}`);
	let value = input.value;
	input.addEventListener("keyup", function (e) {
		e.preventDefault();
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "/pages/plantes/test/test.php", true);
		xhr.onload = () => {
			if (xhr.status === 200 && xhr.readyState === 4) {
				console.log(xhr.responseText);
			} else if (xhr.readyState === 4) {
				console.log("Error occured");
			}
		};
		xhr.send(``);
	});
}
