(function () {
  const PROFILE_KEY = 'cbmdf_profile';
  const USER_KEY = 'cbmdf_current_user_id';
  const DEFAULT_PROFILE = 'solicitante';

  const PROFILE_LABELS = {
    solicitante: 'Solicitante',
    gestor: 'Gestor',
    compras: 'Compras/Planejamento'
  };

  function getProfile() {
    return localStorage.getItem(PROFILE_KEY) || DEFAULT_PROFILE;
  }

  function setProfile(profile) {
    localStorage.setItem(PROFILE_KEY, profile);
    applyProfile();
  }

  function applyProfile() {
    const profile = getProfile();
    document.querySelectorAll('[data-profiles]').forEach(el => {
      const allowed = el.dataset.profiles.split(' ');
      el.style.display = allowed.includes(profile) ? '' : 'none';
    });
    const select = document.getElementById('profileSelect');
    if (select) select.value = profile;
  }

  function renderProfileSwitcher() {
    const header = document.querySelector('.header-inner');
    if (!header || document.getElementById('profileSelect')) return;
    const wrap = document.createElement('div');
    wrap.className = 'profile-switcher';
    wrap.innerHTML = `
      <label for="profileSelect">Perfil</label>
      <select id="profileSelect">
        <option value="solicitante">${PROFILE_LABELS.solicitante}</option>
        <option value="gestor">${PROFILE_LABELS.gestor}</option>
        <option value="compras">${PROFILE_LABELS.compras}</option>
      </select>
    `;
    header.appendChild(wrap);
    document.getElementById('profileSelect').addEventListener('change', event => setProfile(event.target.value));
  }

  function getCurrentUser() {
    if (typeof users === 'undefined' || !users.length) return null;
    const id = Number(localStorage.getItem(USER_KEY));
    return users.find(user => user.id === id) || users[0];
  }

  function setCurrentUserId(id) {
    localStorage.setItem(USER_KEY, String(id));
    renderIdentity();
  }

  function renderIdentity() {
    const header = document.querySelector('.header-inner');
    if (!header || header.querySelector('.account')) return;
    const user = getCurrentUser();
    if (!user) return;
    let identity = document.getElementById('headerIdentity');
    if (!identity) {
      identity = document.createElement('div');
      identity.id = 'headerIdentity';
      identity.className = 'header-identity';
      header.appendChild(identity);
    }
    identity.innerHTML = `<span>Olá, <strong>${user.nome}</strong></span><span class="header-identity-lotacao">Lotação: ${user.setor}</span>`;
  }

  function renderPrototypeBanner() {
    if (document.querySelector('.prototype-banner')) return;
    const banner = document.createElement('div');
    banner.className = 'prototype-banner';
    banner.textContent = 'PROTÓTIPO — Dados fictícios para fins de demonstração';
    document.body.insertBefore(banner, document.body.firstChild);
  }

  // Convite flutuante para responder ao formulário de feedback do protótipo.
  // Injetado aqui para aparecer em todas as páginas (todas carregam nav.js).
  const FEEDBACK_URL = 'https://forms.gle/zJLS8DBt5azbeci56';
  const FEEDBACK_HIDDEN_KEY = 'cbmdf_feedback_fab_hidden';

  function renderFeedbackFab() {
    if (document.querySelector('.feedback-fab')) return;
    try {
      if (sessionStorage.getItem(FEEDBACK_HIDDEN_KEY) === '1') return;
    } catch (error) { /* sessionStorage indisponível: mostra o convite mesmo assim */ }

    const fab = document.createElement('div');
    fab.className = 'feedback-fab';
    fab.innerHTML = `
      <a class="feedback-fab-link" href="${FEEDBACK_URL}" target="_blank" rel="noopener noreferrer"
         aria-label="Enviar feedback sobre o protótipo (abre em nova aba)">
        <span class="feedback-fab-icon" aria-hidden="true">💬</span>
        <span class="feedback-fab-label">Feedback</span>
      </a>
      <button type="button" class="feedback-fab-close" aria-label="Ocultar convite de feedback">×</button>
    `;
    document.body.appendChild(fab);

    fab.querySelector('.feedback-fab-close').addEventListener('click', () => {
      try { sessionStorage.setItem(FEEDBACK_HIDDEN_KEY, '1'); } catch (error) { /* segue sem persistir */ }
      fab.remove();
    });
  }

  renderPrototypeBanner();
  renderProfileSwitcher();
  applyProfile();
  renderIdentity();
  renderFeedbackFab();

  window.CBMDFNav = { getProfile, setProfile, getCurrentUser, setCurrentUserId };
})();
