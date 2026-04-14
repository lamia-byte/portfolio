
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.add("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => {
    document.body.classList.remove("show-mobile-menu");
});

const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const readMoreButtons = document.querySelectorAll(".read-more-btn");

readMoreButtons.forEach(button => {
    button.addEventListener("click", () => {
        const title = button.getAttribute("data-title");
        const description = button.getAttribute("data-description");
        
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        projectModal.classList.add("active");
    });
});

modalClose.addEventListener("click", () => {
    projectModal.classList.remove("active");
});

projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove("active");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectModal.classList.contains("active")) {
        projectModal.classList.remove("active");
    }
});

let carouselIndices = {};

function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach((carousel, idx) => {
        carouselIndices[idx] = 0;
        const slides = carousel.querySelectorAll('.carousel-img');
        if (slides.length > 0) {
            slides[0].classList.add('active');
        }
    });
}

function moveCarousel(n, element) {
    const container = element.closest('.carousel-container');
    const carouselId = Array.from(document.querySelectorAll('.carousel-container')).indexOf(container);
    
    if (carouselIndices[carouselId] === undefined) {
        carouselIndices[carouselId] = 0;
    }
    
    showCarousel(carouselIndices[carouselId] += n, container, carouselId);
}

function currentCarouselSlide(n, element) {
    const container = element.closest('.carousel-container');
    const carouselId = Array.from(document.querySelectorAll('.carousel-container')).indexOf(container);
    carouselIndices[carouselId] = n;
    showCarousel(n, container, carouselId);
}

function showCarousel(n, container, carouselId) {
    const slides = container.querySelectorAll('.carousel-img');
    const dots = container.querySelectorAll('.dot');
    
    if (n >= slides.length) {
        carouselIndices[carouselId] = 0;
        n = 0;
    }
    if (n < 0) {
        carouselIndices[carouselId] = slides.length - 1;
        n = slides.length - 1;
    }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[n]) {
        slides[n].classList.add('active');
    }
    if (dots[n]) {
        dots[n].classList.add('active');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCarousels);
} else {
    initializeCarousels();
}

function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    const carouselImages = document.querySelectorAll('.carousel-img');
    
    carouselImages.forEach((img) => {
        img.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            lightboxImg.src = this.src;
            lightboxCaption.textContent = this.alt || 'Image';
            lightbox.style.display = 'flex';
            lightbox.classList.add('active');
        });
    });
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', function(e) {
            e.stopPropagation();
            lightbox.classList.remove('active');
            lightbox.style.display = 'none';
        });
    }
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            this.style.display = 'none';
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            lightbox.style.display = 'none';
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLightbox);
} else {
    setTimeout(setupLightbox, 100);
}

