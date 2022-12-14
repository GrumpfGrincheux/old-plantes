function getInputs(inputA, inputB, inputC, inputD, inputE) {
	let valueA = document.getElementById(`${inputA}`).value;
	let valueB = document.getElementById(`${inputB}`).value;
	let valueC = document.getElementById(`${inputC}`).value;
	let valueD = document.getElementById(`${inputD}`).value;
	let valueE = document.getElementById(`${inputE}`).value;

	let queryA = "";
	let queryB = "";
	let queryC = "";
	let queryD = "";
	let queryE = "";

	if (writeQuery(inputA, valueA) !== false) {
		queryA = `WHERE ${writeQuery(inputA, valueA)} `;
	}
	if (writeQuery(inputB, valueB) !== false) {
		queryB = `AND ${writeQuery(inputB, valueB)} `;
	}
	if (writeQuery(inputC, valueC) !== false) {
		queryC = `AND ${writeQuery(inputC, valueC)} `;
	}
	if (writeQuery(inputD, valueD) !== false) {
		queryD = `AND ${writeQuery(inputD, valueD)} `;
	}
	if (writeQuery(inputE, valueE) !== false) {
		queryE = `AND ${writeQuery(inputE, valueE)} `;
	}

	let query = `${queryA} ${queryB} ${queryC} ${queryD} ${queryE}`;

	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/pages/plantes/php/search_plantes.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = () => {
		if (xhr.status === 200 && xhr.readyState === 4) {
			document.getElementById("plantes-tbody").innerHTML = xhr.responseText;
		} else if (xhr.readyState === 4) {
			console.log("Error occured");
		}
	};
	xhr.send(`query=${query}`);
}

function writeQuery(input, value) {
	let table = "";
	if (input == "nom") {
		table = "plantes";
	} else {
		table = `${input}s`;
	}

	if (value == "") {
		return false;
	} else {
		let query = `${table}.${input} LIKE "${value}%"`;
		return query;
	}
}
