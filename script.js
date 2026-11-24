// Pantalla completa en horizontal para el plano.
// En Android (Chrome) intenta bloquear la orientación a horizontal.
// En iPhone (Safari) no se puede bloquear la orientación, así que
// si el móvil está en vertical la imagen se gira 90 grados por CSS.
(function () {
  var abrir = document.getElementById('ver-plano');
  var overlay = document.getElementById('plano-pantalla');
  var cerrar = document.getElementById('cerrar-plano');
  if (!abrir || !overlay) return;

  function enVertical() {
    return window.innerHeight > window.innerWidth;
  }

  function actualizar() {
    overlay.classList.toggle('vertical', enVertical());
  }

  abrir.addEventListener('click', function () {
    overlay.hidden = false;
    actualizar();
    try {
      var p = overlay.requestFullscreen ? overlay.requestFullscreen() :
              (overlay.webkitRequestFullscreen ? overlay.webkitRequestFullscreen() : null);
      if (p && p.catch) p.catch(function () {});
    } catch (e) {}
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape').catch(function () {});
    }
  });

  cerrar.addEventListener('click', function () {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(function () {});
    }
    if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock();
    overlay.hidden = true;
  });

  window.addEventListener('resize', actualizar);
})();
