import './style.css'
import { setupCounter } from './counter.js'

// Gestionar la pantalla de intro
document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen")
  const introVideo = document.getElementById("intro-video")
  const skipIntroBtn = document.getElementById("skip-intro")
  const body = document.body

  // Función para mostrar el contenido principal
  function showMainContent() {
    // Ocultar la pantalla de intro con una transición suave
    introScreen.classList.add("hidden")

    // Habilitar el scroll después de que la intro desaparezca
    setTimeout(() => {
      body.style.overflow = "auto"

      // Asegurarse de que la pantalla de intro no bloquee interacciones
      introScreen.style.pointerEvents = "none"

      // Iniciar animaciones de la página principal
      const heroContent = document.querySelector(".hero-content")
      if (heroContent) {
        heroContent.classList.add("visible")
      }

      // Verificar si hay elementos en el viewport y animarlos
      const revealElements = document.querySelectorAll(".reveal-element")
      revealElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight) {
          element.classList.add("visible")
        }
      })
    }, 500) // Este tiempo debe coincidir con la duración de la transición CSS
  }

  // Configurar la intro
  function setupIntro() {
    // Deshabilitar el scroll durante la intro
    body.style.overflow = "hidden"

    // Si hay un video de intro, configurarlo
    if (introVideo) {
      // Mostrar el video después de un breve retraso para que se vea el logo primero
      setTimeout(() => {
        introVideo.classList.add("visible")

        // Intentar reproducir el video con manejo de errores
        introVideo.play().catch((error) => {
          console.error("Error reproduciendo el video:", error)
          // Si hay un error al reproducir, mostrar el contenido principal
          showMainContent()
        })

        // Detectar cuando termina el video
        introVideo.addEventListener("ended", showMainContent)

        // Fallback: si el video no se reproduce después de 5 segundos, mostrar el contenido principal
        setTimeout(() => {
          if (introVideo.paused || introVideo.currentTime === 0) {
            console.log("Video no reproducido, mostrando contenido principal")
            showMainContent()
          }
        }, 5000)
      }, 2000)
    } else {
      // Si no hay video, mostrar el contenido principal después de una animación breve
      setTimeout(showMainContent, 3000)
    }

    // Permitir saltar la intro haciendo clic
    introScreen.addEventListener("click", showMainContent)

    // Botón específico para saltar
    if (skipIntroBtn) {
      skipIntroBtn.addEventListener("click", showMainContent)
    }
  }

  // Iniciar la intro
  setupIntro()

  // Elementos DOM
  const menuToggle = document.getElementById("menu-toggle")
  const mobileNav = document.getElementById("mobile-nav")
  const navLinks = document.querySelectorAll(".nav-link")
  const parallaxBg = document.getElementById("parallax-bg")
  const contactForm = document.getElementById("contact-form")
  const revealElements = document.querySelectorAll(".reveal-element")
  const sections = document.querySelectorAll("section[id]")

  // Manejar el menú móvil
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      mobileNav.classList.toggle("active")
    })

    // Cerrar el menú al hacer clic en un enlace
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active")
        mobileNav.classList.remove("active")
      })
    })
  }

  // Parallax effect for hero background
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY
    if (parallaxBg) {
      parallaxBg.style.transform = `translateY(${scrollY * 0.2}px)`

      // Efecto parallax adicional para el video
      const heroVideo = document.getElementById("hero-video")
      if (heroVideo) {
        heroVideo.style.transform = `translateX(-50%) translateY(calc(-50% + ${scrollY * 0.1}px))`
      }
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

  // Observar elementos para animarlos
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
})

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
