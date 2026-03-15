<?php
get_header();
?>
<div id="content" class="site-content brayton-blog-content">
  <div class="brayton-content-wrap">
    <header class="page-header">
      <h1 class="page-title">Noticias</h1>
    </header>
    <?php if (have_posts()) : ?>
      <div class="brayton-posts-list">
        <?php while (have_posts()) : the_post(); ?>
          <article id="post-<?php the_ID(); ?>" <?php post_class('brayton-post-card'); ?>>
            <h2 class="entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <div class="entry-meta"><?php the_date(); ?></div>
            <div class="entry-summary"><?php the_excerpt(); ?></div>
          </article>
        <?php endwhile; ?>
      </div>
      <?php the_posts_pagination(); ?>
    <?php else : ?>
      <p>Aun no hay entradas.</p>
    <?php endif; ?>
  </div>
</div>
<?php get_footer(); ?>
