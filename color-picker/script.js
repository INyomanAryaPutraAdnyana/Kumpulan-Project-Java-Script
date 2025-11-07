const colorInput = document.getElementById("colorInput");
colorInput.addEventListener("input", (event) => {
  let wadahColor = event.target.value;

  const colorCode = document.getElementById("colorCode");
  colorCode.textContent = wadahColor;

  const colorDisplay = document.getElementById("colorDisplay");
  colorDisplay.style.backgroundColor = wadahColor;
});
