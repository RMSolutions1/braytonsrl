<?php
/**
 * Plantilla de entrada (blog). Editable con Gutenberg o Elementor.
 * @package BraytonSRL
 */
get_header();
?>
<div id="content" class="site-content brayton-single-content">
  <article id="post-<?php the_ID(); ?>" <?php post_class('brayton-article'); ?>>
    <div class="brayton-content-wrap">
      <header class="entry-header">
        <h1 class="entry-title"><?php the_title(); ?></h1>
        <div class="entry-meta">
          <time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php the_date(); ?></time>
          <span class="sep">|</span>
          <span class="author"><?php the_author(); ?></span>
        </div>
      </header>
      <div class="entry-content"><?php the_content(); ?></div>
    </div>
  </article>
</div>
<?php get_footer(); ?>
