// nomor WA admin (ganti dengan nomor kamu, pakai kode negara tanpa +)
const adminNumber = "6281381300825";

// ambil semua tombol order
const orderButtons = document.querySelectorAll(".btn-order");

orderButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault(); // supaya tidak reload halaman

    const packageName = this.getAttribute("data-package");
    const packagePrice = this.getAttribute("data-price");

    const message = `Halo Min, saya ingin menggunakan Jasa Arsitek ${packageName} (${packagePrice})`;

    // encode pesan biar aman untuk URL
    const encodedMessage = encodeURIComponent(message);

    // arahkan user ke WhatsApp
    const waUrl = `https://wa.me/${adminNumber}?text=${encodedMessage}`;
    window.open(waUrl, "_blank");
  });
});

// menu bar

const hamburger = document.getElementById("hamburger-menu");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active"); // tampil/slide-in dari kanan
  hamburger.classList.toggle("open"); // animasi X
});

// --- Cek parameter URL untuk buka modal otomatis ---
const params = new URLSearchParams(window.location.search);
if (params.get("konsultasi") === "open") {
  const modal = document.getElementById("konsultasiModal");
  if (modal) {
    modal.style.display = "flex";

    // Hapus parameter dari URL supaya pas refresh normal lagi
    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
  }
}

const Number = "6281381300825";

// Ambil elemen
const konsultasiBtn = document.querySelector(".kontak");
const modal = document.getElementById("konsultasiModal");
const closeBtn = document.querySelector(".close");
const form = document.getElementById("konsultasiForm");

// Buka modal saat klik tombol
konsultasiBtn.addEventListener("click", function (e) {
  e.preventDefault();
  modal.style.display = "flex";
});

// Tutup modal saat klik close
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Tutup modal jika klik luar konten
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Kirim data ke WhatsApp
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const wa = document.getElementById("wa").value;

  // validasi Nomor Wa
  if (!/^(?:\+62|62|0)(?:\s?\d{2,4})(?:[\s-]?\d{3,4}){2,3}$/.test(wa)) {
    alert(
      "Nomor WA tidak valid minimal harus 10-13 digit. Contoh:\n- 08123456789\n- +62 8123456789\n- +62 812-3456-789"
    );
    return;
  }
  const message = `Hallo Min, saya ingin konsultasi Design Arsitek dengan menggunakan Jasa Rumah Tasik.%0A
Nama: ${nama}%0A
WA: ${wa}%0A`;

  const waUrl = `https://wa.me/${Number}?text=${message}`;
  window.open(waUrl, "_blank");
});
