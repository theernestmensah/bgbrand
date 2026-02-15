/**
 * Interactive Authentication - BG Brand
 * Enhanced form validation, animations, and user feedback
 */

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { level: 'weak', color: '#ff4444', text: 'Weak' };
    if (strength <= 4) return { level: 'medium', color: '#ffa500', text: 'Medium' };
    return { level: 'strong', color: '#00c851', text: 'Strong' };
}

// Real-time email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show/hide password with animation
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = event.target.closest('.password-toggle').querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }

    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white border-0`;
    toastEl.style.background = type === 'success' ?
        'linear-gradient(135deg, #00c851 0%, #007e33 100%)' :
        'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    toastContainer.appendChild(toastEl);

    const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
    toast.show();

    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
    });
}

// Show inline error
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const parent = input.closest('.form-floating') || input.closest('.form-check');

    // Remove existing error
    const existingError = parent.querySelector('.error-message');
    if (existingError) existingError.remove();

    // Add new error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = 'color: #ff4444; font-size: 0.85rem; margin-top: 5px; animation: fadeIn 0.3s ease;';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle me-1"></i>${message}`;
    parent.appendChild(errorDiv);

    input.style.borderColor = '#ff4444';
}

// Clear error
function clearError(inputId) {
    const input = document.getElementById(inputId);
    const parent = input.closest('.form-floating') || input.closest('.form-check');
    const error = parent.querySelector('.error-message');
    if (error) error.remove();
    input.style.borderColor = '';
}

// Add password strength indicator
function addPasswordStrengthIndicator(inputId) {
    const input = document.getElementById(inputId);
    const parent = input.closest('.form-floating');

    // Check if indicator already exists
    if (parent.querySelector('.password-strength')) return;

    const strengthDiv = document.createElement('div');
    strengthDiv.className = 'password-strength';
    strengthDiv.style.cssText = 'margin-top: 8px; display: none;';
    strengthDiv.innerHTML = `
        <div class="d-flex align-items-center gap-2">
            <div class="strength-bar" style="flex: 1; height: 4px; background: #e0e0e0; border-radius: 2px; overflow: hidden;">
                <div class="strength-fill" style="height: 100%; width: 0%; transition: all 0.3s ease;"></div>
            </div>
            <span class="strength-text" style="font-size: 0.75rem; font-weight: 600;"></span>
        </div>
    `;
    parent.appendChild(strengthDiv);

    input.addEventListener('input', () => {
        const password = input.value;
        if (password.length === 0) {
            strengthDiv.style.display = 'none';
            return;
        }

        strengthDiv.style.display = 'block';
        const strength = checkPasswordStrength(password);
        const fill = strengthDiv.querySelector('.strength-fill');
        const text = strengthDiv.querySelector('.strength-text');

        const widths = { weak: '33%', medium: '66%', strong: '100%' };
        fill.style.width = widths[strength.level];
        fill.style.background = strength.color;
        text.textContent = strength.text;
        text.style.color = strength.color;
    });
}

// Initialize interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add password strength indicators
    addPasswordStrengthIndicator('signin-password');
    addPasswordStrengthIndicator('signup-password');

    // Real-time email validation
    ['signin-email', 'signup-email'].forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;

        input.addEventListener('blur', () => {
            if (input.value && !validateEmail(input.value)) {
                showError(id, 'Please enter a valid email address');
            } else {
                clearError(id);
            }
        });

        input.addEventListener('input', () => {
            if (input.value && validateEmail(input.value)) {
                clearError(id);
                input.style.borderColor = '#00c851';
            }
        });
    });

    // Tab switch animation
    const tabButtons = document.querySelectorAll('#authTabs button');
    tabButtons.forEach(button => {
        button.addEventListener('shown.bs.tab', (e) => {
            const target = document.querySelector(e.target.getAttribute('data-bs-target'));
            target.style.animation = 'fadeInUp 0.5s ease';
        });
    });
});

// Sign In Form Handler
document.getElementById('signin-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    const button = e.target.querySelector('button[type="submit"]');
    const originalHTML = button.innerHTML;

    // Validation
    if (!validateEmail(email)) {
        showError('signin-email', 'Please enter a valid email address');
        return;
    }

    if (password.length < 6) {
        showError('signin-password', 'Password must be at least 6 characters');
        return;
    }

    // Show loading state
    button.disabled = true;
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Signing in...';
    button.style.opacity = '0.8';

    try {
        // Sign in with Clerk
        const clerk = window.getClerk();
        if (!clerk) {
            throw new Error('Authentication service not ready. Please refresh the page.');
        }

        const result = await clerk.client.signIn.create({
            identifier: email,
            password: password,
        });

        if (result.status === 'complete') {
            await clerk.setActive({ session: result.createdSessionId });

            console.log('Sign in successful');
            showToast('Welcome back! Redirecting to your dashboard...', 'success');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // Handle additional verification steps if needed
            throw new Error('Sign in requires additional verification');
        }

    } catch (error) {
        console.error('Sign in error:', error);
        const errorMessage = error.errors?.[0]?.message || error.message || 'Invalid email or password. Please try again.';
        showToast(errorMessage, 'error');
        button.disabled = false;
        button.innerHTML = originalHTML;
        button.style.opacity = '1';
    }
});


// Sign Up Form Handler
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('signup-firstname').value.trim();
    const lastName = document.getElementById('signup-lastname').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const terms = document.getElementById('terms').checked;
    const button = e.target.querySelector('button[type="submit"]');
    const originalHTML = button.innerHTML;

    // Validation
    if (!firstName || !lastName) {
        showToast('Please enter your full name', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showError('signup-email', 'Please enter a valid email address');
        return;
    }

    const strength = checkPasswordStrength(password);
    if (strength.level === 'weak') {
        showError('signup-password', 'Please choose a stronger password');
        return;
    }

    if (!terms) {
        showToast('Please agree to the Terms and Privacy Policy', 'error');
        return;
    }

    // Show loading state
    button.disabled = true;
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Creating account...';
    button.style.opacity = '0.8';

    try {
        // Sign up with Clerk
        const clerk = window.getClerk();
        if (!clerk) {
            throw new Error('Authentication service not ready. Please refresh the page.');
        }

        const result = await clerk.client.signUp.create({
            emailAddress: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        });

        // Prepare email verification if needed
        if (result.status === 'missing_requirements') {
            // Send verification email
            await result.prepareEmailAddressVerification({ strategy: 'email_code' });
            showToast('Please check your email to verify your account', 'success');
            // You could redirect to a verification page here
        }

        if (result.status === 'complete') {
            await clerk.setActive({ session: result.createdSessionId });

            console.log('Sign up successful');
            showToast('🎉 Account created successfully! Welcome to BG Brand!', 'success');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }

    } catch (error) {
        console.error('Sign up error:', error);
        const errorMessage = error.errors?.[0]?.message || error.message || 'Something went wrong. Please try again.';
        showToast(errorMessage, 'error');
        button.disabled = false;
        button.innerHTML = originalHTML;
        button.style.opacity = '1';
    }
});


// Add input focus animations
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', () => {
        input.style.transform = 'translateY(-2px)';
        input.style.transition = 'all 0.3s ease';
    });

    input.addEventListener('blur', () => {
        input.style.transform = 'translateY(0)';
    });
});
