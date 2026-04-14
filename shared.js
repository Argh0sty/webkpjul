// =====================================================
// SAMBELKU — Shared JavaScript
// Dipakai di semua halaman HTML
// =====================================================

// =====================================================
// [PRODUK] DATA PRODUK — EDIT DI SINI
// badge: "terlaris" / "baru" / ""
// kategori: "sambal" / "bawang" / "hamper"
// =====================================================
const produkData = [
  // ── SAMBAL ──────────────────────────────────────
  { id: 1, nama: "Sambal Bajak Laut", brand: "Varian Klasik", harga: 35000, desc: "Resep turun-temurun, perpaduan pedas, manis, dan gurih. Cocok untuk semua menu sehari-hari.", emoji: "🫙", badge: "terlaris", kategori: "sambal", tags: ["Pedas Sedang", "Tanpa MSG", "BPOM"], img: "" },
  { id: 2, nama: "Sambal Roa Manado",     brand: "Varian Spesial", harga: 45000, desc: "Khas Sulawesi, ikan roa asap dengan cabai merah segar pilihan. Aroma khas yang menggoda.", emoji: "🌶", badge: "baru", kategori: "sambal", tags: ["Pedas Tinggi", "Ikan Roa", "Khas Sulawesi"], img: "" },
  { id: 3, nama: "Sambal Tomat Segar",    brand: "Varian Tomat",   harga: 32000, desc: "Segar dan pedas, cocok untuk lalapan, ayam goreng, maupun seafood.", emoji: "🍅", badge: "terlaris", kategori: "sambal", tags: ["Super Pedas", "Segar", "Tomat Lokal"], img: "" },
  { id: 4, nama: "Sambal Pecel Kacang",   brand: "Varian Kacang",  harga: 28000, desc: "Bumbu pecel dengan aroma kencur dan daun jeruk. Tinggal siram, langsung jadi!", emoji: "🥜", badge: "", kategori: "sambal", tags: ["Tidak Pedas", "Kacang Tanah", "Vegetarian"], img: "" },
  { id: 5, nama: "Sambal Geprek Extra",   brand: "Varian Geprek",  harga: 38000, desc: "Level pedas tinggi untuk pecinta sejati. Bawang putih goreng berpadu cabai rawit.", emoji: "🔥", badge: "terlaris", kategori: "sambal", tags: ["Level 5 Pedas", "Bawang Goreng", "Crispy"], img: "" },
  { id: 6, nama: "Sambal Matah Bali",     brand: "Varian Bali",    harga: 36000, desc: "Segar dan aromatik, perpaduan serai, kaffir lime, dan cabai rawit khas Dewata.", emoji: "🌴", badge: "", kategori: "sambal", tags: ["Pedas Sedang", "Khas Bali", "Serai & Jeruk"], img: "" },
  // ── BAWANG GORENG ────────────────────────────────
  { id: 7, nama: "Bawang Goreng Crispy",  brand: "Bawang Original", harga: 25000, desc: "Bawang merah pilihan digoreng dengan minyak kelapa murni. Renyah tahan lama.", emoji: "🧅", badge: "terlaris", kategori: "bawang", tags: ["Crispy", "Minyak Kelapa", "Tanpa Pengawet"], img: "" },
  { id: 8, nama: "Bawang Goreng Pedas",   brand: "Bawang Spesial",  harga: 28000, desc: "Bawang goreng crispy dengan taburan cabai rawit giling. Cocok untuk pelengkap nasi.", emoji: "🌶🧅", badge: "baru", kategori: "bawang", tags: ["Pedas", "Crispy", "Serbaguna"], img: "" },
  { id: 9, nama: "Bawang Goreng Premium", brand: "Bawang Brebes",   harga: 35000, desc: "Bawang merah Brebes asli, ukuran jumbo, dipilih tangan satu per satu untuk kualitas terbaik.", emoji: "✨🧅", badge: "", kategori: "bawang", tags: ["Brebes Asli", "Jumbo", "Premium"], img: "" },
  { id:10, nama: "Bawang Goreng Bawputih",brand: "Bawang Putih",    harga: 30000, desc: "Bawang putih goreng aromatis, sempurna untuk taburan mie, bakso, soto, dan sup.", emoji: "🧄", badge: "", kategori: "bawang", tags: ["Bawang Putih", "Aromatis", "Serbaguna"], img: "" },
  // ── HAMPER ───────────────────────────────────────
  { id:11, nama: "Hamper Nusantara (6 Botol)", brand: "Paket Hamper", harga: 199000, desc: "6 botol varian sambal pilihan dalam box eksklusif. Cocok untuk hadiah & oleh-oleh.", emoji: "🎁", badge: "baru", kategori: "hamper", tags: ["6 Varian", "Box Premium", "Hemat 20%"], img: "" },
  { id:12, nama: "Hamper Komplit (Sambal + Bawang)", brand: "Paket Komplit", harga: 149000, desc: "Paket 3 sambal + 2 bawang goreng dalam packaging cantik. Hadiah sempurna!", emoji: "🎀", badge: "terlaris", kategori: "hamper", tags: ["5 Produk", "Mix Produk", "Siap Kirim"], img: "" },
];
// ── AKHIR DATA PRODUK ────────────────────────────────

// ---- State global ----
let cart = JSON.parse(sessionStorage.getItem('sambelku_cart') || '[]');
let productImages = JSON.parse(sessionStorage.getItem('sambelku_images') || '{}');
let currentProductId = null;
let modalQty = 1;

function saveCart() { sessionStorage.setItem('sambelku_cart', JSON.stringify(cart)); }
function saveImages() { sessionStorage.setItem('sambelku_images', JSON.stringify(productImages)); }

function formatHarga(n) { return 'Rp ' + n.toLocaleString('id-ID'); }

// ---- Render produk ke grid ----
function renderProduk(containerId, filter = 'semua', sort = 'default') {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  let data = [...produkData];
  if (filter !== 'semua') data = data.filter(p => p.kategori === filter);
  if (sort === 'harga-asc') data.sort((a,b) => a.harga - b.harga);
  else if (sort === 'harga-desc') data.sort((a,b) => b.harga - a.harga);
  else if (sort === 'nama-asc') data.sort((a,b) => a.nama.localeCompare(b.nama));

  if (data.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:#907060;font-size:16px;">Tidak ada produk di kategori ini.</div>`;
    return;
  }
  grid.innerHTML = data.map(p => {
    const imgSrc = productImages[p.id] || p.img;
    const imgHTML = imgSrc ? `<img src="${imgSrc}" alt="${p.nama}" />` : `<span class="emoji-fallback">${p.emoji}</span>`;
    const badgeHTML = p.badge === 'terlaris' ? `<span class="badge-pedas">🔥 Terlaris</span>`
      : p.badge === 'baru' ? `<span class="badge-new">✨ Baru</span>` : '';
    return `
      <div class="produk-card" data-id="${p.id}">
        <div class="produk-img">
          ${imgHTML}${badgeHTML}
          <div class="upload-overlay">
            <span>📷</span><p>Ganti Foto</p>
            <input type="file" accept="image/*" class="upload-input"
              onchange="uploadProdukImg(event,${p.id})" onclick="event.stopPropagation()" />
          </div>
        </div>
        <div class="produk-info" onclick="openModal(${p.id})">
          <div class="produk-brand">${p.brand}</div>
          <div class="produk-name">${p.nama}</div>
          <div class="produk-desc">${p.desc}</div>
          <div class="produk-footer">
            <span class="produk-harga">${formatHarga(p.harga)}</span>
            <button class="btn-beli" onclick="event.stopPropagation();quickAddCart(${p.id})">+</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

// ---- Upload foto produk ----
function uploadProdukImg(event, id) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    productImages[id] = e.target.result;
    saveImages();
    // Re-render semua grid yang ada
    document.querySelectorAll('[id$="Grid"], [id$="grid"]').forEach(g => {
      const filter = g.dataset.filter || 'semua';
      renderProduk(g.id, filter);
    });
    updateModal(id);
    showToast('✅ Foto produk berhasil diupload!');
  };
  reader.readAsDataURL(file);
}

// ---- Modal ----
function openModal(id) {
  const p = produkData.find(x => x.id === id);
  if (!p) return;
  currentProductId = id; modalQty = 1;
  document.getElementById('qtyNum').textContent = 1;
  updateModal(id);
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateModal(id) {
  const p = produkData.find(x => x.id === id);
  if (!p) return;
  const overlay = document.getElementById('modalOverlay');
  if (!overlay || !overlay.classList.contains('open')) return;
  const imgSrc = productImages[id] || p.img;
  const imgEl = document.getElementById('modalImgEl');
  const emojiEl = document.getElementById('modalEmoji');
  if (imgSrc) { imgEl.src = imgSrc; imgEl.style.display = 'block'; emojiEl.style.display = 'none'; }
  else { imgEl.style.display = 'none'; emojiEl.style.display = 'block'; emojiEl.textContent = p.emoji; }
  document.getElementById('modalBrand').textContent = p.brand;
  document.getElementById('modalTitle').textContent = p.nama;
  document.getElementById('modalPrice').textContent = formatHarga(p.harga);
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalTags').innerHTML = p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
}

function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); document.body.style.overflow = ''; }
function closeModalOutside(e) { if (e.target === document.getElementById('modalOverlay')) closeModal(); }
function changeQty(delta) { modalQty = Math.max(1, modalQty + delta); document.getElementById('qtyNum').textContent = modalQty; }
function addToCartFromModal() { if (!currentProductId) return; addToCart(produkData.find(x => x.id === currentProductId), modalQty); closeModal(); }
function quickAddCart(id) { addToCart(produkData.find(x => x.id === id), 1); }

// ---- Cart ----
function addToCart(p, qty) {
  const ex = cart.find(c => c.id === p.id);
  if (ex) ex.qty += qty; else cart.push({ id: p.id, nama: p.nama, harga: p.harga, emoji: p.emoji, qty });
  saveCart(); updateCartUI();
  showToast(`🛒 ${p.nama} ditambahkan!`);
}

function updateCartUI() {
  const total = cart.reduce((s,c) => s + c.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => {
    el.style.display = total > 0 ? 'flex' : 'none';
    el.textContent = total;
  });
  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
  if (!itemsEl) return;
  if (cart.length === 0) {
    itemsEl.innerHTML = `<div class="cart-empty"><span>🛒</span><p>Keranjang masih kosong.<br>Yuk mulai belanja!</p></div>`;
    if (footerEl) footerEl.style.display = 'none'; return;
  }
  if (footerEl) footerEl.style.display = 'block';
  itemsEl.innerHTML = cart.map(item => {
    const imgSrc = productImages[item.id];
    const imgHTML = imgSrc ? `<img src="${imgSrc}" alt="${item.nama}" style="width:100%;height:100%;object-fit:cover;">` : item.emoji;
    return `<div class="cart-item">
      <div class="cart-item-img">${imgHTML}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.nama}</div>
        <div class="cart-item-price">${formatHarga(item.harga)}</div>
        <div class="cart-item-qty">
          <button class="cart-qty-btn" onclick="cartChangeQty(${item.id},-1)">−</button>
          <span class="cart-qty-num">${item.qty}</span>
          <button class="cart-qty-btn" onclick="cartChangeQty(${item.id},1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">🗑</button>
    </div>`;
  }).join('');
  document.getElementById('cartTotal').textContent = formatHarga(cart.reduce((s,c) => s + c.harga * c.qty, 0));
}

function cartChangeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (item) { item.qty = Math.max(1, item.qty + delta); saveCart(); updateCartUI(); }
}
function removeFromCart(id) { cart = cart.filter(c => c.id !== id); saveCart(); updateCartUI(); }

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlayBg').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlayBg').classList.remove('open');
  document.body.style.overflow = '';
}

// ---- Toast ----
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ---- Scroll reveal ----
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  initReveal();
  const btnCart = document.getElementById('btnCart');
  if (btnCart) btnCart.addEventListener('click', openCart);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeCart(); } });
  // Set active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path) a.classList.add('active');
  });
});
