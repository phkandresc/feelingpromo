import './style.css'
import { setupCounter } from './counter.js'


// Elementos DOM
const header = document.querySelector("header")
const menuToggle = document.getElementById("menu-toggle")
const mobileNav = document.getElementById("mobile-nav")
const navLinks = document.querySelectorAll(".nav-link")
const parallaxBg = document.getElementById("parallax-bg")
const contactForm = document.getElementById("contact-form")
const revealElements = document.querySelectorAll(".reveal-element")
const sections = document.querySelectorAll("section[id]")
const leadForm = document.getElementById("lead-form")
const navMenu = document.getElementById("mobile-nav") // Declare navMenu

// Manejar el menú móvil
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active")
  mobileNav.classList.toggle("active")

  // Animar las barras para formar una X
  const bars = document.querySelectorAll(".bar")
  bars.forEach((bar) => bar.classList.toggle("active"))
})

// Cerrar el menú al hacer clic en un enlace
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    mobileNav.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Cambiar el estilo del header al hacer scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY
  if (parallaxBg) {
    parallaxBg.style.transform = `translateY(${scrollY * 0.2}px)`
  }
})

// Animación de aparición al hacer scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observar secciones para animarlas
document.querySelectorAll("section").forEach((section) => {
  section.classList.add("fade-in")
  revealObserver.observe(section)
})

// Observar productos para animarlos
document.querySelectorAll(".producto").forEach((producto) => {
  producto.classList.add("fade-in")
  revealObserver.observe(producto)
})

// Observe all reveal elements
revealElements.forEach((element) => {
  revealObserver.observe(element)
})

// Intersection Observer for active section
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Update active nav link
        navLinks.forEach((link) => {
          if (link.getAttribute("href").substring(1) === entry.target.id) {
            link.classList.add("active")
          } else {
            link.classList.remove("active")
          }
        })
      }
    })
  },
  { threshold: 0.5 },
)

// Observe all sections
sections.forEach((section) => {
  sectionObserver.observe(section)
})

// Product horizontal scroll indicators
const productsScroll = document.querySelector(".products-scroll")
const scrollDots = document.querySelectorAll(".dot")

if (productsScroll) {
  productsScroll.addEventListener("scroll", () => {
    const scrollPosition = productsScroll.scrollLeft
    const maxScroll = productsScroll.scrollWidth - productsScroll.clientWidth
    const scrollPercentage = scrollPosition / maxScroll

    // Update dots based on scroll position
    if (scrollPercentage < 0.33) {
      updateActiveDot(0)
    } else if (scrollPercentage < 0.66) {
      updateActiveDot(1)
    } else {
      updateActiveDot(2)
    }
  })
}

function updateActiveDot(index) {
  scrollDots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active")
    } else {
      dot.classList.remove("active")
    }
  })
}

// Animate scroll indicator
const scrollIndicator = document.querySelector(".scroll-indicator")
if (scrollIndicator) {
  setInterval(() => {
    scrollIndicator.classList.add("bounce")
    setTimeout(() => {
      scrollIndicator.classList.remove("bounce")
    }, 1000)
  }, 2000)
}

// Manejar el formulario de contacto
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const formDataObj = Object.fromEntries(formData.entries())

    // Log form data (replace with your actual form handling)
    console.log("Datos del formulario:", formDataObj)

    // Show success message
    alert("¡Gracias por contactarnos! Te responderemos pronto.")
    contactForm.reset()
  })
}

// Añadir estilos CSS adicionales para las animaciones
const style = document.createElement("style")
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .bar.active:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
  }
  
  .bar.active:nth-child(2) {
    opacity: 0;
  }
  
  .bar.active:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
  }
`
document.head.appendChild(style)

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  // Make hero content visible immediately
  const heroContent = document.querySelector(".hero-content")
  if (heroContent) {
    heroContent.classList.add("visible")
  }

  // Check if elements are already in viewport on load
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      element.classList.add("visible")
    }
  })

  // Añadir la clase visible al hero para que aparezca inmediatamente
  document.querySelector(".hero").classList.add("visible")
})

// Touch events for product cards
const productCards = document.querySelectorAll(".product-card")
productCards.forEach((card) => {
  card.addEventListener("touchstart", () => {
    card.style.transform = "translateY(-5px)"
  })

  card.addEventListener("touchend", () => {
    card.style.transform = ""
  })
})

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      })
    }
  })
})
