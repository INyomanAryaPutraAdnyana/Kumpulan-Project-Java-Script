// -------------------------
// GET ELEMENTS FROM HTML
// -------------------------
// Ambil elemen canvas dan tombol/inputs dari DOM
const canvas = document.getElementById("canvas"); // canvas tempat menggambar
const ctx = canvas.getContext("2d"); // context 2D canvas, bawaan JS untuk gambar
const btnBrush = document.getElementById("brush"); // tombol brush
const btnEraser = document.getElementById("eraser"); // tombol eraser
const colorPicker = document.getElementById("colorPicker"); // input color picker
const btnClear = document.getElementById("clear"); // tombol clear canvas

// -------------------------
// TOOLBAR STATE
// -------------------------
// Wadah sementara untuk menyimpan status tools
const toolbar = {
  painting: false, // Apakah sedang menggambar
  eraser: false, // Apakah mode eraser aktif
  currentColor: "#000000", // Warna brush saat ini
  lineWidth: 10, // Lebar garis brush
};

// -------------------------
// CANVAS SIZE
// -------------------------
canvas.width = 800; // lebar canvas
canvas.height = 500; // tinggi canvas

// -------------------------
// FUNCTIONS
// -------------------------

// Mulai menggambar saat mouse ditekan
const startDraw = (e) => {
  toolbar.painting = true; // set status painting jadi true
  draw(e); // langsung panggil draw untuk titik awal
};

// Berhenti menggambar saat mouse dilepas
const stopDraw = () => {
  toolbar.painting = false; // set status painting jadi false
  ctx.beginPath(); // mulai path baru agar garis berikutnya tidak nyambung ke sebelumnya
};

// Fungsi untuk menggambar di canvas
const draw = (e) => {
  if (!toolbar.painting) {
    return; // early return: jika tidak sedang menggambar, hentikan fungsi
  }

  //   ! kode di bawah ini harus sesuai dengan alur yang akan dijalankan pada saat menggambar supaya hasilnya sesuai , contohnya bisa di lihat seperti dibawah ini !!
  // Set properti garis
  ctx.lineWidth = toolbar.lineWidth; // lebar garis
  ctx.lineCap = "round"; // ujung garis menjadi bulat
  ctx.strokeStyle = toolbar.eraser ? "#ffffff" : toolbar.currentColor; // jika eraser aktif, garis putih , digunakan untuk beris warna brush / garis

  // Gambar garis dari posisi sebelumnya ke posisi mouse saat ini
  ctx.lineTo(e.offsetX, e.offsetY); // garis ke koordinat mouse relatif canvas
  ctx.stroke(); // render garis ke canvas
  ctx.beginPath(); // mulai path baru untuk titik berikutnya
  ctx.moveTo(e.offsetX, e.offsetY); // pindahkan "pena" ke posisi mouse saat ini
};

// Fungsi saat brush diklik
const selectBrush = () => {
  toolbar.eraser = false; // matikan mode eraser
  btnBrush.classList.add("active"); // beri style aktif pada brush
  btnEraser.classList.remove("active"); // hapus style aktif dari eraser
};

// Fungsi saat eraser diklik
const selectEraser = () => {
  toolbar.eraser = true; // aktifkan mode eraser
  btnEraser.classList.add("active"); // beri style aktif pada eraser
  btnBrush.classList.remove("active"); // hapus style aktif dari brush
};

// Fungsi saat warna dipilih
const changeColor = (e) => {
  toolbar.currentColor = e.target.value; // update warna brush
};

// Fungsi untuk menghapus semua gambar di canvas
const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // bawaan canvas: hapus area canvas
};

// -------------------------
// EVENT LISTENERS
// -------------------------
btnBrush.addEventListener("click", selectBrush); // klik brush
btnEraser.addEventListener("click", selectEraser); // klik eraser
colorPicker.addEventListener("input", changeColor); // ganti warna brush
btnClear.addEventListener("click", clearCanvas); // klik clear
canvas.addEventListener("mousedown", startDraw); // mulai menggambar
canvas.addEventListener("mouseup", stopDraw); // berhenti menggambar
canvas.addEventListener("mousemove", draw); // menggambar saat mouse bergerak
