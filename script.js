function loadText() {
	/*
  readyState Values
  -> 0 : request not initialized
  -> 1 : server connection established
  -> 2 : request received
  -> 3 : processing request
  -> 4 : request finished and response ready

  HTTP Statuses
  -> 200 : "OK"
  -> 403 : "Forbidden"
  -> 404 : "Not Found"
  */

	const xhr = new XMLHttpRequest();

	// OPEN - type, url/file, async
	xhr.open("GET", "/plantes/sample.txt", true);
	// console.log("READYSTATE: ", xhr.readyState)

	// Optional - used for loaders
	// xhr.onprogress = () => {
	//   console.log("READYSTATE: ", xhr.readyState)
	// }

	xhr.onload = () => {
		if (xhr.status == 200) {
			const newText = document.createElement("p");
			newText.textContent = xhr.responseText;
			const receiver = document.getElementById("receiver");
			receiver.appendChild(newText);
		} else if (xhr.status == 404) {
			const newText = document.createElement("p");
			newText.textContent = "File Not Found";
			const receiver = document.getElementById("receiver");
			receiver.appendChild(newText);
		}
	};

	xhr.onerror = () => {
		console.log("Request Error...");
	};

	// Old way -
	// xhr.onreadystatechange = function () {
	// if (xhr.readyState == 4 && xhr.status == 200)
	// console.log(xhr.responseText)
	// }

	// Sends request
	xhr.send();
}

function loadUser() {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "/plantes/user.json", true);
	const receiver = document.getElementById("user");
	xhr.onload = () => {
		if (xhr.status == 200 && receiver.childElementCount == 3) {
			const user = JSON.parse(xhr.responseText);
			const output = `<p>${user.id}</p>
                      <p>${user.name}</p>
                      <p>${user.email}</p>`;
			receiver.innerHTML += output;
		} else if (xhr.status == 200 && receiver.childElementCount >= 3) {
			console.log("User already loaded !");
		}
	};
	xhr.onerror = () => {
		console.log("Request Error...");
	};
	xhr.send();
}

let usersIndex = 0;
function loadUsers() {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "/plantes/users.json", true);
	const receiver = document.getElementById("users");
	xhr.onload = () => {
		if (xhr.status == 200) {
			const users = JSON.parse(xhr.responseText);
			if (usersIndex < users.length) {
				const output = `
        <p>${users[usersIndex].id}</p>
        <p>${users[usersIndex].name}</p>
        <p>${users[usersIndex].email}</p>
        `;
				receiver.innerHTML += output;
				usersIndex++;
			} else {
				console.log("All users already loaded !");
			}
		}
	};
	xhr.onerror = () => {
		console.log("Request Error...");
	};
	xhr.send();
}

let ghUsersIndex = 0;
function loadGitHubUsers() {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "https://api.github.com/users", true);
	const receiver = document.getElementById("gh-users");
	xhr.onload = () => {
		if (xhr.status == 200) {
			const ghUsers = JSON.parse(xhr.responseText);
			if (ghUsersIndex < ghUsers.length) {
				const output = `
          <p class="gh-users-table">${ghUsers[ghUsersIndex].id}</p>
          <p class="gh-users-table">${ghUsers[ghUsersIndex].login}</p>
          <img style="width: 100px" src="${ghUsers[ghUsersIndex].avatar_url}">`;
				receiver.innerHTML += output;
				ghUsersIndex++;
			} else {
				console.log("All users 'from api/github.com/users' already loaded");
			}
		}
	};
	xhr.onerror = () => {
		console.log("Request Error...");
	};
	xhr.send();
}

function getPlantes() {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "/plantes/php/get_plantes.php", true);
	const receiver = document.getElementById("plantes-tbody");
	xhr.onload = () => {
		if (xhr.status == 200 && xhr.readyState === 4) {
			receiver.innerHTML = xhr.response;
		} else if (xhr.readyState === 4) {
			console.log("Error occured");
		}
	};
	xhr.send();
	setTimeout(() => {
		planteIdIncrement();
	}, 100);
}
const planteForm = document.getElementById("planteForm");
const plantSubmitButton = document.getElementById("planteSubmit");
plantSubmitButton.addEventListener("click", getPlantes);
window.onload = getPlantes;

//       *******  POST PLANTE FUNCTION ********
planteForm.addEventListener("submit", function () {
	// e.preventDefault();
	const data = new FormData(planteForm);
	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/plantes/php/ajout_plante.php", true);
	xhr.onload = () => {
		if (xhr.status === 200 && xhr.readyState === 4) {
			console.log("Status: The plant has been added to the database.");
		} else if (xhr.readyState === 4) {
			console.log("Error occured");
		}
	};
	xhr.send(data);
});

//        ********  INCREMENT ID FUNCTION  *********
function planteIdIncrement() {
	const plantLines = document.getElementsByClassName("plante-entry").length / 5;
	const planteIdInput = document.querySelector("#input-id");
	planteIdInput.value = plantLines + 1;
	return plantLines;
}
function onClickYesDelete(result) {
	if (result == "yes") {
		return true;
	} else {
		return false;
	}
}

//      ***********  DELETE PLANTE FUNCTION **********
function onSubmitDeletePlante(i) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `/plantes/php/delete_plante.php`, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log("Status: The plant has been deleted.");
    } else if (xhr.readyState === 4) {
      console.log("Error occured");
    }
  };
  xhr.send(`id=${i}`);
}
