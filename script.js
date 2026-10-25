// ===== Post data =====
// tag: 카드에 표시되는 라벨 / categories: 상단 필터와 매칭되는 값
const posts = [
  {
    title: "What Disney Movies Can Teach Us About Illustration",
    excerpt:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    tag: "Art",
    categories: ["art", "boldcolor", "shape"],
    image: "https://picsum.photos/seed/gega-blocks/800/540",
  },
  {
    title: "The Illustration Industry Is Changing Fast. Here's How to Keep Pace",
    excerpt:
      "Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    tag: "Abstract",
    categories: ["artblog", "lines"],
    image: "https://picsum.photos/seed/gega-hair/800/540",
  },
  {
    title: "The Best Approach to Art Direction for Every Personality Type",
    excerpt:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    tag: "Art",
    categories: ["art", "memphis", "shape"],
    image: "https://picsum.photos/seed/gega-stars/800/540",
  },
  {
    title: "The Future of Art, According to an Expert",
    excerpt:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    tag: "Abstract",
    categories: ["artwork", "lines", "boldcolor"],
    image: "https://picsum.photos/seed/gega-cards/800/540",
  },
  {
    title: "15 Brilliant Tips for Illustration Newbies",
    excerpt:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    tag: "Crafts",
    categories: ["artblog", "memphis"],
    image: "https://picsum.photos/seed/gega-book/800/540",
  },
  {
    title: "6 Global Trends That Will Affect Art in 2023",
    excerpt:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    tag: "Abstract",
    categories: ["artblog", "boldcolor"],
    image: "https://picsum.photos/seed/gega-green/800/540",
  },
  {
    title: "Shh! Don't Share This Branding Insider Secret",
    excerpt:
      "Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    tag: "Crafts",
    categories: ["artwork", "shape"],
    image: "https://picsum.photos/seed/gega-blur/800/540",
  },
  {
    title: "The Sick Truth of Illustration",
    excerpt:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    tag: "Design",
    categories: ["artwork", "memphis", "boldcolor"],
    image: "https://picsum.photos/seed/gega-dusk/800/540",
  },
  {
    title: "6 Unforgivable Art Mistakes Everyone Makes",
    excerpt:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    tag: "Art",
    categories: ["art", "lines"],
    image: "https://picsum.photos/seed/gega-mono/800/540",
  },
];

const DATE_LABEL = "January 4, 2023";

// ===== DOM =====
const grid = document.getElementById("postGrid");
const emptyMessage = document.getElementById("emptyMessage");
const filterList = document.getElementById("filterList");
const header = document.querySelector(".header");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

// ===== Reveal on scroll =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

// ===== Render =====
function createCard(post, index) {
  const article = document.createElement("article");
  article.className = "card";
  article.style.transitionDelay = `${(index % 3) * 90}ms`;

  article.innerHTML = `
    <div class="card__meta">
      <time datetime="2023-01-04">${DATE_LABEL}</time>
      <span class="card__tag">${post.tag}</span>
    </div>
    <a href="#" class="card__media" aria-hidden="true" tabindex="-1">
      <img src="${post.image}" alt="" loading="lazy" />
    </a>
    <h2 class="card__title"><a href="#">${post.title}</a></h2>
    <p class="card__excerpt">${post.excerpt}</p>
    <a href="#" class="card__more">Read more</a>
  `;

  return article;
}

function renderPosts(filter = "all") {
  const visible =
    filter === "all" ? posts : posts.filter((post) => post.categories.includes(filter));

  grid.innerHTML = "";
  visible.forEach((post, i) => {
    const card = createCard(post, i);
    grid.appendChild(card);
    revealObserver.observe(card);
  });

  emptyMessage.hidden = visible.length > 0;
  grid.hidden = visible.length === 0;
}

// ===== Filter =====
filterList.addEventListener("click", (event) => {
  const chip = event.target.closest(".chip");
  if (!chip) return;

  filterList.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
  chip.classList.add("is-active");
  renderPosts(chip.dataset.filter);
});

// ===== Header shadow on scroll =====
window.addEventListener(
  "scroll",
  () => header.classList.toggle("is-scrolled", window.scrollY > 10),
  { passive: true }
);

// ===== Mobile menu =====
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
});

nav.addEventListener("click", (event) => {
  if (event.target.closest(".nav__link")) {
    nav.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

// ===== Init =====
renderPosts();
