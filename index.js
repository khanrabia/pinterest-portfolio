// ---------------------- Modal Handling ----------------------
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close");

// Project data (including other portfolios)
const projectDetails = {
  1: { title: "Starlight Tracker", description: "Explore constellations and myths through an interactive sky map." },
  2: { title: "Rune Compiler", description: "Translates code into runes with creative design and logic." },
  3: { title: "Lantern Guide", description: "Mindful daily app with prompts and inspiration." },
  4: { title: "Portfolio Redesign", description: "Clean, responsive portfolio layout for designers and developers." },
  5: { title: "UI Inspiration Board", description: "Collection of UI/UX patterns and design references." },
  6: { title: "Designer X", description: "Minimalist UI/UX design projects focusing on clean layouts." },
  7: { title: "Developer Y", description: "Mobile app projects highlighting intuitive user experiences." },
  8: { title: "Creative Z", description: "Graphic and interaction design projects with modern aesthetics." }
};

// // Open modal on project click
// // Open modal on project card click
// document.querySelectorAll(".project-card").forEach(card => {
//     card.addEventListener("click", (e) => {
//       e.preventDefault(); // Prevent default scrolling behavior
//       const projectId = card.getAttribute("data-project");
//       const data = projectDetails[projectId];
//       modalBody.innerHTML = `<h2>${data.title}</h2><p>${data.description}</p>`;
//       modal.style.display = "block";
//     });
//   });
  
//   document.querySelectorAll(".view-btn").forEach(button => {
//     button.addEventListener("click", function(e) {
//       e.preventDefault();
//       const jobDesc = this.nextElementSibling; // finds .job-description
//       jobDesc.classList.toggle("hidden");
//     });
//   });
// Open modal on "View Project" button click
document.querySelectorAll(".project-card .btn").forEach(button => {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent triggering the card click event

    const overlay = this.parentElement;
    const jobDesc = overlay.querySelector(".job-description"); // select only job-description
    if (jobDesc) {
      modalBody.innerHTML = jobDesc.innerHTML; // copy its HTML
      modal.style.display = "block";
    }
  });
});

  
  
  // Open modal on "View Portfolio" click
  document.querySelectorAll(".view-portfolio").forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default scrolling behavior
      const portfolioId = button.getAttribute("data-portfolio");
      const data = projectDetails[portfolioId];
      modalBody.innerHTML = `<h2>${data.title}</h2><p>${data.description}</p>`;
      modal.style.display = "block";
    });
  });
  

// Close modal
closeBtn.addEventListener('click', () => { modal.style.display = "none"; });
window.addEventListener("click", (event) => { if(event.target === modal) modal.style.display = "none"; });

// ---------------------- Lazy Load & Scroll Reveal ----------------------
const lazyImages = document.querySelectorAll('.lazy-img');
const revealElements = document.querySelectorAll(".reveal");
const projectCards = document.querySelectorAll(".project-card");
const skillItems = document.querySelectorAll(".skill-item");

const observerOptions = {
  root: null,
  rootMargin: "0px 0px 100px 0px",
  threshold: 0.1
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const el = entry.target;

      // Lazy-load images
      if(el.tagName === 'IMG' && el.dataset.src) {
        el.src = el.dataset.src;
        el.onload = () => el.classList.add('loaded');
      }

      // Scroll reveal
      if(!el.classList.contains('active')) {
        el.classList.add('active');
      }

      observer.unobserve(el);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe images, projects, skills, and other reveal elements
lazyImages.forEach(img => observer.observe(img));
revealElements.forEach(el => observer.observe(el));
projectCards.forEach(card => observer.observe(card));
skillItems.forEach(item => observer.observe(item));

// Fallback for older browsers
if (!('IntersectionObserver' in window)) {
  lazyImages.forEach(img => { img.src = img.dataset.src; img.classList.add('loaded'); });
  revealElements.forEach(el => el.classList.add('active'));
  projectCards.forEach(card => card.classList.add('active'));
  skillItems.forEach(item => item.classList.add('active'));
}

// ---------------------- Filter Projects ----------------------
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Toggle active class
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    projectCards.forEach((card, i) => {
      const category = card.getAttribute("data-category");
      if(filter === "all" || category === filter) {
        card.classList.remove("hide");
        card.classList.add("show");
        // stagger animation for filtered cards
        setTimeout(() => card.classList.add("active"), i * 100);
      } else {
        card.classList.remove("show");
        card.classList.add("hide");
        card.classList.remove("active");
      }
    });
  });
});

// ---------------------- Back to Top Button ----------------------
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.style.display = (window.scrollY > 300) ? "block" : "none";
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
