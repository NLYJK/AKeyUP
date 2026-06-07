/**
 * AKeyUP Global Cookie & Privacy Permission Controller
 * Dynamically enforces acceptance verification across all active web endpoints.
 */
(function() {
  // Inject required popup functional CSS rules directly into document header
  const style = document.createElement('style');
  style.textContent = `
    .privacy-popup-global {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.9) !important;
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      padding: 20px;
    }
    .privacy-box-global {
      width: min(420px, 100%);
      background: #0a0a0a !important;
      border: 1px solid #222222 !important;
      border-radius: 24px;
      padding: 32px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.8);
      animation: popupFadeGlobal 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes popupFadeGlobal {
      from { opacity: 0; transform: scale(0.95) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
  `;
  document.head.appendChild(style);

  // Initialize display logic upon DOM readystate confirmation
  window.addEventListener("DOMContentLoaded", function() {
    const isAccepted = localStorage.getItem("cookiePrivacyAccepted");
    
    if (isAccepted !== "true") {
      // Build popup DOM elements structure
      const popupEl = document.createElement('div');
      popupEl.className = 'privacy-popup-global';
      popupEl.id = 'globalPrivacyPopup';
      
      popupEl.innerHTML = `
        <div class="privacy-box-global">
          <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="color: #f5f5f7; border: none; padding: 0; font-size: 1.4rem; margin: 0 0 12px 0; font-weight: 600;">Cookie & Privacy Notice</h2>
            <p style="color: #8e8e93; font-size: 0.9rem; line-height: 1.6; margin: 0;">
              By using our website, you agree to our use of essential cookies, browser storage, and privacy boundaries. Please read our 
              <a href="privacy-policy.html" style="color: #ff4444; text-decoration: none; font-weight: 600;">Privacy Policy</a> and 
              <a href="terms.html" style="color: #ff4444; text-decoration: none; font-weight: 600;">Terms of Service</a>.
            </p>
          </div>
          <button id="acceptCookiesBtn" class="btn btn-accent" style="width: 100%; border: none; padding: 14px; font-weight: 600; cursor: pointer; display: block; text-align: center;">Accept & Continue</button>
        </div>
      `;
      
      document.body.appendChild(popupEl);
      
      // Wire click interception event listeners
      document.getElementById('acceptCookiesBtn').addEventListener('click', function() {
        localStorage.setItem("cookiePrivacyAccepted", "true");
        const targetPopup = document.getElementById('globalPrivacyPopup');
        if (targetPopup) targetPopup.remove();
      });
    }
  });
})();