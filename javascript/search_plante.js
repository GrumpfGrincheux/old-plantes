function getInputs(inputB, inputC, inputD, inputE) {
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

			let plantes = [];
			let plantes_id = [];
			let genres = [];
			let genres_id = [];
			let especes = [];
			let especes_id = [];
			let familles = [];
			let familles_id = [];
			let html = `
        <div class="table-header"><p>Famille</p></div>
        <div class="table-header"><p>Nom</p></div>
        <div class="table-header"><p>Genre</p></div>
        <div class="table-header"><p>Espèce</p></div>
      `;
			for (let i = 0; i < jsonObject.length; i++) {
				let entry = jsonObject[i];
				if (
					!familles.includes(entry["famille"]) ||
					!familles_id.includes(entry["famille_id"])
				) {
					familles.push(entry["famille"]);
					familles_id.push(entry["famille_id"]);
					html += `<div class="table-entry" style="grid-row: ${
						i + 2
					}; grid-column: 1;"><p>${entry["famille"]}</p></div>`;
				}
				if (
					!plantes.includes(entry["nom"]) ||
					!plantes_id.includes(entry["plante_id"])
				) {
					plantes.push(entry["nom"]);
					plantes_id.push(entry["plante_id"]);
					html += `<div class="table-entry" style="grid-row: ${
						i + 2
					}; grid-column: 2;"><p>${entry["nom"]}</p></div>`;
				}
				if (
					!genres.includes(entry["genre"]) ||
					!genres_id.includes(entry["genre_id"])
				) {
					genres.push(entry["genre"]);
					genres_id.push(entry["genre_id"]);
					html += `<div class="table-entry" style="grid-row: ${
						i + 2
					}; grid-column: 3;"><p>${entry["genre"]}</p></div>`;
				}
				if (
					!especes.includes(entry["espece"]) ||
					!especes_id.includes(entry["espece_id"])
				) {
					especes.push(entry["espece"]);
					especes_id.push(entry["espece_id"]);
					html += `<div class="table-entry" style="grid-row: ${
						i + 2
					}; grid-column: 4;"><p>${entry["espece"]}</p></div>`;
				}
			}
			document.getElementById("plantes-table").innerHTML = html;
			console.log("Plantes ~~>", plantes);
			console.log("Plantes IDs ~~>", plantes_id);
			console.log("Genres ~~>", genres);
			console.log("Genres IDs ~~>", genres_id);
			console.log("Espèces ~~>", especes);
			console.log("Espèces IDs ~~>", especes_id);
			console.log("Familles ~~>", familles);
			console.log("Familles IDs ~~>", familles_id);
		} else if (xhr.readyState === 4) {
			console.log("Error occured");
		}
	};
	xhr.send(
		`nom=${nomSend}&genre=${genreSend}&espece=${especeSend}&famille=${familleSend}`,
	);
}
