const pubList = document.getElementById("pubList");

function addPub() {
  const li = document.createElement("li");
  li.textContent = "Test Pub " + Math.floor(Math.random() * 100);
  pubList.appendChild(li);
}
