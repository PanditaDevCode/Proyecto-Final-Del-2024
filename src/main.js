let isNight = false; // Bandera para verificar si ya es noche

function toggleDayNight() {
  const city = document.querySelector('.city');
  const windows = document.querySelectorAll('.window');

  if (!isNight) {
    // Cambiar a noche
    city.classList.add('night');
    windows.forEach(window => {
      // Al azar, algunas ventanas estarán encendidas
      if (Math.random() > 0.5) {
        window.classList.add('light-on');
      } else {
        window.classList.remove('light-on');
      }
    });
    isNight = true; // Marcar que ya es noche
  }
}

// Cambiar automáticamente a noche después de 5 segundos
setTimeout(toggleDayNight, 10000);














import gsap from "gsap";

window.addEventListener("load", () => {
  // Configuración inicial del cielo y nubes
  gsap.set(".sky", {
    background: "linear-gradient(#87CEEB, #F0F8FF)" // Cielo de día
  });
  gsap.set(".cloud-part", {
    opacity: 1, // Nubes visibles desde el inicio
    background: "radial-gradient(circle at center, #FFFFFF, #E0E0E0)", // Color blanco inicial
  });

  // Iniciar animación de las nubes desde el principio (de día y de noche)
  animateClouds(); 

  setTimeout(() => {
    // Animación del sol cayendo
    gsap.to(".sun", {
      y: "10vh",
      opacity: 0,
      duration: 6,
      ease: "power2.inOut",
      onComplete: function () {
        // Animación de la luna subiendo
        gsap.to(".moon", {
          duration: 3,
          top: "10%",
          opacity: 1,
          ease: "power2.out"
        });
      }
    });

    // Cambiar el fondo del cielo a noche
    gsap.to(".sky", {
      background: "linear-gradient(#1a1a40, #000)", // Gradiente nocturno
      duration: 6,
      ease: "power2.inOut"
    });
  }, 5000); // Comienza después de 2 segundos
});

// Función para animar las nubes
function animateClouds() {
  // Cambiar las nubes a un color oscuro si estamos en la noche
  gsap.to(".cloud-part", {
    background: "radial-gradient(circle at center, #555555, #333333)", // Color nocturno
    duration: 20,
    ease: "power2.inOut",
  });

  // Mover las nubes de derecha a izquierda, reiniciando su posición sin interrupción
  gsap.utils.toArray('.cloud').forEach((cloud) => {
    gsap.set(cloud, { x: "100vw" });  // Coloca las nubes en la parte derecha al inicio

    // Ajustar la duración para que la animación sea más lenta
    gsap.to(cloud, {
      x: "-100vw", // Mueve la nube a la izquierda (fuera de la pantalla)
      duration: 20 + Math.random() * 25, // Hacer la animación más lenta, por ejemplo 20-30s
      ease: "none",
      repeat: -1, // Hacerlo en bucle infinito
      onRepeat: function () {
        gsap.set(cloud, { x: "100vw" });  // Reposiciona la nube en la parte derecha sin salto
      }
    });
  });
}