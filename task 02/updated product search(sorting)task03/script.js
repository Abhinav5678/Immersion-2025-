const productsContainer = document.getElementById('products');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const errorDiv = document.getElementById('error');
const sortSelect = document.getElementById('sortSelect');
let lastProducts = [];

window.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});


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


sortSelect.addEventListener('change', function () {
    renderProducts(lastProducts);
});

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
            lastProducts = products;
            renderProducts(products);
        })
        .catch(() => {
            productsContainer.innerHTML = '<p>Failed to load products. Please try again later.</p>';
        });
}


function renderProducts(products) {
    let sortedProducts = [...products];
    const sortValue = sortSelect.value;
    if (sortValue === 'price-asc') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'rating-asc') {
        sortedProducts.sort((a, b) => a.rating - b.rating);
    } else if (sortValue === 'rating-desc') {
        sortedProducts.sort((a, b) => b.rating - a.rating);
    }
    if (sortedProducts.length === 0) {
        productsContainer.innerHTML = '<p>No products found.</p>';
        return;
    }
    productsContainer.innerHTML = sortedProducts.map(product => renderProduct(product)).join('');
}


function renderProduct(product) {
    return `
        <div class="product-card">
            <img src="${product.thumbnail}" alt="${product.title}">
            <div class="product-title">${product.title}</div>
            <div class="product-name">${product.brand || product.category || ''}</div>
            <div class="product-price">$${product.price}</div>
            <div class="product-rating">Rating: ${product.rating}</div>
        </div>
    `;
} 