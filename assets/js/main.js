/**
* Template Name: Kelly
* Template URL: https://bootstrapmade.com/kelly-free-bootstrap-cv-resume-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Search functionality
   */
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchResultsContent = document.getElementById('searchResultsContent');
  const heroSection = document.getElementById('hero');

  if (searchInput) {
    // Search data
    const searchData = [
      {
        title: "About Me",
        content: "Professional illustrator from San Francisco with expertise in digital art and design",
        url: "about.html",
        type: "page"
      },
      {
        title: "Resume",
        content: "Professional experience, education, and skills in graphic design and illustration",
        url: "resume.html",
        type: "page"
      },
      {
        title: "Services",
        content: "Logo design, web design, branding, illustration, and creative services",
        url: "services.html",
        type: "page"
      },
      {
        title: "Portfolio",
        content: "Gallery of creative works including apps, products, branding, and web design",
        url: "portfolio.html",
        type: "page"
      },
      {
        title: "Contact",
        content: "Get in touch for collaborations and project inquiries",
        url: "contact.html",
        type: "page"
      },
      {
        title: "Graphic Design",
        content: "Professional graphic design services and portfolio examples",
        url: "services.html",
        type: "service"
      },
      {
        title: "Illustration",
        content: "Custom illustrations and digital art creations",
        url: "portfolio.html",
        type: "service"
      },
      {
        title: "Web Design",
        content: "Modern web design and user interface development",
        url: "portfolio.html",
        type: "service"
      }
    ];

    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();
      
      if (query === '') {
        searchResults.style.display = 'none';
        heroSection.style.display = 'block';
        return;
      }

      const results = searchData.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
      );

      if (results.length > 0) {
        searchResults.style.display = 'block';
        heroSection.style.display = 'none';
        
        searchResultsContent.innerHTML = results.map(result => `
          <div class="search-result-item">
            <h4><a href="${result.url}">${result.title}</a></h4>
            <p>${result.content}</p>
            <span class="badge">${result.type}</span>
          </div>
        `).join('');
      } else {
        searchResults.style.display = 'block';
        heroSection.style.display = 'none';
        searchResultsContent.innerHTML = '<p>No results found for "' + query + '"</p>';
      }
    });

    // Clear search when clicking outside
    document.addEventListener('click', function(e) {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        if (searchInput.value === '') {
          searchResults.style.display = 'none';
          heroSection.style.display = 'block';
        }
      }
    });
  }

  /**
   * Contact Form
   */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const loading = this.querySelector('.loading');
      const errorMessage = this.querySelector('.error-message');
      const sentMessage = this.querySelector('.sent-message');
      const submitBtn = this.querySelector('button[type="submit"]');
      
      // Show loading
      loading.style.display = 'block';
      errorMessage.style.display = 'none';
      sentMessage.style.display = 'none';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        loading.style.display = 'none';
        sentMessage.style.display = 'block';
        submitBtn.disabled = false;
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          sentMessage.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }

})();