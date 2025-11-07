// Ambil elemen-elemen HTML yang dibutuhkan
textDisplay = document.getElementById("text-display"); // elemen yang menampilkan teks yang akan diketik
textToType = textDisplay.textContent.split(" "); // ambil teks, ubah jadi array kata
inputField = document.getElementById("input-field"); // input field tempat user mengetik
startButton = document.getElementById("start-button"); // tombol start test
timeDisplay = document.getElementById("time-value"); // elemen untuk menampilkan waktu yang sudah berjalan
wpmDisplay = document.getElementById("wpm-value"); // elemen untuk menampilkan hasil WPM (words per minute)

console.log(textToType); // cek array kata di console

// variabel global untuk menyimpan waktu mulai dan interval timer
let startTime;
let timerInterval;

// function untuk memulai typing test
const startTest = () => {
  startTime = new Date(); // catat waktu mulai
  inputField.value = ""; // reset input field
  inputField.focus(); // fokus ke input agar user langsung bisa mengetik
  timerInterval = setInterval(updateTimer, 1000); // jalankan updateTimer setiap detik

  // tampilkan teks yang akan diketik sebagai span agar bisa diubah warnanya saat diketik
  textDisplay.innerHTML = textToType
    .map((word) => {
      return `<span>${word}</span>`;
    })
    .join(" ");
};

// function untuk menghitung dan menampilkan waktu yang telah berlalu
const updateTimer = () => {
  const currenttime = new Date(); // ambil waktu sekarang
  const elapsedTime = Math.floor((currenttime - startTime) / 1000); // hitung selisih waktu dalam detik
  timeDisplay.textContent = elapsedTime; // tampilkan di elemen timeDisplay
};

// function untuk menghitung WPM (Words Per Minute)
const handlerWPM = () => {
  const wordsTyped = inputField.value.trim().split(/\s+/).length; // hitung jumlah kata yang diketik user
  const elapsedTime = Math.floor((new Date() - startTime) / 1000); // waktu yang sudah berlalu dalam detik
  const minutes = elapsedTime / 60; // ubah detik ke menit
  const wpm = Math.floor(wordsTyped / minutes); // hitung WPM
  wpmDisplay.textContent = wpm; // tampilkan hasil WPM
};

// function untuk mengecek input user dan memberi highlight kata benar/salah
const checkInput = () => {
  const typedText = inputField.value.trim().split(" "); // ambil teks input user sebagai array kata
  const spans = textDisplay.querySelectorAll("span"); // ambil semua span dari teks yang ditampilkan

  // loop setiap kata yang diketik user
  typedText.forEach((word, index) => {
    if (spans[index]) {
      // pastikan index span ada
      if (word === textToType[index]) {
        spans[index].className = "correct"; // jika kata benar, beri class "correct"
      } else {
        spans[index].className = "incorrect"; // jika kata salah, beri class "incorrect"
      }
    }

    // hapus class untuk kata yang belum diketik
    for (i = typedText.length; i < spans.length; i++) {
      spans[i].className = ""; // hapus class correct/incorrect
    }
  });
};

// function untuk menghentikan test
const stopTest = () => {
  clearInterval(timerInterval); // hentikan timer
  handlerWPM(); // hitung dan tampilkan WPM terakhir
};

// event listener untuk tombol start
startButton.addEventListener("click", () => {
  startTest(); // jalankan startTest saat tombol diklik
});

// event listener untuk input user
inputField.addEventListener("input", () => {
  checkInput(); // cek setiap input user dan update warna kata
  const typedText = inputField.value; // ambil teks user
  if (typedText.trim() === textToType.join(" ")) {
    // jika semua kata sudah benar
    stopTest(); // hentikan test
  }
});
