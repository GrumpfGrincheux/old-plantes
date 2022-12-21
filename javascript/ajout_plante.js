function sendData(formID, textInputID) {
	const form = document.getElementById(formID);
	const send = new FormData(form);
	const xhr = new XMLHttpRequest();
	xhr.open("POST", `/pages/plantes/php/ajout_${textInputID}.php`, true);
	xhr.onload = () => {
		if (xhr.status === 200 && xhr.readyState === 4) {
			form.innerHTML += `<div class="on-submit-success-message"><p>${xhr.responseText}</p></div>`;
		}
	};
	xhr.send(send);
}

const addEsp = document.getElementById("add-espece");
const addGen = document.getElementById("add-genre");
const addFam = document.getElementById("add-famille");

function showForm(formID) {
	const nextForm = document.getElementById(formID).nextElementSibling;
	if (nextForm != null) {
		if (!nextForm.classList.contains("add-form-visible")) {
			nextForm.classList.add("add-form-visible");
		} else {
			nextForm.classList.remove("add-form-visible");
		}
	}
}

setTimeout(() => {
	document.getElementById("add-famille").classList.add("add-form-visible");
}, 200);

let globalSuggestionIncrement = 1;

function autoComplete(form, form2, form3) {
	let send, receiver, textInput, inputID;

	if (arguments.length == 1) {
		send = new FormData(form);
		receiver = document.getElementById("famille-suggestions");
		textInput = document.getElementById("famille");
		inputID = "famille";
	}
	if (arguments.length == 2) {
		send = new FormData(form2);
		send.append(
			"famille",
			document.getElementById("famille-choice").textContent,
		);
		receiver = document.getElementById("genre-suggestions");
		textInput = document.getElementById("genre");
		inputID = "genre";
	}
	if (arguments.length == 3) {
		send = new FormData(form3);
		send.append(
			"famille",
			document.getElementById("famille-choice").textContent,
		);
		send.append("genre", document.getElementById("genre-choice").textContent);
		receiver = document.getElementById("espece-suggestions");
		textInput = document.getElementById("espece");
		inputID = "espece";
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
        'sugg${globalSuggestionIncrement}', '${inputID}')" class="suggestion">${element.name}</p>`;
				globalSuggestionIncrement++;
			});
			if (html == "") {
				receiver.innerHTML = "";
				receiver.classList.remove("suggestions-visible");
			} else {
				receiver.classList.add("suggestions-visible");
				receiver.innerHTML = html;
			}
		};
		xhr.send(send);
	} else if (textInput.value == "") {
		receiver.classList.remove("suggestions-visible");
	}
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
function onCorrectInputCloseSuggestion(inputID, suggestionID) {
	const input = document.getElementById(inputID);
	const sugg = document.getElementById(suggestionID);
	if (sugg.lastChild.textContent == input.value) {
		sugg.lastChild.remove;
	}
}

function onSubmitMessage(textInputID, formID, suggID) {
	const input = document.getElementById(textInputID);
	const form = document.getElementById(formID);
	const sugg = document.getElementById(suggID);
	if (
		input.value != "" ||
		null ||
		(undefined && filterInputs(textInputID, suggID))
	) {
		form.classList.remove("add-form");
		form.classList.remove("add-form-visible");
		form.innerHTML = `
      <div class="choice"><p>${input.id} :</p>
      <p id="${input.id}-choice">${input.value}</p></div>`;
		sendData(formID, textInputID);
		const nextForm = document.getElementById(formID).nextElementSibling;
		if (nextForm != null) {
			if (!nextForm.classList.contains("add-form-visible")) {
				nextForm.classList.add("add-form-visible");
			} else {
				nextForm.classList.remove("add-form-visible");
			}
		}
	} else if (input.value == "" || null || undefined) {
		sugg.classList.add("suggestions-visible");
		sugg.innerHTML = `<div class="error-message"><p>ERREUR : Ce champ ne peut pas être vide</p></div>`;
		return false;
	} else if (input.value != "" || null || undefined) {
		sugg.innerHTML = `<div class="error-message"><p>ERREUR : "${input.value}" n'est pas une famille valide</p></div>`;
	}
}

function filterInputs(inputID, suggestionID) {
	const input = document.getElementById(inputID);
	if (inputID == "famille") {
		input.value = input.value.replace(/[^a-zA-Zé]/g, "");
		let regex = /[a-z]+acées$/g;
		if (regex.test(input.value)) {
			input.classList.add("input-is-valid");
		} else {
			input.classList.remove("input-is-valid");
			return false;
		}
	}
}

const familleTextInput = document.getElementById("famille");
const genreTextInput = document.getElementById("genre");
const especeTextInput = document.getElementById("espece");

familleTextInput.addEventListener("paste", function (event) {
	familleTextInput.value = familleTextInput.value.replace(
		/[^a-zA-Z0-9 é]/g,
		"",
	);
	const sugg = document.getElementById("famille-suggestions");
	sugg.classList.add("suggestions-visible");
	event.preventDefault();
	sugg.innerHTML = `<div class="error-message"><p>ERREUR : Vous n'avez pas la permission pour effectuer cette action</p></div>`;
});
genreTextInput.addEventListener("paste", function (event) {
	genreTextInput.value = genreTextInput.value.replace(/[^a-zA-Z0-9 é]/g, "");
	const sugg = document.getElementById("genre-suggestions");
	sugg.classList.add("suggestions-visible");
	event.preventDefault();
	sugg.innerHTML = `<div class="error-message"><p>ERREUR : Vous n'avez pas la permission pour effectuer cette action</p></div>`;
});
especeTextInput.addEventListener("paste", function (event) {
	especeTextInput.value = especeTextInput.value.replace(/[^a-zA-Z0-9 é]/g, "");
	const sugg = document.getElementById("espece-suggestions");
	sugg.classList.add("suggestions-visible");
	event.preventDefault();
	sugg.innerHTML = `<div class="error-message"><p>ERREUR : Vous n'avez pas la permission pour effectuer cette action</p></div>`;
});
