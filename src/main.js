// Main JavaScript file for the Feeling Promo website

// --- CURSOR PERSONALIZADO ---
document.addEventListener("DOMContentLoaded", () => {
  
  // Links and buttons cursor effect
  const links = document.querySelectorAll("a, button, .menu-toggle, .filter-btn")

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorFollower.style.borderColor = "rgba(255, 62, 62, 0.6)"
    })

    link.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.borderColor = "rgba(255, 62, 62, 1)"
    })
  })

  // --- MENÚ MÓVIL MEJORADO ---
  const menuToggle = document.querySelector(".menu-toggle")
  const navPrimary = document.querySelector(".nav--primary")
  const navSocial = document.querySelector(".nav--social")
  const navOverlay = document.querySelector(".nav-overlay")
  const body = document.body

  if (menuToggle && navPrimary && navOverlay) {
    menuToggle.addEventListener("click", () => {
      const isActive = menuToggle.classList.contains("active")
      
      menuToggle.classList.toggle("active")
      navPrimary.classList.toggle("active")
      // La navegación social se muestra automáticamente cuando la principal está activa
      if (navSocial) {
        navSocial.classList.toggle("active")
      }
      navOverlay.classList.toggle("active")
      body.classList.toggle("menu-open")
      
      // Actualizar aria-expanded para accesibilidad
      menuToggle.setAttribute("aria-expanded", !isActive)
      navOverlay.setAttribute("aria-hidden", isActive)
    })

    // Cerrar menú al hacer click en overlay
    navOverlay.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      navPrimary.classList.remove("active")
      if (navSocial) {
        navSocial.classList.remove("active")
      }
      navOverlay.classList.remove("active")
      body.classList.remove("menu-open")
      menuToggle.setAttribute("aria-expanded", "false")
      navOverlay.setAttribute("aria-hidden", "true")
    })
  }

  // --- CERRAR MENÚ AL HACER CLICK EN LINK ---
  const navLinks = document.querySelectorAll(".nav__link")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      navPrimary.classList.remove("active")
      if (navSocial) {
        navSocial.classList.remove("active")
      }
      navOverlay.classList.remove("active")
      body.classList.remove("menu-open")
      menuToggle.setAttribute("aria-expanded", "false")
      navOverlay.setAttribute("aria-hidden", "true")
    })
  })

  // --- ANIMACIONES DE SCROLL Y HERO ---
  const header = document.querySelector(".header")
  const revealElements = document.querySelectorAll(".reveal-text")

  // Initial animation for hero section
  setTimeout(() => {
    document.querySelectorAll(".hero .reveal-text").forEach((el) => {
      el.classList.add("active")
    })
  }, 500)

  // --- EFECTOS AVANZADOS DEL HEADER ---
  let lastScrollY = window.scrollY
  let scrollTimeout

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY
    
    // Header background on scroll
    if (currentScrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    // Header hide/show en scroll (solo en móvil)
    if (window.innerWidth <= 768) {
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        header.style.transform = "translateY(-100%)"
      } else {
        // Scrolling up - show header
        header.style.transform = "translateY(0)"
      }
    }

    lastScrollY = currentScrollY

    // Clear timeout and set a new one
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      // Always show header when scroll stops
      if (header) {
        header.style.transform = "translateY(0)"
      }
    }, 150)
  })

  // Check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
  }

  // --- CATÁLOGO DE PRODUCTOS ---
  const products = [
    {
      id: 1,
      name: "Passione Tee",
      category: "tees",
      price: "$45",
      image: "feelingpromo/src/img/background.avif", // <-- Imagen de ejemplo
    },
    {
      id: 2,
      name: "Calma Hoodie",
      category: "hoodies",
      price: "$85",
      image: "images/product2.jpg",
    },
    {
      id: 3,
      name: "Energia Jacket",
      category: "jackets",
      price: "$120",
      image: "images/product3.jpg",
    },
    {
      id: 4,
      name: "Gioia Tee",
      category: "tees",
      price: "$45",
      image: "images/product4.jpg",
    },
    {
      id: 5,
      name: "Tristezza Cap",
      category: "accessories",
      price: "$35",
      image: "images/product5.jpg",
    },
    {
      id: 6,
      name: "Rabbia Hoodie",
      category: "hoodies",
      price: "$85",
      image: "images/product6.jpg",
    },
    {
      id: 7,
      name: "Sorpresa Jacket",
      category: "jackets",
      price: "$130",
      image: "images/product7.jpg",
    },
    {
      id: 8,
      name: "Paura Beanie",
      category: "accessories",
      price: "$30",
      image: "images/product8.jpg",
    },
  ]

  // Populate catalog
  const catalogGrid = document.querySelector(".catalog-grid")

  function populateCatalog(filter = "all") {
    catalogGrid.innerHTML = ""

    const filteredProducts = filter === "all" ? products : products.filter((product) => product.category === filter)

    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div")
      productCard.className = "product-card"
      productCard.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-details">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-category">${product.category}</p>
          <p class="product-price">${product.price}</p>
        </div>
      `

      catalogGrid.appendChild(productCard)
    })
  }

  // Initial catalog population
  populateCatalog()

  // --- FILTROS DE CATÁLOGO ---
  const filterButtons = document.querySelectorAll(".filter-btn")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Filter products
      populateCatalog(filter)
    })
  })

  // --- EFECTO HOVER EN SHOWCASE ---
  const showcaseItems = document.querySelectorAll(".showcase-item")

  showcaseItems.forEach((item) => {
    const color = item.getAttribute("data-color")

    item.addEventListener("mouseenter", () => {
      document.documentElement.style.setProperty("--primary-color", color)
    })

    item.addEventListener("mouseleave", () => {
      document.documentElement.style.setProperty("--primary-color", "#ff3e3e")
    })
  })

  // --- FORMULARIO NEWSLETTER ---
  const newsletterForm = document.getElementById("newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const nameInput = document.getElementById("name")
      const emailInput = document.getElementById("email")

      // Simple validation
      if (nameInput.value.trim() === "" || emailInput.value.trim() === "") {
        alert("Please fill in all fields")
        return
      }

      // Simulate form submission
      const submitBtn = this.querySelector(".submit-btn")
      submitBtn.textContent = "Subscribing..."

      setTimeout(() => {
        submitBtn.textContent = "Subscribed!"
        nameInput.value = ""
        emailInput.value = ""

        setTimeout(() => {
          submitBtn.textContent = "Subscribe"
        }, 2000)
      }, 1500)
    })
  }

  // --- SCROLL SUAVE EN ANCLAS ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })
})

// --- CARRUSEL DE PRODUCTOS ---
// Importa las imágenes usando la sintaxis de Vite para que las rutas sean correctas en producción
import homeImg from './img/home.avif'
// Puedes importar más imágenes aquí

function setupProductCarousel() {
  const carouselTrack = document.querySelector(".carousel-track")
  const indicatorsContainer = document.querySelector(".carousel-indicators")
  if (!carouselTrack) return

  // Imágenes del carrusel (puedes eliminar o cambiar las de ejemplo)
  const productImages = [
    { src: homeImg, alt: "Producto 1" }, // <-- Imagen de ejemplo
    { src: homeImg, alt: "Producto 2" }  // <-- Imagen de ejemplo
  ]

  // Create slides
  productImages.forEach((image, index) => {
    // Create slide
    const slide = document.createElement("div")
    slide.className = "carousel-slide"
    slide.innerHTML = `<img src="${image.src}" alt="${image.alt}">`
    carouselTrack.appendChild(slide)

    // Create indicator
    const indicator = document.createElement("div")
    indicator.className = `carousel-indicator ${index === 0 ? "active" : ""}`
    indicator.dataset.index = index
    indicatorsContainer.appendChild(indicator)
  })

  // Set initial width
  const slides = document.querySelectorAll(".carousel-slide")
  carouselTrack.style.width = `${slides.length * 100}%`

  // Carousel navigation
  let currentSlide = 0
  const indicators = document.querySelectorAll(".carousel-indicator")

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1
    if (index >= slides.length) index = 0

    carouselTrack.style.transform = `translateX(-${index * (100 / slides.length)}%)`

    // Update indicators
    indicators.forEach((ind) => ind.classList.remove("active"))
    indicators[index].classList.add("active")

    currentSlide = index
  }

  // Event listeners
  document.querySelector(".carousel-button.prev").addEventListener("click", () => {
    goToSlide(currentSlide - 1)
  })

  document.querySelector(".carousel-button.next").addEventListener("click", () => {
    goToSlide(currentSlide + 1)
  })

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      goToSlide(Number.parseInt(indicator.dataset.index))
    })
  })

  // Auto advance slides
  let slideInterval = setInterval(() => {
    goToSlide(currentSlide + 1)
  }, 5000)

  // Pause auto-advance on hover
  const carousel = document.querySelector(".product-carousel")
  carousel.addEventListener("mouseenter", () => {
    clearInterval(slideInterval)
  })

  carousel.addEventListener("mouseleave", () => {
    slideInterval = setInterval(() => {
      goToSlide(currentSlide + 1)
    }, 5000)
  })
}

// --- AGREGAR AL CARRITO ---
function setupAddToCart() {
  const addToCartBtn = document.querySelector(".add-to-cart")
  if (!addToCartBtn) return

  addToCartBtn.addEventListener("click", function () {
    const size = document.getElementById("size").value

    // Animation feedback
    this.textContent = "Added to Cart!"
    this.style.backgroundColor = "#2ecc71"

    setTimeout(() => {
      this.textContent = "Add to Cart"
      this.style.backgroundColor = ""
    }, 2000)
  })
}

// --- VIDEO DE PRODUCTO ---
function setupProductVideo() {
  const video = document.getElementById("product-video")
  if (!video) return
  // Set poster image si no hay video
  if (!video.src || video.src === "#") {
    video.poster = homeImg// <-- Imagen de ejemplo
  }
  // Click to play/pause
  video.addEventListener("click", () => {
    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  })
}

// --- VIDEO HERO PING-PONG ---
function setupHeroVideoPingPong() {
  const heroVideo = document.querySelector('.hero-video video');
  if (!heroVideo) return;

  // Quitar loop si está puesto
  heroVideo.removeAttribute('loop');
  // Velocidad personalizada
  heroVideo.playbackRate = 1.3;

  let reverse = false;
  let rafId;

  // Función para reproducir hacia atrás
  function playReverse() {
    if (!reverse) return;
    if (heroVideo.currentTime <= 0) {
      reverse = false;
      heroVideo.playbackRate = 1.3;
      heroVideo.play();
      return;
    }
    heroVideo.currentTime -= 0.033 * heroVideo.playbackRate; // ~30fps
    rafId = requestAnimationFrame(playReverse);
  }

  heroVideo.addEventListener('ended', () => {
    reverse = true;
    heroVideo.pause();
    heroVideo.playbackRate = 1.3;
    playReverse();
  });

  heroVideo.addEventListener('play', () => {
    if (reverse) {
      reverse = false;
      cancelAnimationFrame(rafId);
    }
  });

  heroVideo.addEventListener('pause', () => {
    if (reverse) {
      cancelAnimationFrame(rafId);
    }
  });

  // Cuando termina de ir hacia atrás, vuelve a reproducir normal
  heroVideo.addEventListener('timeupdate', () => {
    if (reverse && heroVideo.currentTime <= 0) {
      reverse = false;
      heroVideo.playbackRate = 1.3;
      heroVideo.play();
    }
  });

  // Iniciar velocidad al cargar
  heroVideo.addEventListener('loadedmetadata', () => {
    heroVideo.playbackRate = 1.3;
  });
}

// --- INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", () => {
  setupProductCarousel()
  setupAddToCart()
  setupProductVideo()
  setupHeroVideoPingPong() // <--- nuevo
})
