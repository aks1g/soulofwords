const API_URL = '/api';

// Check authentication on page load
window.addEventListener('load', async () => {
  console.log('Admin panel loading...');
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    console.log('No token found, redirecting to login');
    window.location.href = 'login.html';
    return;
  }

  console.log('Token found, verifying...');
  
  // Verify token validity
  try {
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Verification response:', response.status);
    
    if (!response.ok) {
      console.log('Token verification failed');
      localStorage.removeItem('adminToken');
      window.location.href = 'login.html';
      return;
    }

    const data = await response.json();
    console.log('Token verified:', data);
    
    // Display user name - updated logic
    let userName = localStorage.getItem('userName');
    console.log('Retrieved userName from localStorage:', userName);
    
    if (!userName || userName === 'Loading...') {
      // Fallback to email if name not available
      const userEmail = localStorage.getItem('userEmail');
      console.log('Retrieved userEmail from localStorage:', userEmail);
      
      if (userEmail) {
        userName = userEmail.split('@')[0];
      } else {
        userName = 'Admin';
      }
    }
    
    console.log('Final userName to display:', userName);
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
      userNameElement.textContent = userName;
      userNameElement.style.display = 'block';
    }
    
    // Token is valid, initialize dashboard
    initializeDashboard();
  } catch (err) {
    console.error('Auth verification error:', err);
    localStorage.removeItem('adminToken');
    window.location.href = 'login.html';
  }
});

function initializeDashboard() {
  console.log('Initializing dashboard...');
  
  // Tab switching
  document.querySelectorAll('.tab-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
      document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
      
      const tabId = link.getAttribute('href').substring(1);
      document.getElementById(tabId).classList.add('active');
      link.classList.add('active');
    });
  });

  // Load initial data
  loadGallery();
  loadProducts();
  loadStats();

  // Gallery form
  document.getElementById('galleryForm').addEventListener('submit', handleAddGallery);
  document.getElementById('productForm').addEventListener('submit', handleAddProduct);
  
  console.log('Dashboard initialized successfully');
}

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
});

function toggleGalleryForm() {
  document.getElementById('galleryForm').classList.toggle('form-hidden');
}

function toggleProductForm() {
  document.getElementById('productForm').classList.toggle('form-hidden');
}

async function handleAddGallery(e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append('title', document.getElementById('galTitle').value);
  formData.append('description', document.getElementById('galDescription').value);
  formData.append('image', document.getElementById('galImage').files[0]);
  formData.append('category', document.getElementById('galCategory').value);

  try {
    const response = await fetch(`${API_URL}/gallery`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData
    });
    
    if (response.ok) {
      alert('Gallery item added!');
      document.getElementById('galleryForm').reset();
      document.getElementById('galleryForm').classList.add('form-hidden');
      loadGallery();
    } else {
      const error = await response.json();
      alert('Error: ' + (error.message || 'Failed to add gallery item'));
    }
  } catch (err) {
    console.error(err);
    alert('Connection error');
  }
}

async function loadGallery() {
  try {
    const response = await fetch(`${API_URL}/gallery`);
    const items = await response.json();
    const list = document.getElementById('galleryList');
    
    if (items.length === 0) {
      list.innerHTML = '<p style="text-align: center; padding: 20px;">No gallery items yet</p>';
      return;
    }

    list.innerHTML = items.map(item => `
      <div class="item-card">
        <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/250x200?text=Image+Not+Found'">
        <div class="item-card-content">
          <h3>${item.title}</h3>
          <p>${item.description || 'No description'}</p>
          <p class="category"><strong>Category:</strong> ${item.category || 'N/A'}</p>
          <div class="item-actions">
            <button class="btn-delete" onclick="deleteGallery('${item._id}')">Delete</button>
          </div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error(err);
  }
}

async function deleteGallery(id) {
  if (confirm('Are you sure you want to delete this item?')) {
    try {
      const response = await fetch(`${API_URL}/gallery/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        alert('Gallery item deleted!');
        loadGallery();
      } else {
        alert('Error deleting item');
      }
    } catch (err) {
      console.error(err);
      alert('Connection error');
    }
  }
}

async function handleAddProduct(e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append('name', document.getElementById('prodName').value);
  formData.append('description', document.getElementById('prodDescription').value);
  formData.append('price', document.getElementById('prodPrice').value);
  formData.append('image', document.getElementById('prodImage').files[0]);
  formData.append('category', document.getElementById('prodCategory').value);
  formData.append('stock', document.getElementById('prodStock').value);

  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData
    });
    
    if (response.ok) {
      alert('Product added!');
      document.getElementById('productForm').reset();
      document.getElementById('productForm').classList.add('form-hidden');
      loadProducts();
    } else {
      const error = await response.json();
      alert('Error: ' + (error.message || 'Failed to add product'));
    }
  } catch (err) {
    console.error(err);
    alert('Connection error');
  }
}

async function loadProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    const items = await response.json();
    const list = document.getElementById('productList');
    
    if (items.length === 0) {
      list.innerHTML = '<p style="text-align: center; padding: 20px;">No products yet</p>';
      return;
    }

    list.innerHTML = items.map(item => `
      <div class="item-card">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/250x200?text=Image+Not+Found'">
        <div class="item-card-content">
          <h3>${item.name}</h3>
          <p>${item.description || 'No description'}</p>
          <p><strong>Price:</strong> ₹${item.price}</p>
          <p><strong>Stock:</strong> ${item.stock}</p>
          <p class="category"><strong>Category:</strong> ${item.category || 'N/A'}</p>
          <div class="item-actions">
            <button class="btn-delete" onclick="deleteProduct('${item._id}')">Delete</button>
          </div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error(err);
  }
}

async function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        alert('Product deleted!');
        loadProducts();
      } else {
        alert('Error deleting product');
      }
    } catch (err) {
      console.error(err);
      alert('Connection error');
    }
  }
}

async function loadStats() {
  try {
    const response = await fetch(`${API_URL}/admin/stats`, {
      headers: getAuthHeaders()
    });
    
    if (response.ok) {
      const stats = await response.json();
      if (document.getElementById('adminCount')) {
        document.getElementById('adminCount').textContent = stats.admins;
        document.getElementById('galleryCount').textContent = stats.galleries;
        document.getElementById('productCount').textContent = stats.products;
      }
    }
  } catch (err) {
    console.error('Stats error:', err);
  }
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    window.location.href = 'login.html';
  }
}
