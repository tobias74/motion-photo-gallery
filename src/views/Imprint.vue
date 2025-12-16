<template>
  <section class="imprint" aria-labelledby="imprint-title">
    <div class="card">
      <h2 id="imprint-title" class="title">Impressum</h2>

      <address class="address">
        <div class="company">tobiga UG (haftungsbeschränkt)</div>
        <div>Tobias Gassmann</div>
        <div>Bodenseestr. 4a</div>
        <div>81241 München</div>

        <dl class="meta">
          <div class="metaRow">
            <dt>HRB</dt>
            <dd class="mono">219431</dd>
          </div>
          <div class="metaRow">
            <dt>USt-IdNr.</dt>
            <dd class="mono">DE 301206623</dd>
          </div>
        </dl>
      </address>

      <a
        class="repo"
        href="https://github.com/tobias74/motion-photo-gallery"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="repoLabel">Projekt-Repository</div>
        <div class="repoName">motion-photo-gallery</div>
        <div class="repoUrl">github.com/tobias74/motion-photo-gallery</div>
      </a>
    </div>
  </section>
</template>

<script>
</script>

<style scoped>
/* Keine externen Fonts: reine System-Schriften */
.imprint {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  padding: 16px;
}

.card {
  max-width: 720px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.03);
  padding: 16px;
}

.title {
  margin: 0 0 12px 0;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.address {
  font-style: normal; /* address ist sonst kursiv */
  line-height: 1.55;
  color: rgba(0, 0, 0, 0.86);
}

.company {
  font-weight: 700;
  margin-bottom: 2px;
}

.meta {
  margin: 12px 0 0 0;
  display: grid;
  gap: 6px;
}

.metaRow {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 10px;
  align-items: baseline;
}

.metaRow dt {
  opacity: 0.72;
}

.metaRow dd {
  margin: 0;
}

.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  letter-spacing: 0.2px;
}

/* Repo-Link als “Karte” */
.repo {
  display: block;
  margin-top: 14px;
  padding: 12px 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  color: inherit;
}

.repo:hover {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(0, 0, 0, 0.18);
}

.repoLabel {
  font-size: 0.85rem;
  opacity: 0.72;
}

.repoName {
  margin-top: 2px;
  font-weight: 700;
}

.repoUrl {
  margin-top: 4px;
  font-size: 0.9rem;
  opacity: 0.8;
  overflow-wrap: anywhere;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
}

/* Kleine Screens */
@media (max-width: 420px) {
  .metaRow {
    grid-template-columns: 80px 1fr;
  }
}
</style>
