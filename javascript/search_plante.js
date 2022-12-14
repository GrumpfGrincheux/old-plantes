function getInputs(inputA, inputB, inputC, inputD, inputE) {
	let valueA = document.getElementById(`${inputA}`).value;
	let valueB = document.getElementById(`${inputB}`).value;
	let valueC = document.getElementById(`${inputC}`).value;
	let valueD = document.getElementById(`${inputD}`).value;
	let valueE = document.getElementById(`${inputE}`).value;

	let variete = formatData(valueA);
	let nom = formatData(valueB);
	let genre = formatData(valueC);
	let espece = formatData(valueD);
	let famille = formatData(valueE);

	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/pages/plantes/php/search_plantes.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = () => {
		if (xhr.status === 200 && xhr.readyState === 4) {
			document.getElementById("plantes-tbody").innerHTML = JSON.parse(
				xhr.responseText
			);
		} else if (xhr.readyState === 4) {
			console.log("Error occured");
		}
	};
	xhr.send(
		`variete=${variete}&nom=${nom}&genre=${genre}&espece=${espece}&famille=${famille}`
	);
}

function formatData(value) {
	if (value == "") {
		return false;
	} else {
		let result = value;
		return result;
	}
}
