// ambil audio jika ada di local storage

let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
// JSON.parse(localStorage.getItem("playlist"))
// kode ini akan tereksekusi jika ada data di local storage
// makannya ketika data mp3 nya terlalu besar maka akan pake yang || []

// ==========================================================
// Ambil elemen-elemen HTML yang dibutuhkan dengan ID
// ==========================================================
const audio = document.getElementById("audio"); // Elemen audio
const playPauseButton = document.getElementById("play-pause"); // Tombol play/pause
const playIcon = document.getElementById("play-icon"); // Ikon play
const pauseIcon = document.getElementById("pause-icon"); // Ikon pause
const progressBar = document.getElementById("progress-bar"); // Bar progress audio
const playlistElement = document.getElementById("playlist"); // Daftar playlist
const audioUpload = document.getElementById("audio-upload"); // Input untuk upload audio
const currentTrack = document.getElementById("current-track"); // Nama track yang sedang diputar

// ==========================================================
// Fungsi untuk membuat daftar playlist di UI
// ==========================================================
function createPlaylist() {
  // Kosongkan isi daftar playlist sebelum diisi ulang
  playlistElement.innerHTML = "";

  // Loop setiap lagu yang ada di playlist
  playlist.forEach((track, index) => {
    const li = document.createElement("li"); // Buat elemen <li> untuk lagu
    li.textContent = track.title; // Tampilkan judul lagu
    li.dataset.src = track.src; // Simpan sumber audio di atribut data

    // Event: saat klik salah satu lagu di playlist
    li.addEventListener("click", () => {
      audio.src = track.src; // Atur sumber audio ke lagu ini
      audio.play(); // Mulai memutar lagu
      updatePlayPauseIcon(); // Update ikon play/pause

      // Hapus class 'active' dari semua item agar tidak dobel
      document
        .querySelectorAll("#playlist li")
        .forEach((item) => item.classList.remove("active"));

      // Tambahkan class 'active' ke lagu yang sedang diputar
      li.classList.add("active");

      // Tampilkan judul lagu di area currentTrack
      currentTrack.textContent = track.title;
    });

    // Tambahkan item lagu ke daftar playlist di UI
    playlistElement.appendChild(li);
  });
}

// ==========================================================
// Fungsi untuk memperbarui ikon play/pause sesuai status audio
// ==========================================================
function updatePlayPauseIcon() {
  if (audio.paused) {
    // Jika audio berhenti → tampilkan ikon play
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  } else {
    // Jika audio sedang diputar → tampilkan ikon pause
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  }
}

// ==========================================================
// Fungsi untuk menyimpan playlist ke localStorage
// ==========================================================
function savePlaylist() {
  localStorage.setItem("playlist", JSON.stringify(playlist));
}

// ==========================================================
// Inisialisasi playlist saat halaman pertama kali dimuat
// ==========================================================
createPlaylist();

// ==========================================================
// Event: Saat user meng-upload file audio
// ==========================================================
audioUpload.addEventListener("change", (event) => {
  const fileArray = Array.from(event.target.files); // Ambil semua file yang diupload

  // Proses setiap file audio yang diupload
  fileArray.forEach((file) => {
    const reader = new FileReader();

    // Saat file berhasil dibaca
    reader.onload = function (e) {
      const track = {
        title: file.name, // Nama file sebagai judul lagu
        src: e.target.result, // Data audio dalam bentuk DataURL
      };

      // Masukkan lagu ke playlist
      playlist.push(track);

      // Perbarui UI dan simpan playlist
      createPlaylist();
      savePlaylist();
    };

    // Baca file audio sebagai DataURL agar bisa diputar di browser
    reader.readAsDataURL(file);
  });
});

// ==========================================================
// Event: Tombol play/pause ditekan
// ==========================================================
playPauseButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play(); // Jika audio berhenti → play
  } else {
    audio.pause(); // Jika audio sedang play → pause
  }

  // Update ikon tombol sesuai status audio
  updatePlayPauseIcon();
});

// ==========================================================
// Event: Update progress bar saat audio diputar
// ==========================================================
audio.addEventListener("timeupdate", () => {
  // Hitung persentase progress (0 - 100%)
  const progress = (audio.currentTime / audio.duration) * 100;

  // Sesuaikan lebar progress bar
  progressBar.style.width = progress + "%";
});

// ==========================================================
// Event: Reset saat audio selesai diputar
// ==========================================================
audio.addEventListener("ended", () => {
  audio.pause(); // Pastikan audio berhenti
  progressBar.style.width = "0"; // Reset progress bar ke 0%
  updatePlayPauseIcon(); // Kembalikan ikon ke posisi awal (play)
});
