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

  renderPrototypeBanner();
  renderProfileSwitcher();
  applyProfile();
  renderIdentity();

  window.CBMDFNav = { getProfile, setProfile, getCurrentUser, setCurrentUserId };
})();
