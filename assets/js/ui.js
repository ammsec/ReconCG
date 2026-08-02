/* =========================================
   ReconCG v5.0
   ui.js — DOM rendering
   ========================================= */

function buildSidebar() {
  const sidebar = document.getElementById("toolList");
  if (!sidebar) return;
  sidebar.innerHTML = "";

  toolCategories.forEach(cat => {
    const header = document.createElement("div");
    header.className = "category-header";
    header.textContent = cat.name;
    sidebar.appendChild(header);

    const group = document.createElement("div");
    group.className = "category-group";
    group.dataset.category = cat.key;

    cat.tools.forEach(key => {
      const tool = tools[key];
      if (!tool) return;
      const btn = document.createElement("button");
      btn.className = "tool-btn";
      btn.dataset.tool = key;
      btn.textContent = tool.title.replace(" Generator", "");
      btn.onclick = () => selectTool(key, btn);
      group.appendChild(btn);
    });

    sidebar.appendChild(group);
  });
}

function renderToolPanel(key) {
  const tool = tools[key];
  if (!tool) return;

  document.getElementById("toolTitle").textContent = tool.title;
  document.querySelector(".explanation").textContent = tool.description;
  document.getElementById("dynamicFields").innerHTML = tool.fields;
  document.getElementById("output").value = "";
  document.getElementById("commandDescription").innerHTML =
    "Configure the tool options then click <b>Generate Command</b>.";
  setStatus("Ready");
}

function highlightActiveButton(activeBtn) {
  document.querySelectorAll(".tool-btn").forEach(b => b.classList.remove("active"));
  if (activeBtn) activeBtn.classList.add("active");
}

function setStatus(text, type = "normal") {
  const el = document.getElementById("toolStatus");
  if (!el) return;
  el.textContent = text;
  el.className = type === "error" ? "status-error" : type === "ok" ? "status-ok" : "";
}
