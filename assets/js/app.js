/* =========================================
   ReconCG v5.0
   app.js — Application entry point
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  buildSidebar();
  initSearch();
  renderHistory();

  // Select the first tool by default
  const firstBtn = document.querySelector(".tool-btn");
  selectTool("nmap", firstBtn);

  const clearBtn = document.getElementById("clearHistoryBtn");
  if (clearBtn) clearBtn.onclick = clearHistory;

  const exportTxtBtn = document.getElementById("exportTxtBtn");
  if (exportTxtBtn) exportTxtBtn.onclick = exportHistoryAsText;

  const exportJsonBtn = document.getElementById("exportJsonBtn");
  if (exportJsonBtn) exportJsonBtn.onclick = exportHistoryAsJson;
});
