/** @format */

// ambil elemen HTML berdasarkan ID yang dipakai di file .html
const textToTypeElement = document.getElementById("text-to-type");
const textToType = textToTypeElement.innerHTML.split(" "); // ambil isi text, lalu pisahkan per kata (array)
const userInput = document.getElementById("user-input"); // inputan user
const startButton = document.getElementById("start-button"); // tombol mulai
const timeDisplay = document.getElementById("time"); // tempat menampilkan waktu
const wpmDisplay = document.getElementById("words-per-minute"); // tempat menampilkan hasil WPM

console.log(textToType); // cek array kata yang harus diketik

let startTime; // variabel untuk menyimpan waktu mulai
let timerInterval; // variabel untuk menyimpan interval timer

// fungsi untuk memulai test
function startTest() {
  startTime = new Date(); // catat waktu saat test dimulai
  userInput.value = ""; // kosongkan inputan user
  userInput.focus(); // arahkan cursor langsung ke input
  timerInterval = setInterval(updateTimer, 1000); // jalankan updateTimer tiap 1 detik
  textToTypeElement.innerHTML = textToType
    .map((word) => `<span>${word}</span>`) // setiap kata dibungkus <span>
    .join(" "); // gabungkan kembali dengan spasi
}

function updateTimer() {
  const currentTime = new Date(); // ambil waktu sekarang
  const elapsedTime = Math.floor((currentTime - startTime) / 1000); // hitung selisih detik
  timeDisplay.innerText = elapsedTime; // tampilkan waktu berjalan
}

function calculateWPM() {
  const wordsTyped = userInput.value.trim().split(/\s+/).length; // hitung jumlah kata yang diketik
  const elapsedTime = Math.floor((new Date() - startTime) / 1000); // hitung total waktu detik
  const minutes = elapsedTime / 60; // konversi detik ke menit
  const wpm = Math.floor(wordsTyped / minutes); // rumus WPM = jumlah kata / menit
  wpmDisplay.innerHTML = wpm; // tampilkan hasil WPM
}

function checkInput() {
  const typedText = userInput.value.trim().split(" "); // pecah input user per kata
  const spans = textToTypeElement.querySelectorAll("span"); // ambil semua <span> kata

  typedText.forEach((word, index) => {
    if (spans[index]) {
      // jika index kata yang dibandingkan masih ada di textToType
      if (word === textToType[index]) {
        // jika kata yang diketik sama persis → tandai "correct"
        spans[index].className = "correct";
      } else {
        // jika kata salah → tandai "incorrect"
        spans[index].className = "incorrect";
      }
    }
  });

  // hapus tanda jika user menghapus kata yang sudah diketik
  for (let i = typedText.length; i < spans.length; i++) {
    spans[i].className = ""; // reset class jadi kosong
  }
}

function stopTest() {
  clearInterval(timerInterval); // hentikan timer
  calculateWPM(); // hitung dan tampilkan WPM akhir
}

// event saat tombol start diklik
startButton.addEventListener("click", () => {
  startTest(); // jalankan fungsi startTest
});

// event saat user mengetik di input
userInput.addEventListener("input", () => {
  checkInput(); // periksa apakah kata benar/salah
  const typedText = userInput.value; // ambil text yang diketik

  if (typedText.trim() === textToType.join(" ")) {
    // jika semua teks user === teks asli (sama persis)
    // maka hentikan test
    stopTest();
  }
});
