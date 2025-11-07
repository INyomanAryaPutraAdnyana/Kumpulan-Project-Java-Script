// ================================
// Script Countdown Timer
// ================================

// Mengambil elemen HTML berdasarkan ID
// Elemen-elemen ini digunakan untuk menampilkan countdown dan mengambil input dari user
const countdownElement = document.getElementById("countdown"); // Container utama (opsional)
const daysElement = document.getElementById("days"); // Menampilkan sisa hari
const hoursElement = document.getElementById("hours"); // Menampilkan sisa jam
const minutesElement = document.getElementById("minutes"); // Menampilkan sisa menit
const secondsElement = document.getElementById("seconds"); // Menampilkan sisa detik

// Elemen input tempat user memasukkan waktu countdown
const inputHours = document.getElementById("inputHours");
const inputMinutes = document.getElementById("inputMinutes");
const inputSeconds = document.getElementById("inputSeconds");

// Tombol untuk memulai countdown
const startButton = document.getElementById("startButton");

// Variabel untuk menyimpan ID interval agar bisa dihentikan nanti
let countdownInterval;

// ================================
// Fungsi untuk memulai timer
// ================================
function startTimer() {
  // Ambil nilai input dan ubah menjadi angka
  // Jika input kosong atau tidak valid, default menjadi 0
  let hours = parseInt(inputHours.value) || 0;
  let minutes = parseInt(inputMinutes.value) || 0;
  let seconds = parseInt(inputSeconds.value) || 0;

  // Ubah total waktu menjadi detik untuk memudahkan perhitungan
  let totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

  // Jika total waktu 0 atau kurang, hentikan fungsi dan beri peringatan
  if (totalTimeInSeconds <= 0) {
    alert("Silakan masukkan waktu yang valid.");
    return;
  }

  // Kosongkan input setelah timer dimulai
  inputHours.value = "";
  inputMinutes.value = "";
  inputSeconds.value = "";

  // ================================
  // Logika countdown
  // ================================
  countdownInterval = setInterval(() => {
    // Hitung sisa hari, jam, menit, dan detik
    const days = Math.floor(totalTimeInSeconds / 86400); // 86400 detik = 1 hari
    const hours = Math.floor((totalTimeInSeconds % 86400) / 3600); // Sisa jam
    const minutes = Math.floor((totalTimeInSeconds % 3600) / 60); // Sisa menit
    const seconds = Math.floor(totalTimeInSeconds % 60); // Sisa detik

    // Update tampilan HTML dengan angka 2 digit (padStart)
    daysElement.textContent = days.toString().padStart(2, "0");
    hoursElement.textContent = hours.toString().padStart(2, "0");
    minutesElement.textContent = minutes.toString().padStart(2, "0");
    secondsElement.textContent = seconds.toString().padStart(2, "0");

    // Kurangi total waktu 1 detik
    totalTimeInSeconds--;

    // Hentikan timer jika waktu habis
    if (totalTimeInSeconds < 0) {
      clearInterval(countdownInterval);
      alert("Waktu habis!"); // Memberi notifikasi ke user
    }
  }, 1000); // Update setiap 1000 milidetik (1 detik)
}

// ================================
// Event Listener untuk tombol start
// ================================
startButton.addEventListener("click", () => {
  // Hentikan timer yang sedang berjalan (jika ada)
  clearInterval(countdownInterval);
  // Mulai timer baru
  startTimer();
});
