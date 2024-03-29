setTimeout(() => {
	document.getElementById("add-famille").classList.add("add-form-visible");
}, 200);

function textInputHandler(
	textInputID,
	formID,
	suggestionsID,
	globalSecurityRegex,
	specificRegex,
) {
	const textInput = document.getElementById(textInputID);
	const form = document.getElementById(formID);
	const suggestions = document.getElementById(suggestionsID);
	function showForm() {
		const nextForm = form.nextElementSibling;
		if (nextForm != null) {
			if (!nextForm.classList.contains("add-form-visible")) {
				nextForm.classList.add("add-form-visible");
			}
		}
	}
	let globalSuggestionIncrement = 1;

	function autoComplete() {
		let send;

		if (form.id === "add-famille") {
			send = new FormData(form);
		}
		if (form.id === "add-genre") {
			send = new FormData(form);
			send.append(
				"famille",
				document.getElementById("famille-choice").textContent,
			);
		}
		if (form.id === "add-espece") {
			send = new FormData(form);
			send.append(
				"famille",
				document.getElementById("famille-choice").textContent,
			);
			send.append("genre", document.getElementById("genre-choice").textContent);
		}
		if (textInput.value != "") {
			const xhr = new XMLHttpRequest();
			xhr.open("POST", "/pages/plantes/php/auto_complete.php", true);
			xhr.onload = () => {
				let arr = [];
				let html = "";
				const jsonObject = JSON.parse(xhr.responseText);
				jsonObject.forEach((element) => {
					arr.push(element.name);
					html += `<p id="sugg${globalSuggestionIncrement}" onclick="onClickAutoComplete(
          'sugg${globalSuggestionIncrement}', '${textInputID}')" class="suggestion">${element.name}</p>`;
					globalSuggestionIncrement++;
				});
				if (html == "") {
					suggestions.innerHTML = "";
					suggestions.classList.remove("suggestions-visible");
				} else {
					suggestions.classList.add("suggestions-visible");
					suggestions.innerHTML = html;
				}
			};
			xhr.send(send);
		} else if (textInput.value == "") {
			suggestions.classList.remove("suggestions-visible");
		}
	}
	function filterInputs() {
		textInput.value = textInput.value.replace(globalSecurityRegex, "");
		if (
			specificRegex.test(textInput.value) ||
			textInput.classList.contains("input-is-valid")
		) {
			textInput.classList.add("input-is-valid");
			return true;
		} else {
			textInput.classList.remove("input-is-valid");
			return false;
		}
	}
	function onCorrectInputCloseSuggestion() {
		if (suggestions.lastChild.textContent == textInput.value) {
			suggestions.lastChild.remove;
			suggestions.classList.remove("suggestions-visible");
		}
	}
	function sendData() {
		let send;
		if (form.id === "add-famille") {
			send = new FormData(form);
		}
		if (form.id === "add-genre") {
			send = new FormData(form);
			send.append(
				"famille",
				document.getElementById("famille-choice").textContent,
			);
		}
		if (form.id === "add-espece") {
			send = new FormData(form);
			send.append(
				"famille",
				document.getElementById("famille-choice").textContent,
			);
			send.append("genre", document.getElementById("genre-choice").textContent);
		}

		const xhr = new XMLHttpRequest();
		xhr.open("POST", `/pages/plantes/php/ajout_plante.php`, true);
		xhr.onload = () => {
			if (xhr.status === 200 && xhr.readyState === 4) {
				function valide(element) {
					return element != "";
				}
				const arr = xhr.responseText.split("!");
				const cleanArr = arr.filter(valide);
				const output = cleanArr[cleanArr.length - 1] + "!";
				form.innerHTML += `<div class="on-submit-success-message"><p>${output}</p></div>`;
				console.log(xhr.responseText);
			}
		};
		xhr.send(send);
	}
	function onSubmitEvents() {
		if (filterInputs()) {
			sendData();
			form.classList.remove("add-form");
			form.classList.remove("add-form-visible");
			form.innerHTML = `
        <div class="choice"><p>${textInput.id} :</p>
        <p id="${textInput.id}-choice">${textInput.value}</p></div>`;
			showForm();
		} else if (textInput.value == "" || null || undefined) {
			suggestions.classList.add("suggestions-visible");
			suggestions.innerHTML = `<div class="error-message"><p>Ce champ ne peut pas être vide</p></div>`;
			return false;
		} else if (textInput.value != "" || null || undefined) {
			suggestions.classList.add("suggestions-visible");
			suggestions.innerHTML = `<div class="error-message"><p>"${textInput.value}" n'est pas une famille valide</p></div>`;
		}
	}

	return {
		showForm,
		autoComplete,
		filterInputs,
		onCorrectInputCloseSuggestion,
		onSubmitEvents,
	};
}

function onClickAutoComplete(suggestionID, inputID) {
	const input = document.getElementById(inputID);
	const suggestion = document.getElementById(suggestionID).textContent;
	input.value = suggestion;
	input.classList.add("input-is-valid");
	const suggestions = document.querySelectorAll(".suggestions");
	suggestions.forEach((element) => {
		element.replaceChildren();
		element.classList.remove("suggestions-visible");
	});
}

const securityRegex = /[^a-zA-Z é]/g;
const familleRegex = /^[A-Z]{1}[a-z]+acées$/g;
const genreRegex = /^[A-Z]{1}[a-z]+$/g;
const especeRegex = /^[A-Z]{1}[a-z]+[ ]{1}[a-z]+$/g;

const formFamille = document.getElementById("add-famille");
const inputFamille = document.getElementById("famille");
const famille = textInputHandler(
	"famille",
	"add-famille",
	"famille-suggestions",
	securityRegex,
	familleRegex,
);
inputFamille.addEventListener("paste", function (event) {
	inputFamille.value = inputFamille.value.replace(/[^a-zA-Z0-9 é]/g, "");
	const sugg = document.getElementById("famille-suggestions");
	sugg.classList.add("suggestions-visible");
	event.preventDefault();
	sugg.innerHTML = `<div class="error-message"><p>ERREUR : Vous n'avez pas la permission pour effectuer cette action</p></div>`;
});

formFamille.addEventListener("input", () => {
	famille.filterInputs();
	famille.autoComplete();
});
formFamille.addEventListener("submit", (e) => {
	e.preventDefault();
	famille.onSubmitEvents();
});

const formGenre = document.getElementById("add-genre");
const inputGenre = document.getElementById("genre");
const genre = textInputHandler(
	"genre",
	"add-genre",
	"genre-suggestions",
	securityRegex,
	genreRegex,
);
inputGenre.addEventListener("paste", function (event) {
	inputGenre.value = inputGenre.value.replace(/[^a-zA-Z0-9 é]/g, "");
	const sugg = document.getElementById("famille-suggestions");
	sugg.classList.add("suggestions-visible");
	event.preventDefault();
	sugg.innerHTML = `<div class="error-message"><p>ERREUR : Vous n'avez pas la permission pour effectuer cette action</p></div>`;
});

formGenre.addEventListener("input", () => {
	genre.filterInputs();
	genre.autoComplete();
});

formGenre.addEventListener("submit", (e) => {
	e.preventDefault();
	genre.onSubmitEvents();
	inputEspece.value = document.getElementById("genre-choice").textContent;
});

const formEspece = document.getElementById("add-espece");
const inputEspece = document.getElementById("espece");
const espece = textInputHandler(
	"espece",
	"add-espece",
	"espece-suggestions",
	securityRegex,
	especeRegex,
);
inputEspece.addEventListener("paste", function (event) {
	inputEspece.value = inputEspece.value.replace(/[^a-zA-Z0-9 é]/g, "");
	const sugg = document.getElementById("famille-suggestions");
	sugg.classList.add("suggestions-visible");
	event.preventDefault();
	sugg.innerHTML = `<div class="error-message"><p>ERREUR : Vous n'avez pas la permission pour effectuer cette action</p></div>`;
});
formEspece.addEventListener("input", () => {
	espece.filterInputs();
	espece.autoComplete();
});

formEspece.addEventListener("submit", (e) => {
	e.preventDefault();
	espece.onSubmitEvents();
});
