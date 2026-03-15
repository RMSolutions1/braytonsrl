<?php
/**
 * Plantilla de error 404.
 *
 * @package BraytonSRL
 */

get_header();
?>

<div id="content" class="site-content brayton-404-content">
  <div class="brayton-content-wrap brayton-404-wrap">
    <h1 class="page-title"><?php esc_html_e('Página no encontrada', 'brayton-srl'); ?></h1>
    <p><?php esc_html_e('La página que buscas no existe o ha sido movida.', 'brayton-srl'); ?></p>
    <p><a href="<?php echo esc_url(home_url('/')); ?>" class="brayton-btn brayton-btn-accent"><?php esc_html_e('Volver al inicio', 'brayton-srl'); ?></a></p>
  </div>
</div>

<?php get_footer(); ?>
