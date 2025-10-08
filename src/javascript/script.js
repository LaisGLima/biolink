document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.getElementById('cards');
    const prevButton = document.querySelector('.fa-angle-left');
    const nextButton = document.querySelector('.fa-angle-right');
    const cards = document.querySelectorAll('.Card');
    const sobreMimCard = document.getElementById('sobre-mim-card');
    const backButton = document.getElementById('back-button');
    const content = document.getElementById('content');
    const sobreMimPage = document.getElementById('sobre-mim-page');
    const body = document.body;
    
    let isDragging = false;
    let startX, scrollLeft;
    let currentIndex = 0;
    const cardsToShow = 2;
    let clickAllowed = true;

    const cardLinks = [
        'https://laisglima.github.io/Portf-lio-Visual-La-s-G.Lima/', 
        'https://form.respondi.app/9jsDJcAy',
        'https://www.behance.net/laisGlima',
        'https://github.com/LaisGLima',
    ];

    function navigate(direction) {
        if (isDragging) return;
        
        if (direction === 'next' && currentIndex < cards.length - cardsToShow) {
            currentIndex++;
        } else if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
        }
        
        updateCarousel();
    }

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 20;
        cardsContainer.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
        updateButtons();
    }

    function updateButtons() {
        prevButton.style.display = currentIndex <= 0 ? 'none' : 'block';
        nextButton.style.display = currentIndex >= cards.length - cardsToShow ? 'none' : 'block';
    }

    cardsContainer.addEventListener('mouseenter', () => {
        cardsContainer.style.cursor = 'grab';
    });

    cardsContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - cardsContainer.offsetLeft;
        scrollLeft = cardsContainer.scrollLeft;
        cardsContainer.style.cursor = 'grabbing';
        cardsContainer.style.scrollBehavior = 'auto';
        clickAllowed = true;
    });

    cardsContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        if (Math.abs(e.pageX - startX) > 5) {
            clickAllowed = false;
        }
        
        const x = e.pageX - cardsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        cardsContainer.scrollLeft = scrollLeft - walk;
    });

    function endDrag() {
        if (isDragging) {
            isDragging = false;
            cardsContainer.style.cursor = 'grab';
            cardsContainer.style.scrollBehavior = 'smooth';
            
            const cardWidth = cards[0].offsetWidth + 20;
            currentIndex = Math.round(cardsContainer.scrollLeft / cardWidth);
            updateCarousel();
            
            setTimeout(() => { clickAllowed = true; }, 100);
        }
    }

    cardsContainer.addEventListener('mouseup', endDrag);
    cardsContainer.addEventListener('mouseleave', endDrag);

    cards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('mouseenter', () => {
            if (!isDragging) {
                card.style.cursor = 'pointer';
            }
        });
        
        card.addEventListener('click', (e) => {
            if (!isDragging && clickAllowed) {
                    window.location.href = cardLinks[index];
            }
        });
    });

    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate('next');
    });

    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate('prev');
    });
 
    updateButtons();
    updateCarousel();

    window.addEventListener('resize', () => {
        updateCarousel();
    });

    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('header', {
            origin: 'top',
            duration: 1000,
            distance: '20%'
        });
        
        ScrollReveal().reveal('#social-media-buttons a', { 
            origin: 'bottom',
            duration: 600,
            distance: '20px',
            scale: 0.95,
            interval: 200, 
        });
        
        ScrollReveal().reveal('#bioButton', {
            origin: 'top',
            duration: 1000,
            distance: '100%'
        });
    }

    const arrow = document.querySelector('.Pay-arrow');
    
    if (arrow) {
        function startAnimation() {
            arrow.style.animation = 'none'; 
            void arrow.offsetWidth; 
            arrow.style.animation = 'arrowRunRight 1.5s ease-in-out'; 
            setTimeout(startAnimation, 2500); 
        }
        
        startAnimation();
    }

    const buttonContent = document.getElementById('button-content');

    const bioButton = document.getElementById('bioButton'); 
    const bioUrl = 'https://wa.me/5585992622326'; 

    if (bioButton) {
        if (!bioButton.hasAttribute('tabindex')) bioButton.setAttribute('tabindex', '0');
        bioButton.setAttribute('aria-label', 'Adquira seu cartão visita');

        bioButton.style.cursor = 'pointer';

        bioButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!clickAllowed) return;
            window.open(bioUrl, '_blank', 'noopener,noreferrer');
        });

        bioButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (!clickAllowed) return;
                window.open(bioUrl, '_blank', 'noopener,noreferrer');
            }
        });
    }

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if(scrollY > 0){ 
            if (buttonContent) buttonContent.style.background = 'transparent';
        } else {
            if (buttonContent) buttonContent.style.background = 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))';
        }
    });
});
