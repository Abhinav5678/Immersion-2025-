const productsContainer = document.getElementById('products');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const errorDiv = document.getElementById('error');

// Fetch and display all products on page load
window.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

// Handle search form submit
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    errorDiv.textContent = '';
    if (!query) {
        errorDiv.textContent = 'Search field cannot be empty.';
        return;
    }
    fetchProducts(query);
});

// Fetch products from API (all or by search)
function fetchProducts(query = '') {
    let url = 'https://dummyjson.com/products';
    if (query) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`;
    }
    productsContainer.innerHTML = '<p>Loading...</p>';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const products = data.products || [];
            if (products.length === 0) {
                productsContainer.innerHTML = '<p>No products found.</p>';
                return;
            }
            productsContainer.innerHTML = products.map(product => renderProduct(product)).join('');
        })
        .catch(() => {
            productsContainer.innerHTML = '<p>Failed to load products. Please try again later.</p>';
        });
}

// Render a single product card
function renderProduct(product) {
    return `
        <div class="product-card">
            <img src="${product.thumbnail}" alt="${product.title}">
            <div class="product-title">${product.title}</div>
            <div class="product-name">${product.brand || product.category || ''}</div>
            <div class="product-price">$${product.price}</div>
        </div>
    `;
} 