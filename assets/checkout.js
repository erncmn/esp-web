/* Easy Stacking Planner — Polar.sh hosted checkout yönlendirmesi.
 *
 * BASİT HOSTED LINK modeli: özel ödeme formu YOK. Kullanıcı doğrudan Polar'ın
 * barındırdığı ödeme sayfasına gider — Polar = Merchant of Record olduğundan
 * e-posta / firma / KDV / adres / onay hepsini Polar kendi sayfasında toplar,
 * faturayı Polar keser. Satın alma tamamlanınca Polar `order.created` webhook'u
 * (server/license-webhook.js) Ed25519 lisans kodunu üretip alıcıya e-posta atar.
 */
(function () {
  'use strict';

  /* ┌─ DOLDURULACAK TEK YER ────────────────────────────────────────────────┐
     │ Polar dashboard → Products → (ilgili ürün) → "Checkout Links" ile      │
     │ oluşturduğun hosted linkleri buraya yapıştır.                          │
     │ Örn: https://buy.polar.sh/polar_cl_xxxxxxxxxxxxxxxx                     │
     └────────────────────────────────────────────────────────────────────────┘ */
  var POLAR_LINKS = {
    'pro-yearly':  'https://buy.polar.sh/POLAR_CHECKOUT_LINK_PRO_YEARLY',
    'pro-monthly': 'https://buy.polar.sh/POLAR_CHECKOUT_LINK_PRO_MONTHLY',
    'plus-yearly': 'https://buy.polar.sh/POLAR_CHECKOUT_LINK_PLUS_YEARLY'
  };

  // Yönlendirme sırasında gösterilecek kısa metin (5 dil)
  var MSG = {
    tr: 'Güvenli ödeme sayfasına yönlendiriliyorsunuz…',
    en: 'Redirecting you to the secure checkout…',
    de: 'Sie werden zur sicheren Kasse weitergeleitet…',
    fr: 'Redirection vers le paiement sécurisé…',
    es: 'Redirigiéndote al pago seguro…'
  };
  var CONTINUE = { tr: 'Devam et', en: 'Continue', de: 'Weiter', fr: 'Continuer', es: 'Continuar' };
  var NOTCFG = {
    tr: 'Ödeme bağlantısı henüz yapılandırılmadı. Fiyatlandırmaya dönün.',
    en: 'Checkout link is not configured yet. Please return to pricing.',
    de: 'Checkout-Link ist noch nicht konfiguriert. Zurück zur Preisübersicht.',
    fr: 'Le lien de paiement n\'est pas encore configuré. Retour aux tarifs.',
    es: 'El enlace de pago aún no está configurado. Vuelve a precios.'
  };

  function getParam(n) { return new URLSearchParams(window.location.search).get(n); }
  function lang() { return localStorage.getItem('esp-site-lang') || 'tr'; }
  function t(map) { return map[lang()] || map.en; }

  document.addEventListener('DOMContentLoaded', function () {
    var plan = getParam('plan') || 'pro-yearly';
    var msgEl = document.getElementById('ckRedirectMsg');
    var linkEl = document.getElementById('ckManualLink');
    var url = POLAR_LINKS[plan];

    // link doldurulmadıysa (placeholder) → fiyat sayfasına yönlendir seçeneği
    if (!url || url.indexOf('POLAR_CHECKOUT_LINK') !== -1) {
      if (msgEl) msgEl.textContent = t(NOTCFG);
      if (linkEl) { linkEl.href = 'fiyatlandirma.html'; linkEl.textContent = t(CONTINUE); linkEl.style.display = 'inline-block'; }
      return;
    }

    // TAVSİYE (referral): ziyaretçi ?ref=KOD ile geldiyse Polar sipariş metadata'sına
    // aktar (webhook `data.metadata.referral` okur). Polar bilinmeyen query paramlarını
    // yok sayar → doldurulmamışsa da link sağlam çalışır.
    var ref = getParam('ref');
    if (ref) url += (url.indexOf('?') === -1 ? '?' : '&') + 'metadata.referral=' + encodeURIComponent(ref);

    if (msgEl) msgEl.textContent = t(MSG);
    if (linkEl) { linkEl.href = url; linkEl.textContent = t(CONTINUE); linkEl.style.display = 'inline-block'; }
    window.location.replace(url);
  });
})();
