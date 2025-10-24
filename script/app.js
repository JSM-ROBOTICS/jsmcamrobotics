document.addEventListener('DOMContentLoaded', () => {
    // --- Código del Menú Hamburguesa ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) { // Asegúrate de que los elementos existan antes de añadir listeners
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Opcional: para animar el icono de la hamburguesa
            document.body.classList.toggle('no-scroll'); // Opcional: evita scroll del body cuando el menú está abierto
        });

        // Cerrar el menú cuando se hace clic en un enlace (para móviles)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        // Opcional: Cerrar el menú si se redimensiona la ventana (útil al pasar de móvil a desktop)
        // Y si se usa CSS Media Queries para ocultar la hamburguesa en desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) { // Considera 768px como el breakpoint para desktop
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // --- Código del Carrusel ---
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const dots = document.querySelectorAll('.carousel-indicators .dot');

    // Asegúrate de que los elementos del carrusel existan
    if (carouselInner && carouselItems.length > 0 && prevBtn && nextBtn && dots.length > 0) {
        let currentIndex = 0;
        const totalItems = carouselItems.length;
        let autoSlideInterval;

        const showSlide = (index) => {
            if (index >= totalItems) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = totalItems - 1;
            } else {
                currentIndex = index;
            }

            const offset = -currentIndex * 100;
            carouselInner.style.transform = `translateX(${offset}%)`;

            dots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
            resetAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
            resetAutoSlide();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = parseInt(e.target.dataset.slideTo);
                showSlide(slideTo);
                resetAutoSlide();
            });
        });

        const startAutoSlide = () => {
            autoSlideInterval = setInterval(() => {
                showSlide(currentIndex + 1);
            }, 5000);
        };

        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };

        showSlide(0);
        startAutoSlide();
    }
});


 // --- Código de la Sección Integrantes del Equipo (Acordeón) ---
    const expandButtons = document.querySelectorAll('.expand-btn');

    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const memberDetails = button.closest('.member-card').querySelector('.member-details');

            // Cierra otros acordeones si están abiertos (opcional, para que solo uno esté abierto a la vez)
            document.querySelectorAll('.member-details.active').forEach(detail => {
                if (detail !== memberDetails) {
                    detail.classList.remove('active');
                    detail.closest('.member-card').querySelector('.expand-btn').classList.remove('active');
                    detail.closest('.member-card').querySelector('.expand-btn').setAttribute('aria-expanded', 'false');
                }
            });

            // Alterna la visibilidad del contenido del miembro actual
            memberDetails.classList.toggle('active');
            button.classList.toggle('active');

            // Actualiza el atributo aria-expanded para accesibilidad
            const isExpanded = button.classList.contains('active');
            button.setAttribute('aria-expanded', isExpanded);
        });
    });


    function actualizarRelojYContador() {
    const fechaActual = new Date();
    
    // --- 1. Contador de Días (WRO 2025) ---
    const fechaObjetivo = new Date(2025, 10, 26); // Mes 10 = Noviembre
    const diferenciaMs = fechaObjetivo.getTime() - fechaActual.getTime();
    const msEnUnDia = 1000 * 60 * 60 * 24;
    const diasRestantes = Math.floor(diferenciaMs / msEnUnDia);
    
    const elementoContador = document.getElementById('dias-restantes');
    if (elementoContador) {
        if (diasRestantes > 0) {
            elementoContador.textContent = diasRestantes;
        } else if (diasRestantes === 0) {
            elementoContador.textContent = "¡HOY ES EL DÍA!";
        } else {
            elementoContador.textContent = "Finalizada";
        }
    }
    
    // --- 2. Reloj Digital (Fecha y Hora) ---
    const opcionesFecha = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

    const fechaFormato = fechaActual.toLocaleDateString('es-ES', opcionesFecha);
    const horaFormato = fechaActual.toLocaleTimeString('es-ES', opcionesHora);
    
    // Agregamos un nuevo elemento para el reloj en el HTML. 
    // Si no tienes uno, se mostrará solo en la consola. 
    // Para mostrarlo en la web, añade un <div> o <p> con ID="reloj-digital" en el HTML.
    const elementoReloj = document.getElementById('reloj-digital');
    if (elementoReloj) {
        elementoReloj.textContent = `${fechaFormato} | ${horaFormato}`;
    }
}

// Ejecutar inmediatamente y luego cada segundo
actualizarRelojYContador();
setInterval(actualizarRelojYContador, 1000);
