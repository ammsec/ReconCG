/* =========================================
   ReconCG v5.0
   search.js — Sidebar tool search/filter
   ========================================= */

function filterTools(query) {
  const q = query.trim().toLowerCase();
  const groups = document.querySelectorAll(".category-group");

  groups.forEach(group => {
    let visibleCount = 0;
    group.querySelectorAll(".tool-btn").forEach(btn => {
      const match = btn.textContent.toLowerCase().includes(q) || btn.dataset.tool.includes(q);
      btn.style.display = match ? "" : "none";
      if (match) visibleCount++;
    });

    const header = group.previousElementSibling;
    if (header && header.classList.contains("category-header")) {
      header.style.display = visibleCount > 0 ? "" : "none";
    }
  });
}

function initSearch() {
  const input = document.getElementById("toolSearch");
  if (!input) return;
  input.addEventListener("input", e => filterTools(e.target.value));
}
