// ========================================================
// Subh Yadav - Portfolio JavaScript
// Clean and beginner-friendly JavaScript
// ========================================================

// 1. Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking any nav link
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// 2. Light / Dark Theme Switcher
const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');

// Check saved theme in localStorage
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const activeTheme = document.body.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
}

// 3. Contact Form Submission (Sends REAL emails to yadavshubh839@gmail.com via FormSubmit)
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Stop normal page reload

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (name === '' || email === '' || message === '') {
      formFeedback.textContent = 'Please fill out all the fields.';
      formFeedback.className = 'form-feedback error';
      return;
    }

    // Indicate that the email is sending
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending Message...';
    submitBtn.disabled = true;

    // Send data to FormSubmit API (which delivers directly to yadavshubh839@gmail.com)
    const formData = new FormData(contactForm);

    fetch('https://formsubmit.co/ajax/yadavshubh839@gmail.com', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;

        formFeedback.textContent = `Thank you, ${name}! Your message has been sent to Subh's email inbox.`;
        formFeedback.className = 'form-feedback success';

        // Clear the form fields
        contactForm.reset();

        // Hide success message after 7 seconds
        setTimeout(() => {
          formFeedback.textContent = '';
          formFeedback.className = 'form-feedback';
        }, 7000);
      })
      .catch(error => {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;

        formFeedback.textContent = 'Oops! There was an issue sending your message. Please try again.';
        formFeedback.className = 'form-feedback error';
      });
  });
}

// 4. Automatically display current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
