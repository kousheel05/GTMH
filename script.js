document.addEventListener('DOMContentLoaded', () => {
  // Notification Bar Logic
  const notificationBar = document.getElementById('notification-bar');
  const closeNotification = document.getElementById('close-notification');

  const now = new Date();
  const currentHour = now.getHours();

  // Show between 12 PM (12) and 11 PM (23)
  if (currentHour >= 12 && currentHour < 23) {
    notificationBar.style.display = 'block';
  }

  closeNotification.addEventListener('click', () => {
    notificationBar.style.display = 'none';
  });

  // Menu toggle functionality - Debug version
  console.log('Script loaded');

  // Wait for DOM to be fully loaded
  setTimeout(() => {
    const menuToggles = document.querySelectorAll('.menu-toggle');
    console.log('Found menu toggles:', menuToggles.length);

    menuToggles.forEach((toggle, index) => {
      console.log(`Toggle ${index}:`, toggle);
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Menu toggle clicked:', this.textContent);

        const menuItems = this.nextElementSibling;
        console.log('Next sibling:', menuItems);

        if (menuItems) {
          console.log('Current display:', menuItems.style.display);
          if (menuItems.style.display === 'block') {
            menuItems.style.display = 'none';
            console.log('Hiding menu');
          } else {
            menuItems.style.display = 'block';
            console.log('Showing menu');
          }
        } else {
          console.log('No menu items found');
        }
      });
    });
  }, 100);

  // Alternative approach using event delegation
  document.addEventListener('click', function(e) {
    if (e.target.matches('.menu-toggle')) {
      e.preventDefault();
      console.log('Event delegation - Menu toggle clicked');

      const menuItems = e.target.nextElementSibling;
      if (menuItems) {
        menuItems.style.display = menuItems.style.display === 'block' ? 'none' : 'block';
      }
    }
  });

  // Lightbox functionality
  const lightboxLinks = document.querySelectorAll('.lightbox');
  const lightboxOverlay = document.createElement('div');
  lightboxOverlay.id = 'lightbox-overlay';
  document.body.appendChild(lightboxOverlay);

  lightboxLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const img = document.createElement('img');
      img.src = link.href;
      lightboxOverlay.innerHTML = '';
      lightboxOverlay.appendChild(img);
      lightboxOverlay.style.display = 'flex';
    });
  });

  lightboxOverlay.addEventListener('click', () => {
    lightboxOverlay.style.display = 'none';
  });

  // Reservation form
  const reservationForm = document.querySelector('.reservation-form');
  if (reservationForm) {
    reservationForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const guests = document.getElementById('guests').value;
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message') ? document.getElementById('message').value.trim() : '';

      // Basic validation
      if (!name || !date || !time || !guests || !phone) {
        alert('Please fill out all required fields.');
        return;
      }

      // Phone validation
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
        alert('Please enter a valid 10-digit phone number.');
        return;
      }

      // Date validation (must be today or future)
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        alert('Please select a date from today onwards.');
        return;
      }

      const reservationData = {
        name,
        date,
        time,
        guests,
        phone,
        message,
        createdAt: new Date().toISOString()
      };

      // Show loading state
      const submitBtn = reservationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Reserving...';
      submitBtn.disabled = true;

      fetch('/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(`Error: ${data.error}`);
        } else {
          alert('🎉 Thank you! Your table has been reserved. We look forward to serving you.\n\nReservation Details:\n' +
                `Name: ${name}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\nPhone: ${phone}`);
          reservationForm.reset();
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your reservation. Please try again or call us directly at 96033363659.');
      })
      .finally(() => {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }
});
