// ===================== AMBIL ELEMEN HTML =====================
// Ambil elemen-elemen yang dibutuhkan dari HTML supaya bisa dikontrol di JS
const audio = document.getElementById("audio"); // Elemen <audio> untuk memutar lagu
const playPauseBtn = document.getElementById("play-pause"); // Tombol Play/Pause
const playIcon = document.getElementById("play-icon"); // Ikon tombol play
const pauseIcon = document.getElementById("pause-icon"); // Ikon tombol pause
const seekBar = document.getElementById("seek-bar"); // Slider untuk progress lagu
const timeDisplay = document.getElementById("time-display"); // Teks untuk menampilkan waktu lagu
const volumeBar = document.getElementById("volume-bar"); // Slider volume
const playlist = document.getElementById("playlist"); // Daftar lagu <ul>
const currentTrack = document.getElementById("current-track"); // Nama lagu yang sedang diputar
const audioUpload = document.getElementById("audio-upload"); // Input upload file audio

// ===================== VARIABEL =====================
let currentIndex = 0; // Menyimpan indeks lagu yang sedang diputar
let tracks = []; // Array objek lagu {name, url}

// ===================== UPLOAD FILE AUDIO =====================
// Ketika user memilih file audio
audioUpload.addEventListener("change", (e) => {
  const files = Array.from(e.target.files); // Ambil semua file yang dipilih user

  // Buat array lagu baru dari file yang diupload
  const newTracks = files.map((file) => ({
    name: file.name, // Nama file lagu
    url: URL.createObjectURL(file), // Buat URL sementara agar audio bisa diputar
  }));

  // Tambahkan lagu baru ke daftar lagu lama
  const startIndex = tracks.length; // Indeks awal untuk lagu baru
  tracks = tracks.concat(newTracks); // Gabungkan array lama + baru

  // Buat <li> untuk setiap lagu baru
  newTracks.forEach((track, i) => {
    const index = startIndex + i; // Hitung indeks sebenarnya di array tracks
    const li = document.createElement("li"); // Buat elemen list <li>
    li.textContent = track.name; // Tampilkan nama lagu di <li>

    // Saat <li> diklik, jalankan loadTrack() untuk lagu yang sesuai
    li.addEventListener("click", () => loadTrack(index));

    playlist.appendChild(li); // Masukkan <li> ke playlist <ul>
  });
});

// ===================== LOAD TRACK =====================
// Fungsi untuk memutar lagu berdasarkan indeks
function loadTrack(index) {
  currentIndex = index; // Simpan track yang sedang diputar
  audio.src = tracks[index].url; // Set sumber audio
  currentTrack.textContent = tracks[index].name; // Tampilkan nama lagu

  // Update class active pada playlist
  document.querySelectorAll("#playlist li").forEach((li, i) => {
    li.classList.toggle("active", i === index); // Highlight lagu yang sedang diputar
  });

  playTrack(); // Langsung mainkan lagu
}

// ===================== PLAY =====================
function playTrack() {
  audio.play(); // Putar audio
  playIcon.style.display = "none"; // Sembunyikan ikon play
  pauseIcon.style.display = "block"; // Tampilkan ikon pause
}

// ===================== PAUSE =====================
function pauseTrack() {
  audio.pause(); // Hentikan audio
  playIcon.style.display = "block"; // Tampilkan ikon play
  pauseIcon.style.display = "none"; // Sembunyikan ikon pause
}

// ===================== TOGGLE PLAY / PAUSE =====================
playPauseBtn.addEventListener("click", () => {
  // Jika audio sedang berhenti (paused)
  if (audio.paused) {
    playTrack(); // Jalankan playTrack() → mainkan audio
  } else {
    pauseTrack(); // Jika sedang diputar → hentikan audio
  }
});

// ===================== PROGRESS BAR UPDATE =====================
audio.addEventListener("timeupdate", () => {
  // Pastikan durasi audio valid (bukan NaN)
  if (!isNaN(audio.duration)) {
    const progress = (audio.currentTime / audio.duration) * 100; // Hitung persentase progress
    seekBar.value = progress; // Update nilai slider
    seekBar.style.setProperty("--seek-before-width", `${progress}%`); // Update visual slider
    // Update tampilan waktu: posisi sekarang / total durasi
    timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(
      audio.duration
    )}`;
  }
});

// ===================== SEEK BAR INPUT =====================
seekBar.addEventListener("input", () => {
  // Pastikan durasi audio valid
  if (!isNaN(audio.duration)) {
    const seekTime = (seekBar.value / 100) * audio.duration; // Hitung waktu baru sesuai slider
    audio.currentTime = seekTime; // Pindahkan posisi audio ke waktu baru
  }
});

// ===================== VOLUME =====================
volumeBar.addEventListener("input", () => {
  audio.volume = volumeBar.value / 100; // Atur volume audio 0.0 - 1.0
});

// ===================== AUTO PLAY NEXT =====================
audio.addEventListener("ended", () => {
  // Jika lagu saat ini bukan lagu terakhir
  if (currentIndex < tracks.length - 1) {
    loadTrack(currentIndex + 1); // Mainkan lagu berikutnya
  } else {
    loadTrack(0); // Jika lagu terakhir, kembali ke lagu pertama (loop)
  }
});

// ===================== FORMAT TIME =====================
// Fungsi mengubah detik menjadi menit:detik
function formatTime(sec) {
  const minutes = Math.floor(sec / 60); // Hitung menit
  const seconds = Math.floor(sec % 60); // Hitung detik
  // Tambahkan 0 di depan detik jika kurang dari 10, format: 1:07
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
