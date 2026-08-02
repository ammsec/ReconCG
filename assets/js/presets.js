/* =========================================
   ReconCG v5.0
   presets.js — Quick preset configurations
   ========================================= */

const presets = {
  nmap: {
    "Quick Scan": { syn: true, top1000: true, timing: true },
    "Full Scan":  { syn: true, service: true, script: true, os: true, allports: true, timing: true }
  },
  nuclei: {
    "Fast Check":     { severity: true, silent: true },
    "Full Templates": { silent: true }
  },
  ffuf: {
    "Basic Fuzz":     { mc: true },
    "Recursive Fuzz": { mc: true, recursion: true }
  },
  httpx: {
    "Recon Probe": { status: true, title: true, tech: true }
  }
};

function applyPreset(toolKey, presetName) {
  const preset = presets[toolKey] && presets[toolKey][presetName];
  if (!preset) return;

  const container = document.getElementById("dynamicFields");
  if (!container) return;

  Object.entries(preset).forEach(([id, value]) => {
    const el = container.querySelector("#" + id);
    if (!el) return;
    if (el.type === "checkbox") el.checked = value;
    else el.value = value;
  });

  setStatus("Preset applied: " + presetName, "ok");
}

function renderPresetButtons(toolKey) {
  const container = document.getElementById("presetButtons");
  if (!container) return;

  const toolPresets = presets[toolKey];
  if (!toolPresets) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = Object.keys(toolPresets).map(name =>
    `<button class="preset-btn" onclick="applyPreset('${toolKey}', '${name}')">${name}</button>`
  ).join("");
}
