// Hero Slider Navigation
document.addEventListener('DOMContentLoaded', function() {
    const indicators = document.querySelectorAll('.indicator');
    const slides = document.querySelectorAll('.hero-slide');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Function to update hero content text
    function updateHeroContent(index) {
        const activeSlide = slides[index];
        const title = activeSlide.getAttribute('data-title');
        const subtitle = activeSlide.getAttribute('data-subtitle');
        
        // Fade out with transform
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(-20px)';
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(-20px)';
        
        // Update content after fade out
        setTimeout(() => {
            heroTitle.textContent = title;
            heroSubtitle.textContent = subtitle;
            // Fade in with transform
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 50);
        }, 300);
    }
    
    // Function to update slide visibility
    function updateSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Update hero content text
        updateHeroContent(index);
        
        currentSlide = index;
    }
    
    // Initialize first slide with immediate text display
    const firstSlide = slides[0];
    if (firstSlide) {
        heroTitle.textContent = firstSlide.getAttribute('data-title');
        heroSubtitle.textContent = firstSlide.getAttribute('data-subtitle');
        heroTitle.style.opacity = '1';
        heroSubtitle.style.opacity = '1';
    }
    updateSlide(0);
    
    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            updateSlide(index);
        });
    });
    
    // Auto-advance slides every 4 seconds
    function autoAdvance() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide(currentSlide);
    }
    
    // Set up auto-advance
    let slideInterval = setInterval(autoAdvance, 4000);
    
    // Pause on hover
    const heroSection = document.querySelector('.hero-section');
    heroSection.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    heroSection.addEventListener('mouseleave', function() {
        slideInterval = setInterval(autoAdvance, 4000);
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    heroSection.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    heroSection.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next slide
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlide(currentSlide);
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous slide
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlide(currentSlide);
        }
    }
    
    // Categories Dropdown - Enhanced hover functionality
    const categoriesDropdown = document.querySelector('.categories-dropdown');
    const categoriesLink = document.getElementById('categories-link');
    const categoriesMenu = document.getElementById('categories-menu');
    
    if (categoriesDropdown && categoriesMenu) {
        // Keep dropdown open when hovering over trigger or menu
        let hoverTimeout;
        
        function showDropdown() {
            clearTimeout(hoverTimeout);
            categoriesDropdown.classList.add('active');
        }
        
        function hideDropdown() {
            hoverTimeout = setTimeout(() => {
                categoriesDropdown.classList.remove('active');
            }, 200); // Small delay to allow moving between elements
        }
        
        // Show on hover over trigger
        categoriesDropdown.addEventListener('mouseenter', showDropdown);
        
        // Hide when leaving both trigger and menu
        categoriesDropdown.addEventListener('mouseleave', function(e) {
            // Check if we're moving to the menu
            if (!categoriesMenu.contains(e.relatedTarget)) {
                hideDropdown();
            }
        });
        
        // Keep open when hovering over menu
        categoriesMenu.addEventListener('mouseenter', showDropdown);
        categoriesMenu.addEventListener('mouseleave', hideDropdown);
        
        // For mobile devices, allow click to toggle
        if (window.matchMedia('(hover: none)').matches && categoriesLink) {
            categoriesLink.addEventListener('click', function(e) {
                e.preventDefault();
                categoriesDropdown.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside on mobile
            document.addEventListener('click', function(e) {
                if (!categoriesDropdown.contains(e.target)) {
                    categoriesDropdown.classList.remove('active');
                }
            });
        }
    }
    
    // Category card hover effects
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            console.log('Category selected:', category);
            // You can add navigation or filtering logic here
        });
    });
});

