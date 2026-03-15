/**
 * Menú móvil: abrir/cerrar panel
 */
(function () {
  var trigger = document.getElementById('nav-mobile-trigger');
  var panel = document.getElementById('nav-mobile-panel');

  if (!trigger || !panel) return;

  function open() {
    panel.hidden = false;
    panel.setAttribute('aria-hidden', 'false');
    trigger.setAttribute('aria-expanded', 'true');
    trigger.setAttribute('aria-label', 'Cerrar menú');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    panel.hidden = true;
    panel.setAttribute('aria-hidden', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', 'Abrir menú');
    document.body.style.overflow = '';
  }

  function toggle() {
    if (panel.hidden) open(); else close();
  }

  trigger.addEventListener('click', toggle);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) close();
  });
})();
