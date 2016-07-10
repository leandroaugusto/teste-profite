// main.js
var obj;

function loadDoc() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			obj = JSON.parse(xhttp.responseText);
		}
	};
	xhttp.open("GET", "data/data.json", true);
	xhttp.send();
}
loadDoc();