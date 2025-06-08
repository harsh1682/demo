<script>
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

    // Render products
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

    // Category filtering
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderProducts(button.dataset.cat);
      });
    });

    // Order function
    function orderProduct(productName) {
      const message = `Hi! I'd like to order ${productName}. Please let me know the availability and total price.`;
      const whatsappUrl = `https://wa.me/919056551682?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }

    // Smooth scrolling for navigation
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Update active nav link
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // Splash screen
    window.addEventListener('load', () => {
      setTimeout(() => {
        splash.style.opacity = '0';
        splash.style.pointerEvents = 'none';
        mainContent.style.display = 'block';
        setTimeout(() => {
          splash.style.display = 'none';
        }, 800);
      }, 2500);
    });

    // Initialize
    renderProducts();
  </script>
