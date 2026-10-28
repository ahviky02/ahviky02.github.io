// Portfolio Interactions & Direct Email Handler for Avdhesh Kumar Yadav

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const isOpen = navLinks.classList.contains('mobile-open');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
    });
    
    // Close nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        mobileToggle.innerHTML = '☰';
      });
    });
  }

  // Toast helper
  function showToast(message, duration = 4000) {
    const toast = document.getElementById('toastNotice');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;
    
    toastMsg.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // One-click Copy Email
  const copyEmailBtns = document.querySelectorAll('.js-copy-email');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'avdheshky2002@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email copied to clipboard: ' + email);
      }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('✓ Email copied to clipboard: ' + email);
      });
    });
  });

  // Direct Contact Form Handler (CEO & Founder Direct Inquiry)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('senderName')?.value.trim() || 'Founder / Client';
      const email = document.getElementById('senderEmail')?.value.trim() || '';
      const projectType = document.getElementById('projectType')?.value || 'Freelance / Full-Scale Project';
      const budget = document.getElementById('budgetRange')?.value || 'Negotiable';
      const message = document.getElementById('senderMessage')?.value.trim() || '';
      
      const subject = encodeURIComponent(`Project Inquiry: ${projectType} from ${name}`);
      const bodyContent = 
`Hi Avdhesh,

I came across your portfolio and would like to discuss working together.

--- INQUIRY DETAILS ---
• Name / Company: ${name}
• Contact Email: ${email}
• Project Scope: ${projectType}
• Estimated Budget / Timeline: ${budget}

--- PROJECT OVERVIEW & GOALS ---
${message}

Looking forward to connecting with you.

Best regards,
${name}`;

      const mailtoUrl = `mailto:avdheshky2002@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
      
      // Copy formatted pitch to clipboard as backup
      navigator.clipboard.writeText(bodyContent).catch(() => {});
      
      showToast('🚀 Opening your email app! (Draft details also copied to clipboard)');
      
      // Trigger client
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 350);
    });
  }

  // Filter Projects by Category
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-cat]');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const cat = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        if (cat === 'all' || cardCat.includes(cat)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Case Studies Handler
  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  
  const caseStudiesData = {
    cholonaa: {
      title: "Cholonaa — Complete Ride-Hailing Mobility Ecosystem",
      badge: "🟢 Rider App Live on Play Store | 🟡 Driver App Pending Staging QA",
      content: `
        <div style="margin-bottom: 20px;">
          <img src="assets/cholonaa.jpg" alt="Cholonaa Platform" style="width: 100%; border-radius: 12px; margin-bottom: 16px; border: 1px solid rgba(255,255,255,0.1);" />
          <h4 style="color: #38bdf8; font-size: 1.15rem; margin-bottom: 10px;">Executive Summary & Architecture</h4>
          <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.7; margin-bottom: 16px;">
            Cholonaa is an on-demand mobility platform engineered to handle real-time geospatial routing, ride matchmaking, and automated dynamic surge pricing across dense urban sectors. Built entirely from scratch, the architecture encompasses high-concurrency Laravel REST APIs, MySQL database schemas, and Flutter cross-platform mobile apps for riders and driver-partners.
          </p>
          
          <h4 style="color: #10b981; font-size: 1.05rem; margin-bottom: 8px;">Key Engineering Milestones Delivered:</h4>
          <ul style="color: #cbd5e1; font-size: 0.9rem; line-height: 1.8; padding-left: 20px; margin-bottom: 18px;">
            <li><strong>Dynamic Polygon Zone Surge Engine:</strong> Engineered zone-based algorithms that calculate supply-demand elasticity and automatically apply multiplier coefficients (1.2x – 2.0x) during peak hours.</li>
            <li><strong>Rider App (Production Live):</strong> Live GPS tracking, interactive fare estimator, vehicle type selector (Bike, Auto, Cab), and trip status notifications.</li>
            <li><strong>Driver Partner App (QA Pending):</strong> Automated dispatch queue with timed ride accept/reject cards, turnaround routing, and instant earnings dashboard.</li>
            <li><strong>High-Throughput Backend:</strong> Sanctum authentication, geohash spatial indexing, optimized queries for fast driver lookup within radius, and automated fare calculation.</li>
          </ul>

          <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px;">
            <a href="#contact" onclick="document.getElementById('modalOverlay').classList.remove('open')" class="btn-primary" style="padding: 10px 20px; font-size: 0.9rem;">
              Discuss Mobility / Ride-Hailing Project
            </a>
          </div>
        </div>
      `
    },
    hrm: {
      title: "Enterprise Multi-Tenant HRM SaaS (500+ Active Users)",
      badge: "⚡ 80%+ Built Independently | Production Enterprise System",
      content: `
        <div style="margin-bottom: 20px;">
          <img src="hrm.jpeg" alt="HRM Dashboard" style="width: 100%; border-radius: 12px; margin-bottom: 16px; border: 1px solid rgba(255,255,255,0.1);" />
          <h4 style="color: #38bdf8; font-size: 1.15rem; margin-bottom: 10px;">Enterprise Scalability & AI Automation</h4>
          <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.7; margin-bottom: 16px;">
            Engineered an end-to-end Human Resource Management platform supporting over 500 enterprise personnel. Replaced traditional legacy spreadsheet tracking with real-time biometric synchronization, computer vision face verification, and GPT-driven natural language employee helpdesk.
          </p>

          <h4 style="color: #10b981; font-size: 1.05rem; margin-bottom: 8px;">Key System Capabilities:</h4>
          <ul style="color: #cbd5e1; font-size: 0.9rem; line-height: 1.8; padding-left: 20px; margin-bottom: 18px;">
            <li><strong>AWS Rekognition AI Face Attendance:</strong> Replaced physical queues with seamless camera enrollment and facial recognition, achieving 98% accuracy and cutting manual HR time by 85%.</li>
            <li><strong>Hardware Biometrics Integration:</strong> Connected ZKTeco attendance devices directly with automated MySQL sync scripts running on background daemons.</li>
            <li><strong>GPT-Powered AI Employee Chatbot:</strong> Integrated OpenAI API allowing staff to query PTO, salary breakdown, and policy docs naturally.</li>
            <li><strong>Fintech & Communication:</strong> Automated payroll distribution via Cashfree API, S3 cloud document archival, and WhatsApp notification dispatch.</li>
          </ul>

          <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px;">
            <a href="#contact" onclick="document.getElementById('modalOverlay').classList.remove('open')" class="btn-primary" style="padding: 10px 20px; font-size: 0.9rem;">
              Hire for Enterprise / SaaS Development
            </a>
          </div>
        </div>
      `
    }
  };

  document.querySelectorAll('[data-case]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const caseKey = btn.getAttribute('data-case');
      const item = caseStudiesData[caseKey];
      if (!item || !modalContent) return;
      
      modalContent.innerHTML = `
        <span class="badge-live-prod" style="margin-bottom: 12px; display: inline-block;">${item.badge}</span>
        <h2 style="color: #fff; font-size: 1.8rem; font-weight: 800; margin-bottom: 16px; letter-spacing: -0.02em;">${item.title}</h2>
        ${item.content}
      `;
      modalOverlay.classList.add('open');
    });
  });

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
    });
    
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('open');
      }
    });
  }

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay) {
      modalOverlay.classList.remove('open');
    }
  });
});
