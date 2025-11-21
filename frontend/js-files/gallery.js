// Use relative URL - automatically points to same domain
const API_URL = '/api';
let allGalleryItems = [];
let currentFilter = 'all';

// Load gallery on page load
window.addEventListener('load', async () => {
  console.log('Loading gallery...');
  await loadGalleryItems();
  setupEventListeners();
});

async function loadGalleryItems() {
  try {
    console.log('Fetching gallery items from API...');
    const response = await fetch(`${API_URL}/gallery`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch gallery items');
    }

    allGalleryItems = await response.json();
    console.log('Gallery items loaded:', allGalleryItems);

    // Hide loading state
    document.getElementById('loadingState').style.display = 'none';

    if (allGalleryItems.length === 0) {
      document.getElementById('emptyState').style.display = 'block';
      document.getElementById('galleryGrid').style.display = 'none';
      return;
    }

    document.getElementById('galleryGrid').style.display = 'grid';

    // Extract unique categories
    const categories = [...new Set(allGalleryItems.map(item => item.category).filter(Boolean))];
    console.log('Categories found:', categories);
    
    // Create category filter buttons
    createCategoryButtons(categories);
    
    // Display gallery
    displayGallery(allGalleryItems);
  } catch (err) {
    console.error('Error loading gallery:', err);
    document.getElementById('loadingState').innerHTML = '<p>Error loading gallery. Please refresh the page.</p>';
  }
}

function createCategoryButtons(categories) {
  const categoryButtonsContainer = document.getElementById('categoryButtons');
  categoryButtonsContainer.innerHTML = '';

  categories.forEach(category => {
    const button = document.createElement('button');
    button.className = 'filter-btn';
    button.textContent = category || 'Uncategorized';
    button.onclick = (e) => {
      e.preventDefault();
      filterGallery(category, button);
    };
    categoryButtonsContainer.appendChild(button);
  });
}

function filterGallery(category, buttonElement) {
  currentFilter = category;
  
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  if (buttonElement) {
    buttonElement.classList.add('active');
  } else {
    // If called from "All" button
    document.querySelectorAll('.filter-btn')[0].classList.add('active');
  }

  // Filter items
  let filteredItems;
  if (category === 'all') {
    filteredItems = allGalleryItems;
  } else {
    filteredItems = allGalleryItems.filter(item => item.category === category);
  }

  displayGallery(filteredItems);
}

function displayGallery(items) {
  const galleryGrid = document.getElementById('galleryGrid');
  
  if (items.length === 0) {
    galleryGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #999; padding: 40px 20px;">No items in this category</p>';
    return;
  }

  galleryGrid.innerHTML = items.map(item => `
    <div class="gallery-item" onclick="openModal('${item._id}')">
      <img src="http://localhost:5000/${item.image}" alt="${item.title}" class="gallery-item-image" onerror="this.src='https://via.placeholder.com/280x250?text=Image+Not+Found'">
      <div class="gallery-item-content">
        <h3 class="gallery-item-title">${item.title}</h3>
        <p class="gallery-item-description">${item.description || 'No description available'}</p>
        ${item.category ? `<span class="gallery-item-category">${item.category}</span>` : ''}
        <div class="gallery-item-footer">
          <button class="view-btn" onclick="openModal('${item._id}'); event.stopPropagation();">View Full</button>
        </div>
      </div>
    </div>
  `).join('');
}

function openModal(itemId) {
  const item = allGalleryItems.find(i => i._id === itemId);
  if (!item) return;

  const modal = document.getElementById('imageModal');
  document.getElementById('modalImage').src = `http://localhost:5000/${item.image}`;
  document.getElementById('modalTitle').textContent = item.title;
  document.getElementById('modalDescription').textContent = item.description || 'No description available';
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('imageModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function setupEventListeners() {
  // Close modal when clicking close button
  document.querySelector('.close-modal').addEventListener('click', closeModal);

  // Close modal when clicking outside
  document.getElementById('imageModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('imageModal')) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Setup hamburger menu
  setupMobileMenu();
}

function setupMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }
}
