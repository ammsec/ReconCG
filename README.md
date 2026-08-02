# ReconCG v5.0

**Interactive Recon Command Generator** — build reconnaissance and security-testing commands in seconds, no more memorizing flags.

Built with ❤️ by [**ammsec**](https://github.com/ammsec)

---

## What it is

ReconCG is a single-page dashboard that generates ready-to-run CLI commands for 35 popular recon, discovery, and vulnerability-testing tools. Pick a tool, toggle the options you need, and copy the finished command — or apply a one-click preset for common scan types.

No backend, no dependencies. Pure HTML/CSS/JS that runs entirely in the browser.

## Features

- **35 tools** across 4 categories — command generation, not execution. ReconCG only builds the string; you run it in your own terminal.
- **Live search** to filter tools by name.
- **Presets** — one-click flag combinations (e.g. Nmap "Quick Scan" vs "Full Scan").
- **Command history** — last 50 generated commands, saved locally in your browser (`localStorage`), with reuse/copy per entry.
- **Export** — download history as `.txt` / `.json`, or export the current command as a `.sh` script.
- **Input validation** — blocks empty required fields and strips shell metacharacters (`; & | \` $ > <`) from free-text inputs.
- Responsive layout, dark terminal theme, reduced-motion support.

## Tool set

| Category | Tools |
|---|---|
| **Core Recon** | Nmap, Subfinder, Amass, Assetfinder, Findomain, HTTPX, Naabu, DNSX, Chaos, Shuffledns |
| **Web Discovery** | Katana, Hakrawler, GoSpider, GAU, Waybackurls, FFUF, Gobuster, Feroxbuster, Dirsearch, Wfuzz |
| **Vulnerability** | Nuclei, Nikto, Dalfox, XSStrike, SQLMap, Arjun, Wapiti, Commix, WPScan, Wafw00f |
| **OSINT** | theHarvester, SpiderFoot, ExifTool, GitDorker, TruffleHog |

## Getting started

1. Clone or download this repo.
2. Open `index.html` in a browser, or serve it locally (e.g. VS Code Live Server, `python3 -m http.server`).
3. Pick a tool from the sidebar, fill in the target/options, hit **Generate Command**.

No build step, no install required — it's static files.

## Project structure

```
reconcg/
├── index.html
├── LICENSE
├── README.md
└── assets/
    ├── css/
    │   ├── style.css        # core theme
    │   ├── animations.css   # motion & transitions
    │   └── responsive.css   # breakpoints
    ├── icons/
    │   └── favicon.svg
    └── js/
        ├── tools.js          # tool database (fields + command generators)
        ├── ui.js             # sidebar & panel rendering
        ├── generator.js      # tool selection, form collection, generate/copy/reset
        ├── validation.js     # input validation
        ├── history.js        # command history (localStorage)
        ├── presets.js        # quick preset configurations
        ├── search.js         # sidebar search/filter
        ├── export.js         # export history / command to file
        └── app.js            # entry point, wires everything together
```

## Adding a new tool

Open `assets/js/tools.js` and add an entry to the `tools` object:

```js
mytool: {
  title: "MyTool Generator",
  description: "What this tool does.",
  category: "core", // core | web | vuln | osint
  fields: `
    <input id="target" type="text" placeholder="Target">
    <div class="options">
      <label><input id="flagA" type="checkbox"> Flag A</label>
    </div>`,
  generate(data) {
    let cmd = "mytool";
    if (data.flagA) cmd += " -a";
    if (data.target) cmd += " " + data.target;
    return cmd;
  }
}
```

Then add its key to the relevant category array in `toolCategories` at the top of the same file. That's it — the sidebar, search, and generator all pick it up automatically.

## ⚠️ Responsible use

Several tools in this list (SQLMap, Commix, Nuclei, WPScan, etc.) are intrusive or exploitation-capable. ReconCG only builds the command text — it does not run anything. Only use generated commands against systems you own or have explicit written authorization to test.

## License

See [LICENSE](LICENSE).
