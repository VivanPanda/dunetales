(function () {
  const dataUrl = "./assets/data/stories.json";

  const getStoryId = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  };

  const byId = (stories, id) => stories.find((story) => story.id === id);

  const setText = (el, value) => {
    if (!el || !value) return;
    el.textContent = value;
  };

  const setImage = (img, src, alt) => {
    if (!img || !src) return;
    img.src = src;
    if (alt) img.alt = alt;
  };

  const setIframe = (iframe, youtubeId, title) => {
    if (!iframe || !youtubeId) return;
    iframe.src = "https://www.youtube.com/embed/" + youtubeId;
    if (title) iframe.title = title;
  };

  const renderIntro = (container, paragraphs) => {
    if (!container || !Array.isArray(paragraphs)) return;
    container.innerHTML = "";
    paragraphs.forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      container.appendChild(p);
    });
  };

  const buildCard = (story) => {
    const link = document.createElement("a");
    link.className = "polaroid";
    link.href = "story.html?id=" + story.id;
    const role = story.role ? ", " + story.role : "";
    const org = story.org ? " at " + story.org : "";
    link.setAttribute("aria-label", "Open story: " + story.name + role + org);
    link.setAttribute("data-story-card", "");
    link.setAttribute("data-story-id", story.id);

    const figure = document.createElement("figure");
    figure.className = "polaroid__frame";

    const photo = document.createElement("div");
    photo.className = "polaroid__photo";
    photo.setAttribute("aria-hidden", "true");

    const img = document.createElement("img");
    img.setAttribute("data-story-image", "");
    img.loading = "lazy";
    setImage(img, story.image, story.name);
    photo.appendChild(img);

    const caption = document.createElement("figcaption");
    caption.className = "polaroid__caption";

    const name = document.createElement("div");
    name.className = "polaroid__name";
    name.setAttribute("data-story-name", "");
    setText(name, story.name);

    const meta = document.createElement("div");
    meta.className = "polaroid__place";
    meta.setAttribute("data-story-meta", "");
    setText(meta, story.cardMeta);

    const cta = document.createElement("span");
    cta.className = "polaroid__read";
    cta.setAttribute("data-story-cta", "");
    setText(cta, "Watch \u2192");

    caption.appendChild(name);
    caption.appendChild(meta);
    caption.appendChild(cta);
    figure.appendChild(photo);
    figure.appendChild(caption);
    link.appendChild(figure);

    return link;
  };

  fetch(dataUrl)
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (!data || !Array.isArray(data.stories)) return;

      const storyId = getStoryId();

      const cards = document.querySelectorAll("[data-story-card]");
      const existingIds = new Set(
        Array.from(cards)
          .map((card) => card.getAttribute("data-story-id"))
          .filter(Boolean)
      );

      cards.forEach((card) => {
        const id = card.getAttribute("data-story-id");
        const story = byId(data.stories, id);
        if (!story) return;

        const name = card.querySelector("[data-story-name]");
        const meta = card.querySelector("[data-story-meta]");
        const cta = card.querySelector("[data-story-cta]");
        const img = card.querySelector("[data-story-image]");

        setText(name, story.name);
        setText(meta, story.cardMeta);
        setText(cta, "Watch \u2192");
        setImage(img, story.image, story.name);

        if (card.tagName.toLowerCase() === "a") {
          card.href = "story.html?id=" + story.id;
        }
      });

      const grid = document.querySelector(".polaroids");
      if (grid) {
        const placeholder = grid.querySelector(".polaroid--empty");
        data.stories.forEach((story) => {
          if (existingIds.has(story.id)) return;
          const card = buildCard(story);
          if (placeholder) {
            grid.insertBefore(card, placeholder);
          } else {
            grid.appendChild(card);
          }
        });
      }

      const storyRoot = document.querySelector("[data-story-page]");
      if (!storyRoot) return;

      const activeId = storyId || storyRoot.getAttribute("data-story-id");
      const story = byId(data.stories, activeId);
      if (!story) return;

      const title = storyRoot.querySelector("[data-story-title]");
      const subtitle = storyRoot.querySelector("[data-story-subtitle]");
      const iframe = storyRoot.querySelector("[data-story-video]");
      const intro = storyRoot.querySelector("[data-story-intro]");

      setText(title, story.name);
      setText(subtitle, story.subtitle);
      setIframe(iframe, story.youtubeId, story.videoTitle);
      renderIntro(intro, story.intro);
    })
    .catch(() => {
      return;
    });
})();
