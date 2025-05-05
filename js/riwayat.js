const dataRiwayat = [
  {
    id: 1,
    nama: "Padi",
    jenis: "Tanaman Pangan",
    tanggalTanam: "1 Maret 2025",
    estimasiPanen: "1 Juni 2025",
    status: "Sukses",
    alasanGagal: "",
    pemasukan: 2000000,
    pengeluaran: 1500000,
    transaksi: [
      {
        nama: "Pupuk",
        tanggal: "2 Maret 2025",
        tipe: "Pengeluaran",
        jumlah: 500000
      },
      {
        nama: "Panen",
        tanggal: "1 Juni 2025",
        tipe: "Pemasukan",
        jumlah: 2000000
      }
    ]
  },
  {
    id: 2,
    nama: "Jagung",
    jenis: "Tanaman Pangan",
    tanggalTanam: "15 Februari 2025",
    estimasiPanen: "15 Mei 2025",
    status: "Gagal",
    alasanGagal: "Terserang hama",
    pemasukan: 0,
    pengeluaran: 200000,
    transaksi: [
      {
        nama: "Bibit",
        tanggal: "16 Februari 2025",
        tipe: "Pengeluaran",
        jumlah: 200000
      }
    ]
  }
];

function showDetail(id) {
  const data = dataRiwayat.find((item) => item.id === id);
  if (!data) return;

  // Sembunyikan ringkasan dan tampilkan detail
  document.getElementById("ringkasan").style.display = "none";
  document.getElementById("detailRiwayat").style.display = "block";

  // Isi data di detail
  document.getElementById("riwayatNamaTanaman").textContent = data.nama;
  document.getElementById("riwayatJenisTanaman").textContent = data.jenis;
  document.getElementById("riwayatTanggalTanam").textContent = data.tanggalTanam;
  document.getElementById("riwayatEstimasiPanen").textContent = data.estimasiPanen;
  document.getElementById("riwayatStatus").textContent = data.status;

  // Alasan gagal
  const alasanGagalEl = document.getElementById("riwayatAlasanGagal");
  if (data.status === "Gagal") {
    alasanGagalEl.textContent = data.alasanGagal || "-";
    alasanGagalEl.parentElement.style.display = "block";
  } else {
    alasanGagalEl.textContent = "";
    alasanGagalEl.parentElement.style.display = "none";
  }

  // Ringkasan Keuangan
  document.getElementById("riwayatTotalPemasukan").textContent = formatRupiah(data.pemasukan);
  document.getElementById("riwayatTotalPengeluaran").textContent = formatRupiah(data.pengeluaran);
  document.getElementById("riwayatSelisih").textContent = formatRupiah(data.pemasukan - data.pengeluaran);

  // Isi tabel transaksi
  const tbody = document.querySelector("#tabelKeuanganRiwayat tbody");
  tbody.innerHTML = "";

  if (data.transaksi.length === 0) {
    document.getElementById("pesanKeuanganKosongRiwayat").style.display = "block";
  } else {
    document.getElementById("pesanKeuanganKosongRiwayat").style.display = "none";

    data.transaksi.forEach((trans) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${trans.nama}</td>
        <td>${trans.tanggal}</td>
        <td>${trans.tipe}</td>
        <td>${formatRupiah(trans.jumlah)}</td>
      `;
      tbody.appendChild(row);
    });
  }
}

function formatRupiah(angka) {
  return "Rp" + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Riwayat loaded!");
  // Tambahkan logika khusus untuk halaman Riwayat di sini
});

function kembaliKeRingkasan() {
  // Sembunyikan tampilan Detail Riwayat
  document.getElementById("detailRiwayat").style.display = "none";

  // Tampilkan kembali tampilan Ringkasan Riwayat
  document.getElementById("ringkasan").style.display = "block";
}
