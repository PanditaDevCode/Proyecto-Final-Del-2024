let isNight = false; // Bandera para verificar si ya es noche

function toggleDayNight() {
  const city = document.querySelector('.city');
  const windows = document.querySelectorAll('.window');

  if (!isNight) {
    // Cambiar a noche
    city.classList.add('night');
    isNight = true; // Marcar que ya es noche

    // Configurar estado inicial de las ventanas (algunas encendidas, otras apagadas)
    initializeWindows(windows);

    // Iniciar animación de ventanas encendiéndose y apagándose
    startRandomWindowAnimation(windows);
  }
}

function initializeWindows(windows) {
  windows.forEach(window => {
    // Aleatoriamente encender algunas ventanas
    if (Math.random() > 0.7) {
      window.classList.add('light-on'); // Algunas ventanas encendidas
    } else {
      window.classList.remove('light-on'); // Otras apagadas
    }
  });
}

function startRandomWindowAnimation(windows) {
  setInterval(() => {
    windows.forEach(window => {
      // Alternar encendido/apagado de forma aleatoria
      if (Math.random() > 0.5) {
        window.classList.add('light-on');
      } else {
        window.classList.remove('light-on');
      }
    });
  }, 8000); // Cambiar cada 2 segundos (ajusta el tiempo a tus necesidades)
}

// Cambiar automáticamente a noche después de 10 segundos
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
      y: "50vh",
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

        // Activar nieve cuando se haga de noche
        startSnowing();

        // Iniciar estrellas al caer la noche
        createStars(100); // Ajusta el número de estrellas si lo deseas
      }
    });

    // Cambiar el fondo del cielo a noche
    gsap.to(".sky", {
      background: "linear-gradient(#1a1a40, #000)", // Gradiente nocturno
      duration: 6,
      ease: "power2.inOut"
    });
  }, 5000); // Comienza después de 5 segundos
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

// Función para hacer que las partículas de nieve caigan desde las nubes
function startSnowing() {
  setInterval(() => {
    // Seleccionamos una nube aleatoria de las nubes visibles
    const clouds = document.querySelectorAll('.cloud');
    const randomCloud = clouds[Math.floor(Math.random() * clouds.length)];

    // Obtener la posición de la nube para generar nieve debajo de ella
    const cloudRect = randomCloud.getBoundingClientRect();
    const cloudX = cloudRect.left + cloudRect.width / 2; // Centrado horizontalmente
    const cloudY = cloudRect.bottom; // Justo debajo de la nube

    const snow = document.createElement('div');
    snow.classList.add('snow');
    document.querySelector('.sky').appendChild(snow);

    // Establecer la posición inicial de la nieve justo debajo de la nube
    gsap.set(snow, {
      left: cloudX - 3,  // Centrado horizontalmente con la nube
      top: cloudY,       // Justo debajo de la nube
    });

    // Animación de caída de nieve
    gsap.to(snow, {
      y: "100vh",  // Caída desde la parte superior de la pantalla
      opacity: 0,
      duration: 5 + Math.random() * 3, // Variar la duración de la caída
      delay: Math.random() * 3, // Agregar un pequeño retraso entre cada partícula
      onComplete: () => snow.remove()  // Eliminar la partícula cuando termine su animación
    });
  }, 200); // Crear nuevas partículas cada 200 ms
}

// Función para crear estrellas
function createStars(count) {
  const sky = document.querySelector(".sky");

  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // Posición aleatoria de la estrella
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    gsap.set(star, {
      left: x,
      top: y,
      opacity: 0, 
      scale: 0
    });

    sky.appendChild(star);

    // Animación de entrada de estrellas
    gsap.to(star, {
      opacity: 1,
      scale: Math.random() * 1.5 + 0.5, 
      duration: 2, 
      delay: Math.random() * 5, 
      ease: "power2.out"
    });
  }
}