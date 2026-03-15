<?php
/**
 * Plantilla de página. Compatible con Gutenberg y Elementor.
 *
 * @package BraytonSRL
 */

get_header();
?>

<div id="content" class="site-content brayton-page-content">
  <div class="brayton-content-wrap">
    <?php
    while (have_posts()) :
      the_post();
      the_content();
    endwhile;
    ?>
  </div>
</div>

<?php get_footer(); ?>
