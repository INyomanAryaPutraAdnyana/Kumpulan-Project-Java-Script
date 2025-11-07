// get element
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessButton");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartButton");

// random number awal
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// fungsi cek input
const handleCekInput = () => {
  const userGuess = Number(guessInput.value.trim());
  attempts++;

  if (!userGuess || userGuess < 1 || userGuess > 100) {
    message.textContent = "⚠️ Masukkan angka 1 - 100!";
    guessInput.focus(); // fokus lagi kalau salah input
    return;
  }

  if (userGuess === randomNumber) {
    message.textContent = `🎉 Congrats! Tebakan kamu benar ${userGuess}, kamu sudah mencoba ${attempts} kali.`;
    guessBtn.disabled = true;
    restartBtn.style.display = "inline";
  } else if (userGuess > randomNumber) {
    message.textContent = "📉 Coba lagi dengan angka yang lebih kecil.";
  } else {
    message.textContent = "📈 Coba lagi dengan angka yang lebih besar.";
  }

  guessInput.value = ""; // kosongkan input
  guessInput.focus(); // langsung fokus lagi ke input
};

// fungsi reset
const handleReset = () => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  guessBtn.disabled = false;
  guessInput.value = "";
  restartBtn.style.display = "none";
  message.textContent = "Good Luck! Start Guessing...";
  guessInput.focus(); // fokus lagi ke input setelah reset
};

guessBtn.addEventListener("click", handleCekInput);
restartBtn.addEventListener("click", handleReset);
guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleCekInput();
  }
});

// kasih fokus awal saat halaman dibuka
guessInput.focus();
