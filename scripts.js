document.addEventListener("DOMContentLoaded", () => {
    // 1. CONTROL DEL SLIDER HORIZONTAL
    const imagenesFondo = [
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1920", 
        "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=1920", 
        "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=1920"
    ];

    const sliderTrack = document.getElementById("slider-track");

    imagenesFondo.forEach(imgUrl => {
        const slide = document.createElement("div");
        slide.className = "slide";
        slide.style.backgroundImage = `url('${imgUrl}')`;
        sliderTrack.appendChild(slide);
    });

    let indiceActual = 0;

    function moverSliderHorizontal() {
        indiceActual = (indiceActual + 1) % imagenesFondo.length;
        sliderTrack.style.transform = `translateX(-${indiceActual * 100}vw)`;
    }

    setInterval(moverSliderHorizontal, 5000);

    // 2. REPRODUCCIÓN SIMULTÁNEA DE VIDEOS
    const videos = document.querySelectorAll(".video-card video");
    videos.forEach(video => {
        video.muted = true; 
        video.play().catch(error => console.log("Autoplay interact", error));
    });

    // 3. EVENTOS DE CLIC Y DESCRIPCIONES PARA LAS LÍNEAS DE PRODUCTO
    const descripciones = {
        helado: {
            titulo: "Helado Artesanal",
            texto: "Nuestra especialidad de la casa. Elaborados con frutas 100% naturales, texturas cremosas incomparables y recetas tradicionales que garantizan una explosión de sabor único en cada bocado."
        },
        cafeteria: {
            titulo: "Cafetería Premium",
            texto: "El acompañamiento perfecto. Ofrecemos una selección de granos selectos, capuchinos perfectos, expresos intensos y deliciosos snacks calientes para disfrutar en cualquier momento del día."
        },
        pasteleria: {
            titulo: "Pastelería Exquisita",
            texto: "Porciones de felicidad hechas pastel. Desde cheesecakes esponjosos con jaleas artesanales hasta tortas húmedas de chocolate, diseñadas especialmente para los paladares más dulces."
        },
        soft: {
            titulo: "Helados Soft",
            texto: "Prácticos, suaves y divertidos. Servidos al instante con la consistencia perfecta, ideales combinados con una gran variedad de toppings crujientes, chispas y jarabes dulces."
        }
    };

    const modal = document.getElementById("desc-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");
    const closeModal = document.querySelector(".close-modal");
    const tarjetasLineas = document.querySelectorAll(".linea-card");

    // Abrir modal con la información correcta
    tarjetasLineas.forEach(tarjeta => {
        tarjeta.addEventListener("click", () => {
            const tipo = tarjeta.getAttribute("data-linea");
            if (descripciones[tipo]) {
                modalTitle.textContent = descripciones[tipo].titulo;
                modalText.textContent = descripciones[tipo].texto;
                modal.style.display = "flex";
            }
        });
    });

    // Cerrar modal al darle a la X
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Cerrar modal al hacer clic fuera del recuadro blanco
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // 4. LÓGICA DE LA SECCIÓN DE RESEÑAS Y BOTÓN SCROLL TOP
    const reviews = [
        {
            autor: "Washington Villamarin",
            estrellas: "★★★★★",
            texto: "Un lugar muy especial para consumir comida rápida y bebidas. Tienen gran variedad de postres y helados, batidos y más. Muy deliciosos. Lo recomiendo."
        },
        {
            autor: "María Fernanda López",
            estrellas: "★★★★★",
            texto: "Excelente atención y los helados artesanales son incomparables. El ambiente es super acogedor para ir en pareja o con amigos."
        },
        {
            autor: "Carlos Ramírez",
            estrellas: "★★★★★",
            texto: "Los helados de sabor tradicional son riquísimos y la cafetería tiene un aroma espectacular. Totalmente recomendado."
        }
    ];

    let currentReviewIndex = 0;
    const authorEl = document.getElementById("review-author");
    const starsEl = document.getElementById("review-stars");
    const textEl = document.getElementById("review-text");
    const prevBtn = document.getElementById("prev-review");
    const nextBtn = document.getElementById("next-review");
    const scrollTopBtn = document.getElementById("scroll-to-top");

    function renderReview(index) {
        const review = reviews[index];
        authorEl.textContent = review.autor;
        starsEl.textContent = review.estrellas;
        textEl.textContent = review.texto;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
            renderReview(currentReviewIndex);
        });

        nextBtn.addEventListener("click", () => {
            currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
            renderReview(currentReviewIndex);
        });
    }

    // Botón para volver arriba suavemente
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});