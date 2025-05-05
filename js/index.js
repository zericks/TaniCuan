let btnMenu = document.querySelector("#btnMenu");
let mobileMenu = document.querySelector("#mobileMenu");
let sidebar = document.querySelector(".sidebar");
let mobileLogout = document.querySelector("#mobileLogout");
const logoutButton = document.getElementById("logout");

// Fungsi Toggle Sidebar
function toggleSidebar() {
  sidebar.classList.toggle("active");
}

if (logoutButton) {
  logoutButton.onclick = function (e) {
    e.preventDefault();

    // Hapus localStorage agar kembali ke dashboard saat login ulang
    localStorage.removeItem("lastPage");

    // Hapus session di server
    fetch("../logout-handler.php").then(() => {
      // Redirect ke login setelah logout sukses
      window.location.href = "../login.html";
    });
  };
}

// Event listener untuk tombol menu di sidebar & navbar
if (btnMenu) btnMenu.onclick = toggleSidebar;
if (mobileMenu) mobileMenu.onclick = toggleSidebar;

// Event listener untuk tombol logout di navbar mobile
if (mobileLogout) {
  mobileLogout.onclick = function () {
    // alert("Logout berhasil!");
    localStorage.removeItem("lastPage");
    window.location.href = "logout.php"; // Arahkan ke logout asli
  };
}

// Fungsi untuk Mengatur Tampilan Sidebar & Navbar Berdasarkan Ukuran Layar
function adjustSidebar() {
  if (window.innerWidth > 768) {
    sidebar.classList.add("active"); // Sidebar selalu terbuka di desktop
    document.querySelector(".mobile-navbar").style.display = "none"; // Navbar hilang
    removeOutsideClickListener();
  } else if (window.innerWidth <= 768 && window.innerWidth > 480) {
    sidebar.classList.remove("active"); // Sidebar tertutup secara default di tablet
    document.querySelector(".mobile-navbar").style.display = "none"; // Navbar tetap hilang
    addOutsideClickListener();
  } else if (window.innerWidth <= 480) {
    sidebar.classList.remove("active"); // Sidebar hilang di mobile
    document.querySelector(".mobile-navbar").style.display = "flex"; // Navbar muncul
    addOutsideClickListener();
  }
}

// Fungsi untuk Menutup Sidebar Jika Klik di Luar Element
function handleOutsideClick(e) {
  if (!mobileMenu.contains(e.target) && !sidebar.contains(e.target)) {
    sidebar.classList.remove("active");
  }
}

// Fungsi untuk Menambahkan Event Listener
function addOutsideClickListener() {
  document.addEventListener("click", handleOutsideClick);
}

// Fungsi untuk Menghapus Event Listener
function removeOutsideClickListener() {
  document.removeEventListener("click", handleOutsideClick);
}

// Fungsi untuk Memuat Konten Halaman
function loadContent(page) {
  fetch(`pages/${page}.html`)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("main-content").innerHTML = data;

      // Muat file JavaScript khusus halaman
      loadScript(`js/${page}.js`);
      feather.replace();
    })
    .catch((error) => console.error("Error loading content:", error));
}

// Fungsi untuk Memuat File JavaScript Tertentu
function loadScript(scriptUrl) {
  let oldScript = document.getElementById("dynamic-script");
  if (oldScript) {
    oldScript.remove(); // Hapus script lama sebelum memuat yang baru
  }

  let script = document.createElement("script");
  script.src = scriptUrl;
  script.id = "dynamic-script";
  script.onload = () => console.log(`${scriptUrl} loaded`);
  document.body.appendChild(script);
}

// Tambahkan Event Listener ke Menu Sidebar
document.querySelectorAll(".nav-list a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // Mencegah reload halaman
    let page = this.getAttribute("data-page");
    loadContent(page);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".sidebar ul li a"); // Ambil semua menu
  // const defaultMenu = document.querySelector(".sidebar ul li a.dashboard"); // Menu default
  const defaultPage = localStorage.getItem("lastPage") || "dashboard";

  // Fungsi untuk menghapus kelas aktif dari semua menu
  function removeActiveClass() {
    menuItems.forEach((item) => {
      item.classList.remove("active-menu");
    });
  }

  // Fungsi untuk menandai menu yang aktif
  function setActiveMenu(page) {
    removeActiveClass();
    const activeMenu = document.querySelector(
      `.sidebar ul li a[data-page="${page}"]`
    );
    if (activeMenu) {
      activeMenu.classList.add("active-menu");
    }
  }

  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      const page = this.getAttribute("data-page");

      if (page === "kalender") {
        // Simpan halaman terakhir sebelum refresh
        localStorage.setItem("lastPage", page);
        location.reload(); // Refresh halaman
      } else {
        localStorage.setItem("lastPage", page);
        loadContent(page);
        setActiveMenu(page);
      }
    });
  });

  // Atur default ke Dashboard saat pertama kali dimuat
  // if (defaultMenu) {
  //   defaultMenu.classList.add("active-menu");
  // }
  adjustSidebar();
  // **Saat halaman pertama kali dimuat, buka halaman terakhir atau dashboard**
  loadContent(defaultPage);
  setActiveMenu(defaultPage);
});
// Tambahkan Event Listener Saat Layar di-Resize
window.addEventListener("resize", adjustSidebar);
