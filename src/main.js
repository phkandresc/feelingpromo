document.addEventListener("DOMContentLoaded", () => {
  // Custom cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)"
    cursorFollower.style.transform = "translate(-50%, -50%) scale(0.8)"
  })

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)"
    cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
  })

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

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector("nav")

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active")
    nav.classList.toggle("active")
    document.body.classList.toggle("menu-open")
  })

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      nav.classList.remove("active")
      document.body.classList.remove("menu-open")
    })
  })

  // Scroll animations
  const header = document.querySelector("header")
  const revealElements = document.querySelectorAll(".reveal-text")

  // Initial animation for hero section
  setTimeout(() => {
    document.querySelectorAll(".hero .reveal-text").forEach((el) => {
      el.classList.add("active")
    })
  }, 500)

  // Scroll animations
  window.addEventListener("scroll", () => {
    // Header background on scroll
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    // Reveal elements on scroll
    revealElements.forEach((el) => {
      if (isElementInViewport(el)) {
        el.classList.add("active")
      }
    })
  })

  // Check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
  }

  // Product catalog
  const products = [
    {
      id: 1,
      name: "Passione Tee",
      category: "tees",
      price: "$45",
      image: "images/product1.jpg",
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

  // Filter buttons
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

  // Showcase item hover effect
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

  // Newsletter form submission
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

  // Smooth scrolling for anchor links
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

// Placeholder images for development
// In a real project, these would be replaced with actual product images
function setupPlaceholderImages() {
  const placeholders = [
    { selector: ".hero-image img", width: 1200, height: 800, text: "FEELING HERO" },
    { selector: ".about-image img", width: 800, height: 600, text: "ABOUT FEELING" },
    { selector: ".showcase-item:nth-child(1) img", width: 600, height: 800, text: "PASSIONE TEE" },
    { selector: ".showcase-item:nth-child(2) img", width: 600, height: 800, text: "CALMA HOODIE" },
    { selector: ".showcase-item:nth-child(3) img", width: 600, height: 800, text: "ENERGIA JACKET" },
  ]

  placeholders.forEach((placeholder) => {
    const elements = document.querySelectorAll(placeholder.selector)
    elements.forEach((el) => {
      if (!el.src.includes("hero-inspiration")) {
        // Skip if it's the hero image we already have
        el.src = `https://via.placeholder.com/${placeholder.width}x${placeholder.height}/2d2d2a/8b4cb8?text=${placeholder.text.replace(" ", "+")}`
      }
    })
  })

  // Generate carousel product images
  const carouselSlides = document.querySelectorAll(".carousel-slide img")
  if (carouselSlides.length > 0) {
    // Keep the first slide as the hero image if it exists
    if (carouselSlides[0] && !carouselSlides[0].src.includes("hero-inspiration")) {
      carouselSlides[0].src = "img/background.jpg"
    }

    // Generate placeholder images for the rest of the slides
    for (let i = 1; i < carouselSlides.length; i++) {
      if (carouselSlides[i]) {
        carouselSlides[i].src = `https://via.placeholder.com/800x1000/2d2d2a/8b4cb8?text=PASSIONE+TEE+VIEW+${i + 1}`
      }
    }
  }

  // Set video poster
  const videoPoster = document.getElementById("product-video")
  if (videoPoster) {
    videoPoster.poster = `https://via.placeholder.com/1280x720/2d2d2a/8b4cb8?text=PASSIONE+TEE+VIDEO`
  }
}

// Product carousel functionality
function setupProductCarousel() {
  const carouselTrack = document.querySelector(".carousel-track")
  const indicatorsContainer = document.querySelector(".carousel-indicators")

  if (!carouselTrack) return

  // Product images for the carousel
  const productImages = [
    { src: "images/hero-inspiration.jpg", alt: "Passione Tee Front" },
    { src: "images/product-back.jpg", alt: "Passione Tee Back" },
    { src: "images/product-detail.jpg", alt: "Passione Tee Detail" },
    { src: "images/product-styled.jpg", alt: "Passione Tee Styled" },
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

// Add to cart functionality
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

// Video functionality
function setupProductVideo() {
  const video = document.getElementById("product-video")
  if (!video) return

  // Set poster image if video source is not available
  if (!video.src || video.src === "#") {
    video.poster = "images/video-poster.jpg"
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

// Call all setup functions after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setupPlaceholderImages()
  setupProductCarousel()
  setupAddToCart()
  setupProductVideo()
})
