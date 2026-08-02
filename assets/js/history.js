/* =========================================
   ReconCG v5.0
   history.js — Command history (localStorage)
   ========================================= */

const HISTORY_KEY = "reconcg_history";
const HISTORY_LIMIT = 50;

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

function saveHistory(items) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
}

function addToHistory(toolKey, command) {
  const items = getHistory();
  items.unshift({
    tool: toolKey,
    title: tools[toolKey] ? tools[toolKey].title.replace(" Generator", "") : toolKey,
    command,
    timestamp: new Date().toISOString()
  });
  saveHistory(items.slice(0, HISTORY_LIMIT));
  renderHistory();
}

function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById("historyList");
  if (!list) return;

  const items = getHistory();
  if (items.length === 0) {
    list.innerHTML = "<p>No commands generated.</p>";
    return;
  }

  list.innerHTML = items.map((item, i) => `
    <div class="history-item">
      <div class="history-meta">
        <span class="history-tool">${item.title}</span>
        <span class="history-time">${new Date(item.timestamp).toLocaleTimeString()}</span>
      </div>
      <code class="history-cmd">${escapeHtml(item.command)}</code>
      <div class="history-actions">
        <button onclick="reuseHistoryItem(${i})">Reuse</button>
        <button onclick="copyHistoryItem(${i})">Copy</button>
      </div>
    </div>
  `).join("");
}

function reuseHistoryItem(index) {
  const items = getHistory();
  const item = items[index];
  if (!item) return;
  document.getElementById("output").value = item.command;
  setStatus("Loaded from history", "ok");
}

function copyHistoryItem(index) {
  const items = getHistory();
  const item = items[index];
  if (!item) return;
  navigator.clipboard.writeText(item.command)
    .then(() => setStatus("Copied to clipboard", "ok"))
    .catch(() => setStatus("Copy failed", "error"));
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
