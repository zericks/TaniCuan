let password = document.getElementById("password");
let icon = document.getElementById("btnView");

// Tombol login ke index.html (sementara)
document.getElementById("btnLogin").addEventListener("click", function () {
  window.location.href = "index.html";
});


function fnView() {
  // alert('tes')
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

document.addEventListener("DOMContentLoaded", function () {
  const loginBox = document.querySelector(".login-box");
  const registrasiBox = document.querySelector(".registrasi-box");

  // Tambahkan efek transisi setelah halaman dimuat
  setTimeout(() => {
    if (loginBox) loginBox.classList.add("active");
    if (registrasiBox) registrasiBox.classList.add("active");
  }, 100);
});
