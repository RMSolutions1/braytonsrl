<?php
/**
 * Pie del sitio
 *
 * @package BraytonSRL
 */

if (!defined('ABSPATH')) {
  exit;
}

$logo_url = brayton_logo_url();
?>
</main><!-- #main -->

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-col footer-brand">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="logo-link">
          <?php if ($logo_url) : ?>
            <img src="<?php echo esc_url($logo_url); ?>" alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
          <?php else : ?>
            <span style="color:#0a1628;font-weight:700;">BRAYTON SRL</span>
          <?php endif; ?>
        </a>
        <p>
          <?php echo esc_html__('Ingeniería, construcción y servicios integrales. Soluciones llave en mano para proyectos residenciales, comerciales, industriales y minería.', 'brayton-srl'); ?>
        </p>
      </div>

      <div class="footer-col">
        <h3><?php esc_html_e('Empresa', 'brayton-srl'); ?></h3>
        <ul>
          <li><a href="<?php echo esc_url(home_url('/nosotros')); ?>"><?php esc_html_e('Nosotros', 'brayton-srl'); ?></a></li>
          <li><a href="<?php echo esc_url(home_url('/servicios')); ?>"><?php esc_html_e('Servicios', 'brayton-srl'); ?></a></li>
          <li><a href="<?php echo esc_url(home_url('/sectores')); ?>"><?php esc_html_e('Sectores', 'brayton-srl'); ?></a></li>
          <li><a href="<?php echo esc_url(home_url('/proyectos')); ?>"><?php esc_html_e('Proyectos', 'brayton-srl'); ?></a></li>
          <li><a href="<?php echo esc_url(home_url('/certificaciones')); ?>"><?php esc_html_e('Certificaciones', 'brayton-srl'); ?></a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3><?php esc_html_e('Enlaces', 'brayton-srl'); ?></h3>
        <ul>
          <li><a href="<?php echo esc_url(home_url('/contacto')); ?>"><?php esc_html_e('Contacto', 'brayton-srl'); ?></a></li>
          <li><a href="<?php echo esc_url(home_url('/trabaja-con-nosotros')); ?>"><?php esc_html_e('Trabaja con nosotros', 'brayton-srl'); ?></a></li>
          <li><a href="<?php echo esc_url(home_url('/blog')); ?>"><?php esc_html_e('Noticias', 'brayton-srl'); ?></a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3><?php esc_html_e('Legal', 'brayton-srl'); ?></h3>
        <ul>
          <li><a href="<?php echo esc_url(home_url('/terminos-y-condiciones')); ?>"><?php esc_html_e('Términos y condiciones', 'brayton-srl'); ?></a></li>
          <li><a href="<?php echo esc_url(home_url('/privacidad')); ?>"><?php esc_html_e('Política de privacidad', 'brayton-srl'); ?></a></li>
          <li><a href="<?php echo esc_url(home_url('/aviso-legal')); ?>"><?php esc_html_e('Aviso legal y datos fiscales', 'brayton-srl'); ?></a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3><?php esc_html_e('Contacto', 'brayton-srl'); ?></h3>
        <ul class="footer-contact">
          <li><a href="mailto:contacto@braytonsrl.com.ar">contacto@braytonsrl.com.ar</a></li>
          <li><a href="tel:+5491112345678">+54 9 11 1234-5678</a></li>
          <li><?php esc_html_e('Lun - Vie: 8:00 - 18:00', 'brayton-srl'); ?></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>
        &copy; <?php echo esc_html(gmdate('Y')); ?> BRAYTON S.R.L. <?php esc_html_e('Todos los derechos reservados.', 'brayton-srl'); ?> CUIT: 30-71683122-8
      </p>
    </div>
  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
