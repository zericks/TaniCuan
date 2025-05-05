let password = document.getElementById("password");
let icon = document.getElementById("btnView");
let pin = document.getElementById("pin");
let iconPin = document.getElementById("btnViewPin");
let inputpin = document.getElementById("pin");
let nomorHp = document.getElementById("nomorHp");

function fnView() {
  if (password.value != "" && password.type === "password") {
    password.type = "text";
    icon.innerHTML = '<i data-feather="eye">';
    icon.title = "sembunyikan password";
  } else {
    password.type = "password";
    icon.innerHTML = '<i data-feather="eye-off">';
    icon.title = "lihat password";
  }
  feather.replace();
}
nomorHp.addEventListener("input", function () {
  // Hapus karakter non-angka
  this.value = this.value.replace(/\D/g, "");

  if (this.value.length > 17) {
    this.value = this.value.slice(0, 15);
  }
});
function fnViewPin() {
  if (pin.value !== "" && pin.type === "password") {
    pin.type = "text";
    iconPin.innerHTML = '<i data-feather="eye"></i>';
    iconPin.title = "Sembunyikan PIN";
  } else {
    pin.type = "password";
    iconPin.innerHTML = '<i data-feather="eye-off"></i>';
    iconPin.title = "Lihat PIN";
  }
  feather.replace();
}

inputpin.addEventListener("input", function () {
  // Hapus karakter non-angka
  this.value = this.value.replace(/\D/g, "");

  // Batasi maksimal 6 angka
  if (this.value.length > 6) {
    this.value = this.value.slice(0, 6);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const loginBox = document.querySelector(".login-box");
  const registrasiBox = document.querySelector(".registrasi-box");

  // Tambahkan efek transisi setelah halaman dimuat
  setTimeout(() => {
    if (loginBox) loginBox.classList.add("active");
    if (registrasiBox) registrasiBox.classList.add("active");
  }, 100);
});

