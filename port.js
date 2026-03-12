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
      btn.textContent = 'Message Sent ✓';
      btn.style.background = 'transparent';
      btn.style.color = 'var(--accent)';
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
        btn.style.color = '';
        e.target.reset();
      }, 3000);
    }