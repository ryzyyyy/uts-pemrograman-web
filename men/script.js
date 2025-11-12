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
    title: "Air Jordan 4 Retro 'Rare Air'",
    price: "Rp 3.329.000",
    description: "Step into a classic. This AJ4 throws it back with nubuck leather and suede. Iconic design elements from the original, like floating eyestays and mesh-inspired accents, feel just as fresh as they did in '89.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/703a9488-068b-4bff-bcd7-60d9b9fb0e9f/AIR+JORDAN+4+RETRO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4e0be7bf-0728-42b2-8385-cb8ca54a01d9/AIR+JORDAN+4+RETRO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/07f8cd37-abae-467c-a097-e7938e99a023/AIR+JORDAN+4+RETRO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e711920b-820b-4aed-992c-dc1c82a73a0e/AIR+JORDAN+4+RETRO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/07f8cd37-abae-467c-a097-e7938e99a023/AIR+JORDAN+4+RETRO.png"
    ],
    specs: [
      "Size: 40-48.5",
      "Colour Shown: Black/Deep Royal Blue/Dark Smoke Grey/Fire Red",
      "Style: FV5029-003",
      "Country/Region of Origin: China"
    ]
  },
  2: {
    title: "Air Jordan 5 Retro",
    price: "Rp 3.269.000",
    description: "The AJ5 is a win however you look at it. A mash-up of leather and textiles keeps this pair looking crisp. We kept the Nike Air cushioning, iconic lace lock and shark-tooth midsole shapes from the original. Are you ready to step into a legend?",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b9ebd29f-db15-4ec4-95c2-2759047befdb/AIR+JORDAN+5+RETRO+OG.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8d150935-beb1-4443-9345-531d0df77bfc/AIR+JORDAN+5+RETRO+OG.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/473d958a-8795-443e-a85c-f3512a8d44b2/AIR+JORDAN+5+RETRO+OG.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a03e0aba-6046-4cbd-8495-0a720ff4639e/AIR+JORDAN+5+RETRO+OG.png",
      ""
    ],
    specs: [
      "Size: 38-48.5",
      "Colour Shown: White/Black/Fire Red",
      "Style: HQ7978-101",
      "Country/Region of Origin: China"
    ]
  },
  3: {
    title: "Air Jordan MVP 92",
    price: "Rp 2.249.000",
    description: "How do you top the AJ7? You reimagine it with a low-top silhouette. We started with the layered upper and iconic midsole that turned the original into an instant classic. Then we added textile accents and a padded, low-cut collar to give you a fresh, modern look.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/35fe070d-71fd-4ce2-8244-cd1a165f5619/JORDAN+MVP+92.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4053a4be-6d0f-479d-9175-cba1a62bcd95/JORDAN+MVP+92.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e600bdb2-e5b4-4d05-ac8b-426eaab9d081/JORDAN+MVP+92.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ba059f7f-4ea3-4150-8f7b-c37686d674bf/JORDAN+MVP+92.png",
      ""
    ],
    specs: [
      "Size: 38-48.5",
      "Colour Shown: Black/Anthracite/Gym Red",
      "Style: HQ3950-006",
      "Country/Region of Origin: China"
    ]
  },
  4: {
    title: "Luka .77 PF 'Gone Camping'",
    price: "Rp 1.549.000",
    description: "When Luka's not on the court, there's a good chance he's gone camping. This Luka .77 celebrates that pastime with a rugged design that helps you take your game outdoors. High abrasion mesh and a full-length rubber outsole stand up to concrete and asphalt, giving you a shoe that can handle any court.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ad4782c5-823f-42f8-9d69-9c79d534fd97/JORDAN+LUKA+.77+PF.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0660db16-7cab-4963-b5b3-bb1f9e878c0f/JORDAN+LUKA+.77+PF.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9979965c-9b08-4e66-b63e-b8c51738468b/JORDAN+LUKA+.77+PF.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/63e7f41c-2eed-4e01-9e4d-f195cd7bde61/JORDAN+LUKA+.77+PF.png",
      ""
    ],
    specs: [
      "Size: 40-48.5",
      "Colour Shown: Light Silver/Black/Coconut Milk/Hyper Crimson",
      "Style: HF0819-003",
      "Country/Region of Origin: Vietnam"
    ]
  },
  5: {
    title: "Air Jordan 1 Low Travis Scott x Fragment",
    price: "Rp 32.249.000",
    description: "It's the rare sneaker that satisfies the 'rule of three'—sometimes, having three minds is greater than one. In the case of Jordan Brand, Travis Scott and Hiroshi Fujiwara's Fragment Design, it was a case of three masterminds coming together to collaborate on not just any Air Jordan, but the beloved Air Jordan 1—a model both the Houston rapper and the Japanese designer have tapped for past Jordan Brand link-ups. Their Air Jordan 1 Low colourway comes in familiar colour blocking schemes, but with special touches only Scott and Fujiwara could've conjured up. On top of an aged midsole with matching Sail laces, fresh Military Blue accents the heel, collar and insole, providing a new flavour for a classic make-up. And no need for double-takes at the Sail Swoosh—it's indeed backwards—now a signature Scott touch for his Air Jordan 1 designs. But if anyone on the street rubbernecks while you're rocking this collab, they'll know who's responsible: Cactus Jack and Fragment Design logos are embossed on the left and right heels, respectively, leaving their modern marks on this time-tested silhouette.",
    images: [
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/2b2ba3c5-44aa-4071-a85c-72fb84a29d36/air-jordan-1-low-travis-scott-x-fragment-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/c93e8b7a-81f6-4bb4-a1a6-734240341ca3/air-jordan-1-low-travis-scott-x-fragment-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/6da12027-0a9a-4d1d-869a-2feebfc0bd83/air-jordan-1-low-travis-scott-x-fragment-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/c93e8b7a-81f6-4bb4-a1a6-734240341ca3/air-jordan-1-low-travis-scott-x-fragment-release-date.jpg",
      "",
      ""
    ],
    specs: [
      "Size: 40-48.5",
      "Colour Shown: Blue/White/Black",
      "Style: DM7866-140",
      "Country/Region of Origin: China"
    ]
  },
  6: {
    title: "Air Jordan 1 Low x Travis Scott Reverse Olive",
    price: "Rp 32.249.000",
    description: "Flipping the script once again, Travis Scott returns to leave another lasting imprint on the AJ1 Low. Primed for the season, this balanced edition mixes premium leather with a warm, neutral palette. The Sail overlays wrap the Medium Olive upper for a smooth, earthy finish. Scott's signature backwards Swoosh logos are paired with stitched University Red details, creating another timeless icon.",
    images: [
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/84d5c9bc-6dd2-49c7-ae36-dd4251cd0c60/air-jordan-1-low-x-travis-scott-reverse-olive-dm7866-200-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/dfa4f91e-8a7e-45e5-959c-04dd0110234e/air-jordan-1-low-x-travis-scott-reverse-olive-dm7866-200-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/9bcbf68a-70ba-4b17-bf62-fc7d3b6c8cd8/air-jordan-1-low-x-travis-scott-reverse-olive-dm7866-200-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/760492cd-af99-4090-906f-ee4b8681d7bc/air-jordan-1-low-x-travis-scott-reverse-olive-dm7866-200-release-date.jpg",
      ""
    ],
    specs: [
      "Size: 40-48.5",
      "Colour Shown: Olive/White/Black",
      "Style: DM7866-200",
      "Country/Region of Origin: China"
    ]
  },
  7: {
    title: "ir Force 1 Mid x Off-White ™️White",
    price: "Rp 3.799.000",
    description: "Virgil Abloh's legacy continues with the Air Force 1 Mid. Celebrating 40 years of AF-1, he re-imagined the legendary silhouette through the futurist lens. Lightweight, airy mesh with woodgrain pattern brings an utilitarian edge, while the spiked outsole connects directly to the ISPA philosophy of 'Improvise. Scavenge. Protect. Adapt'. And as always, Virgil left room for others to be creative—the design pairs traditional laces with a secondary set that loops through Flywire cables. The result: a modernised and experimental reflection on history's most revered shoe.",
    images: [
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/ce1bd32f-e53b-449c-80bd-96c033f94983/air-force-1-mid-x-off-white-%E2%84%A2%EF%B8%8F-white-do6290-100-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/15473c7b-f761-4a95-a68f-5e978bdda07a/air-force-1-mid-x-off-white-%E2%84%A2%EF%B8%8F-white-do6290-100-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/7068f417-b0dd-435f-99db-253d8385d83d/air-force-1-mid-x-off-white-%E2%84%A2%EF%B8%8F-white-do6290-100-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/3e8cae13-ba6c-40d6-86b2-572ef1f15789/air-force-1-mid-x-off-white-%E2%84%A2%EF%B8%8F-white-do6290-100-release-date.jpg",
      ""
    ],
    specs: [
      "Size: 38-48.5",
      "Colour Shown: Grey/White/Orange/Blue",
      "Style: DO6290-100",
      "Country/Region of Origin: China"
    ]
  },
  8: {
    title: "LDWaffle x sacai x Fragment Light Smoke Grey",
    price: "Rp 8.349.000",
    description: "Chitose Abe of sacai and Hiroshi Fujiwara of Fragment have collaborated several times, both with each other and Nike in the past—and for this effort, they revisit the LDWaffle, a fusion of two iconic silhouettes, the Waffle Daybreak and LDV. This edition mixes signature features from both brands, such as double tongues, shoelaces and Swooshes blending with logo hits from all three outfits. For the upper, Fujiwara chose a specific shade of grey—Light Smoke Grey in this case—in mesh and premium suede to create a look that's equal parts bold and understated. With such masterful precision in design and intent, this stylistic mash-up is a modern classic.",
    images: [
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/dc7919e3-86ee-495e-899c-b99ab6f2a232/ldwaffle-x-sacai-x-fragment-light-smoke-grey-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/49686299-76d4-4da9-b358-8f9e16e56e42/ldwaffle-x-sacai-x-fragment-light-smoke-grey-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/ad168ef3-4448-4888-9fd7-9b8c6a70ea3e/ldwaffle-x-sacai-x-fragment-light-smoke-grey-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/d61c347c-f0ed-4ee2-920f-d61ba7c66acb/ldwaffle-x-sacai-x-fragment-light-smoke-grey-release-date.jpg",
      ""
    ],
    specs: [
      "Size: 40-48.5",
      "Colour Shown: White/Smoke Grey",
      "Style: DH2684-001",
      "Country/Region of Origin: China"
    ]
  },
  9: {
    title: "Nike Air Force 1 GORE-TEX ®",
    price: "Rp. 2.489.000",
    description: "The Nike Air Force 1 GORE-TEX ® retools the classic Air Force 1 with a street-approved design that meets the standards of GORE-TEX ® waterproof technology.It features water-wicking flat laces, a GORE-TEX ® bootie and GORE-TEX ® branding on the heel.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/fda50e93-7c0a-40d8-80b2-645c1f86a76e/AIR+FORCE+1+GTX.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/9fe93531-58a6-43f1-bae2-431ecb30591d/AIR+FORCE+1+GTX.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/6bcdc3d7-b5cf-4dfe-acea-93088aa86ea3/AIR+FORCE+1+GTX.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/f3667419-4ae9-4ee9-9810-f10a1a535bda/AIR+FORCE+1+GTX.png",
      ""
    ],
    specs:[
      "Size: 38.5-47.5",
      "Colour Shown: Phantom/Light Silver/Light Bone/Black",
      "Style: CK2630-004",
      "Country/Region of Origin: Vietnam"
    ]
  },
  10: {
    title: "Air Jordan 1 Low SE",
    price: "Rp. 1.939.000",
    description: "Inspired by the original that debuted in 1985, the Air Jordan 1 Low offers a clean, classic look that's familiar yet always fresh. With an iconic design that pairs perfectly with any 'fit, these kicks ensure you'll always be on point.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/75bccf5e-9013-486c-9696-e0082a5b3205/AIR+JORDAN+1+LOW+SE.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2e70b411-ee50-4667-9fd8-7b926116c3ae/AIR+JORDAN+1+LOW+SE.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/aa208695-eedf-4ca7-9447-a9b6c51be1b6/AIR+JORDAN+1+LOW+SE.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b82514bf-08e9-438d-9c87-f46b126715e4/AIR+JORDAN+1+LOW+SE.png",
      ""

    ],
    specs:[
      "Size: 40-47.5",
      "Colour Shown: Black/Anthracite/Tour Yellow",
      "Style: IM6568-010",
      "Country/Region of Origin: Indonesia"
    ]
  },
  11: {
    title: "Nike Gato LV8",
    price: "Rp. 1.729.000",
    description: "This beloved indoor football shoe is now primed and ready for the streets. This edition mixes breezy textiles with metallic overlays for an elevated look that's easy to style.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/1d366e5b-7cff-4c1e-8708-af2c68c6fd82/NIKE+GATO+LV8.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/7399870c-f66b-42a6-8d8d-294e889791e4/NIKE+GATO+LV8.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/188541e5-de83-4f72-8b26-105d0f7d1868/NIKE+GATO+LV8.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/537778de-b77d-4719-9988-52e2c0f57dc0/NIKE+GATO+LV8.png",
      ""
    ],
    specs:[
      "Size: 38.5-48.5",
      "Colour Shown: Metallic Silver/White/Gum Light Brown/Metallic Silver",
      "Style: IB3566-001",
      "Country/Region of Origin: Indonesia, Vietnam"
    ]
  },
  12: {
    title: "Nike Infinity Tour 2",
    price: "Rp. 2.669.000",
    description: "The Infinity Tour 2 ups the ante from the previous iteration with more spikes, updated foam and a flattened Air Zoom unit. It's all in the name of swaggering strolls towards the pin as you point to where your ball just landed. With plenty of bounce and comfort, it's game for wherever your next round takes you.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/07a876c1-b7c3-4c1c-aee4-3a952eeec7fb/AIR+ZOOM+INFINITY+TR+NEXT%25+2.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/b9e2769d-b58d-4761-8e7c-b66040d873c2/AIR+ZOOM+INFINITY+TR+NEXT%25+2.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/2468ca6b-f749-4edd-b6ef-c57a323ef9cb/AIR+ZOOM+INFINITY+TR+NEXT%25+2.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/3d4e5a3c-7563-48da-95af-090d399ce484/AIR+ZOOM+INFINITY+TR+NEXT%25+2.png",
      ""
    ],
    specs:[
      "Size: 37.5-48.5",
      "Colour Shown: Black/Blue Hero/Cool Grey/White",
      "Style: FD0217-004",
      "Country/Region of Origin: Vietnam"
    ]
  },
  13: {
    title: "Nike Field General",
    price: "Rp. 1.729.000",
    description: "The Field General returns from its gritty American football roots to shake up the sneaker scene. It pairs smooth leather and soft suede with a snakeskin Swoosh logo for a modern take on that vintage gridiron look.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/b3bfb80a-7598-409c-9dda-9e176f64952c/NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/dca7e6a0-15ed-47b4-b3c8-737dfbadf635/NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/2667e045-27e5-4ba7-b6eb-98177717e968/NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/6250d8a4-965f-4a6e-b9c9-58fce995b6e9/NIKE+FIELD+GENERAL.png",
      ""
    ],
    specs:[
      "Size: 38.5-47.5",
      "Colour Shown: Light Bone/Sail/Black/Multi-Colour",
      "Style: IF0667-002",
      "Country/Region of Origin: Vietnam"
    ]
  },
  14: {
    title: "Jordan Spizike Low",
    price: "Rp. 2.489.000",
    description: "The Spizike takes elements of five classic Jordans, combines them and gives you one iconic sneaker. It's an homage to Spike Lee formally introducing Hollywood and hoops in a culture moment. You get a great-looking pair of kicks with some history. What more can you ask for? Ya dig?",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/be7e610a-909a-4f66-8dc6-5d9cccbe8109/JORDAN+SPIZIKE+LOW.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/dd54eec7-4277-44bf-a725-4444bb35deb1/JORDAN+SPIZIKE+LOW.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f242d733-4270-4966-9207-8ae1a4a9f94b/JORDAN+SPIZIKE+LOW.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2c8a4202-deb0-4985-bbc9-f37bde38d765/JORDAN+SPIZIKE+LOW.png",
      ""
    ],
    specs:[
      "Size: 40-47.5",
      "Colour Shown: Black/Gamma Blue/Wolf Grey",
      "Style: FQ1759-005",
      "Country/Region of Origin: Vietnam"
    ]
  },
  15: {
    title: "Air Jordan 1 Low OG Chicago",
    price: "Rp. 2.199.000",
    description: "Since his game-winning shot that brought championship glory to North Carolina, Michael Jordan has been at the forefront of basketball consciousness. He took to the court in 1985 wearing the original Air Jordan I, simultaneously breaking league rules and his opponents' will, while capturing the imaginations of fans worldwide.",
    images: [
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/6be37b66-9fb2-45bd-ae3f-6b141186cc36/air-jordan-1-low-og-chicago-hq6998-600-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/a0f2127c-3df3-4640-999f-e1223385971c/air-jordan-1-low-og-chicago-hq6998-600-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/4f808e33-d3e3-413a-9424-566bbf7bce77/air-jordan-1-low-og-chicago-hq6998-600-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/ceef39e8-4921-44f7-9471-bf960028a872/air-jordan-1-low-og-chicago-hq6998-600-release-date.jpg",
      ""
    ],
    specs:[
      "Size: 37.5-47.5",
      "Colour Shown: Red/White/Black",
      "Style: HQ6998-600",
      "Country/Region of Origin: China"
    ]
  },
  16: {
    title: "Nike Terra Manta",
    price: "Rp. 1.299.000",
    description: "The Terra Manta delivers a fresh take on the low-profile look while preserving the retro style we love. Its textile and leather upper pays homage to the classics that came before it, and the outsole features a high-traction design that is both durable and flexible.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/a78feeca-f88f-417e-8080-5566fb67d032/W+NIKE+TERRA+MANTA.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/f4a42bf5-979b-4946-a325-f81a2f017022/W+NIKE+TERRA+MANTA.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/48f828b5-f2d2-4b8c-9491-40fdbbcc9e18/W+NIKE+TERRA+MANTA.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/e283a4ad-ac6d-45f7-925e-4245dcd1b416/W+NIKE+TERRA+MANTA.png",
      ""
    ],
    specs:[
      "Size: 35-44.5",
      "Colour Shown: Diffused Blue/Gum Light Brown/Sail",
      "Style: HQ1940-400",
      "Country/Region of Origin: Indonesia, Vietnam"
    ]
  },
  17: {
    title: "Nike LD-1000",
    price: "Rp. 1.549.000",
    description: "Originally released in 1977, the LD-1000's innovative, dramatically flared heel was created to support long-distance runners. A fan favourite, now you can get your hands on one of Nike's most famous innovations too.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/f09e0aa5-1a5e-4bc1-965f-502f1371c3e1/LD-1000.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/53f163df-2529-4b19-a499-6109b806a9dd/LD-1000.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/d60c653b-83ee-46d2-a718-302951fae2f2/LD-1000.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/f72855ec-a64c-4193-8258-18cabe1a9961/LD-1000.png",
      ""
    ],
    specs:[
      "Size: 37.5-47.5",
      "Colour Shown: Dusty Amethyst/Purple Dawn/Coconut Milk/Light Lemon Twist",
      "Style: IB8121-527",
      "Country/Region of Origin: Vietnam"
    ]
  },
  18: {
    title: "Nike Cortez Textile",
    price: "Rp. 1.549.000",
    description: "The revamped Cortez maintains the retro appeal you know and love with a wider toe area and firmer side panels, so you can comfortably wear them all day without any warping. This version is crafted with a washed, black denim for a casual look.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/f4ae7b8f-c07d-4187-a979-e30f955ef7bd/W+NIKE+CORTEZ+TXT.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/ce402fc7-8651-4844-9904-cb9fbbb2c364/W+NIKE+CORTEZ+TXT.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/771b81d3-765b-4606-bcf2-0941c804f97a/W+NIKE+CORTEZ+TXT.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/a36b54dd-95b9-4427-a97e-ba1ad77314bc/W+NIKE+CORTEZ+TXT.png",
      ""
    ],
    specs:[
      "Size: 35-42",
      "Colour Shown: Black/Sail/Gum Light Brown/Black",
      "Style: IM8052-010",
      "Country/Region of Origin: Indonesia"
    ]
  },
  19: {
    title: "Nike Air Force 1 Low Retro",
    price: "Rp. 2.099.000",
    description: "Comfortable, durable and timeless—it's number 1 for a reason. The classic '80s construction pairs with bold details for style that tracks whether you're on court or on the go.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/044a4efa-1e7e-411f-ab76-40148af5ff52/AIR+FORCE+1+LOW+RETRO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/d65affb8-2803-4371-84e2-0716a2cc86a4/AIR+FORCE+1+LOW+RETRO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/8e179f1e-eaed-4480-87e8-1755ea88adfd/AIR+FORCE+1+LOW+RETRO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/955cbb77-be49-4138-a41a-ef6c276c87ae/AIR+FORCE+1+LOW+RETRO.png",
      ""
    ],
    specs:[
      "Size: 38.5-48.5",
      "Colour Shown: White/Gum Medium Brown/Summit White/Black",
      "Style: HQ1967-100",
      "Country/Region of Origin: Vietnam"
    ]
  },
  20: {
    title: "Nike Air Max Dn Roam",
    price: "Rp. 2.849.000",
    description: "Hit the streets with confidence in this weatherised rendition of the Air Max Dn. While maintaining its Dynamic Air unit cushioning system, we added a waterproof zip-up shroud and Nike Storm Tread for reliable coverage and traction.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/a5e92f74-2f58-4d1f-838d-e0d683259c51/AIR+MAX+DN+ROAM.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/31268580-f177-4746-b15d-f70c74cfd0bc/AIR+MAX+DN+ROAM.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/a286aaba-247e-4a10-8fb3-dd16e5c7b12c/AIR+MAX+DN+ROAM.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/72569484-f7ad-4d01-92e0-b7d7e84686ed/AIR+MAX+DN+ROAM.png",
      ""
    ],
    specs:[
      "Size: 38.5-47.5",
      "Colour Shown: Black/Black/Black/Metallic Silver",
      "Style: HQ8605-001",
      "Country/Region of Origin: Vietnam"
    ]
  },
  21: {
    title: "Air Jordan 1 Retro High OG 'Shattered Backboard'",
    price: "Rp. 2.849.000",
    description: "The Air Jordan 1 Retro High remakes the classic sneaker, giving you a fresh look with a familiar feel. Premium materials with new colours and textures give modern expression to an all-time favourite.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e0ec726e-db64-40f1-a6d3-ec9c9b2b7e64/AIR+JORDAN+1+RETRO+HIGH+OG.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/3427ae48-beb6-4661-8002-3cef3309c7e5/AIR+JORDAN+1+RETRO+HIGH+OG.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8c4b6996-8376-4911-8e04-5b42d462e73e/AIR+JORDAN+1+RETRO+HIGH+OG.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8f7673e1-6ad6-4506-8f95-a0e2369d638d/AIR+JORDAN+1+RETRO+HIGH+OG.png",
      ""
    ],
    specs: [
      "Size: 38-48.5",
      "Colour Shown: Black/Sail/Starfish/Black",
      "Style: DZ5485-008",
      "Country/Region of Origin: China"
    ]
  },
  22: {
    title: "Air Jordan 1 Low G",
    price: "Rp. 2.149.000",
    description: "Feel unbeatable, from the tee box to the final putt. Inspired by one of the most iconic sneakers of all time, the Air Jordan 1 G is an instant classic on the course. With Air cushioning underfoot, a Wings logo on the heel and an integrated traction pattern to help you power through your swing, it delivers all the clubhouse cool of the original AJ1—plus everything you need to play 18 holes in comfort.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/29588563-bfe4-4a68-a913-b86a6c221c23/AIR+JORDAN+1+LOW+G.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/bb8972d4-c8db-41e9-b8ad-eb3133d40ee3/AIR+JORDAN+1+LOW+G.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e94a9fef-ca56-4c55-a2c6-401c5b9281e0/AIR+JORDAN+1+LOW+G.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/fb4cf483-6047-4b12-bee6-3f96a6fdc1ec/AIR+JORDAN+1+LOW+G.png",
      ""
    ],
    specs: [
      "Size: 36-49.5",
      "Colour Shown: Black/Sail/Medium Grey",
      "Style: DD9315-001",
      "Country/Region of Origin: China"
    ]
  },
  23: {
    title: "Nike Dunk Retro Panda",
    price: "Rp. 1.549.000",
    description: "Created for the hardwood but taken to the streets, the Nike Dunk Low Retro returns with crisp overlays and original team colours. This basketball icon channels '80s vibes with premium leather in the upper that looks good and breaks in even better. Modern footwear technology helps bring the comfort into the 21st century.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/b8083f2f-0933-4c11-9438-5497d751ce62/NIKE+DUNK+LOW+RETRO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/ebd299fe-f5b4-45c6-9bf5-88bce1dc9878/NIKE+DUNK+LOW+RETRO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/2c25c676-832d-453f-9cd9-dd6b492d7636/NIKE+DUNK+LOW+RETRO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/b64e38ae-4c2b-446d-9378-d100a190f847/NIKE+DUNK+LOW+RETRO.png",
      ""
    ],
    specs: [
      "Size: 38.5-49.5",
      "Colour Shown: White/White/Black",
      "Style: DD1391-100",
      "Country/Region of Origin: China, Indonesia, Vietnam"
    ]
  },
  24: {
    title: "Nike SB Dunk Low Pro",
    price: "Rp. 1.729.000",
    description: "You can always count on a classic. The Dunk Low pairs iconic color blocking with premium materials and plush padding for game-changing comfort that lasts. The possibilities are endless—how will you wear your Dunks?",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/931fa19d-c627-4dfe-947b-ac6a67279521/NIKE+SB+DUNK+LOW+PRO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/9077af13-b8c9-4fa2-9b8c-89a6abd207f1/NIKE+SB+DUNK+LOW+PRO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/72b990f3-fe95-456e-ab82-becbca426d7d/NIKE+SB+DUNK+LOW+PRO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/4a2404b2-62c2-4ac0-9665-ea62d255d179/NIKE+SB+DUNK+LOW+PRO.png",
      ""
    ],
    specs: [
      "Size: 40-47.5",
      "Colour Shown: Red Stardust/Monarch/Coconut Milk/Neutral Olive",
      "Style: HJ4135-600",
      "Country/Region of Origin: Vietnam"
    ]
  },
  25: {
    title: "Nike Dunk Low Retro SE",
    price: "Rp. 1.909.000",
    description: "40 years strong, and a classic since day one. We're celebrating the Dunk's birthday with limited-edition colour-blocking and finishes, a removable panda tag and plush padding that brings game-changing comfort. Don't forget your party favours—each box comes with a tear-out envelope and Panda stickers to keep the celebration going.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/54983de1-57d6-4247-885d-fe4101862c70/NIKE+DUNK+LOW+RETRO+SE.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/9e69e3ef-78e1-4867-b454-b4f713ff59b3/NIKE+DUNK+LOW+RETRO+SE.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/d027d995-792d-41e6-8d7f-62a71f78d503/NIKE+DUNK+LOW+RETRO+SE.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/9260eaf5-51e5-4000-b402-749541147caf/NIKE+DUNK+LOW+RETRO+SE.png",
      ""
    ],
    specs: [
      "Size: 38.5-48.5",
      "Colour Shown: White/Black/Black",
      "Style: IB2990-100",
      "Country/Region of Origin: Vietnam"
    ]
  },
  26: {
    title: "Nike Dunk Low Retro Premium",
    price: "Rp. 1.909.000",
    description: "You can always count on a classic. The Dunk Low pairs iconic colour-blocking with premium materials and plush padding for game-changing comfort that lasts. The possibilities are endless—how will you wear your Dunks?",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/4a60c256-9d7e-4a8a-92c2-94204060c748/NIKE+DUNK+LOW+RETRO+PRM.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/7fcaba7a-9b51-4883-baff-bbe4e56d2c91/NIKE+DUNK+LOW+RETRO+PRM.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/c59a894e-e2c4-4630-bfc4-6400b8daf07b/NIKE+DUNK+LOW+RETRO+PRM.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/c4398a94-ded8-4e85-a09c-ffffc6d38132/NIKE+DUNK+LOW+RETRO+PRM.png",
      ""
    ],
    specs: [
      "Size: 38.5-48.5",
      "Colour Shown: Ironstone/Velvet Brown/Velvet Brown",
      "Style: HQ1979-001",
      "Country/Region of Origin: Vietnam"
    ],
  },
  27: {
    title: "Nike Vaporfly 4 'Eliud Kipchoge'",
    price: "Rp. 3.989.000",
    description: "The Vaporfly 4 'Eliud Kipchoge' is a lean, mean, mile-eating machine. We trimmed weight in the midsole, outsole and upper from the Vaporfly 3, without sacrificing performance. The result is a lighter, more propulsive all-round racing shoe that's trusted from the mile to the marathon.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/a13cc3d6-32fe-45c6-ad24-53083a93cb8e/ZOOMX+VAPORFLY+NEXT%25+4+EK.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/e44f0349-65b5-4425-badc-45ac7a6f2988/ZOOMX+VAPORFLY+NEXT%25+4+EK.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/10746727-75ff-4ab5-bf1f-1855c3cc8b00/ZOOMX+VAPORFLY+NEXT%25+4+EK.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/f242ce84-baf5-4dda-bc7b-3cdceb4ff298/ZOOMX+VAPORFLY+NEXT%25+4+EK.png",
      ""
    ],
    specs: [
      "Size: 38.5-47",
      "Colour Shown: Silt Red/Fire Pink/Bright Ceramic/Green Shock",
      "Style: IH0869-605",
      "Country/Region of Origin: China"
    ],
  },
  28: {
    title: "Nike Cortez Leather",
    price: "Rp. 1.299.000",
    description: "You spoke. We listened. Based on your feedback, we've revamped the original Cortez while maintaining the retro appeal you know and love. This version has a wider toe area and firmer side panels, so you can comfortably wear them day in and day out without any warping. Cortez fans—this one's for you.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/3203e4cd-a273-4d0f-930f-cf9c68506e68/NIKE+CORTEZ.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/acfa76de-6ab5-411a-a9fd-801a9515ab47/NIKE+CORTEZ.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/4cd8c8b2-8346-4ecf-b162-91cc7b61d486/NIKE+CORTEZ.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/ebdf393b-5c86-4dea-8a0f-b6b7d2da0b9d/NIKE+CORTEZ.png",
      ""
    ],
    specs: [
      "Size: 38.5-47.5",
      "Colour Shown: Black/White",
      "Style: DM4044-105",
      "Country/Region of Origin: Indonesia"
    ],
  },
  29: {
    title: "Nike Shox TL",
    price: "Rp. 2.669.000",
    description: "The Nike Shox TL takes mechanical cushioning to the next level. A recrafted version of the 2003 icon, it features breathable mesh in the upper, with full-length Nike Shox technology for optimal impact absorption and a bold look on the streets.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/f77a5000-f789-47c0-a988-5b11c31b2b7b/NIKE+SHOX+TL.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/eda73699-9d00-4e17-8f21-a9cd726fb69d/NIKE+SHOX+TL.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/df9601c0-d467-4c08-8f7f-004baed08d24/NIKE+SHOX+TL.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/96538439-a083-48ea-9c29-abdd70e6b6f7/NIKE+SHOX+TL.png",
      ""
    ],
    specs: [
      "Size: 38.5-47.5",
      "Colour Shown:  Black/Metallic Silver/Light Lemon Twist/Court Blue",
      "Style: IH1338-002",
      "Country/Region of Origin: Vietnam"
    ],
  },
  30: {
    title: "Nike V5 RNR",
    price: "Rp. 1.399.000",
    description: "Tackle the every day in a shoe that matches comfort with style. Staying true to its Y2K roots, the V5 RNR has a foam midsole that's chunky yet lightweight. Plus, metallic details and a 3D Swoosh logo elevate this retro runner.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/2d61fcd9-cbd2-4468-ad3f-ea464d57de73/NIKE+V5+RNR.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/e527529b-ee05-4ff5-a192-5ccfc65f204e/NIKE+V5+RNR.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/be20259f-a92d-44b7-b022-5d4379197438/NIKE+V5+RNR.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/d844c414-4be6-4c17-b317-380d5111c1c0/NIKE+V5+RNR.png",
      ""
    ],
    specs: [
      "Size: 38.5-48.5",
      "Colour Shown: Black/Anthracite/Lime Blast/Black",
      "Style: HJ5228-005",
      "Country/Region of Origin: Indonesia"
    ],
  },
  31: {
    title: "Nike Metcon 10",
    price: "Rp. 2.379.000",
    description: "Power your cross-training potential with the Metcon 10. It optimises stability for your heavier lifts with an ultra-strong Hyperlift plate and levels up mobility with responsive ReactX foam. With increased energy return and a lighter weight than the Metcon 9, it helps you conquer any movement your workout demands.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/d5392fe6-e83d-4950-81bc-260b68a665bf/M+NIKE+METCON+10.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/1fea2c8b-350e-4465-a28f-881e1d89c7dd/M+NIKE+METCON+10.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/fc48077b-089b-4496-be2c-4c3c1f0bccf1/M+NIKE+METCON+10.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/48ef05ca-3675-421a-bc48-c9104371a724/M+NIKE+METCON+10.png",
      ""
    ],
    specs: [
      "Size: 38.5-47.5",
      "Colour Shown: Black/Anthracite/White",
      "Style: HJ1875-002",
      "Country/Region of Origin: Vietnam"
    ],
  },
  32: {
    title: "Nike Metcon 10 AMP",
    price: "Rp 2.489.000",
    description: "Power your cross-training potential with the Metcon 10. It optimises stability for your heavier lifts with an ultra-strong Hyperlift plate and levels up mobility with responsive ReactX foam. With increased energy return and a lighter weight than the Metcon 9, it helps you conquer any movement your workout demands.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/5df024e4-c98b-45c8-8e89-e7d670a834c6/M+NIKE+METCON+10+AMP.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/5df024e4-c98b-45c8-8e89-e7d670a834c6/M+NIKE+METCON+10+AMP.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/8ff1e263-0d6b-4230-9430-2f40efe101da/M+NIKE+METCON+10+AMP.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/881d8a6a-187c-4ac6-a0e3-f5914358d141/M+NIKE+METCON+10+AMP.png",
      ""
    ],
    specs: [
      "Size: 38.5-47.5",
      "Colour Shown: Light Bone/Cave Stone/Racer Blue",
      "Style: HQ2615-001",
      "Country/Region of Origin: Vietnam"
    ],
  }
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
      alert(`Produk "${title}" ditambahkan ke favorit!`);
      
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

