document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    // Función para alternar la clase 'active' en el menú de navegación
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        // Opcional: Animar las barras de la hamburguesa
        menuToggle.classList.toggle('active');
    });

    // Cerrar el menú cuando se hace clic en un enlace (para móviles)
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active'); // Restaura la animación de la hamburguesa
        });
    });

    // Opcional: Cerrar el menú si se redimensiona la ventana (útil al pasar de móvil a desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) { // Considera 768px como el breakpoint para desktop
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});