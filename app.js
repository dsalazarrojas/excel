(function (root) {
  'use strict';

  const GOODS_API_BASE = String(root.GOODS_API_BASE || '').replace(/\/$/, '');

  // Kept intentionally equivalent to the standalone browse page utility.
  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Kept intentionally equivalent to the standalone browse page utility.
  function debounce(fn, delay) {
    let timer = null;
    const wrapped = (...args) => {
      root.clearTimeout(timer);
      timer = root.setTimeout(() => fn(...args), delay);
    };
    wrapped.cancel = () => root.clearTimeout(timer);
    return wrapped;
  }

  function isPublicUrl(value) {
    return /^https?:\/\//i.test(String(value || '').trim());
  }

  function resolveAssetUrl(path) {
    if (!path) return '';
    return isPublicUrl(path) ? path : `${GOODS_API_BASE}${path}`;
  }

  function formatPrice(priceCents, currency) {
    const amount = Number(priceCents || 0) / 100;
    const code = String(currency || 'MXN').toUpperCase();
    try {
      return new Intl.NumberFormat('es-MX', { style: 'currency', currency: code }).format(amount);
    } catch (_) {
      return `$${amount.toFixed(2)} ${code}`;
    }
  }

  function renderProductCard(product) {
    const title = escapeHtml(product.title || 'Producto sin título');
    const description = escapeHtml(product.description || 'Aplicación lista para usar.');
    const category = escapeHtml(product.category || 'Aplicación de negocio');
    const isEnglish = root.SITE_LANG === 'en';
    const cardPriceCents = isEnglish ? product.price_usd_cents : product.price_cents;
    const cardCurrency = isEnglish ? 'USD' : product.currency;
    const hasAdditionalTiers = isEnglish ? product.price_usd_cents_empresa != null || product.price_usd_cents_reventa != null : product.price_cents_empresa != null || product.price_cents_reventa != null;
    const price = cardPriceCents != null ? escapeHtml(`${hasAdditionalTiers ? 'Desde ' : ''}${formatPrice(cardPriceCents, cardCurrency)}`) : '';
    const buyButton = !isEnglish || product.price_usd_cents != null ? `<button type="button" data-buy-product="${escapeHtml(product.id)}" class="relative z-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60 transition-colors"><span class="material-symbols-outlined text-[16px]">shopping_cart</span>Comprar</button>` : '';
    const productUrl = escapeHtml(`p/${encodeURIComponent(product.slug || '')}/`);
    const thumbnail = resolveAssetUrl(product.thumbnail_url);
    const video = resolveAssetUrl(product.video_url);
    const visual = thumbnail
      ? `<img src="${escapeHtml(thumbnail)}" alt="" class="h-12 w-12 rounded-2xl object-cover shrink-0" loading="lazy">`
      : '<div class="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-[24px]">table_chart</span></div>';
    const videoLink = video
      ? `<a href="${escapeHtml(video)}" target="_blank" rel="noopener" class="relative z-10 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"><span class="material-symbols-outlined text-[17px]">play_circle</span>Ver demo</a>`
      : '<span class="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 dark:text-slate-500"><span class="material-symbols-outlined text-[17px]">schedule</span>Demo próximamente</span>';
    const manualUrl = resolveAssetUrl(product.manual_url);
    const manualNote = product.has_manual && manualUrl
      ? `<a href="${escapeHtml(manualUrl)}" target="_blank" rel="noopener" class="relative z-10 inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 px-2.5 py-1 text-[11px] font-semibold hover:text-primary"><span class="material-symbols-outlined text-[14px]">description</span>Ver manual</a>`
      : '';

    return `
      <article class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70 dark:hover:shadow-slate-950/70 hover:border-primary/30 transition-all duration-200">
        <div class="flex items-start gap-4 mb-4">
          <a href="${productUrl}" class="shrink-0" aria-label="Ver detalle de ${title}">${visual}</a>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
              <a href="${productUrl}" class="hover:underline"><h2 class="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-1">${title}</h2></a>
              <span class="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">${category}</span>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">${description}</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 min-h-[2rem] mb-5">
          <span class="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 px-2.5 py-1 text-[11px] font-semibold">Excel / .xlsm</span>
          ${price ? `<span class="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 px-2.5 py-1 text-[11px] font-semibold">${price}</span>` : ''}
          ${manualNote}
        </div>
        <div class="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          ${videoLink}
          <div class="flex items-center gap-2"><a href="${productUrl}" class="relative z-10 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"><span class="material-symbols-outlined text-[17px]">open_in_new</span>Ver detalle</a>${buyButton}</div>
        </div>
      </article>`;
  }

  async function responseJson(response) {
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || 'La solicitud no se pudo completar.');
    return payload;
  }

  function wireBuyButtons(scope = document, errorElement = document.getElementById('catalog-error')) {
    scope.addEventListener('click', async (event) => {
      const button = event.target.closest('[data-buy-product]');
      if (!button || !scope.contains(button)) return;
      button.disabled = true;
      try {
        const tier = button.dataset.tier || button.closest('[data-tier]')?.dataset.tier || 'personal';
        const payload = await responseJson(await fetch(`${GOODS_API_BASE}/api/goods/checkout/${encodeURIComponent(button.dataset.buyProduct)}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tier, currency: root.SITE_LANG === 'en' ? 'usd' : 'mxn' }) }));
        if (!payload.url) throw new Error('No se recibió una URL de pago.');
        root.location.href = payload.url;
      } catch (err) {
        if (errorElement) { errorElement.textContent = err.message || 'No se pudo iniciar el pago, intenta de nuevo.'; errorElement.classList.remove('hidden'); }
        else root.console.error(err);
        button.disabled = false;
      }
    });
  }

  function initCatalog() {
    const grid = document.getElementById('apps-grid');
    if (!grid) return;
    const input = document.getElementById('search-input');
    const count = document.getElementById('result-summary');
    const error = document.getElementById('catalog-error');
    const filters = document.getElementById('category-filters');
    let products = [];
    let selectedCategory = '';
    const renderFilters = () => {
      if (!filters) return;
      const categories = [...new Set(products.map((product) => String(product.category || '').trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));
      filters.innerHTML = ['', ...categories].map((category) => {
        const active = category === selectedCategory;
        return `<button type="button" data-category-filter="${escapeHtml(category)}" class="rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${active ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}">${escapeHtml(category || 'Todos')}</button>`;
      }).join('');
    };
    const render = () => {
      const query = String(input.value || '').trim().toLowerCase();
      const visible = products.filter((product) => [product.title, product.description, product.category, product.slug].join(' ').toLowerCase().includes(query) && (!selectedCategory || String(product.category || '').trim() === selectedCategory));
      count.textContent = `${visible.length} producto${visible.length === 1 ? '' : 's'} disponible${visible.length === 1 ? '' : 's'}`;
      grid.innerHTML = visible.length ? visible.map(renderProductCard).join('') : '<div class="md:col-span-2 xl:col-span-3 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 px-6 py-16 text-center"><span class="material-symbols-outlined text-5xl text-slate-300">search_off</span><h2 class="mt-3 text-xl font-bold">No encontramos productos</h2><p class="mt-2 text-slate-500">Prueba otra búsqueda o solicita el producto que necesitas.</p></div>';
    };
    const load = async () => {
      grid.innerHTML = '<div class="md:col-span-2 xl:col-span-3 text-center py-16 text-slate-500">Cargando catálogo…</div>';
      try {
        const payload = await responseJson(await fetch(`${GOODS_API_BASE}/api/goods/catalog`));
        products = Array.isArray(payload.products) ? payload.products.filter((product) => product.published !== false) : [];
        if (root.SITE_LANG === 'en') {
          try {
            const translations = await responseJson(await fetch(`${root.I18N_BASE_PATH || ''}i18n/products.en.json`));
            products = products.map((product) => translations[product.slug] ? { ...product, ...translations[product.slug] } : (root.console.warn(`Missing English translation for ${product.slug}`), product));
          } catch (err) { root.console.warn('Could not load English product translations.', err); }
        }
        renderFilters();
        render();
      } catch (err) {
        error.textContent = err.message || 'No se pudo cargar el catálogo.';
        error.classList.remove('hidden');
        grid.innerHTML = '';
      }
    };
    input.addEventListener('input', debounce(render, 200));
    if (filters) filters.addEventListener('click', (event) => { const button = event.target.closest('[data-category-filter]'); if (!button) return; selectedCategory = button.dataset.categoryFilter || ''; renderFilters(); render(); });
    wireBuyButtons(grid, error);
    load();
  }

  function initProductPage() {
    const page = document.getElementById('product-page');
    if (page) wireBuyButtons(page, document.getElementById('product-page-error'));
  }

  function initRequestForm() {
    const form = document.getElementById('product-request-form');
    if (!form) return;
    const message = document.getElementById('request-message');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      message.textContent = 'Enviando…';
      try {
        const data = new FormData(form);
        const payload = await responseJson(await fetch(`${GOODS_API_BASE}/api/goods/requests`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: data.get('text'), contact: data.get('contact') || undefined, hint: data.get('hint') || undefined }) }));
        form.reset();
        message.textContent = `Gracias. Te avisaremos cuando haya novedades. Folio: ${payload.token || 'recibido'}.`;
        message.className = 'mt-4 text-sm font-medium text-emerald-700 dark:text-emerald-300';
      } catch (err) {
        message.textContent = err.message || 'No se pudo enviar tu solicitud.';
        message.className = 'mt-4 text-sm font-medium text-rose-700 dark:text-rose-300';
      } finally { button.disabled = false; }
    });
  }

  function initSuccess() {
    const state = document.getElementById('success-state');
    if (!state) return;
    const params = new URLSearchParams(root.location.search);
    const sessionId = params.get('session_id');
    const support = document.getElementById('support-session');
    if (!sessionId) { state.textContent = 'Falta el identificador de la sesión de pago.'; return; }
    support.textContent = sessionId;
    const started = Date.now();
    const poll = async () => {
      if (Date.now() - started >= 120000) { state.textContent = 'El pago sigue procesándose. Intenta abrir esta página de nuevo en unos minutos o contacta a soporte con el identificador mostrado.'; return; }
      try {
        const response = await fetch(`${GOODS_API_BASE}/api/goods/r/session/${encodeURIComponent(sessionId)}`);
        if (response.status === 404) { root.setTimeout(poll, 3000); return; }
        const payload = await responseJson(response);
        if (!payload.token) throw new Error('La descarga aún no está lista.');
        const url = `${GOODS_API_BASE}/api/goods/download/${encodeURIComponent(payload.token)}`;
        const link = document.getElementById('download-link');
        link.href = url; link.classList.remove('hidden');
        const manualLink = document.getElementById('manual-link');
        if (payload.has_manual && manualLink) {
          manualLink.href = `${url}?asset=manual`;
          manualLink.classList.remove('hidden');
        }
        const licenseTier = { personal: 'Personal', empresa: 'Empresa', reventa: 'Reventa' }[payload.license_tier] || 'Personal';
        const license = document.getElementById('license-tier');
        if (license) { license.textContent = `Licencia: ${licenseTier}`; license.classList.remove('hidden'); }
        state.textContent = 'Tu descarga ha comenzado. Si no se abrió automáticamente, usa el botón de descarga.';
        root.location.href = url;
      } catch (err) { state.textContent = `${err.message || 'No se pudo verificar el pago.'} Reintentando…`; root.setTimeout(poll, 3000); }
    };
    poll();
  }

  const api = { escapeHtml, debounce, formatPrice, renderProductCard, isPublicUrl, wireBuyButtons };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.GoodsStore = api;
  if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', () => { initCatalog(); initRequestForm(); initSuccess(); initProductPage(); });
})(typeof window !== 'undefined' ? window : globalThis);
