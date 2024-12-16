//navegador sticky
const nav = document.querySelector('nav');
const navOffset = nav.offsetTop;

window.addEventListener('scroll', () => {
    if(window.pageYOffset >= navOffset) {
        nav.classList.add('sticky');
    }else{
        nav.classList.remove('sticky');
    }
})
//catalogo menos y mas
document.addEventListener("DOMContentLoaded", function() {
    var productContainers = document.querySelectorAll('.product');

    productContainers.forEach(function(container) {
        var minusButton = container.querySelector('.minus');
        var plusButton = container.querySelector('.plus');
        var quantityInput = container.querySelector('.quantity-input');

        function validateInput() {
            var value = parseInt(quantityInput.value);
            if (isNaN(value) || value < parseInt(quantityInput.min)) {
                quantityInput.value = quantityInput.min;
            } else if (value > parseInt(quantityInput.max)) {
                quantityInput.value = quantityInput.max;
            }
        }

        function allowNumericInput(event) {
            var input = event.target.value;
            event.target.value = input.replace(/\D/g, '');
        }

        minusButton.addEventListener('click', function() {
            var value = parseInt(quantityInput.value);
            if (value > parseInt(quantityInput.min)) {
                quantityInput.value = value - 1;
            }
            validateInput();
        });

        plusButton.addEventListener('click', function() {
            var value = parseInt(quantityInput.value);
            if (value < parseInt(quantityInput.max)) {
                quantityInput.value = value + 1;
            }
            validateInput();
        });

        quantityInput.addEventListener('input', allowNumericInput);
    });
});


//producto agregado al carro
document.addEventListener("DOMContentLoaded", function() {
    var stickyImage = document.getElementById('stickyImage');
    var popup = document.getElementById('popup');
    var closeBtn = document.getElementById('closeBtn');
    var addToCartButtons = document.querySelectorAll('.add-to-cart');
    var message = document.getElementById('message');
    var cartContent = document.getElementById('cart-content');
    var cart = [];

    stickyImage.addEventListener('click', function() {
        popup.classList.add('active');
        closeBtn.style.display = 'block'; 
        nextBtn.style.display = 'block'; 

        updateCartView();
    });

    closeBtn.addEventListener('click', function() {
        popup.classList.remove('active');
    });


    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            message.classList.add('show-message');
            setTimeout(function() {
                message.classList.remove('show-message');
            }, 500); 

            var productDiv = button.closest('.product');
            var name = productDiv.querySelector('h2').textContent;
            var price = parseInt(productDiv.querySelector('p').textContent.replace('$', '').replace('.', ''));
            var quantity = parseInt(productDiv.querySelector('.quantity-input').value);

            var existingItemIndex = cart.findIndex(function(item) {
                return item.name === name;
            });
            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += quantity;
            } else {
                cart.push({ name: name, price: price, quantity: quantity });
            }

            updateCartView();
        });
    });

    function updateCartView() {
        cartContent.innerHTML = '';
    
        var total = 0;
    
        if (cart.length === 0) {
            cartContent.textContent = 'Tu carrito está vacío';
        } else {
            cart.forEach(function(item, index) {
                var itemElement = document.createElement('div');
                itemElement.textContent = item.name + ' - Cantidad: ' + item.quantity + ' - Precio: ' + (item.price * item.quantity);
                
                var deleteButton = document.createElement('button');
                deleteButton.textContent = 'X';
                deleteButton.classList.add('delete-btn');
                deleteButton.addEventListener('click', function() {
                    cart.splice(index, 1); 
                    updateCartView(); 
                });
                itemElement.appendChild(deleteButton);
    
                cartContent.appendChild(itemElement);
    
                total += item.price * item.quantity; 
            });
    
            
            var totalElement = document.createElement('div');
            totalElement.textContent = 'Total: $' + total;
            cartContent.appendChild(totalElement);
        }
    }
    
});
//restriccion de NaN
document.addEventListener("DOMContentLoaded", function() {
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    quantityInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, ''); // Only allow numeric input
            if (this.value === '' || this.value < this.min) {
                this.value = this.min;
            } else if (this.value > this.max) {
                this.value = this.max;
            }
        });

        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.value = this.min;
            }
        });
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product');
            const quantityInput = product.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value, 10);
            if (isNaN(quantity) || quantity < 1) {
                alert('Cantidad inválida. Por favor, ingrese un valor válido.');
                quantityInput.value = 1;
                return;
            }


            addToCart(product, quantity);
        });
    });

    function addToCart(product, quantity) {
        const productName = product.querySelector('h2').textContent;
        const productPrice = parseFloat(product.querySelector('p').textContent.replace('$', '').replace('.', ''));
        const totalPrice = productPrice * quantity;

        console.log(`Producto: ${productName}, Cantidad: ${quantity}, Precio Total: $${totalPrice}`);
    }
});
//confirmar compra
document.addEventListener("DOMContentLoaded", function() {
    var nextBtn = document.getElementById('nextBtn');
    var confirmationPopup = document.getElementById('confirmationPopup');
    var backBtn = document.getElementById('backBtn');
    var confirmBtn = document.getElementById('confirmBtn');
    var popup = document.getElementById('popup');
    var closeBtn = document.getElementById('closeBtn');
    var cartContent = document.getElementById('cart-content');
    var purchaseForm = document.getElementById('purchaseForm');
    var errorMessage = document.getElementById('errorMessage');

    nextBtn.addEventListener('click', function() {
        if (cartContent.children.length > 1) {
            popup.classList.remove('active');
            confirmationPopup.classList.add('active');
            errorMessage.style.display = 'none';
        } else {
            alert("Tu carrito está vacío. Agrega productos antes de continuar.");
        }
    });

    backBtn.addEventListener('click', function() {
        confirmationPopup.classList.remove('active');
        popup.classList.add('active');
    });

    confirmBtn.addEventListener('click', function() {
        if (purchaseForm.checkValidity()) {
            var confirmPurchase = confirm("Desea confirmar la compra?");
            if (confirmPurchase) {
                confirmationPopup.classList.remove('active');
                popup.classList.remove('active');
                cartContent.innerHTML = '';
                purchaseForm.reset();
                alert("Compra confirmada");
            }
        } else {
            errorMessage.style.display = 'block';
            setTimeout(function() {
                errorMessage.style.display = 'none';
            }, 800);
        }
    });

    closeBtn.addEventListener('click', function() {
        popup.classList.remove('active');
    });
    purchaseForm.addEventListener('submit', function(event) {
        event.preventDefault();
    });
});



