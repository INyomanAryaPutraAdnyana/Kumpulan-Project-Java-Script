// ==============================
// Ambil elemen dari DOM
// ==============================
const newTaskInput = document.getElementById("new-task-input"); // Input teks untuk task baru
const addTaskBtn = document.getElementById("add-task-btn"); // Tombol tambah task
const todoListUL = document.getElementById("todo-list"); // <ul> tempat menampung daftar task
const editModal = document.getElementById("edit-modal"); // Modal edit task
const saveEditBtn = document.querySelector(".save-modal-btn"); // Tombol simpan edit di modal
const cancelEditBtn = document.querySelector(".close-modal-btn"); // Tombol batal edit di modal
const editTaskInput = document.getElementById("edit-task-input"); // Input teks di modal edit

// Variabel global untuk menyimpan task yang sedang diedit
let currentEditElement = null;

// ==============================
// Fungsi: Load task dari localStorage
// ==============================
const loadTasksFromLocalStorage = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Ambil array task, jika kosong buat array baru
  tasks.forEach((task) => {
    const li = createTaskElement(task); // Buat <li> untuk setiap task
    todoListUL.appendChild(li); // Tambahkan ke daftar
  });
};

// ==============================
// Fungsi: Buat elemen task (li + span + tombol edit/delete)
// ==============================
const createTaskElement = (task) => {
  const li = document.createElement("li"); // <li> untuk 1 task
  const span = document.createElement("span"); // <span> berisi teks task
  span.textContent = task;

  // Tombol Edit
  const editTaskBtn = document.createElement("button");
  editTaskBtn.textContent = "Edit";
  editTaskBtn.classList.add("edit-btn");
  editTaskBtn.addEventListener("click", () => {
    openModal(li, span); // Buka modal edit saat tombol diklik
  });

  // Tombol Delete
  const deleteTaskBtn = document.createElement("button");
  deleteTaskBtn.textContent = "Delete";
  deleteTaskBtn.classList.add("delete-btn");
  deleteTaskBtn.addEventListener("click", () => {
    li.remove(); // Hapus task dari tampilan
    deleteTaskFromLocalStorage(task); // Hapus task dari localStorage
  });

  // Bungkus tombol dalam div
  const buttons = document.createElement("div");
  buttons.classList.add("buttons");
  buttons.appendChild(editTaskBtn);
  buttons.appendChild(deleteTaskBtn);

  // Gabungkan teks dan tombol ke <li>
  li.appendChild(span);
  li.appendChild(buttons);

  return li; // Kembalikan <li>
};

// ==============================
// Fungsi: Modal Edit
// ==============================
const openModal = (li, span) => {
  currentEditElement = { li, span }; // Simpan task yang sedang diedit
  editTaskInput.value = span.textContent; // Masukkan teks lama ke input
  editModal.style.display = "flex"; // Tampilkan modal
};

const closeModal = () => {
  editModal.style.display = "none"; // Tutup modal
};

// ==============================
// Fungsi: Tambah Task baru
// ==============================
const addTask = () => {
  const task = newTaskInput.value.trim(); // Ambil input dan hilangkan spasi
  if (!task) return; // Kalau kosong, hentikan

  const li = createTaskElement(task); // Buat <li> baru
  todoListUL.appendChild(li); // Tambahkan ke daftar
  saveTaskToLocalStorage(task); // Simpan ke localStorage
  newTaskInput.value = ""; // Reset input
  newTaskInput.focus(); // Fokuskan kembali input
};

// ==============================
// Fungsi: Simpan hasil edit task
// ==============================
const saveTask = () => {
  const editedTask = editTaskInput.value.trim(); // Ambil teks edit
  if (!editedTask) return;

  const originalTask = currentEditElement.span.textContent; // Ambil teks lama
  currentEditElement.span.textContent = editedTask; // Update di tampilan
  updateTaskInLocalStorage(originalTask, editedTask); // Update di localStorage
  closeModal(); // Tutup modal
};

// ==============================
// Fungsi: LocalStorage (CRUD sederhana)
// ==============================
const saveTaskToLocalStorage = (task) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Ambil array lama
  tasks.push(task); // Tambahkan task baru
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Simpan kembali
};

const deleteTaskFromLocalStorage = (task) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t !== task); // Buang task yang cocok
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Simpan kembali
};

const updateTaskInLocalStorage = (originalTask, editedTask) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const index = tasks.indexOf(originalTask); // Cari index task lama
  if (index > -1) {
    tasks[index] = editedTask; // Ganti dengan task baru
  }
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Simpan kembali
};

// ==============================
// Event Listener (jalankan semua fungsi utama)
// ==============================
loadTasksFromLocalStorage(); // Tampilkan task saat halaman dibuka
addTaskBtn.addEventListener("click", addTask); // Tambah task baru
saveEditBtn.addEventListener("click", saveTask); // Simpan edit task
cancelEditBtn.addEventListener("click", closeModal); // Tutup modal edit
