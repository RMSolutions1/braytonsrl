<?php
/**
 * Plantilla de portada (Página de inicio)
 * Asignar en WP: Ajustes > Lectura > "Una página estática" > Portada.
 *
 * @package BraytonSRL
 */

get_header();
?>

<div class="front-page content-area">
  <?php
  if (have_posts()) :
    while (have_posts()) :
      the_post();
      the_content();
    endwhile;
  endif;
  ?>
</div>

<?php get_footer(); ?>
