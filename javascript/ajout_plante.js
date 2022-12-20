function sendData() {
	const send = new FormData(addForm);
	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/pages/plantes/php/ajout_plante.php", true);
	xhr.onload = () => {
		if (xhr.status === 200 && xhr.readyState === 4) {
			console.log(xhr.responseText);
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
	const suggestions = document.querySelectorAll(".suggestions");
	suggestions.forEach((element) => {
		element.replaceChildren();
		element.classList.remove("suggestions-visible");
	});
}

function onSubmitMessage(textInputID, formID, suggID) {
	const input = document.getElementById(textInputID);
	const form = document.getElementById(formID);
	const sugg = document.getElementById(suggID);
	if (input.value != "" || null || undefined) {
		form.classList.remove("add-form");
		form.innerHTML = `
      <div class="choice"><p>${input.id} :</p>
      <p id="${input.id}-choice">${input.value}</p></div>`;
		const nextForm = document.getElementById(formID).nextElementSibling;
		if (nextForm != null) {
			if (!nextForm.classList.contains("add-form-visible")) {
				nextForm.classList.add("add-form-visible");
			} else {
				nextForm.classList.remove("add-form-visible");
			}
		}
	} else {
		sugg.classList.add("suggestions-visible");
		sugg.innerHTML = `<div class="on-submit-error-message"><p>ERREUR : Ce champ ne peut pas être vide !</p></div>`;
	}
}
