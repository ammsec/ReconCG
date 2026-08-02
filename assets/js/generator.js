/* =========================================
   ReconCG v5.0
   generator.js — Core generator logic
   ========================================= */

let currentTool = "nmap";

function selectTool(key, btnEl) {
  if (!tools[key]) return;
  currentTool = key;
  renderToolPanel(key);
  highlightActiveButton(btnEl);
  renderPresetButtons(key);
}

function collectFormData() {
  const container = document.getElementById("dynamicFields");
  const data = {};
  if (!container) return data;

  container.querySelectorAll("input[type='text']").forEach(input => {
    data[input.id] = input.value.trim();
  });
  container.querySelectorAll("input[type='checkbox']").forEach(input => {
    data[input.id] = input.checked;
  });
  return data;
}

function generateCommand() {
  const tool = tools[currentTool];
  if (!tool) return;

  const data = collectFormData();
  const result = validateFields(currentTool, data);

  if (!result.valid) {
    setStatus(result.message, "error");
    document.getElementById("output").value = "";
    return;
  }

  const command = tool.generate(data);
  document.getElementById("output").value = command;
  document.getElementById("commandDescription").textContent =
    "Command generated for " + tool.title.replace(" Generator", "") + ".";
  setStatus("Command generated", "ok");

  addToHistory(currentTool, command);
}

function copyCommand() {
  const output = document.getElementById("output");
  if (!output.value) {
    setStatus("Nothing to copy yet", "error");
    return;
  }
  navigator.clipboard.writeText(output.value)
    .then(() => setStatus("Copied to clipboard", "ok"))
    .catch(() => setStatus("Copy failed — select and copy manually", "error"));
}

function resetForm() {
  const tool = tools[currentTool];
  document.getElementById("dynamicFields").innerHTML = tool.fields;
  document.getElementById("output").value = "";
  document.getElementById("commandDescription").innerHTML =
    "Configure the tool options then click <b>Generate Command</b>.";
  setStatus("Ready");
}
