const planteForm = document.getElementById("planteForm");
planteForm.addEventListener("input", function getInput() {
	let send = new FormData(planteForm);
	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/pages/plantes/php/search_plantes.php", true);
	xhr.onload = () => {
		if (xhr.status === 200 && xhr.readyState === 4) {
			const famillesList = document.getElementById("familles");
			const genresList = document.getElementById("genres");
			const especesList = document.getElementById("especes");

			const jsonObject = JSON.parse(xhr.responseText);
			let genres = [];
			let genres_id = [];
			let especes = [];
			let especes_id = [];
			let familles = [];
			let familles_id = [];
			let fam = {};
			let gen = {};
			let esp = {};
			let genreHtml = ``;
			let especeHtml = ``;
			let familleHtml = ``;
			for (let i = 0; i < jsonObject.length; i++) {
				let entry = jsonObject[i];
				if (
					!familles.includes(entry["famille"]) ||
					!familles_id.includes(entry["famille_id"])
				) {
					familles.push(entry["famille"]);
					familles_id.push(entry["famille_id"]);
					fam[entry["famille_id"]] = entry["famille"];
					familleHtml += `<li>${entry["famille"]}</li>`;
				}
				if (
					!genres.includes(entry["genre"]) ||
					!genres_id.includes(entry["genre_id"])
				) {
					genres.push(entry["genre"]);
					genres_id.push(entry["genre_id"]);
					gen[entry["genre_id"]] = entry["genre"];
					genreHtml += `<li>${entry["genre"]}</li>`;
				}
				if (
					!especes.includes(entry["espece"]) ||
					!especes_id.includes(entry["espece_id"])
				) {
					especes.push(entry["espece"]);
					especes_id.push(entry["espece_id"]);
					esp[entry["espece_id"]] = entry["espece"];
					especeHtml += `<li>${entry["espece"]}</li>`;
				}
			}
			// console.log(fam, gen, esp);
			famillesList.innerHTML = familleHtml;
			genresList.innerHTML = genreHtml;
			especesList.innerHTML = especeHtml;
			// console.log("Genres ~~>", genres);
			// console.log("Genres IDs ~~>", genres_id);
			// console.log("Espèces ~~>", especes);
			// console.log("Espèces IDs ~~>", especes_id);
			// console.log("Familles ~~>", familles);
			// console.log("Familles IDs ~~>", familles_id);
		} else if (xhr.readyState === 4) {
			console.log("Error occured");
		}
	};
	xhr.send(send);
	onFormChangeHideResults("familles", "famille");
	onFormChangeHideResults("genres", "genre");
	onFormChangeHideResults("especes", "espece");
});

function onFormChangeHideResults(table, column) {
	if (document.getElementById(table).innerHTML == "") {
		document
			.getElementById(column)
			.classList.remove("search-result-list-hidden");
	} else {
		document
			.getElementById("famille")
			.classList.add("search-result-list-hidden");
	}
}

function clearOnEmptyForm(column) {}
if (document.getElementById("search").value == "" || null || undefined) {
	document.getElementById("familles").innerHTML = "";
}
