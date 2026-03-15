<?php
/**
 * BRAYTON SRL - Tema WordPress
 * Compatible con Elementor y Gutenberg (editor de bloques).
 *
 * @package BraytonSRL
 */

if (!defined('ABSPATH')) {
  exit;
}

define('BRAYTON_THEME_VERSION', '1.0.0');
define('BRAYTON_THEME_DIR', get_template_directory());
define('BRAYTON_THEME_URI', get_template_directory_uri());

/**
 * Configuración del tema
 */
function brayton_setup() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script'));
  add_theme_support('custom-logo', array(
    'height'      => 80,
    'width'       => 240,
    'flex-height' => true,
    'flex-width'  => true,
  ));
  add_theme_support('customize-selective-refresh-widgets');
  add_theme_support('automatic-feed-links');
  add_theme_support('responsive-embeds');

  /* Gutenberg */
  add_theme_support('wp-block-styles');
  add_theme_support('align-wide');
  add_theme_support('editor-styles');
  add_editor_style('assets/css/editor-style.css');

  /* Colores del editor (Gutenberg) */
  add_theme_support('editor-color-palette', array(
    array('name' => __('Navy', 'brayton-srl'), 'slug' => 'brayton-navy', 'color' => '#0a1628'),
    array('name' => __('Azul', 'brayton-srl'), 'slug' => 'brayton-blue', 'color' => '#0d2137'),
    array('name' => __('Acero', 'brayton-srl'), 'slug' => 'brayton-steel', 'color' => '#2d3e50'),
    array('name' => __('Naranja', 'brayton-srl'), 'slug' => 'brayton-accent', 'color' => '#e85d04'),
    array('name' => __('Blanco', 'brayton-srl'), 'slug' => 'white', 'color' => '#ffffff'),
  ));

  register_nav_menus(array(
    'primary' => __('Menú principal (header)', 'brayton-srl'),
    'footer'  => __('Menú footer', 'brayton-srl'),
  ));
}
add_action('after_setup_theme', 'brayton_setup');

/**
 * Estilos y scripts
 */
function brayton_scripts() {
  wp_enqueue_style(
    'brayton-style',
    get_stylesheet_uri(),
    array(),
    BRAYTON_THEME_VERSION
  );
  wp_enqueue_script(
    'brayton-header',
    BRAYTON_THEME_URI . '/assets/js/header.js',
    array(),
    BRAYTON_THEME_VERSION,
    true
  );
}
add_action('wp_enqueue_scripts', 'brayton_scripts');

/**
 * Ancho de contenido para Gutenberg (alignwide)
 */
function brayton_content_width() {
  $GLOBALS['content_width'] = 1280;
}
add_action('after_setup_theme', 'brayton_content_width', 0);

/**
 * Logo del sitio
 */
function brayton_logo_url() {
  if (has_custom_logo()) {
    $id = get_theme_mod('custom_logo');
    return wp_get_attachment_image_url($id, 'medium');
  }
  $fallback = BRAYTON_THEME_DIR . '/assets/img/logo.png';
  if (file_exists($fallback)) {
    return BRAYTON_THEME_URI . '/assets/img/logo.png';
  }
  return '';
}

/**
 * Clases body para páginas editadas con Elementor
 */
function brayton_body_classes($classes) {
  if (is_singular() && defined('ELEMENTOR_VERSION') && class_exists('Elementor\Plugin')) {
    $post_id = get_the_ID();
    if ($post_id && \Elementor\Plugin::$instance->db->is_built_with_elementor($post_id)) {
      $classes[] = 'brayton-elementor-page';
    }
  }
  return $classes;
}
add_filter('body_class', 'brayton_body_classes');

/**
 * Registrar zona de widgets (opcional)
 */
function brayton_widgets_init() {
  register_sidebar(array(
    'name'          => __('Footer 1', 'brayton-srl'),
    'id'            => 'footer-1',
    'description'   => __('Widgets del footer columna 1.', 'brayton-srl'),
    'before_widget' => '<div id="%1$s" class="widget %2$s">',
    'after_widget'  => '</div>',
    'before_title'  => '<h3 class="widget-title">',
    'after_title'   => '</h3>',
  ));
}
add_action('widgets_init', 'brayton_widgets_init');
