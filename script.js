'use strict';
(() => {
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const money = n => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const year = $('#copyright-year'); if (year) year.textContent = String(new Date().getFullYear());
  const areaLabel = $('#service-area-label'); if (areaLabel && window.ROEH_CONFIG?.restoreServiceArea) areaLabel.textContent = window.ROEH_CONFIG.restoreServiceArea;

  // Mobile nav: accessible expanded state, Escape close, and outside click.
  const toggle = $('.nav-toggle');
  const nav = $('#primary-nav');
  const closeNav = () => { if (!nav || !toggle) return; nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); document.body.classList.remove('menu-open'); };
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open'); nav.classList.toggle('is-open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); document.body.classList.toggle('menu-open', open);
    });
    $$('a', nav).forEach(a => a.addEventListener('click', closeNav));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { closeNav(); toggle.focus(); } });
    document.addEventListener('click', e => { if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) closeNav(); });
    window.matchMedia('(min-width:921px)').addEventListener('change', e => { if (e.matches) closeNav(); });
  }

  // Public cost estimators. All amounts are indicative, not quotes.
  const digitalTier = $('#digital-tier');
  const updateDigital = () => {
    if (!digitalTier) return;
    const pages = Math.max(0, Math.min(20, Number($('#extra-pages')?.value) || 0));
    const copyPages = Math.max(0, Math.min(20, Number($('#copy-pages')?.value) || 0));
    const total = (Number(digitalTier.value) || 0) + (pages * 199) + (copyPages * 175) + ($('#care-add')?.checked ? 59 : 0);
    $('#digital-total').textContent = money(total);
  };
  [digitalTier, $('#extra-pages'), $('#copy-pages'), $('#care-add')].filter(Boolean).forEach(el => el.addEventListener('input', updateDigital));
  updateDigital();
  const updateRestore = () => {
    const el = $('#restore-hours'); if (!el) return;
    const hours = Math.max(0, Math.min(100, Number(el.value) || 0));
    const materials = Math.max(0, Math.min(100000, Number($('#restore-material')?.value) || 0));
    $('#restore-total').textContent = money(Math.max(149, 95 * hours) + materials * 1.15);
  };
  [$('#restore-hours'), $('#restore-material')].filter(Boolean).forEach(el => el.addEventListener('input', updateRestore));
  updateRestore();

  // Dynamic inquiry fields; Formspree receives inquiries when the endpoint is configured.
  const form = $('#inquiry-form'); if (!form) return;
  const division = $('#division'); const status = $('#form-status'); const btn = $('#submit-btn'); const subjectField = $('#subject-field');
  const preparedArea = $('#prepared-area'); const preparedText = $('#prepared-text'); const emailLink = $('#email-request');
  const cfg = window.ROEH_CONFIG || {};
  const configured = typeof cfg.formEndpoint === 'string' && /^https:\/\//i.test(cfg.formEndpoint.trim());
  if (configured) { btn.textContent = 'Send inquiry ↗'; form.setAttribute('action', cfg.formEndpoint); form.setAttribute('method', 'POST'); }
  else { btn.textContent = 'Prepare inquiry ↗'; }
  const prefill = new URLSearchParams(window.location.search);
  const queryDivision = prefill.get('division');
  if (['Digital', 'Restore', 'Life'].includes(queryDivision)) division.value = queryDivision;
  const queryPackage = prefill.get('package');
  if (queryPackage && $('#project-type')) { const option = [...$('#project-type').options].find(o => o.value === queryPackage); if (option) $('#project-type').value = queryPackage; }
  const updateBranch = () => {
    $$('.branch-specific', form).forEach(section => {
      const show = section.dataset.visibleFor === division.value;
      section.hidden = !show;
      $$('input,select,textarea', section).forEach(el => el.disabled = !show);
    });
    if (subjectField) subjectField.value = 'ROEH 111 — ' + (division.value || 'General') + ' inquiry';
    status.textContent = ''; status.removeAttribute('data-kind');
  };
  division.addEventListener('change', updateBranch); updateBranch();
  const setEmailLink = () => {
    const address = String(cfg.businessEmail || '').trim();
    if (!emailLink) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) { emailLink.hidden = true; emailLink.removeAttribute('href'); return; }
    emailLink.href = 'mailto:' + encodeURIComponent(address) + '?subject=' + encodeURIComponent('ROEH 111 inquiry — ' + (division.value || 'General')) + '&body=' + encodeURIComponent(preparedText.value);
    emailLink.hidden = false;
  };
  const getFormText = () => {
    const data = new FormData(form);
    const labels = { 'fullName': 'Name', 'email': 'Email', 'division': 'Division', 'projectType': 'Digital project', 'propertyLocation': 'Property location', 'propertyType': 'Property type', 'lifeTopic': 'Life topic', 'timeline': 'Timeline', 'details': 'Message' };
    const lines = ['ROEH 111 — New inquiry', ''];
    Object.entries(labels).forEach(([key, label]) => { const value = String(data.get(key) || '').trim(); if (value) lines.push(label + ': ' + value); });
    return lines.join('\n');
  };
  form.addEventListener('submit', async event => {
    event.preventDefault(); status.textContent = ''; status.removeAttribute('data-kind');
    $$('#inquiry-form [aria-invalid=true]').forEach(el => el.removeAttribute('aria-invalid'));
    if (!form.checkValidity()) {
      const invalid = $$('input,select,textarea', form).find(el => !el.disabled && !el.checkValidity());
      if (invalid) { invalid.setAttribute('aria-invalid', 'true'); invalid.focus(); }
      status.dataset.kind = 'error'; status.textContent = 'Please complete the required fields and use a valid email address.'; return;
    }
    if ($('#website-check')?.value) return;
    if (configured) {
      btn.disabled = true; btn.textContent = 'Sending…';
      try {
        const response = await fetch(cfg.formEndpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Provider rejected the request');
        form.reset(); updateBranch(); preparedArea.hidden = true;
        status.dataset.kind = 'success'; status.textContent = 'Your inquiry was accepted by Formspree. Thank you! We will review it once received.';
      } catch (error) {
        status.dataset.kind = 'error'; status.textContent = 'The request could not be delivered. Your information is still here; copy the prepared request below and try again or use a verified business email.';
        preparedText.value = getFormText(); preparedArea.hidden = false; setEmailLink();
      } finally { btn.disabled = false; btn.textContent = 'Send inquiry ↗'; }
      return;
    }
    preparedText.value = getFormText(); preparedArea.hidden = false; setEmailLink();
    status.dataset.kind = 'error'; status.textContent = 'This demo is not connected to an inbox. Your request has NOT been sent. Copy it below and use the business contact method once configured.';
    preparedArea.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
  });
  $('#copy-request')?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(preparedText.value); status.dataset.kind = 'success'; status.textContent = 'Prepared message copied. It has NOT been sent.'; }
    catch (_) { preparedText.focus(); preparedText.select(); status.dataset.kind = 'error'; status.textContent = 'Automatic copy was unavailable. Select the text and copy it manually.'; }
  });
})();
