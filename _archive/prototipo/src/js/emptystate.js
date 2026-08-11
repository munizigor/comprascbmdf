function emptyStateHtml({ title, description, ctaLabel, ctaHref, ctaOnClick, compact }) {
  const cta = ctaLabel
    ? (ctaHref
        ? `<a class="btn btn-primary" href="${ctaHref}">${ctaLabel}</a>`
        : `<button type="button" class="btn btn-primary" onclick="${ctaOnClick}">${ctaLabel}</button>`)
    : '';

  return `
    <div class="empty-state${compact ? ' empty-state--compact' : ''}">
      <h3 class="empty-state-title">${title}</h3>
      <p class="empty-state-description">${description}</p>
      ${cta}
    </div>
  `;
}
