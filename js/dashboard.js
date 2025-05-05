// (() => {
// Contoh Chart

// fungsi privasi keuangan
let visible = true;

function fnView() {
  const toggleLabel = document.getElementById("toggleLabel");
  const eyeIcon = document.getElementById("eyeIcon");
  const toggleElements = document.querySelectorAll(".toggleable");

  toggleElements.forEach((el) => {
    if (visible) {
      el.setAttribute("data-original", el.textContent); // Simpan nilai asli
      el.textContent = "•••••••"; // Ganti dengan titik-titik
    } else {
      const original = el.getAttribute("data-original");
      if (original) el.textContent = original;
    }
  });

  toggleLabel.textContent = visible ? "Tampilkan" : "Sembunyikan";
  eyeIcon.setAttribute("data-feather", visible ? "eye" : "eye-off");

  feather.replace(); // Refresh ikon feather
  visible = !visible;
}
// })();
