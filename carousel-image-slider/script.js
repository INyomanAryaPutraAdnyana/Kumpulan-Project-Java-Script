// Ambil elemen container yang berisi semua gambar carousel (elemen yang akan digeser)
const carouselSlide = document.querySelector(".carousel-slide");

// Ambil semua elemen <img> yang berada di dalam .carousel-slide (NodeList)
const images = document.querySelectorAll(".carousel-slide img");

// Hitung jumlah gambar, dipakai untuk batas index dan untuk loop (wrap-around)
const totalImages = images.length;

// Ambil tombol "previous" (sebelumnya)
const prevBtn = document.querySelector(".prev-btn");

// Ambil tombol "next" (berikutnya)
const nextBtn = document.querySelector(".next-btn");

// Ambil semua elemen indikator (biasanya dot) — NodeList
const indikators = document.querySelectorAll(".indikator");

// State: index slide yang sedang aktif (0 = slide pertama)
let currentIndex = 0;

// Variabel untuk menyimpan ID interval auto-slide (setInterval) agar bisa dihentikan nanti
let autoSlideInterval;

/*
 Fungsi utama untuk merender/mengupdate tampilan carousel sesuai currentIndex.
 - Mengubah posisi container dengan CSS transform (translateX)
 - Mengupdate class 'active' pada indikator yang sesuai
*/
const updateCarousel = () => {
  // Geser container ke kiri/kanan.
  // Jika currentIndex = 0 -> translateX(0%) (slide pertama terlihat).
  // Jika currentIndex = 1 -> translateX(-100%) (geser 1 * 100% ke kiri).
  // Asumsi: setiap slide lebarnya 100% dan slides disusun horizontal (mis. display:flex).
  carouselSlide.style.transform = `translateX(${-currentIndex * 100}%)`;

  // Perbarui indikator: beri class 'active' hanya pada indikator yang indexnya sama dengan currentIndex.
  // classList.toggle('active', condition) -> menambahkan class jika condition true, menghapus jika false.
  indikators.forEach((indikator, index) => {
    indikator.classList.toggle("active", index === currentIndex);
  });
};

// Fungsi untuk pindah ke slide berikutnya (dipanggil saat klik next atau oleh auto-slide)
const nextSlide = () => {
  // Tambah currentIndex dan gunakan modulo untuk kembali ke 0 setelah mencapai akhir.
  // Contoh: jika totalImages = 5 dan currentIndex = 4 maka (4+1)%5 = 0 -> kembali ke slide pertama.
  currentIndex = (currentIndex + 1) % totalImages;

  // Render pergeseran ke slide baru
  updateCarousel();

  // Reset timer auto-slide supaya jeda dihitung ulang setelah interaksi pengguna
  resetAutoSlideCarousel();
};

// Fungsi untuk pindah ke slide sebelumnya (dipanggil saat klik prev)
const prevSlide = () => {
  // Kurangi index; tambahkan totalImages dulu supaya tidak mendapat nilai negatif,
  // lalu modulo untuk menjaga di rentang [0 .. totalImages-1].
  // Contoh: jika currentIndex = 0 dan totalImages = 5 -> (0-1+5)%5 = 4 (slide terakhir).
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;

  // Render pergeseran
  updateCarousel();

  // Reset timer auto-slide
  resetAutoSlideCarousel();
};

// Fungsi untuk menghentikan interval yang lama dan memulai interval baru (mengatur ulang auto-slide)
const resetAutoSlideCarousel = () => {
  // clearInterval aman walau autoSlideInterval undefined; jika ada interval lama, dihentikan.
  clearInterval(autoSlideInterval);

  // Mulai interval baru yang memanggil nextSlide setiap 3000ms (3 detik).
  // Simpan ID interval agar bisa dihentikan nanti.
  autoSlideInterval = setInterval(nextSlide, 3000);
};

// Pasang event listener pada tombol previous — saat diklik jalankan prevSlide
prevBtn.addEventListener("click", prevSlide);

// Pasang event listener pada tombol next — saat diklik jalankan nextSlide
nextBtn.addEventListener("click", nextSlide);

// Mulai auto-slide pertama kali ketika script dijalankan
autoSlideInterval = setInterval(nextSlide, 3000);

// Pasang event listener pada setiap indikator dot => saat diklik lompat ke slide yang bersesuaian
indikators.forEach((indikator, index) => {
  indikator.addEventListener("click", () => {
    // Set index slide sesuai dot yang diklik
    currentIndex = index;

    // Render perpindahan
    updateCarousel();

    // Reset timer auto-slide agar tidak langsung lompat sebelum 3 detik
    resetAutoSlideCarousel();
  });
});
