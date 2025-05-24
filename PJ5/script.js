document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeSwitch = document.getElementById('theme-switch');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeSwitch.checked = currentTheme === 'dark';
    
    // Theme switch event
    themeSwitch.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateGlowEffects(newTheme);
    });
    
    // Update glow effects based on theme
    function updateGlowEffects(theme) {
        const glowColor = theme === 'dark' ? 'rgba(110, 72, 255, 0.5)' : 'rgba(110, 72, 255, 0.3)';
        document.querySelectorAll('.glow-on-hover').forEach(btn => {
            btn.style.setProperty('--glow-color', glowColor);
        });
    }
    
    // Initialize glow effects
    updateGlowEffects(currentTheme);

    // Course Filtering Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            courseCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-level') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Animate course cards on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.course-card, .feature-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.course-card, .feature-card, .testimonial-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run once on load
    animateOnScroll();
    
    // Then run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Simulate live market data updates
    function updateMarketData() {
        const forexPairs = [
            { pair: 'EUR/USD', volatility: 0.0005, current: 1.0854 },
            { pair: 'GOLD', volatility: 1.5, current: 2034.50 },
            { pair: 'NASDAQ', volatility: 15, current: 15450.67 },
            { pair: 'BTC/USD', volatility: 150, current: 42380.90 }
        ];
        
        const dataItems = document.querySelectorAll('.data-item');
        
        dataItems.forEach((item, index) => {
            if (index < forexPairs.length) {
                const pair = forexPairs[index];
                const change = (Math.random() - 0.5) * 2 * pair.volatility;
                const newValue = pair.current + change;
                pair.current = newValue;
                
                const valueElement = item.querySelector('.data-value');
                valueElement.innerHTML = pair.pair === 'GOLD' ? 
                    newValue.toFixed(2) : 
                    (pair.pair === 'BTC/USD' ? `$${newValue.toFixed(2)}` : newValue.toFixed(pair.pair === 'EUR/USD' ? 4 : 2));
                valueElement.innerHTML += ` <i class="fas ${change >= 0 ? 'fa-caret-up"></i>' : 'fa-caret-down"></i>'}`;
                
                // Update color class
                valueElement.classList.remove('up', 'down');
                valueElement.classList.add(change >= 0 ? 'up' : 'down');
            }
        });
    }
    
    // Update market data every 3 seconds for realistic trading feel
    setInterval(updateMarketData, 3000);
    updateMarketData(); // Initial update

    // Enrollment Modal System
    const enrollButtons = document.querySelectorAll('.enroll-button, .bundle-button');
    
    enrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isBundle = this.classList.contains('bundle-button');
            const parentCard = this.closest(isBundle ? '.bundle-card' : '.course-card');
            
            const title = parentCard.querySelector(isBundle ? 'h4' : 'h3').textContent;
            const price = parentCard.querySelector('.price').textContent;
            
            showEnrollmentModal(title, price, isBundle);
        });
    });

    function showEnrollmentModal(title, price, isBundle = false) {
        const modalHTML = `
            <div class="modal-overlay">
                <div class="enrollment-modal">
                    <button class="close-modal">&times;</button>
                    <h3>Enroll in "${title}"</h3>
                    <p class="modal-subtitle">${isBundle ? 'Premium bundle package' : 'Comprehensive trading course'}</p>
                    
                    <div class="modal-price">
                        <span class="price">${price}</span>
                        ${isBundle ? '' : '<span class="original-price">$997</span>'}
                    </div>
                    
                    <form class="enrollment-form">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="Your Name" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="your@email.com" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Payment Method</label>
                            <select>
                                <option>Credit/Debit Card</option>
                                <option>PayPal</option>
                                <option>Crypto (BTC/ETH)</option>
                                <option>Bank Transfer</option>
                            </select>
                        </div>
                        
                        <div class="payment-options">
                            <label class="payment-option">
                                <input type="radio" name="payment-plan" checked>
                                <span>One-Time Payment (${price})</span>
                            </label>
                            
                            <label class="payment-option">
                                <input type="radio" name="payment-plan">
                                <span>3 Monthly Payments (${Math.round(parseInt(price.replace(/[^0-9]/g,''))/3)})</span>
                            </label>
                        </div>
                        
                        <button type="submit" class="submit-btn glow-on-hover">
                            <i class="fas fa-lock"></i> Complete Enrollment
                        </button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Close modal
        document.querySelector('.close-modal').addEventListener('click', () => {
            document.querySelector('.modal-overlay').remove();
        });
        
        // Form submission
        document.querySelector('.enrollment-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate payment processing
            setTimeout(() => {
                document.querySelector('.enrollment-modal').innerHTML = `
                    <div class="success-message">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>Enrollment Successful!</h3>
                        <p>You now have full access to "${title}"</p>
                        <div class="success-details">
                            <p><i class="fas fa-envelope"></i> Check your email for login details</p>
                            <p><i class="fas fa-book"></i> Course materials are now available</p>
                        </div>
                        <button class="success-btn glow-on-hover">
                            Start Learning Now <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                `;
                
                document.querySelector('.success-btn').addEventListener('click', () => {
                    document.querySelector('.modal-overlay').remove();
                });
            }, 2000);
        });
    }

    // Hero chart floating animation
    const chart = document.querySelector('.glowing-chart');
    if (chart) {
        let floatY = 0;
        let floatDirection = 1;
        
        function floatAnimation() {
            floatY += 0.05 * floatDirection;
            
            if (floatY > 5) floatDirection = -1;
            if (floatY < -5) floatDirection = 1;
            
            chart.style.transform = `rotate(${floatY}deg)`;
            requestAnimationFrame(floatAnimation);
        }
        
        floatAnimation();
    }

    // Add hover effects to cards
    const interactiveCards = document.querySelectorAll('.course-card, .feature-card, .testimonial-card, .bundle-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(110, 72, 255, 0.5)';
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.transform = this.classList.contains('highlight') ? 'scale(1.05)' : '';
        });
    });

    // CTA button hover effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 25px rgba(110, 72, 255, 0.7)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
        
        ctaButton.addEventListener('click', function() {
            showEnrollmentModal("NICKFX Premium Membership", "$997", true);
        });
    }
});

// Add dynamic styles for modals and animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    /* Modal Styles */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        padding: 20px;
        opacity: 0;
        animation: fadeIn 0.3s forwards;
    }

    @keyframes fadeIn {
        to { opacity: 1; }
    }

    .enrollment-modal {
        background: var(--card-bg);
        backdrop-filter: blur(10px);
        padding: 30px;
        border-radius: var(--border-radius);
        max-width: 500px;
        width: 100%;
        position: relative;
        border: var(--glass-border);
        box-shadow: var(--glass-glow);
        transform: translateY(20px);
        animation: slideUp 0.4s forwards;
    }

    @keyframes slideUp {
        to { transform: translateY(0); }
    }

    .close-modal {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--text-color);
        transition: var(--transition);
    }

    .close-modal:hover {
        color: var(--accent-color);
    }

    .modal-subtitle {
        color: var(--secondary-color);
        margin-bottom: 20px;
        font-size: 16px;
    }

    .modal-price {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        margin-bottom: 30px;
    }

    .modal-price .price {
        font-size: 28px;
        font-weight: 700;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .modal-price .original-price {
        font-size: 18px;
        text-decoration: line-through;
        opacity: 0.6;
    }

    .enrollment-form {
        margin-top: 20px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        color: var(--text-color);
        opacity: 0.9;
    }

    .form-group input, 
    .form-group select {
        width: 100%;
        padding: 12px 15px;
        border-radius: var(--border-radius);
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
        color: var(--text-color);
        transition: var(--transition);
    }

    .form-group input:focus, 
    .form-group select:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 10px rgba(110, 72, 255, 0.3);
    }

    .payment-options {
        margin: 25px 0;
    }

    .payment-option {
        display: flex;
        align-items: center;
        padding: 15px;
        border-radius: var(--border-radius);
        background: rgba(255, 255, 255, 0.05);
        margin-bottom: 10px;
        cursor: pointer;
        transition: var(--transition);
    }

    .payment-option:hover {
        background: rgba(110, 72, 255, 0.1);
    }

    .payment-option input {
        margin-right: 10px;
    }

    .submit-btn {
        width: 100%;
        padding: 15px;
        border-radius: var(--border-radius);
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: white;
        border: none;
        font-size: 16px;
        cursor: pointer;
        transition: var(--transition);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .submit-btn:hover {
        box-shadow: 0 0 20px rgba(110, 72, 255, 0.5);
    }

    /* Success Message */
    .success-message {
        text-align: center;
        padding: 20px;
    }

    .success-icon {
        font-size: 60px;
        color: var(--success-color);
        margin-bottom: 20px;
    }

    .success-message h3 {
        margin-bottom: 15px;
    }

    .success-details {
        margin: 25px 0;
        text-align: left;
    }

    .success-details p {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
        font-size: 14px;
    }

    .success-btn {
        width: 100%;
        padding: 15px;
        border-radius: var(--border-radius);
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: white;
        border: none;
        font-size: 16px;
        cursor: pointer;
        transition: var(--transition);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
    }

    /* Glow Effect Variables */
    .glow-on-hover {
        --glow-color: rgba(110, 72, 255, 0.5);
        transition: box-shadow 0.3s ease;
    }

    .glow-on-hover:hover {
        box-shadow: 0 0 15px var(--glow-color);
    }
`;
document.head.appendChild(dynamicStyles);