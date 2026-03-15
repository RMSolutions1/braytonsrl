<?php
get_header();
?>
<div id="content" class="site-content brayton-archive-content">
  <div class="brayton-content-wrap">
    <header class="page-header"><?php the_archive_title('<h1 class="page-title">', '</h1>'); ?></header>
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
      <article class="brayton-post-card">
        <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
        <div class="entry-meta"><?php the_date(); ?></div>
        <div class="entry-summary"><?php the_excerpt(); ?></div>
      </article>
    <?php endwhile; the_posts_pagination(); else : ?>
      <p>No hay entradas.</p>
    <?php endif; ?>
  </div>
</div>
<?php get_footer(); ?>
