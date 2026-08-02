/* =========================================
   ReconCG v5.0
   export.js — Export history to file
   ========================================= */

function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportHistoryAsText() {
  const items = getHistory();
  if (items.length === 0) {
    setStatus("No history to export", "error");
    return;
  }
  const lines = items.map(i => `[${i.timestamp}] ${i.title}\n${i.command}\n`).join("\n");
  downloadFile("reconcg-history.txt", lines, "text/plain");
  setStatus("History exported as .txt", "ok");
}

function exportHistoryAsJson() {
  const items = getHistory();
  if (items.length === 0) {
    setStatus("No history to export", "error");
    return;
  }
  downloadFile("reconcg-history.json", JSON.stringify(items, null, 2), "application/json");
  setStatus("History exported as .json", "ok");
}

function exportCurrentCommand() {
  const output = document.getElementById("output");
  if (!output.value) {
    setStatus("Nothing to export yet", "error");
    return;
  }
  downloadFile(currentTool + "-command.sh", "#!/bin/bash\n" + output.value + "\n", "text/x-shellscript");
  setStatus("Command exported as .sh", "ok");
}
