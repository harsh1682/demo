// Sample product data
const products = [
  {
    id: 1,
    name: "Fresh Chicken Breast",
    category: "chicken",
    price: "₹280/kg",
    description: "Boneless, skinless chicken breast - perfect for healthy meals",
    icon: "🐔",
    badge: "Popular"
  },
  {
    id: 2,
    name: "Chicken Drumsticks",
    category: "chicken", 
    price: "₹200/kg",
    description: "Juicy chicken drumsticks - great for grilling and curry",
    icon: "🍗",
    badge: "Fresh"
  },
  {
    id: 3,
    name: "Pork Shoulder",
    category: "pork",
    price: "₹350/kg",
    description: "Premium pork shoulder cuts - ideal for roasting",
    icon: "🥩",
    badge: "Premium"
  },
  {
    id: 4,
    name: "Pork Ribs",
    category: "pork",
    price: "₹400/kg",
    description: "Tender pork ribs - perfect for BBQ and smoking",
    icon: "🍖",
    badge: "BBQ Special"
  },
  {
    id: 5,
    name: "Mutton Leg",
    category: "mutton",
    price: "₹550/kg",
    description: "Fresh mutton leg pieces - excellent for curry and biryani",
    icon: "🐑",
    badge: "Fresh"
  },
  {
    id: 6,
    name: "Mutton Chops",
    category: "mutton",
    price: "₹580/kg",
    description: "Premium mutton chops - perfect for special occasions",
    icon: "🥩",
    badge: "Premium"
  }
];

// DOM elements
const productsGrid = document.getElementById('products-grid');
const categoryButtons = document.querySelectorAll('.category');
const navLinks = document.querySelectorAll('.nav-link');
const splash = document.getElementById('splash-screen');
const mainContent = document.getElementById('main-content');

// Render products function
function renderProducts(filterCategory = 'all') {
  const filteredProducts = filterCategory === 'all' 
    ? products 
    : products.filter(product => product.category === filterCategory);
  
  productsGrid.innerHTML = filteredProducts.map(product => `
    <div class="product-card" data-category="${product.category}">
      <div class="product-image">
        ${product.icon}
        <div class="product-badge">${product.badge}</div>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-price">
          <span class="price">${product.price}</span>
          <button class="order-btn" onclick="orderProduct('${product.name}')">Order Now</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Category filtering functionality
function initializeCategoryFilters() {
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Filter and render products
      renderProducts(button.dataset.cat);
    });
  });
}

// Order function - opens WhatsApp with pre-filled message
function orderProduct(productName) {
  const message = `Hi! I'd like to order ${productName}. Please let me know the availability and total price.`;
  const whatsappUrl = `https://wa.me/919056551682?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

// Smooth scrolling navigation
function initializeNavigation() {
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get target section
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Smooth scroll to section
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
      
      // Update active nav link
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// Splash screen functionality
function initializeSplashScreen() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      splash.style.opacity = '0';
      splash.style.pointerEvents = 'none';
      mainContent.style.display = 'block';
      
      // Remove splash screen from DOM after transition
      setTimeout(() => {
        splash.style.display = 'none';
      }, 800);
    }, 2500); // Show splash for 2.5 seconds
  });
}

// Scroll-based navigation highlighting
function initializeScrollNavigation() {
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        
        // Add active class to corresponding nav link
        const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  });
}

// Add fade-in animation for elements
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.feature-card, .product-card, .info-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Add product to favorites (for future enhancement)
function toggleFavorite(productId) {
  // This function can be expanded to handle favorites
  console.log(`Toggle favorite for product ${productId}`);
}

// Search functionality (for future enhancement)
function searchProducts(searchTerm) {
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Re-render products with search results
  productsGrid.innerHTML = filteredProducts.map(product => `
    <div class="product-card" data-category="${product.category}">
      <div class="product-image">
        ${product.icon}
        <div class="product-badge">${product.badge}</div>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-price">
          <span class="price">${product.price}</span>
          <button class="order-btn" onclick="orderProduct('${product.name}')">Order Now</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  renderProducts();
  initializeCategoryFilters();
  initializeNavigation();
  initializeSplashScreen();
  initializeScrollNavigation();
  initializeAnimations();
});

// Export functions for potential external use
window.ButcherBuddy = {
  orderProduct,
  searchProducts,
  toggleFavorite,
  renderProducts
};
