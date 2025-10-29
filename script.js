// Simple interactivity for category buttons
document.querySelectorAll('.category-btn').forEach(button => {
  button.addEventListener('click', function () {
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    this.classList.add('active');
  });
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function () {
    const badge = document.querySelector('.cart-badge');
    let count = parseInt(badge.textContent);
    badge.textContent = count + 1;

    // Simple animation feedback
    const originalText = this.textContent;
    this.textContent = 'Added!';
    this.style.background = 'var(--success)';

    setTimeout(() => {
      this.textContent = originalText;
      this.style.background = '';
    }, 1500);
  });
});

// Update active nav link based on current page
document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});