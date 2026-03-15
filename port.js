const cursor = document.getElementById('cursor');
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    const fadeEls = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 100);
        }
      });
    }, { threshold: 0.1 });

    fadeEls.forEach(el => observer.observe(el));

    function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Send via EmailJS
  emailjs.send('service_72zz9oo', 'template_4bz2zsw', {
    name: name,
    email: email,
    subject: subject,
    message: message
  }, 'zLUk6xaEEFU-pL7AJ')
  .then(() => {
    btn.textContent = 'Message Sent ✓';
    btn.style.color = 'var(--accent)';

    // Also open WhatsApp
    const whatsappMsg = `Hi Emmy! My name is ${name} (${email}). Subject: ${subject}. Message: ${message}`;
    const whatsappURL = `https://wa.me/2347057126928?text=${encodeURIComponent(whatsappMsg)}`;
    window.open(whatsappURL, '_blank');

    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.color = '';
      btn.disabled = false;
      e.target.reset();
    }, 3000);
  })
  .catch((err) => {
    console.error('EmailJS error:', err);
    btn.textContent = 'Failed. Try again.';
    btn.style.color = 'red';
    btn.disabled = false;
  });
}