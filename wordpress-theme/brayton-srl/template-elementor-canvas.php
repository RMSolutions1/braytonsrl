<?php
/**
 * Plantilla: Canvas (solo contenido, sin header ni footer del tema).
 * Elementor la usa como "Canvas" para disenos a pantalla completa.
 * Tambien puedes asignarla manualmente a una pagina.
 *
 * @package BraytonSRL
 */
if (!defined('ABSPATH')) exit;
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class('brayton-canvas'); ?>>
<?php wp_body_open(); ?>
<div id="content" class="site-content brayton-canvas-content">
  <?php while (have_posts()) : the_post(); the_content(); endwhile; ?>
</div>
<?php wp_footer(); ?>
</body>
</html>
