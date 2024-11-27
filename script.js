// Define the searchProducts function
function searchProducts() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const productCards = document.querySelectorAll(".product-card");

  // Loop through each product card and check if it matches the search input
  productCards.forEach((card) => {
    const productName = card.querySelector("h3").textContent.toLowerCase();

    // Show or hide the product card based on search input
    if (productName.includes(searchInput)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
