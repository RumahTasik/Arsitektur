const portfolioItems = [];
for (let i = 1; i <= 22; i++) {
  portfolioItems.push({
    title: "American 1 Lantai",
    tag: "American 1 Lantai",
    img: `/reverensi design/img/American 1 Lantai/am (${i}).jpeg`,
  });
}

for (let i = 1; i <= 80; i++) {
  portfolioItems.push({
    title: "Classic Modern 1 Lantai",
    tag: "Classic Modern 1 Lantai",
    img: `/reverensi design/img/Classic Modern 1 Lantai/cm (${i}).jpeg`,
  });
}

for (let i = 1; i <= 11; i++) {
  portfolioItems.push({
    title: "Kontomporer",
    tag: "Kontomporer",
    img: `/reverensi design/img/Kontomporer/kt (${i}).jpeg`,
  });
}
for (let i = 1; i <= 5; i++) {
  portfolioItems.push({
    title: "Minimalis",
    tag: "Minimalis",
    img: `/reverensi design/img/Minimalis/min (${i}).jpeg`,
  });
}
for (let i = 1; i <= 34; i++) {
  portfolioItems.push({
    title: "Minimalis 1 Lantai",
    tag: "Minimalis 1 Lantai",
    img: `/reverensi design/img/Minimalis 1 Lantai/mn (${i}).jpeg`,
  });
}
for (let i = 1; i <= 25; i++) {
  portfolioItems.push({
    title: "Minimalis Modern 1 Lantai",
    tag: "Minimalis Modern 1 Lantai",
    img: `/reverensi design/img/Minimalis Modern 1 Lantai/mm (${i}).jpeg`,
  });
}
for (let i = 1; i <= 19; i++) {
  portfolioItems.push({
    title: "Scandinavian 1 Lantai",
    tag: "Scandinavian 1 Lantai",
    img: `/reverensi design/img/Scandinavian 1 Lantai/s (${i}).jpeg`,
  });
}
for (let i = 1; i <= 6; i++) {
  portfolioItems.push({
    title: "Scandinavian 2 Lantai",
    tag: "Scandinavian 2 Lantai",
    img: `/reverensi design/img/Scandinavian 2 Lantai/sc (${i}).jpeg`,
  });
}
for (let i = 1; i <= 8; i++) {
  portfolioItems.push({
    title: "Tropis Modern 1 Lantai",
    tag: "Tropis Modern 1 Lantai",
    img: `/reverensi design/img/Tropis Modern 1 Lantai/tm (${i}).jpeg`,
  });
}

// ==== PORTFOLIO GRID + MODAL ====
const portfolioGrid = document.getElementById("portfolioGrid");
const portfolioModal = document.getElementById("portfolioModal");
const modalImg = document.getElementById("modalImage");
const closePortfolio = portfolioModal.querySelector(".close");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
let currentGroup = [];

// ambil gambar perwakilan per tag utama
const getRepresentativeItems = (filter = "all") => {
  const seen = new Set();
  return portfolioItems.filter((item) => {
    const mainTag = item.tag;
    const specificTag = item.tag;

    // kalau filter bukan "all", tetap ikuti filter biasa
    if (filter !== "all" && !item.tag.includes(filter)) return false;

    // kalau filter = "all", jangan pakai tag "Rumah 1 Lantai" atau "Rumah 2 Lantai" sebagai perwakilan
    if (filter === "all" && (specificTag === "" || specificTag === "")) {
      return false;
    }

    // pastikan tidak duplikat perwakilan berdasarkan tag spesifik
    if (seen.has(specificTag)) return false;
    seen.add(specificTag);

    return true;
  });
};

// render grid
const renderPortfolio = (filter = "all") => {
  portfolioGrid.innerHTML = "";
  const reps = getRepresentativeItems(filter);

  reps.forEach((item) => {
    const div = document.createElement("div");
    div.className = "card portfolio-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <h4>${item.title}</h4>
    `;
    portfolioGrid.appendChild(div);

    // event klik buka modal dengan semua gambar dari tag spesifik (tag[1])
    div.addEventListener("click", () => {
      const specificTag = item.tag; // pakai tag kedua: Classic / Skandinavian / Content Corer dll
      currentGroup = portfolioItems.filter((p) => p.tag === specificTag);

      // cari index sesuai gambar perwakilan yang diklik
      currentIndex = currentGroup.findIndex((p) => p.img === item.img);

      openModal(currentGroup[currentIndex].img);
    });
  });
};

function openModal(src) {
  portfolioModal.style.display = "flex";
  modalImg.src = src;

  // kalau cuma 1 gambar, sembunyikan tombol prev/next
  if (currentGroup.length <= 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
  }
}

function showImage(step) {
  currentIndex =
    (currentIndex + step + currentGroup.length) % currentGroup.length;
  modalImg.src = currentGroup[currentIndex].img;
}

prevBtn.addEventListener("click", () => showImage(-1));
nextBtn.addEventListener("click", () => showImage(1));
closePortfolio.addEventListener(
  "click",
  () => (portfolioModal.style.display = "none")
);

portfolioModal.addEventListener("click", (e) => {
  if (e.target === portfolioModal) portfolioModal.style.display = "none";
});

// render awal
renderPortfolio();

// filter tombol
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderPortfolio(btn.dataset.filter);
  });
});

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
