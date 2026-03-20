// ====== THEME TOGGLE FUNCTIONALITY ======

// Create Theme Toggle Button
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.setAttribute('aria-label', 'Toggle dark/light theme');
document.body.appendChild(themeToggle);

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// Set initial icon based on theme
function updateToggleIcon(theme) {
    if (theme === 'dark') {
        themeToggle.innerHTML = '🌙';
    } else {
        themeToggle.innerHTML = '☀️';
    }
}

updateToggleIcon(savedTheme);

// Toggle theme on click
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    updateToggleIcon(newTheme);
});

// ====== STICKY BUTTON BEHAVIOR (Shows on scroll/hover) ======

let lastScrollTop = 0;
let scrollTimeout;
let isHovering = false;

// Hide button initially
themeToggle.style.opacity = '0';
themeToggle.style.visibility = 'hidden';
themeToggle.style.transform = 'translateY(-20px)';

// Function to show button
function showToggleButton() {
    themeToggle.style.opacity = '1';
    themeToggle.style.visibility = 'visible';
    themeToggle.style.transform = 'translateY(0)';
    
    // Auto hide after 2 seconds of no scrolling
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (!isHovering) {
            hideToggleButton();
        }
    }, 2000);
}

// Function to hide button
function hideToggleButton() {
    if (!isHovering) {
        themeToggle.style.opacity = '0';
        themeToggle.style.visibility = 'hidden';
        themeToggle.style.transform = 'translateY(-20px)';
    }
}

// Show on scroll
window.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show button when scrolling down more than 50px
    if (currentScrollTop > 50) {
        showToggleButton();
    } else {
        // If at top of page, hide after delay
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (!isHovering && currentScrollTop <= 50) {
                hideToggleButton();
            }
        }, 1000);
    }
    
    lastScrollTop = currentScrollTop;
});

// Show on mouse enter (hover)
themeToggle.addEventListener('mouseenter', () => {
    isHovering = true;
    showToggleButton();
});

// Hide on mouse leave
themeToggle.addEventListener('mouseleave', () => {
    isHovering = false;
    // Hide after a short delay
    setTimeout(() => {
        if (!isHovering) {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScrollTop <= 50) {
                hideToggleButton();
            } else {
                // If scrolled down, hide after 2 seconds
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    if (!isHovering) {
                        hideToggleButton();
                    }
                }, 2000);
            }
        }
    }, 300);
});

// ====== SMOOTH SCROLL FOR NAVIGATION ======

document.querySelectorAll('.site-nav a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ====== CONTACT FORM MOCK SUBMISSION ======

const form = document.getElementById('contactForm');
const messageBox = document.getElementById('formMessage');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        messageBox.textContent = "Thank you for reaching out! I'll get back to you soon.";
        messageBox.style.color = "#28a745";
        form.reset();
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            if (messageBox) {
                messageBox.textContent = "";
            }
        }, 5000);
    });
}

// ====== INITIALIZE LUCIDE ICONS (if needed) ======

if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// ====== ADDITIONAL: Update button position styling ======

// Add additional CSS for the button positioning (top right below nav)
const buttonStyle = document.createElement('style');
buttonStyle.textContent = `
    .theme-toggle {
        position: fixed;
        top: 90px;
        right: 30px;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: var(--accent-color, #ffc107);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        color: var(--dark-bg-color, #212529);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-20px);
        font-size: 20px;
        line-height: 1;
        padding: 0;
    }
    
    .theme-toggle:hover {
        transform: scale(1.1) rotate(10deg);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    
    /* Light theme button styling */
    [data-theme="light"] .theme-toggle {
        background: var(--accent-color, #ffc107);
        color: #212529;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    
    [data-theme="light"] .theme-toggle:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    /* Dark theme button styling */
    [data-theme="dark"] .theme-toggle {
        background: var(--accent-color, #ffc107);
        color: #212529;
        box-shadow: 0 2px 8px rgba(255, 193, 7, 0.3);
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
        .theme-toggle {
            top: 80px;
            right: 20px;
            width: 34px;
            height: 34px;
            font-size: 18px;
        }
    }
    
    @media (max-width: 480px) {
        .theme-toggle {
            top: 70px;
            right: 15px;
            width: 32px;
            height: 32px;
            font-size: 16px;
        }
    }
`;
document.head.appendChild(buttonStyle);