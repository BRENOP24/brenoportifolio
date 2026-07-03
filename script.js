document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA 1: FILTRO DE PROJETOS ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transition = 'opacity 0.4s ease';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- LÓGICA 2: CARROSSEL DE IMAGENS ---
    const sliders = document.querySelectorAll('.project-slider');

    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        let currentIdx = 0;

        if (slides.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }

        function showSlide(index) {
            slides.forEach(slide => {
                slide.classList.remove('active');
                slide.style.opacity = '0';
            });
            slides[index].classList.add('active');
            slides[index].style.opacity = '1';
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                currentIdx = (currentIdx + 1) % slides.length;
                showSlide(currentIdx);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                currentIdx = (currentIdx - 1 + slides.length) % slides.length;
                showSlide(currentIdx);
            });
        }
    });

    // --- LÓGICA 3: MODAL DE TELA CHEIA ---
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('img-fullscreen');
    const captionText = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.close-modal');

    // Escuta cliques em qualquer imagem de slide do site
    document.querySelectorAll('.slide').forEach(img => {
        img.addEventListener('click', function() {
            // Só permite abrir se a imagem for a que está visível (active)
            if (this.classList.contains('active')) {
                modal.style.display = "block";
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
            }
        });
    });

    // Fecha o modal ao clicar no (X)
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = "none";
        });
    }

    // Fecha o modal se o usuário clicar em qualquer parte escura fora da foto
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // Fecha o modal apertando a tecla 'ESC' do teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = "none";
        }
    });
});