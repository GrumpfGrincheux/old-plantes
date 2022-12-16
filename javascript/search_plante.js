function getInputs(inputA, inputB, inputC, inputD, inputE) {
	let varieteSend = document.getElementById(`${inputA}`).value;
	let nomSend = document.getElementById(`${inputB}`).value;
	let genreSend = document.getElementById(`${inputC}`).value;
	let especeSend = document.getElementById(`${inputD}`).value;
	let familleSend = document.getElementById(`${inputE}`).value;

	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/pages/plantes/php/search_plantes.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = () => {
		if (xhr.status === 200 && xhr.readyState === 4) {
			const jsonObject = JSON.parse(xhr.responseText);

			let noms = [];
			let genres = [];
			let especes = [];
			let familles = [];
			let varietes = [];
			let html = `<div class="table-header"><p>Famille</p></div>
      <div class="table-header"><p>Genre</p></div>
      <div class="table-header"><p>Espèce</p></div>
      <div class="table-header"><p>Nom</p></div>
      <div class="table-header"><p>Variétés</p></div>`;
			for (let i = 0; i < jsonObject.length; i++) {
				let entry = jsonObject[i];
				if (!noms.includes(entry["nom"])) {
					noms.push(entry["nom"]);
					html += `<div class="table-entry" style="grid-row: ${
						i + 2
					}; grid-column: 4;"><p>${entry["nom"]}</p></div>`;
				}
				if (!genres.includes(entry["genre"])) {
					genres.push(entry["genre"]);
					html += `<div class="table-entry" style="grid-row: ${
						i + 2
					}; grid-column: 2;"><p>${entry["genre"]}</p></div>`;
				}
				if (!especes.includes(entry["espece"])) {
					especes.push(entry["espece"]);
					html += `<div class="table-entry" style="grid-row: ${
						i + 2
					}; grid-column: 3;"><p>${entry["espece"]}</p></div>`;
				}
				if (!familles.includes(entry["famille"])) {
					familles.push(entry["famille"]);
					html += `<div class="table-entry" style="grid-row: ${
						i + 2
					}; grid-column: 1;"><p>${entry["famille"]}</p></div>`;
				}
				if (!varietes.includes(entry["variete"])) {
					varietes.push(entry["variete"]);
					html += `<div class="table-entry" style="grid-row: ${
						i + 2
					}; grid-column: 5;"><p>${entry["variete"]}</p></div>`;
				}
			}
			document.getElementById("plantes-table").innerHTML = html;
			// console.log("Noms ~~>", noms);
			// console.log("Genres ~~>", genres);
			// console.log("Espèces ~~>", especes);
			// console.log("Familles ~~>", familles);
			// console.log("Variétés ~~>", varietes);
		} else if (xhr.readyState === 4) {
			console.log("Error occured");
		}
	};
	xhr.send(
		`variete=${varieteSend}&nom=${nomSend}&genre=${genreSend}&espece=${especeSend}&famille=${familleSend}`,
	);
}
