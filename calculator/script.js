// =========================================================================
// OBJEK UTAMA: STATUS KALKULATOR
// =========================================================================

/**
 * @description Ini adalah 'otak' dari aplikasi kalkulator. Objek 'calculator'
 * bertugas untuk menyimpan semua data penting tentang status saat ini,
 * seperti nilai yang ditampilkan, angka pertama, dan operator yang
 * digunakan.
 *
 * @property {string} displayValue - Nilai yang saat ini ditampilkan di layar kalkulator.
 * Nilai ini bisa berupa "0" (saat baru dimulai), angka yang sedang
 * diketik, atau hasil dari suatu perhitungan.
 *
 * @property {number|null} firstOperand - Angka pertama dalam operasi biner (misalnya, +,-,*,/).
 * Contoh: Jika Anda mengetik "5 + 3", nilai ini akan menyimpan angka 5.
 * Nilai awal adalah 'null' karena belum ada angka yang dimasukkan.
 *
 * @property {boolean} waitingForSecondOperand - Bendera (flag) yang menunjukkan apakah
 * kalkulator sudah siap untuk menerima angka kedua. Ini menjadi 'true'
 * setelah operator ditekan.
 *
 * @property {string|null} operator - Operator yang dipilih oleh pengguna. Contoh: "+", "-",
 * "*", atau "/". Nilai 'null' menandakan belum ada operator yang
 * dipilih.
 *
 * @property {string} expression - Seluruh ekspresi matematika yang sedang dibangun.
 * Ini adalah "catatan" lengkap dari semua tombol yang ditekan,
 * seperti "5+3*2-1". Ini digunakan untuk tampilan dan perhitungan.
 */
const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
  expression: "",
};

// =========================================================================
// FUNGSI-FUNGSI UTILITY & LOGIKA INTI
// =========================================================================

/**
 * @description Fungsi ini bertanggung jawab untuk memperbarui tampilan layar kalkulator
 * berdasarkan status saat ini.
 *
 * Logika: Fungsi ini menggunakan operator OR (||) untuk memprioritaskan
 * nilai mana yang akan ditampilkan.
 * 1. Jika 'calculator.expression' tidak kosong (misalnya "5+3"),
 * maka nilai tersebut akan ditampilkan.
 * 2. Jika 'calculator.expression' kosong (misalnya setelah menekan "=" atau "AC"),
 * maka nilai 'calculator.displayValue' akan ditampilkan (yang biasanya
 * berisi hasil akhir atau "0").
 */
const updateDisplay = () => {
  const display = document.querySelector(".calculator-display");
  display.value = calculator.expression || calculator.displayValue;
};

/**
 * @description Fungsi ini menangani semua penekanan tombol digit (0-9).
 * Logikanya sangat kompleks karena harus menangani dua skenario utama.
 *
 * @param {string} digit - Karakter digit yang ditekan oleh pengguna (misalnya "7").
 */
const handleDigit = (digit) => {
  const { displayValue, waitingForSecondOperand } = calculator;

  // Skenario 1: Setelah menekan operator.
  // Jika 'waitingForSecondOperand' adalah 'true', ini berarti kita baru saja
  // menekan operator dan siap untuk memasukkan angka kedua.
  if (waitingForSecondOperand) {
    // a. Ganti 'displayValue' dengan digit yang baru.
    //    Contoh: Dari "5" menjadi "7" setelah operator "+".
    calculator.displayValue = digit;
    // b. Set 'waitingForSecondOperand' kembali ke 'false'
    //    karena kita sudah mulai mengetik angka kedua.
    calculator.waitingForSecondOperand = false;
    // c. Tambahkan digit ke 'expression' untuk membangun ekspresi.
    //    Contoh: "5+" + "7" menjadi "5+7".
    calculator.expression += digit;
  } else {
    // Skenario 2: Menambahkan digit ke angka yang sudah ada.
    // a. Perbarui 'displayValue'. Gunakan 'ternary operator' (?:).
    //    Jika 'displayValue' saat ini adalah "0", ganti dengan digit baru.
    //    Jika tidak, tambahkan digit baru di akhir string.
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;

    // b. Logika untuk membangun string 'expression' dengan benar.
    const lastChar = calculator.expression.slice(-1);

    // Kondisi ini akan benar jika:
    //  - Karakter terakhir di ekspresi adalah operator. Contoh: "5+"
    //  - Ekspresi saat ini adalah "0" (kondisi awal kalkulator).
    if (
      ["+", "-", "*", "/", "%", "√", "(", "!"].includes(lastChar) ||
      calculator.expression === "0"
    ) {
      // Jika kondisi di atas benar, ini berarti kita akan memulai angka baru.
      // Logikanya adalah: ambil ekspresi tanpa karakter terakhir, tambahkan
      // kembali karakter terakhir (operator), lalu tambahkan digit baru.
      // Contoh:
      //  - '5+' + '7'  -> ekspresi = '5' + '+' + '7' -> '5+7'
      //  - '0' + '7'   -> ekspresi = '' + '0' + '7'  -> '07'
      calculator.expression =
        calculator.expression.slice(0, -1) + lastChar + digit;
    } else if (calculator.expression === "") {
      // Ini adalah kasus saat ekspresi benar-benar kosong,
      // misal setelah 'AC' ditekan. Langsung inisialisasi dengan digit.
      calculator.expression = digit;
    } else {
      // Ini adalah skenario paling sederhana: tambahkan digit ke ekspresi yang
      // sudah ada.
      // Contoh: '5' + '3' -> '53'
      calculator.expression += digit;
    }
  }
  // Selalu panggil 'updateDisplay' di akhir untuk memperbarui layar.
  updateDisplay();
};

/**
 * @description Fungsi ini menangani penekanan semua tombol operator.
 *
 * @param {string} nextOperator - Simbol operator yang ditekan.
 */
const handleOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  // Bagian 1: Menangani operator khusus (kurung, faktorial, akar).
  //  - Operator ini tidak memicu perhitungan langsung.
  if (nextOperator === "(" || nextOperator === ")") {
    calculator.expression += nextOperator;
    updateDisplay();
    return; // Hentikan eksekusi di sini.
  }
  if (nextOperator === "!") {
    const lastChar = calculator.expression.slice(-1);
    // Logika validasi: Faktorial hanya bisa diterapkan pada digit atau
    // kurung tutup.
    if (/\d/.test(lastChar) || lastChar === ")") {
      calculator.expression += nextOperator;
      updateDisplay();
      return;
    } else {
      console.log("Input faktorial tidak valid.");
      return;
    }
  }
  if (nextOperator === "√") {
    calculator.expression += "√";
    calculator.waitingForSecondOperand = true; // Siap menerima angka di bawah akar.
    updateDisplay();
    return;
  }

  // Bagian 2: Mengganti operator.
  // Jika sudah ada operator yang aktif dan kita sedang menunggu angka kedua,
  // maka ganti operator yang lama dengan yang baru.
  // Contoh: '5+' lalu tekan '-', maka ekspresi menjadi '5-'.
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    calculator.expression = calculator.expression.slice(0, -1) + nextOperator;
    updateDisplay();
    return;
  }

  // Bagian 3: Memproses perhitungan jika ada operator yang sudah aktif.
  if (firstOperand === null && !isNaN(inputValue)) {
    // Jika ini adalah operasi pertama, simpan angka di tampilan sebagai 'firstOperand'.
    calculator.firstOperand = inputValue;
  } else if (operator) {
    // Jika ada operator yang sudah dipilih sebelumnya, hitung ekspresi saat ini.
    const result = evaluateExpression(calculator.expression);
    // Simpan hasil perhitungan sebagai 'firstOperand' baru untuk operasi berikutnya.
    calculator.firstOperand = result;
    // Tampilkan hasil yang sudah dibulatkan.
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
  }

  // Bagian 4: Menyiapkan kalkulator untuk input berikutnya.
  // Atur flag untuk menunggu angka kedua.
  calculator.waitingForSecondOperand = true;
  // Simpan operator yang baru saja ditekan.
  calculator.operator = nextOperator;

  // Bagian 5: Menambahkan operator ke string 'expression'.
  if (calculator.expression === "") {
    // Jika ekspresi kosong, tambahkan displayValue dan operator.
    calculator.expression = displayValue + nextOperator;
  } else {
    // Jika ekspresi sudah ada, cukup tambahkan operator di akhir.
    calculator.expression += nextOperator;
  }
  updateDisplay();
};

/**
 * @description Menghapus karakter terakhir dari ekspresi.
 */
const handleBackspace = () => {
  calculator.expression = calculator.expression.slice(0, -1);
  if (calculator.expression === "") {
    calculator.displayValue = "0";
  }
  updateDisplay();
};

/**
 * @description Menangani penekanan tombol desimal.
 * @param {string} dot - Simbol titik desimal.
 */
const inputDecimal = (dot) => {
  // Jika sedang menunggu angka kedua, mulai angka baru dengan "0.".
  if (calculator.waitingForSecondOperand) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    calculator.expression += "0.";
    updateDisplay();
    return;
  }
  // Tambahkan titik hanya jika belum ada.
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
    calculator.expression += dot;
  }
  updateDisplay();
};

/**
 * @description Mereset semua status kalkulator ke nilai awal.
 */
const resetCalculator = () => {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
  calculator.expression = "";
  updateDisplay();
};

/**
 * @description Fungsi untuk menghitung faktorial.
 * @param {number} n - Bilangan untuk dihitung faktorialnya.
 * @returns {number} Hasil faktorial.
 * @throws {Error} Jika input bukan bilangan bulat non-negatif.
 */
const factorial = (n) => {
  // Validasi: Memastikan input adalah bilangan bulat non-negatif.
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error("Faktorial hanya untuk bilangan bulat non-negatif.");
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

/**
 * @description Mesin utama kalkulator yang mengevaluasi ekspresi.
 * Mengubah simbol khusus (misal: "!", "√", "%") menjadi kode JavaScript yang valid,
 * lalu mengevaluasi string tersebut dengan `new Function()`.
 * @param {string} expression - Ekspresi matematika sebagai string.
 * @returns {number|string} Hasil perhitungan atau string "Error".
 */
const evaluateExpression = (expression) => {
  let processedExpression = expression;

  // Mengganti 'n!' menjadi 'factorial(n)'.
  processedExpression = processedExpression.replace(/(\d+)!/g, (match, p1) => {
    return `factorial(${parseFloat(p1)})`;
  });
  // Mengganti 'n√x' menjadi 'n*Math.sqrt(x)'.
  processedExpression = processedExpression.replace(
    /(\d+\.?\d*)√(\d+\.?\d*)/g,
    (match, p1, p2) => {
      return `${p1}*Math.sqrt(${p2})`;
    }
  );
  // Mengganti '√x' menjadi 'Math.sqrt(x)'.
  processedExpression = processedExpression.replace(
    /√(\d+\.?\d*)/g,
    (match, p1) => {
      return `Math.sqrt(${p1})`;
    }
  );
  // Mengganti 'n%' menjadi '(n / 100)'.
  processedExpression = processedExpression.replace(
    /(\d+\.?\d*)%/g,
    (match, p1) => {
      return `(${parseFloat(p1)} / 100)`;
    }
  );

  try {
    // Mengeksekusi string kode yang sudah diproses menggunakan `new Function()`.
    const result = new Function("factorial", `return ${processedExpression}`)(
      factorial
    );
    return result;
  } catch (e) {
    console.error("Error evaluating expression:", e);
    return "Error";
  }
};

/**
 * @description Menangani tombol sama dengan (=).
 * Mengevaluasi ekspresi saat ini dan menampilkan hasilnya.
 */
const handleEqual = () => {
  if (calculator.expression) {
    const result = evaluateExpression(calculator.expression);
    if (result === "Error") {
      calculator.displayValue = "Error";
    } else {
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    }

    // Mereset status untuk memungkinkan operasi berikutnya.
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
    calculator.expression = calculator.displayValue;

    updateDisplay();
  }
};

// =========================================================================
// PENGATUR EVENT LISTENER UTAMA
// =========================================================================

/**
 * @description Fungsi ini adalah titik masuk utama (entry point) dari semua interaksi
 * pengguna. Ini mengatur listener pada seluruh area tombol kalkulator.
 * Setiap klik tombol akan ditangkap dan diarahkan ke fungsi
 * penanganan yang sesuai.
 */
const button = document.querySelector(".calculator-keys");
button.addEventListener("click", (event) => {
  const { target } = event;
  // Pastikan elemen yang diklik adalah tombol.
  if (!target.matches("button")) {
    return;
  }

  // Logika kondisional untuk mengarahkan klik ke fungsi yang tepat.
  if (target.value === "<") {
    handleBackspace();
    return;
  }
  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    return;
  }
  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    return;
  }
  if (target.classList.contains("all-clear")) {
    resetCalculator();
    return;
  }
  if (target.classList.contains("equal-sign")) {
    handleEqual();
    return;
  }
  // Jika tidak ada kondisi di atas yang cocok, asumsikan itu adalah digit.
  handleDigit(target.value);
});

// Panggilan awal untuk memastikan tampilan dimulai dengan "0" saat halaman dimuat.
updateDisplay();
