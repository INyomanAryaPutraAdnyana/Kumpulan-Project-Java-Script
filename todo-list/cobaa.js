// Variabel global untuk menyimpan elemen task yang sedang diedit
let currentEditElement = null;

// ====================
// Fungsi-fungsi dulu
// ====================

// Fungsi untuk mengambil task dari localStorage dan menampilkannya ke DOM
function loadTasksFromLocalStorage() {
  // Ambil data tasks dari localStorage, jika tidak ada buat array kosong
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // Looping setiap task untuk ditampilkan di halaman
  tasks.forEach((task) => {
    // Membuat elemen <li> untuk setiap task
    const li = createTaskElement(task);
    // Tambahkan <li> ke <ul id="todo-list">
    document.getElementById("todo-list").appendChild(li);
  });
}

// Fungsi untuk membuat elemen <li> beserta tombol Edit & Delete
function createTaskElement(task) {
  const li = document.createElement("li"); // Buat elemen <li>

  const span = document.createElement("span"); // Buat elemen <span> untuk menampilkan teks task
  span.textContent = task; // Isi teks task

  // Tombol Edit
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  // Event listener untuk tombol Edit, panggil openModal saat diklik
  editBtn.addEventListener("click", () => openModal(li, span));

  // Tombol Delete
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  // Event listener untuk tombol Delete, hapus task dari DOM & localStorage
  deleteBtn.addEventListener("click", () => {
    li.remove(); // Hapus elemen <li> dari halaman
    deleteTaskFromLocalStorage(task); // Hapus task dari localStorage
  });

  // Container untuk tombol Edit & Delete
  const buttons = document.createElement("div");
  buttons.classList.add("buttons");
  buttons.appendChild(editBtn); // Masukkan tombol Edit
  buttons.appendChild(deleteBtn); // Masukkan tombol Delete

  li.appendChild(span); // Masukkan teks task ke <li>
  li.appendChild(buttons); // Masukkan tombol ke <li>

  return li; // Kembalikan elemen <li> agar bisa ditambahkan ke <ul>
}

// Fungsi membuka modal untuk mengedit task
function openModal(li, span) {
  currentEditElement = { li, span }; // Simpan task yang sedang diedit
  document.getElementById("edit-task-input").value = span.textContent; // Masukkan teks task ke input modal
  document.getElementById("edit-modal").style.display = "flex"; // Tampilkan modal
}

// Fungsi menutup modal
function closeModal() {
  document.getElementById("edit-modal").style.display = "none"; // Sembunyikan modal
}

// Fungsi menambahkan task baru
function addTask() {
  const taskInput = document.getElementById("new-task"); // Ambil input
  const task = taskInput.value.trim(); // Ambil nilai dan hapus spasi di awal/akhir
  if (!task) return; // Jika kosong, hentikan fungsi

  const li = createTaskElement(task); // Buat elemen <li> untuk task baru
  document.getElementById("todo-list").appendChild(li); // Tambahkan ke halaman
  saveTaskToLocalStorage(task); // Simpan task baru ke localStorage
  taskInput.value = ""; // Kosongkan input
  taskInput.focus(); // Fokus kembali ke input
}

// Fungsi menyimpan hasil edit task
function saveTask() {
  const editedTask = document.getElementById("edit-task-input").value.trim(); // Ambil teks dari input modal
  if (!editedTask) return; // Jika kosong, hentikan fungsi

  const originalTask = currentEditElement.span.textContent; // Ambil teks task asli
  currentEditElement.span.textContent = editedTask; // Update teks di halaman
  updateTaskInLocalStorage(originalTask, editedTask); // Update task di localStorage
  closeModal(); // Tutup modal
}

// ====================
// LocalStorage
// ====================

// Simpan task baru ke localStorage
function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Ambil tasks lama
  tasks.push(task); // Tambahkan task baru
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Simpan kembali
}

// Hapus task dari localStorage
function deleteTaskFromLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Ambil tasks lama
  // Filter semua task yang bukan task yang dihapus
  tasks = tasks.filter((t) => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Simpan kembali
}

// Update task di localStorage
function updateTaskInLocalStorage(originalTask, editedTask) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Ambil tasks lama
  const index = tasks.indexOf(originalTask); // Cari index task lama
  if (index > -1) tasks[index] = editedTask; // Update dengan task baru
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Simpan kembali
}

// ====================
// Event Listeners terakhir
// ====================

// Kode ini bisa tanpa "DOMContentLoaded" jika script berada di akhir </body>
// Gunanya: pastikan DOM sudah siap sebelum akses elemen
document.addEventListener("DOMContentLoaded", () => {
  loadTasksFromLocalStorage(); // Tampilkan semua task saat halaman dibuka

  // Event listener tombol Add
  document.getElementById("add-task-btn").addEventListener("click", addTask);
  // Event listener tombol Save di modal
  document.querySelector(".save-modal-btn").addEventListener("click", saveTask);
  // Event listener tombol Cancel di modal
  document
    .querySelector(".close-modal-btn")
    .addEventListener("click", closeModal);
});
