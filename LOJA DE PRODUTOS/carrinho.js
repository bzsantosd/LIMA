document.addEventListener('DOMContentLoaded', () => {
    // Select all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartIcon = document.querySelector('.cart-icon a');

    let cartItems = [];

    // Function to update the cart icon with the number of items
    function updateCartIcon() {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        if (totalItems > 0) {
            cartIcon.setAttribute('data-count', totalItems);
            cartIcon.classList.add('has-items');
        } else {
            cartIcon.removeAttribute('data-count');
            cartIcon.classList.remove('has-items');
        }
    }

    // Function to add a product to the cart
    function addToCart(event) {
        const productCard = event.target.closest('.product-card');
        if (!productCard) return;

        const productName = productCard.querySelector('.product-name').textContent;
        const productPriceText = productCard.querySelector('.product-price').textContent;
        const productPrice = parseFloat(productPriceText.replace('R$', '').replace(',', '.').trim());
        const productImageSrc = productCard.querySelector('.product-image').getAttribute('src');

        const existingItem = cartItems.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({
                name: productName,
                price: productPrice,
                quantity: 1,
                image: productImageSrc
            });
        }
        
        console.log('Item added to cart:', productName);
        console.log('Current cart:', cartItems);
        updateCartIcon();
        alert(`${productName} foi adicionado ao carrinho!`);
    }

    // Add click event listener to each button
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Initial update of the cart icon
    updateCartIcon();
});

