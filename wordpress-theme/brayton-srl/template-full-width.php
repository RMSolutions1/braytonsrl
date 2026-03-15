<?php
/**
 * Plantilla: Ancho completo (sin sidebar). Ideal para Elementor o bloques a ancho completo.
 * Uso: Al editar la página, en Atributos de página elige "Ancho completo".
 *
 * @package BraytonSRL
 */
get_header();
?>
<div id="content" class="site-content brayton-full-width">
  <div class="brayton-content-wrap brayton-full-width-wrap">
    <?php while (have_posts()) : the_post(); the_content(); endwhile; ?>
  </div>
</div>
<?php get_footer(); ?>
