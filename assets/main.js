// Ultra-Interactive Portfolio Features for Avdhesh Kumar Yadav

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenuLinks = document.getElementById('navMenuLinks');
  if (mobileMenuBtn && navMenuLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isVisible = navMenuLinks.style.display === 'flex';
      navMenuLinks.style.display = isVisible ? 'none' : 'flex';
      navMenuLinks.style.flexDirection = 'column';
      navMenuLinks.style.position = 'absolute';
      navMenuLinks.style.top = '65px';
      navMenuLinks.style.left = '20px';
      navMenuLinks.style.right = '20px';
      navMenuLinks.style.background = '#090e1a';
      navMenuLinks.style.padding = '20px';
      navMenuLinks.style.borderRadius = '16px';
      navMenuLinks.style.border = '1px solid rgba(255,255,255,0.1)';
      mobileMenuBtn.innerHTML = isVisible ? '☰' : '✕';
    });

    navMenuLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenuLinks.style.display = 'none';
          mobileMenuBtn.innerHTML = '☰';
        }
      });
    });
  }

  // Toast Functionality
  const toast = document.getElementById('floatingToast');
  const toastMsg = document.getElementById('floatingToastMsg');
  function showToast(message, duration = 4000) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, duration);
  }

  // One-click Copy Email
  document.querySelectorAll('.js-copy-email').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'avdheshky2002@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email copied to clipboard: ' + email);
      }).catch(() => {
        showToast('✓ Email: ' + email);
      });
    });
  });

  // Interactive Surge Pricing Simulator in Cholonaa Section
  const surgeSlider = document.getElementById('surgeSlider');
  const surgeMultiplierDisplay = document.getElementById('surgeMultiplierDisplay');
  const surgeDemandStatus = document.getElementById('surgeDemandStatus');
  const surgeDriversOnline = document.getElementById('surgeDriversOnline');

  if (surgeSlider && surgeMultiplierDisplay) {
    surgeSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      surgeMultiplierDisplay.textContent = `${val.toFixed(1)}x Surge`;
      
      if (val === 1.0) {
        surgeDemandStatus.textContent = 'Normal Demand (Balanced)';
        surgeDemandStatus.style.color = '#94a3b8';
        surgeDriversOnline.textContent = 'High Driver Density (45 online)';
        surgeMultiplierDisplay.style.color = '#38bdf8';
        surgeMultiplierDisplay.style.background = 'rgba(56, 189, 248, 0.15)';
      } else if (val <= 1.4) {
        surgeDemandStatus.textContent = 'Moderate Surge (Rain / Rush Hour)';
        surgeDemandStatus.style.color = '#34d399';
        surgeDriversOnline.textContent = 'Medium Density (22 online)';
        surgeMultiplierDisplay.style.color = '#34d399';
        surgeMultiplierDisplay.style.background = 'rgba(16, 185, 129, 0.15)';
      } else {
        surgeDemandStatus.textContent = 'Critical Surge (Severe Deficit)';
        surgeDemandStatus.style.color = '#f59e0b';
        surgeDriversOnline.textContent = 'Low Driver Density (8 online)';
        surgeMultiplierDisplay.style.color = '#f59e0b';
        surgeMultiplierDisplay.style.background = 'rgba(245, 158, 11, 0.2)';
      }
    });
  }

  // Quick Inquiry Preset Pills for Founders
  const quickPills = document.querySelectorAll('.quick-pill');
  const messageInput = document.getElementById('senderMessage');
  const projectTypeSelect = document.getElementById('projectTypeSelect');

  const presetTemplates = {
    mvp: {
      type: "Full MVP / 0-to-1 Build",
      text: "Hi Avdhesh, I'm a founder looking to build our MVP from scratch (web backend + mobile app). We want a robust architecture with quick time-to-market. Let's discuss scope and timeline."
    },
    mobility: {
      type: "Mobility / Ride-Hailing Platform",
      text: "Hi Avdhesh, saw your Cholonaa project with live rider app and surge engine! We need a custom mobility / dispatch app with real-time GPS tracking and dynamic fare logic."
    },
    saas: {
      type: "Enterprise SaaS / HRM Platform",
      text: "Hi Avdhesh, we're building an enterprise SaaS platform and need a lead developer with experience in multi-tenancy, AI APIs (like AWS Rekognition/OpenAI), and payment gateways."
    },
    consulting: {
      type: "Freelance Sprint / Feature Sprint",
      text: "Hi Avdhesh, looking to hire you for a dedicated sprint to architect high-performance APIs, optimize our complex database queries, and integrate key features."
    }
  };

  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      quickPills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');

      const key = pill.getAttribute('data-preset');
      const preset = presetTemplates[key];
      if (preset && messageInput && projectTypeSelect) {
        messageInput.value = preset.text;
        projectTypeSelect.value = preset.type;
        messageInput.focus();
        showToast('✓ Template pre-filled! You can edit or submit directly.');
      }
    });
  });

  // Bulletproof Direct Contact Form Submission (Direct Email to avdheshky2002@gmail.com)
  const contactForm = document.getElementById('founderContactForm');
  const submitBtn = contactForm?.querySelector('button[type="submit"]');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('senderName')?.value.trim() || 'Client';
      const email = document.getElementById('senderEmail')?.value.trim() || '';
      const projectType = document.getElementById('projectTypeSelect')?.value || 'Freelance / Full Build';
      const budget = document.getElementById('budgetSelect')?.value || 'Negotiable';
      const message = document.getElementById('senderMessage')?.value.trim() || '';

      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending email directly...</span> <svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>`;

      const subject = `[Project Inquiry] ${projectType} from ${name}`;
      const fullMessage = 
`Hello Avdhesh,

I reached out via your portfolio website regarding a prospective project.

══════════════════════════════════════════════════
INQUIRY DETAILS:
• Name / Entity: ${name}
• Email: ${email}
• Project Scope: ${projectType}
• Budget / Timeline: ${budget}
══════════════════════════════════════════════════

PROJECT DETAILS:
${message}

Looking forward to your response.

Best regards,
${name}`;

      // 1. Direct Web Gmail URL (universally works on desktop & web without needing Windows Mail / Outlook)
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=avdheshky2002@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullMessage)}`;

      // 2. Safe copy to clipboard so message is never lost
      navigator.clipboard.writeText(fullMessage).catch(() => {});

      let sentViaApi = false;

      // 3. If running on HTTP/HTTPS (like deployed https://ahviky02.github.io/), send direct AJAX email
      if (window.location.protocol.startsWith('http')) {
        try {
          const res = await fetch('https://formsubmit.co/ajax/avdheshky2002@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              email: email,
              scope: projectType,
              budget: budget,
              message: message,
              _subject: subject,
              _template: 'table'
            })
          });
          const data = await res.json();
          if (data && (data.success === 'true' || data.success === true)) {
            sentViaApi = true;
          }
        } catch (err) {
          console.warn('Direct API submission fallback to Web Gmail:', err);
        }
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;

      if (sentViaApi) {
        showToast('✅ Email sent directly to Avdhesh! Guaranteed reply within 12h.');
        contactForm.reset();
      } else {
        // Direct Web Gmail tab opening (works 100% in local file:/// and if offline)
        showToast('🚀 Opening Gmail with your prefilled message ready to send!');
        const win = window.open(gmailUrl, '_blank');
        if (!win || win.closed || typeof win.closed === 'undefined') {
          window.location.href = gmailUrl;
        }
      }
    });
  }

  // Quick Copy Draft & Email Button
  document.querySelectorAll('.js-copy-email-draft').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = document.getElementById('senderName')?.value.trim() || 'Client';
      const email = document.getElementById('senderEmail')?.value.trim() || '';
      const message = document.getElementById('senderMessage')?.value.trim() || 'Project inquiry';
      const fullText = `To: avdheshky2002@gmail.com\nFrom: ${name} (${email})\nMessage:\n${message}`;
      
      navigator.clipboard.writeText(fullText).then(() => {
        showToast('✓ Draft & email address copied to clipboard!');
      }).catch(() => {
        showToast('✓ Copied to clipboard!');
      });
    });
  });

  // Filter Projects by Category
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectCards = document.querySelectorAll('.portfolio-card-item');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cat = card.getAttribute('data-cat') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Deep-Dive Modal
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalInnerContent = document.getElementById('modalInnerContent');
  const modalClose = document.getElementById('modalCloseBtn');

  const caseData = {
    cholonaa: {
      badge: "🟢 RIDER APP LIVE · 🟡 DRIVER APP IN QA · ⚡ HIGH SCALE DISPATCH",
      title: "Cholonaa — High-Concurrency Ride Hailing Platform",
      body: `
        <div style="margin-top: 14px;">
          <img src="assets/cholonaa.jpg" alt="Cholonaa Platform" style="width: 100%; border-radius: 14px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 10px 30px rgba(0,0,0,0.8);" />
          
          <h3 style="color: #38bdf8; font-size: 1.25rem; margin-bottom: 10px;">Platform Architectural Blueprint</h3>
          <p style="color: #94a3b8; font-size: 0.96rem; line-height: 1.75; margin-bottom: 20px;">
            Engineered the complete multi-sided mobility network from zero to production. The platform connects urban riders with nearby drivers in sub-second latency, computing real-time surge pricing across dynamic geo-zones and handling trip transitions safely with zero double-booking.
          </p>

          <h4 style="color: #34d399; font-size: 1.05rem; margin-bottom: 8px;">Key Technical Innovations:</h4>
          <ul style="color: #cbd5e1; font-size: 0.92rem; line-height: 1.8; padding-left: 20px; margin-bottom: 24px;">
            <li><strong>Polygon Zone Surge Engine:</strong> Dynamic elasticity algorithm analyzing driver density against rider requests within geohash clusters, recalculating surge multipliers automatically every 60 seconds.</li>
            <li><strong>Live Rider App (Production Play Store):</strong> Real-time polyline routes, multi-tier ride calculation (Bike, Auto, Cab), coupon deductions, and live status stream.</li>
            <li><strong>Driver Partner App (QA Pending):</strong> Sound/vibration broadcast for new trip requests, 15-second acceptance timer with automatic cascade to subsequent drivers, and live earnings ledger.</li>
            <li><strong>High-Throughput Backend:</strong> Laravel Sanctum, MySQL geospatial indexing, and background queue workers ensuring immediate response times.</li>
          </ul>

          <a href="#contact" onclick="document.getElementById('modalBackdrop').classList.remove('active')" class="btn-linear-primary" style="display: inline-block;">
            Discuss Mobility App Architecture
          </a>
        </div>
      `
    },
    hrm: {
      badge: "⚡ 80%+ INDEPENDENTLY BUILT · 500+ USERS · PRODUCTION ENTERPRISE",
      title: "Enterprise Multi-Tenant HRM SaaS Platform",
      body: `
        <div style="margin-top: 14px;">
          <img src="hrm.jpeg" alt="HRM Dashboard" style="width: 100%; border-radius: 14px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 10px 30px rgba(0,0,0,0.8);" />
          
          <h3 style="color: #38bdf8; font-size: 1.25rem; margin-bottom: 10px;">Enterprise AI & Automated Payroll System</h3>
          <p style="color: #94a3b8; font-size: 0.96rem; line-height: 1.75; margin-bottom: 20px;">
            Independently designed and built more than 80% of this multi-tenant workforce management platform. Solved attendance bottleneck and manual data entry by deploying automated facial recognition and hardware device sync.
          </p>

          <h4 style="color: #34d399; font-size: 1.05rem; margin-bottom: 8px;">Core Enterprise Capabilities:</h4>
          <ul style="color: #cbd5e1; font-size: 0.92rem; line-height: 1.8; padding-left: 20px; margin-bottom: 24px;">
            <li><strong>AWS Rekognition AI Face Biometrics:</strong> 98% accuracy in real-time facial attendance check-in, decreasing HR manual attendance time by 85%.</li>
            <li><strong>OpenAI GPT Assistant:</strong> Internal LLM chatbot answering questions regarding salary breakups, leave policies, and official holidays.</li>
            <li><strong>ZKTeco Biometric Sync:</strong> Automated daemons syncing fingerprint records with MySQL without transaction locks.</li>
            <li><strong>Cashfree & WhatsApp:</strong> One-click automated salary payout pipeline with automated payslip generation and WhatsApp alert dispatches.</li>
          </ul>

          <a href="#contact" onclick="document.getElementById('modalBackdrop').classList.remove('active')" class="btn-linear-primary" style="display: inline-block;">
            Build Custom Enterprise SaaS
          </a>
        </div>
      `
    }
  };

  document.querySelectorAll('[data-open-case]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-open-case');
      const item = caseData[key];
      if (!item || !modalInnerContent || !modalBackdrop) return;

      modalInnerContent.innerHTML = `
        <span class="badge-live-store" style="margin-bottom: 12px; display: inline-block;">${item.badge}</span>
        <h2 style="font-family: 'Outfit', sans-serif; color: #fff; font-size: 2rem; font-weight: 800; letter-spacing: -0.02em;">${item.title}</h2>
        ${item.body}
      `;
      modalBackdrop.classList.add('active');
    });
  });

  if (modalClose && modalBackdrop) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') modalBackdrop.classList.remove('active');
    });
  }
});
