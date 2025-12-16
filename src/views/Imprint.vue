<template>
  <footer class="imprint" aria-label="Impressum">
    <div class="lines">
      <div>tobiga UG (haftungsbeschränkt)</div>
      <div>Tobias Gassmann</div>
      <div>Bodenseestr. 4a</div>
      <div>81241 München</div>
      <div class="mono">HRB 219431</div>
      <div class="mono">USt-IdNr. DE 301206623</div>

      <a
        class="repo"
        href="https://github.com/tobias74/motion-photo-gallery"
        target="_blank"
        rel="noopener noreferrer"
      >
        github.com/tobias74/motion-photo-gallery
      </a>
    </div>
  </footer>
</template>

<script>
</script>

<style scoped>
.imprint {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  padding: 16px;
  text-align: center;
}

.lines {
  display: inline-block; /* makes the block “hug” the content while staying centered */
  line-height: 1.55;
  color: rgba(0, 0, 0, 0.85);
}

.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.95em;
  opacity: 0.9;
}

.repo {
  display: inline-block;
  margin-top: 10px;
  padding: 6px 10px;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 999px;
  text-decoration: none;
  color: inherit;
  opacity: 0.9;
}

.repo:hover {
  opacity: 1;
}
</style>
