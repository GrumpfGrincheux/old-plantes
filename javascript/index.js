function get() {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "/test.php", true);
	xhr.onload = () => {
		if (xhr.status === 200 && xhr.readyState === 4) {
			const jsonObject = JSON.parse(xhr.responseText);
			document.querySelector("main").innerHTML = jsonObject;
		}
	};
	xhr.send();
}
