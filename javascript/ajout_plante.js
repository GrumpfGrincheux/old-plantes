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

function showForm(form) {
	if (!form.classList.contains("add-form-visible")) {
		form.classList.add("add-form-visible");
	} else {
		form.classList.remove("add-form-visible");
	}
}

setTimeout(showForm, 300, addFam);

function autoComplete(form, form2, form3) {
	let send;
	let receiver;
	const inFam = document.getElementById("famille");
	const inGen = document.getElementById("genre");
	const inEsp = document.getElementById("espece");
	if (arguments.length == 1) {
		send = new FormData(form);
		receiver = document.getElementById("famille-suggest");
	}
	if (arguments.length == 2) {
		send = new FormData(form2);
		send.append("famille", document.getElementById("famille").value);
		receiver = document.getElementById("genre-suggest");
	}
	if (arguments.length == 3) {
		send = new FormData(form3);
		send.append("famille", document.getElementById("famille").value);
		send.append("genre", document.getElementById("genre").value);
		receiver = document.getElementById("espece-suggest");
	}

	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/pages/plantes/php/auto_complete.php", true);
	xhr.onload = () => {
		let arr = [];
		let html = "";
		const jsonObject = JSON.parse(xhr.responseText);
		jsonObject.forEach((element) => {
			arr.push(element.name);
			html += `<p class="suggestion">${element.name}</p>`;
			console.log(
				"🚀 ~ file: ajout_plante.js:68 ~ jsonObject.forEach ~ arr",
				arr,
			);
		});
		receiver.innerHTML = html;
	};
	xhr.send(send);
}
