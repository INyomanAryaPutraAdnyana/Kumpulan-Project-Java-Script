// ===================== DATA QUIZ =====================
// Array berisi semua pertanyaan dan jawaban
// Tiap pertanyaan punya text dan kumpulan jawaban (array of objects)
// Jawaban punya 2 properti: text (isi jawaban) dan correct (true/false)
const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "London", correct: false },
      { text: "Rome", correct: false },
      { text: "Berlin", correct: false },
    ],
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    answers: [
      { text: "Harper Lee", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Ernest Hemingway", correct: false },
      { text: "F. Scott Fitzgerald", correct: false },
    ],
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false },
      { text: "Earth", correct: false },
      { text: "Mars", correct: false },
    ],
  },
  {
    question: "Which language is primarily used for web development?",
    answers: [
      { text: "JavaScript", correct: true },
      { text: "Python", correct: false },
      { text: "C++", correct: false },
      { text: "Java", correct: false },
    ],
  },
];

// ===================== VARIABLE GLOBAL =====================
// Menyimpan index pertanyaan yang sedang ditampilkan
let currentQuestionIndex = 0;
// Menyimpan jumlah jawaban benar (score)
let score = 0;

// ===================== DOM ELEMENT =====================
// Mengambil elemen HTML berdasarkan id
const questionsContainer = document.getElementById("questionContainer");
const questionElement = document.getElementById("question");
const answerContainer = document.getElementById("answerContainer");
const nextButton = document.getElementById("nextButton");
const resultContainer = document.getElementById("resultContainer");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restartButton");

// ===================== FUNCTION =====================
// Fungsi memulai quiz
const startQuiz = () => {
  currentQuestionIndex = 0; // mulai dari soal pertama
  score = 0; // reset skor
  nextButton.style.display = "none"; // tombol next disembunyikan
  resultContainer.style.display = "none"; // hasil disembunyikan
  questionsContainer.style.display = "block"; // pertanyaan ditampilkan

  // tampilkan pertanyaan pertama
  showQuestion();
};

// Fungsi menampilkan pertanyaan sesuai index saat ini
const showQuestion = () => {
  resetState(); // reset jawaban sebelum tampilkan pertanyaan baru
  let currentQuestion = questions[currentQuestionIndex]; // ambil pertanyaan sesuai index
  questionElement.textContent = currentQuestion.question; // isi teks pertanyaan

  // looping semua jawaban
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button"); // buat tombol baru
    button.classList.add("button"); // tambahkan class CSS
    button.textContent = answer.text; // isi teks tombol dengan jawaban
    answerContainer.appendChild(button); // masukkan tombol ke dalam container
    if (answer.correct) {
      // jika jawaban benar, simpan informasi di dataset
      button.dataset.correct = answer.correct;
    }
    // tambahkan event klik untuk memilih jawaban
    button.addEventListener("click", selectAnswer);
  });
};

// Fungsi reset sebelum pertanyaan baru muncul
const resetState = () => {
  nextButton.style.display = "none"; // sembunyikan tombol next
  // hapus semua tombol jawaban sebelumnya
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
};

// Fungsi ketika user memilih jawaban
const selectAnswer = (e) => {
  const selectedButton = e.target; // tombol yang diklik
  const correct = selectedButton.dataset.correct === "true"; // cek apakah benar
  if (correct) {
    score++; // tambah score
    selectedButton.style.backgroundColor = "green"; // tombol jadi hijau
  } else {
    selectedButton.style.backgroundColor = "red"; // tombol salah jadi merah
  }

  // Tampilkan jawaban yang benar (hijau) meskipun tidak dipilih
  Array.from(answerContainer.children).forEach((button) => {
    button.disabled = true; // disable semua tombol
    if (button.dataset.correct === "true") {
      button.style.backgroundColor = "green";
    }
  });

  // jika masih ada soal, tampilkan tombol next
  if (currentQuestionIndex < questions.length - 1) {
    nextButton.style.display = "inline-block";
  } else {
    // kalau sudah soal terakhir, tampilkan hasil
    showResult();
  }
};

// Fungsi menampilkan hasil akhir quiz
const showResult = () => {
  const totalScore = questions.length; // total soal
  scoreElement.textContent = `Your score is: ${score} / ${totalScore}`; // tampilkan skor
  resultContainer.style.display = "block"; // munculkan kontainer hasil
  resultContainer.appendChild(scoreElement); // pastikan skor ditampilkan
};

// ===================== EVENT LISTENER =====================
// klik tombol next -> lanjut soal berikutnya
nextButton.addEventListener("click", () => {
  currentQuestionIndex++; // geser index ke soal berikutnya
  showQuestion(); // tampilkan soal baru
});

// klik tombol restart -> mulai ulang quiz
restartButton.addEventListener("click", startQuiz);

// Jalankan quiz pertama kali saat halaman dibuka
startQuiz();
