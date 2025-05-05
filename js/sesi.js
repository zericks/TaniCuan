document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".sesi-container").style.display = "block";
  document.querySelector(".add-sesi").style.display = "block";
  document.querySelector(".add-sesi-wrapper").style.display = "none"; // Sembunyikan form tambah sesi
  document.querySelector("#detailSesi").style.display = "none"; // Sembunyikan tampilan detail sesi

  // Pastikan tombol "Simpan" disembunyikan saat halaman dimuat
  document.querySelector(".save-btn").style.display = "none";
});

// Form tambah sesi start
function tambahSesi() {
  // Tampilkan form tambah sesi di atas Tampilan 1
  document.querySelector(".add-sesi-wrapper").style.display = "block";
}

function tutupFormSesi() {
  // Sembunyikan form tambah sesi
  document.querySelector(".add-sesi-wrapper").style.display = "none";
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("cancel-sesi-btn")) {
    tutupFormSesi();
  }
});

// Contoh data sesi
const sessionsData = [
  {
    name: "Tomato Farming",
    status: "Active",
    plantType: "Cherry Tomato",
    startDate: "15 March 2024",
    estHarvest: "15 June 2024",
  },
  {
    name: "Lettuce Farming",
    status: "Completed",
    plantType: "Lettuce",
    startDate: "1 February 2024",
    estHarvest: "1 May 2024",
  },
  {
    name: "Carrot Farming",
    status: "Active",
    plantType: "Carrot",
    startDate: "10 April 2024",
    estHarvest: "10 July 2024",
  },
];

// Fungsi untuk menampilkan data sesi dalam bentuk kartu
function displaySessions() {
  const sessionsContainer = document.querySelector(".sessions");
  sessionsContainer.innerHTML = ""; // Kosongkan kontainer sebelum menambahkan data baru

  sessionsData.forEach((session) => {
    // Membuat elemen kartu sesi
    const sessionCard = document.createElement("div");
    sessionCard.classList.add("session-card");

    // Membuat bagian header
    const sessionHeader = document.createElement("div");
    sessionHeader.classList.add("session-header");
    const sessionTitle = document.createElement("h2");
    sessionTitle.textContent = session.name;
    const sessionStatus = document.createElement("span");
    sessionStatus.classList.add("session-status");
    sessionStatus.textContent = session.status;
    sessionHeader.appendChild(sessionTitle);
    sessionHeader.appendChild(sessionStatus);

    // Membuat bagian detail
    const sessionDetails = document.createElement("div");
    sessionDetails.classList.add("session-details");
    const plantType = document.createElement("p");
    plantType.innerHTML = `<strong>Plant Type:</strong> ${session.plantType}`;
    const startDate = document.createElement("p");
    startDate.innerHTML = `<strong>Start Date:</strong> ${session.startDate}`;
    const estHarvest = document.createElement("p");
    estHarvest.innerHTML = `<strong>Est. Harvest:</strong> ${session.estHarvest}`;
    sessionDetails.appendChild(plantType);
    sessionDetails.appendChild(startDate);
    sessionDetails.appendChild(estHarvest);

    // Membuat bagian footer
    const sessionFooter = document.createElement("div");
    sessionFooter.classList.add("session-footer");
    const viewDetailsBtn = document.createElement("button");
    viewDetailsBtn.classList.add("view-details-btn");
    viewDetailsBtn.textContent = "View Details";
    sessionFooter.appendChild(viewDetailsBtn);

    // Menambahkan semua bagian ke dalam kartu sesi
    sessionCard.appendChild(sessionHeader);
    sessionCard.appendChild(sessionDetails);
    sessionCard.appendChild(sessionFooter);

    // Menambahkan kartu sesi ke dalam kontainer
    sessionsContainer.appendChild(sessionCard);
  });
}

// Panggil fungsi untuk menampilkan data sesi saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  displaySessions();
});

function lihatDetailSesi(event) {
  // Ambil elemen sesi yang diklik
  let sessionCard = event.target.closest(".session-card");
  if (!sessionCard) return;

  // Ambil data dari sesi yang diklik
  let namaTanaman = sessionCard.querySelector(".session-header h2").innerText;
  let jenisTanaman = sessionCard
    .querySelector(".session-details p:nth-child(1)")
    .innerText.split(": ")[1];
  let tanggalTanam = sessionCard
    .querySelector(".session-details p:nth-child(2)")
    .innerText.split(": ")[1];
  let estimasiPanen = sessionCard
    .querySelector(".session-details p:nth-child(3)")
    .innerText.split(": ")[1];

  // Masukkan data ke tampilan detail sesi
  document.getElementById("detailNamaTanaman").innerText = namaTanaman;
  document.getElementById("detailJenisTanaman").innerText = jenisTanaman;
  document.getElementById("detailTanggalTanam").innerText = tanggalTanam;
  document.getElementById("detailEstimasiPanen").innerText = estimasiPanen;

  // Tampilkan tampilan 2 (detail sesi)
  document.querySelector(".sesi-container").style.display = "none"; // Sembunyikan tampilan 1
  document.getElementById("detailSesi").style.display = "block"; // Tampilkan tampilan 2
}

function kembaliKeSesi() {
  // Kembali ke tampilan daftar sesi
  document.querySelector(".sesi-container").style.display = "block";
  document.getElementById("detailSesi").style.display = "none";

  // Sembunyikan form tambah transaksi jika masih terbuka
  tutupFormTransaksi();
  tutupFormDetail();
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("view-details-btn")) {
    lihatDetailSesi(e);
  }
});

// Fungsi mengatur tombol edit dan simpan di informasi tanaman
function toggleEdit(editMode) {
  let editableFields = document.querySelectorAll(".editable");
  let editBtn = document.querySelector(".edit-btn");
  let saveBtn = document.querySelector(".save-btn");

  if (editMode) {
    // Aktifkan mode edit
    editableFields.forEach((field) => (field.contentEditable = "true"));
    editBtn.style.display = "none"; // Sembunyikan tombol Edit
    saveBtn.style.display = "inline-block"; // Tampilkan tombol Simpan
  } else {
    // Simpan perubahan dan nonaktifkan mode edit
    editableFields.forEach((field) => (field.contentEditable = "false"));
    editBtn.style.display = "inline-block"; // Tampilkan kembali tombol Edit
    saveBtn.style.display = "none"; // Sembunyikan tombol Simpan

    // Opsional: Bisa tambahkan penyimpanan ke database atau localStorage di sini
    console.log("Data tanaman telah diperbarui:");
    console.log(
      "Nama:",
      document.getElementById("detailNamaTanaman").innerText
    );
    console.log(
      "Jenis:",
      document.getElementById("detailJenisTanaman").innerText
    );
    console.log(
      "Tanggal Tanam:",
      document.getElementById("detailTanggalTanam").innerText
    );
    console.log(
      "Estimasi Panen:",
      document.getElementById("detailEstimasiPanen").innerText
    );
  }
}

// fungsi menampilkan kolom alasan panen gagal
function sesiGagal() {
  document.getElementById("formAlasanGagal").style.display = "block";
  // Scroll ke atas agar form terlihat
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function batalAlasanGagal() {
  document.getElementById("formAlasanGagal").style.display = "none";
  document.getElementById("alasanGagalText").value = "";
}

function kirimAlasanGagal() {
  const alasan = document.getElementById("alasanGagalText").value.trim();
  if (!alasan) {
    alert("Silakan isi alasan terlebih dahulu.");
    return;
  }

  // Simulasi pengiriman data
  console.log("Alasan sesi gagal:", alasan);
  alert("Alasan telah dikirim. Sesi akan ditandai sebagai gagal.");

  // Reset dan sembunyikan form
  document.getElementById("formAlasanGagal").style.display = "none";
  document.getElementById("alasanGagalText").value = "";

  alert("Alasan sesi gagal telah dikirim.");
}

const alasanInput = document.getElementById("alasanGagalText");
const charCounter = document.getElementById("charCounter");

alasanInput.addEventListener("input", function () {
  const jumlahKarakter = alasanInput.value.length;
  charCounter.innerText = `${jumlahKarakter}/200`;
});

function isiNamaTanamanPemasukan() {
  // Ambil nama sesi dan jenis tanaman dari informasi sesi
  const namaSesi = document.getElementById("detailNamaTanaman").innerText;
  const jenisTanaman = document.getElementById("detailJenisTanaman").innerText;

  // Format nama tanaman di form pemasukan
  const namaTanamanFormatted = `${namaSesi} (${jenisTanaman})`;

  // Setel nilai input di form pemasukan
  document.getElementById("namaTanamanPemasukan").value = namaTanamanFormatted;
}

// Fungsi memunculkan form tambah transaksi
function tambahTransaksi() {
  // Tampilkan form transaksi
  const formTransaksi = document.getElementById("formTransaksi");
  formTransaksi.style.display = "block";

  // Isi nama tanaman secara otomatis
  isiNamaTanamanPemasukan();

  // Tunggu sedikit sebelum scrolling agar tampilan lebih halus
  setTimeout(() => {
    formTransaksi.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 200);
}
function tutupFormTransaksi() {
  document.getElementById("formTransaksi").style.display = "none"; // Sembunyikan form transaksi
}

// Fungsi untuk menampilkan form yang sesuai dengan jenis transaksi
function tampilkanInputBarang() {
  const jenisPengeluaran = document.getElementById("jenisPengeluaran").value;
  const inputBarang = document.getElementById("inputBarang");
  const jumlahPengeluaran = document.getElementById("jumlahPengeluaran");

  if (jenisPengeluaran === "barang") {
    inputBarang.style.display = "block";
    jumlahPengeluaran.readOnly = true;
  } else {
    inputBarang.style.display = "none";
    jumlahPengeluaran.readOnly = false;
  }
}

// Fungsi menghitung total pengeluaran otomatis
function hitungTotal() {
  let jumlah = document.getElementById("jumlahBarang").value || 0;
  let harga =
    document.getElementById("hargaSatuan").value.replace(/[^0-9]/g, "") || 0;

  let total = jumlah * harga;
  document.getElementById("jumlahPengeluaran").value = total
    ? "Rp " + new Intl.NumberFormat("id-ID").format(total)
    : "";
}

// Tambahkan event listener agar total pengeluaran otomatis terupdate
document.getElementById("jumlahBarang").addEventListener("input", hitungTotal);
document.getElementById("hargaSatuan").addEventListener("input", hitungTotal);

// Fungsi untuk menampilkan form yang sesuai dengan tipe transaksi
function ubahFormTransaksi() {
  let tipe = document.getElementById("tipeTransaksi").value;
  let formPengeluaran = document.getElementById("formPengeluaran");
  let formPemasukan = document.getElementById("formPemasukan");

  if (tipe === "pengeluaran") {
    formPengeluaran.style.display = "block";
    formPemasukan.style.display = "none";
  } else {
    formPengeluaran.style.display = "none";
    formPemasukan.style.display = "block";
  }
}

// Fungsi menghitung total pemasukan otomatis
function hitungTotalPemasukan() {
  let hargaPerKilo =
    document.getElementById("hargaPerKilo").value.replace(/[^0-9]/g, "") || 0;
  let beratPanen = document.getElementById("beratPanen").value || 0;

  let total = hargaPerKilo * beratPanen;
  document.getElementById("jumlahPemasukan").value = total
    ? "Rp " + new Intl.NumberFormat("id-ID").format(total)
    : "";
}

// Tambahkan event listener agar total pemasukan otomatis terupdate
document
  .getElementById("hargaPerKilo")
  .addEventListener("input", hitungTotalPemasukan);
document
  .getElementById("beratPanen")
  .addEventListener("input", hitungTotalPemasukan);

function formatRupiah(input) {
  let angka = input.value.replace(/[^0-9]/g, ""); // Hanya angka
  let formatted = new Intl.NumberFormat("id-ID").format(angka); // Format angka

  // Tambahkan "Rp " jika ada angka, kosongkan jika tidak
  input.value = angka ? "Rp " + formatted : "";
}

function detailTransaksi(event) {
  // Ambil baris transaksi yang diklik
  let row = event.target.closest("tr");

  // Ambil data transaksi dari tabel
  let namaTransaksi = row.cells[0].innerText;
  let tanggal = row.cells[1].innerText;
  let tipeTransaksi = row.cells[2].innerText;
  let jumlah = row.cells[3].innerText;

  // Isi form detail transaksi
  document.getElementById("detailNamaTransaksi").value = namaTransaksi;
  document.getElementById("detailTanggal").value = tanggal;
  document.getElementById("detailTipeTransaksi").value = tipeTransaksi;
  document.getElementById("detailJumlah").value = jumlah;

  // Tampilkan form detail transaksi
  document.getElementById("formDetailTransaksi").style.display = "block";
  // Scroll otomatis ke form detail transaksi
  // Tunggu sedikit sebelum scrolling agar tampilan lebih halus
  setTimeout(() => {
    formDetail.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 200);
}

function tutupFormDetail() {
  document.getElementById("formDetailTransaksi").style.display = "none";
}

// Tambahkan event listener ke semua tombol "Detail"
document.querySelectorAll("#tabelKeuangan button").forEach((button) => {
  if (button.innerText === "Detail") {
    button.addEventListener("click", detailTransaksi);
  }
});
