<?php
/**
 * Cabecera del sitio
 *
 * @package BraytonSRL
 */

if (!defined('ABSPATH')) {
  exit;
}

$logo_url = brayton_logo_url();
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="profile" href="https://gmpg.org/xfn/11">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header" role="banner">
  <div class="header-inner">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="logo-link" aria-label="<?php echo esc_attr__('BRAYTON SRL - Inicio', 'brayton-srl'); ?>">
      <?php if ($logo_url) : ?>
        <img src="<?php echo esc_url($logo_url); ?>" alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
      <?php else : ?>
        <span style="color:#0a1628;font-weight:700;">BRAYTON SRL</span>
      <?php endif; ?>
    </a>

    <nav class="nav-desktop" aria-label="<?php esc_attr_e('Navegación principal', 'brayton-srl'); ?>">
      <?php
      if (has_nav_menu('primary')) {
        wp_nav_menu(array(
          'theme_location' => 'primary',
          'container'      => false,
          'menu_class'     => 'nav-desktop-list',
          'fallback_cb'    => false,
          'items_wrap'     => '<ul class="nav-desktop-list">%3$s</ul>',
        ));
      } else {
        ?>
        <a href="<?php echo esc_url(home_url('/')); ?>"><?php esc_html_e('Inicio', 'brayton-srl'); ?></a>
        <a href="<?php echo esc_url(home_url('/nosotros')); ?>"><?php esc_html_e('Nosotros', 'brayton-srl'); ?></a>
        <a href="<?php echo esc_url(home_url('/servicios')); ?>"><?php esc_html_e('Servicios', 'brayton-srl'); ?></a>
        <a href="<?php echo esc_url(home_url('/proyectos')); ?>"><?php esc_html_e('Proyectos', 'brayton-srl'); ?></a>
        <a href="<?php echo esc_url(home_url('/blog')); ?>"><?php esc_html_e('Noticias', 'brayton-srl'); ?></a>
        <?php
      }
      ?>
    </nav>

    <div class="header-actions">
      <a href="<?php echo esc_url(home_url('/trabaja-con-nosotros')); ?>"><?php esc_html_e('Empleo', 'brayton-srl'); ?></a>
      <a href="<?php echo esc_url(home_url('/login')); ?>"><?php esc_html_e('Ingresar', 'brayton-srl'); ?></a>
      <a href="<?php echo esc_url(home_url('/contacto')); ?>" class="btn-cta"><?php esc_html_e('Solicitar Cotización', 'brayton-srl'); ?></a>
    </div>

    <button type="button" class="nav-mobile-trigger" aria-label="<?php esc_attr_e('Abrir menú', 'brayton-srl'); ?>" aria-expanded="false" id="nav-mobile-trigger">
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </div>
</header>

<!-- Menú móvil (panel): se muestra/oculta con JS -->
<div id="nav-mobile-panel" class="nav-mobile-panel" hidden aria-hidden="true">
  <?php
  if (has_nav_menu('primary')) {
    wp_nav_menu(array(
      'theme_location' => 'primary',
      'container'      => 'nav',
      'container_class'=> 'nav-mobile-inner',
      'menu_class'     => 'nav-mobile-list',
    ));
  }
  ?>
  <a href="<?php echo esc_url(home_url('/contacto')); ?>" class="nav-mobile-cta"><?php esc_html_e('Solicitar Cotización', 'brayton-srl'); ?></a>
  <a href="<?php echo esc_url(home_url('/login')); ?>" class="nav-mobile-login"><?php esc_html_e('Ingresar', 'brayton-srl'); ?></a>
</div>

<main id="main" class="site-main">
