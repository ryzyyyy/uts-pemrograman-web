// Efek animasi fade-in saat scroll
document.addEventListener("scroll", function () {
  const elements = document.querySelectorAll(".fade-in");
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    // Tambahkan kelas 'show' jika elemen masuk ke dalam viewport
    if (position < windowHeight - 100) {
      el.classList.add("show");
    } else {
      // Opsional: Hapus kelas 'show' jika elemen keluar dari viewport (untuk efek berulang)
      // el.classList.remove("show");
    }
  });
});

const video = document.getElementById('hidden-video');
if (video) {
  video.addEventListener('canplaythrough', () => {
    video.play(); // Pastikan memutar
  });
}

// Fungsionalitas Pencarian Produk
document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const productGrid = document.getElementById("productGrid");
  const allProductCards = productGrid ? productGrid.querySelectorAll(".card") : []; // Ambil semua kartu produk, dengan pengecekan null

  if (searchInput) {
  searchInput.addEventListener('input', performSearch); // Pencarian real-time
  searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      performSearch();
    }
  });
}
if (searchButton) {
  searchButton.addEventListener('click', performSearch);
}

  // Fungsi untuk melakukan pencarian
  function performSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim(); // Tambahkan .trim() untuk menghapus spasi ekstra
  const cards = productGrid.querySelectorAll('.card');

  cards.forEach(card => {
    const productName = card.querySelector('h3').textContent.toLowerCase();
    const productDesc = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : ''; // Cek jika <p> ada
    const isVisible = productName.includes(searchTerm) || productDesc.includes(searchTerm);
    card.style.display = isVisible ? 'flex' : 'none'; // Pastikan menggunakan 'flex' sesuai CSS grid
  });

  // Opsional: Tampilkan pesan jika tidak ada hasil
  const visibleCards = Array.from(cards).filter(card => card.style.display !== 'none');
  if (visibleCards.length === 0 && searchTerm) {
    // Tambahkan elemen pesan jika belum ada
    let noResult = document.getElementById('noResult');
    if (!noResult) {
      noResult = document.createElement('p');
      noResult.id = 'noResult';
      noResult.textContent = 'Tidak ada produk yang cocok dengan pencarian Anda.';
      noResult.style.textAlign = 'center';
      noResult.style.color = '#e60000';
      productGrid.appendChild(noResult);
    }
    noResult.style.display = 'block';
  } else {
    const noResult = document.getElementById('noResult');
    if (noResult) noResult.style.display = 'none';
  }
}

  // Event listener untuk tombol pencarian
  if (searchButton) searchButton.addEventListener("click", performSearch);

  // Event listener untuk input pencarian (saat menekan Enter)
  if (searchInput) searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });

  // Tambahkan event listener untuk membuka modal saat klik pada card (untuk fungsi "lihat detail")
  allProductCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id'); // Asumsikan card memiliki atribut data-id yang sesuai dengan productData
      if (id) openProductModal(id);
    });
  });
});

// Staggered Animation untuk Judul Elegan (Minimal JS)
document.addEventListener("DOMContentLoaded", function() {
  const title = document.querySelector(".elegant-title");
  if (title && !title.querySelector('.stagger-letter')) {
    // Split teks menjadi span untuk stagger
    const text = title.textContent;
    title.innerHTML = text.split('').map((char, index) => 
      `<span class="stagger-letter" style="animation-delay: ${index * 0.08}s;">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');
  }

  // Scroll Effect untuk Hero (Subtle Shrink)
  window.addEventListener("scroll", function() {
    const hero = document.querySelector(".elegant-hero");
    if (hero) {
      if (window.scrollY > 50) {
        hero.classList.add("scrolled");
      } else {
        hero.classList.remove("scrolled");
      }
    }
  });

  // Hover Event untuk Teaser (Sudah CSS, tapi tambah click jika perlu)
  const teaser = document.querySelector(".teaser-product");
  if (teaser) {
    teaser.addEventListener("click", function() {
      // Opsional: Scroll ke produk terkait atau modal
      const produkSection = document.querySelector("#produk");
      if (produkSection) produkSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Tambahan: Parallax untuk Hero
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.elegant-hero');
    if (hero) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
  });

  // Staggered Fade untuk Sections (Lebih Menarik)
  const sections = document.querySelectorAll('.fade-in');
  sections.forEach((section, index) => {
    section.style.transitionDelay = `${index * 0.2}s`;
  });
});

// Data Produk (Hardcode untuk demo; bisa di-fetch dari API)
const productData = {
  1: {
    title: "Nike One Backpack (25L)",
    price: "Rp 1.329.000",
    description: "Don't tell your other bags, but this might just be the only one you need. A large main pocket and interior pockets make organising essentials a breeze. Padded and adjustable shoulder straps for comfortable carrying.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/b5c6d960-3f93-4ee6-97bc-f0efb0cfe4c7/NK+ONE+BKPK.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/2d269cba-8a81-421b-9a56-785172c5f6a3/NK+ONE+BKPK.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/91fffb2f-fb63-40b3-81fc-7b18c60ddcb2/NK+ONE+BKPK.png",
      "",
      "",
    ],
    specs: [
      "Colour Shown: Black/Iron Grey/Black",
      "Style: HV1194-010",
      "Country/Region of Origin: Cambodia",
    ]
  },
  2: {
    title: "Nike Dri-FIT Club Unstructured Metal Swoosh Cap",
    price: "Rp 299.000",
    description: "Step up your Swoosh game with this mid-depth, unstructured Club Cap. Its curved bill and metal Swoosh logo give your look a clean finish, while sweat-wicking fabric helps you stay cool and comfortable as you make the most of warm, sunny weather.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/bb35906a-3643-4577-95d7-0650a0618e8a/U+NK+DF+CLUB+CAP+U+CB+MTSWSH+L.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/46c954f9-289e-4706-894b-16cdc2b3c1dc/U+NK+DF+CLUB+CAP+U+CB+MTSWSH+L.png",
      "",
    ],
    specs: [
      "Size: S-L",
      "Colour Shown: Black/Metallic Silver",
      "Style: FB5372-010",
      "Country/Region of Origin: Indonesia, Vietnam"
    ]
  },
  3: {
    title: "Nike Varsity Elite Basketball Shoe Bag (14L)",
    price: "Rp 509.000",
    description: "Keep your shoes separate and secure with this Varsity Elite bag. Additional pockets allow you to easily stash smaller essentials on the go.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/2f66d6c2-6d0b-43b1-ba57-5f6850733f9f/NK+VARSITY+ELITE+SHOEBAG.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/3a9f7302-6cd6-412c-a9b8-3e3719dbff6a/NK+VARSITY+ELITE+SHOEBAG.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/a60b8c38-e082-483e-8a0f-7f655e533bb4/NK+VARSITY+ELITE+SHOEBAG.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/7a17d51e-41b6-473f-83d9-b3d631fd7758/NK+VARSITY+ELITE+SHOEBAG.png",
      ""
    ],
    specs: [
      "Size: One Size",
      "Colour Shown: Black/Black/Metallic Silver",
      "Style: HM9970-010",
      "Country/Region of Origin: Indonesia"
    ]
  },
  4: {
    title: "Nike Football Shinguards",
    price: "Rp 199.000",
    description: "The Nike Football Shinguards feature a unique sock design with a built-in hard shell and foam padding for impact cushioning where you need it most. Extra foam on either side of your ankle creates a comfortable fit.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/e204a166-b005-4aeb-a53a-a81edf6d05f1/NK+SHIN+SOCK+SLV.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/8381bfac-01f9-4992-b5db-291c8307f1d2/NK+SHIN+SOCK+SLV.png",
      ""
    ],
    specs: [
      "Size: S-XL",
      "Colour Shown: Black/White",
      "Style: SP2168-010",
      "Country/Region of Origin: Cambodia"
    ]
  },
  5: {
    title: "Nike Skills Total 90 Football",
    price: "Rp 259.000",
    description: "Total 90 is back. Ideal for skills development, this smaller size ball pairs modern construction with early 2000s heritage graphics to optimise visibility.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/246cb198-b5b8-452d-8dac-47c947d908a0/NIKE+SKILLS+T90+FA25.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/55d5797f-4754-4918-97c0-609dbd25cb08/NIKE+SKILLS+T90+FA25.png",
      ""
    ],
    specs: [
      "Size: 1",
      "Colour Shown: White/Black/Red/Black",
      "Style: IH7533-100",
      "Country/Region of Origin: Vietnam"
    ]
  },
  6: {
    title: "Nike Match Goalkeeper Football Gloves",
    price: "Rp 389.000",
    description: "Fearlessly make every save with foam-padded palms to help absorb impact of the hardest shots. Its smooth surface helps you grip the ball better and your hands can stay cool thanks to mesh panels that help with airflow.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/54c2af32-22a8-4006-9954-2eb3fb32c1ad/NK+GK+MATCH+-+HO24.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/28a1f451-bdcd-459b-98a6-6f6839657e67/NK+GK+MATCH+-+HO24.png",
      ""
    ],
    specs: [
      "Size: 6-11",
      "Colour Shown: Bright Crimson/Black/Royal Tint",
      "Style: HQ0257-635",
      "Country/Region of Origin: China, Vietnam"
    ]
  },
  7: {
    title: "Nike x Stüssy Beanie",
    price: "Rp 299.000",
    description: "This soft, peached thermal beanie comes equipped with our sweat-wicking tech for smooth warmth and dry comfort. Reflective design Nike x Stüssy co-branding highlights the partnership.",
    images: [
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/ddca2079-4809-47ef-b2f9-203be990fb99/nike-x-st%C3%BCssy-apparel-collection-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/5fed8f61-aea7-4775-a3e8-c678b8fa925f/nike-x-st%C3%BCssy-apparel-collection-release-date.jpg",
      ""
    ],
    specs: [
      "Size: One Size",
      "Colour Shown: Black",
      "Style: HV9115-010",
      "Country/Region of Origin: China, Vietnam"
    ]
  },
  8: {
    title: "Nike Academy Team Football Duffel Bag (Large, 95L)",
    price: "Rp 599.000",
    description: "The Nike Academy Team Duffel Bag is a durable design built to keep you organised. Designated compartments provide space for your ball, boots and clothes—while multiple straps let you comfortably carry your gear when you're on the go.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/13aebdee-0b91-4f54-b513-4ebb53538eea/NK+ACDMY+TEAM+L+DUFF.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/d4886794-2f47-4f64-b6df-5ab1d59fe618/NK+ACDMY+TEAM+L+DUFF.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/39e19fa6-7b36-49f2-9c2d-ea9ba5e607be/NK+ACDMY+TEAM+L+DUFF.png",
      "",
      ""
    ],
    specs: [
      "Size: One Size",
      "Colour Shown: Black/Black/White",
      "Style: CU8089-010",
      "Country/Region of Origin: Vietnam"
    ]
  },
};

// Modal Functions
let currentProductId = null;
let currentImageIndex = 0;

function openProductModal(id) {
  currentProductId = id;
  const product = productData[id];
  if (!product) return;

  // Update Modal Content
  document.getElementById('productTitle').textContent = product.title;
  document.getElementById('productPrice').textContent = product.price;
  document.getElementById('productDescription').textContent = product.description;

  const specsList = document.querySelector('.specs');
  specsList.innerHTML = product.specs.map(spec => `<li>${spec}</li>`).join('');

  // Setup Carousel
  setupCarousel(product.images);

  // Show Modal
  document.getElementById('productModal').style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closeProductModal() {
  document.getElementById('productModal').style.display = 'none';
  document.body.style.overflow = 'auto';
  currentImageIndex = 0;
}

function setupCarousel(images) {
  const carousel = document.getElementById('carouselImages');
  const dotsContainer = document.getElementById('carouselDots');
  carousel.innerHTML = images.map(img => `<img src="${img}" alt="Product Image">`).join('');
  dotsContainer.innerHTML = images.map((_, index) => `<span class="dot" onclick="goToImage(${index})"></span>`).join('');

  // Set initial position
  showImage(currentImageIndex);

  // Event Listeners for Arrows
  document.querySelector('.prev').onclick = () => changeImage(-1);
  document.querySelector('.next').onclick = () => changeImage(1);
}

function showImage(index) {
  const images = document.querySelectorAll('#carouselImages img');
  const dots = document.querySelectorAll('.dot');
  images.forEach((img, i) => img.style.transform = `translateX(${(i - index) * 100}%)`);
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

function changeImage(direction) {
  const images = Object.keys(productData[currentProductId].images).length;
  currentImageIndex = (currentImageIndex + direction + images) % images;
  showImage(currentImageIndex);
}

function goToImage(index) {
  currentImageIndex = index;
  showImage(index);
}

// Close Modal Events
document.querySelector('.close').onclick = closeProductModal;
document.getElementById('productModal').onclick = (e) => {
  if (e.target.id === 'productModal') closeProductModal();
};
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProductModal();
});

// Buy Button (Demo: Alert atau redirect)
document.querySelector('.buy-btn').onclick = () => {
  alert('Redirect ke checkout untuk ' + productData[currentProductId]?.title);
  // Atau: window.location.href = '/checkout?id=' + currentProductId;
};

// Integrasi dengan Existing JS (Tambahkan di DOMContentLoaded)
document.addEventListener('DOMContentLoaded', function() {
  // Existing code for search, fade-in, etc.
  
  // Tambahan: Parallax untuk Hero
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.elegant-hero');
    if (hero) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
  });

  // Staggered Fade untuk Sections (Lebih Menarik)
  const sections = document.querySelectorAll('.fade-in');
  sections.forEach((section, index) => {
    section.style.transitionDelay = `${index * 0.2}s`;
  });
});

// Fungsi Navigasi Saling Berhubungan - Pindah Halaman + Smooth Scroll
function handleNavigation(e, link) {
  e.preventDefault(); // Prevent default link behavior
  const href = link.getAttribute('href');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  if (href.startsWith('#')) {
    // Same page scroll (e.g., #new di index.html)
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }
  
  if (href.includes('#')) {
    // Different page + scroll (e.g., men.html#shoes)
    const [page, hash] = href.split('#');
    const targetPage = page || currentPage;
    const targetId = hash ? `#${hash}` : '';
    
    // Show loading
    document.body.classList.add('loading');
    const spinner = document.querySelector('.navigation-spinner') || createNavigationSpinner();
    spinner.style.display = 'block';
    
    // Pindah halaman
    window.location.href = targetPage + targetId;
  } else {
    // Simple page change (e.g., men.html)
    document.body.classList.add('loading');
    const spinner = document.querySelector('.navigation-spinner') || createNavigationSpinner();
    spinner.style.display = 'block';
    
    window.location.href = href;
  }
}

// Helper: Create Navigation Spinner
function createNavigationSpinner() {
  let spinner = document.querySelector('.navigation-spinner');
  if (!spinner) {
    spinner = document.createElement('div');
    spinner.className = 'navigation-spinner';
    document.body.appendChild(spinner);
  }
  return spinner;
}

// Event Listeners untuk Semua Nav Links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a, .submenu a, .submenu-level-2 a, .footer-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => handleNavigation(e, link));
  });
  
  // Hide spinner on page load (untuk kasus refresh)
  const spinner = document.querySelector('.navigation-spinner');
  if (spinner) spinner.style.display = 'none';
  
     // Fungsi untuk Slider Drag
   const sliderContainer = document.querySelector('.slider-container');
   const slides = document.querySelector('.slides');
   let isDragging = false;
   let startPos = 0;
   let currentTranslate = 0;
   let prevTranslate = 0;
   let animationID;
   let currentIndex = 0; // Indeks slide saat ini

   // Fungsi untuk mendapatkan posisi
   function getPositionX(event) {
     return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
   }

   // Mulai drag
   function dragStart(event) {
     isDragging = true;
     startPos = getPositionX(event);
     animationID = requestAnimationFrame(animation);
     sliderContainer.classList.add('grabbing');
   }

   // Saat drag berlangsung
   function drag(event) {
     if (isDragging) {
       const currentPosition = getPositionX(event);
       currentTranslate = prevTranslate + currentPosition - startPos;
     }
   }

   // Akhiri drag
   function dragEnd() {
     isDragging = false;
     cancelAnimationFrame(animationID);
     sliderContainer.classList.remove('grabbing');

     // Hitung indeks baru berdasarkan pergeseran
     const movedBy = currentTranslate - prevTranslate;
     if (movedBy < -100 && currentIndex < slides.children.length - 1) currentIndex += 1; // Geser ke kanan (next)
     if (movedBy > 100 && currentIndex > 0) currentIndex -= 1; // Geser ke kiri (prev)

     setPositionByIndex();
   }

   // Animasi untuk smooth transition
   function animation() {
     setSliderPosition();
     if (isDragging) requestAnimationFrame(animation);
   }

   // Set posisi slider
   function setSliderPosition() {
     slides.style.transform = `translateX(${currentTranslate}px)`;
   }

   // Set posisi berdasarkan indeks
   function setPositionByIndex() {
     currentTranslate = currentIndex * -250; // Asumsi lebar gambar 250px + margin
     prevTranslate = currentTranslate;
     setSliderPosition();
   }

   // Event listeners
   sliderContainer.addEventListener('mousedown', dragStart);
   sliderContainer.addEventListener('touchstart', dragStart);
   sliderContainer.addEventListener('mousemove', drag);
   sliderContainer.addEventListener('touchmove', drag);
   sliderContainer.addEventListener('mouseup', dragEnd);
   sliderContainer.addEventListener('touchend', dragEnd);
   sliderContainer.addEventListener('mouseleave', dragEnd); // Jika mouse keluar saat drag

   // Integrasi dengan tombol prev/next (update currentIndex)
   document.querySelector('.prev').addEventListener('click', () => {
     if (currentIndex > 0) {
       currentIndex -= 1;
       setPositionByIndex();
     }
   });
   document.querySelector('.next').addEventListener('click', () => {
     if (currentIndex < slides.children.length - 1) {
       currentIndex += 1;
       setPositionByIndex();
     }
   });
   
  // Existing code (loadProductsByCategory, hamburger, modal, touch events, dll.) - sudah ada di script sebelumnya
});

// Kode slider yang sudah ada (contoh: navigasi, auto-slide, dll.)
// ... (salin kode slider asli Anda di sini)

// Tambahan: Event listener untuk tombol promo di slider
document.addEventListener("DOMContentLoaded", function() {
  const promoButtons = document.querySelectorAll('.promo-btn');
  promoButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const slideItem = this.closest('.slide-item');
      const originalPrice = slideItem.getAttribute('data-original-price');
      const discountPrice = slideItem.getAttribute('data-discount-price');
      const description = slideItem.getAttribute('data-description');
      const title = slideItem.querySelector('h3').textContent;
      
      // Simulasi aksi beli: Tambah ke keranjang dan redirect ke checkout
      alert(`Produk "${title}" ditambahkan ke keranjang!\nHarga Diskon: ${discountPrice}`);
      
      // Redirect ke halaman checkout (ganti dengan URL asli jika ada)
      window.location.href = '#';  // Placeholder: Buat halaman checkout jika belum ada
      
      // Alternatif: Jika ada sistem keranjang, panggil fungsi seperti addToCart(productId)
      // const productId = slideItem.getAttribute('data-product-id');
      // if (productId) addToCart(productId);
    });
  });
});

// Optional: Hide spinner on pageshow (untuk back/forward browser)
window.addEventListener('pageshow', () => {
  const spinner = document.querySelector('.navigation-spinner');
  if (spinner) spinner.style.display = 'none';
  document.body.classList.remove('loading');
});

// Update loadProductsByCategory untuk support sub-filter (e.g., 'apparel-tops')
function loadProductsByCategory(category = 'all', searchQuery = '', subFilter = '') {
  // ... existing filter code ...
  let products = Object.values(productData).filter(p => {
    let match = (category === 'all' || p.category === category);
    if (subFilter) {
      // Contoh: jika subFilter = 'tops', filter berdasarkan tag di productData
      match = match && p.tags && p.tags.includes(subFilter);
    }
    // ... search filter ...
    return match;
  });
  // ... rest of function ...
}

// Di handleNavigation, parse subFilter dari href (e.g., men.html#apparel-tops → subFilter = 'tops')
function handleNavigation(e, link) {
  // ... existing code ...
  if (href.includes('#')) {
    const [page, hash] = href.split('#');
    const targetPage = page || currentPage;
    const targetId = hash ? `#${hash}` : '';
    
    // Parse subFilter if needed (e.g., #apparel-tops)
    let subFilter = '';
    if (hash && hash.includes('-')) {
      subFilter = hash.split('-')[1]; // e.g., 'tops' from 'apparel-tops'
    }
    
    // Show loading and navigate
    document.body.classList.add('loading');
    const spinner = document.querySelector('.navigation-spinner') || createNavigationSpinner();
    spinner.style.display = 'block';
    
    // After navigate, load with subFilter (via URL params or sessionStorage)
    sessionStorage.setItem('subFilter', subFilter);
    window.location.href = targetPage + targetId;
  }
  // ... 
}

// Di loadProductsByCategory, check sessionStorage
const subFilter = sessionStorage.getItem('subFilter') || '';
loadProductsByCategory(currentCategory, '', subFilter);
sessionStorage.removeItem('subFilter'); // Clear after load