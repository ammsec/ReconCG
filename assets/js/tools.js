/* =========================================
   ReconCG v5.0
   tools.js — Tool Database
   Each tool: { title, description, category, fields (HTML), generate(data) }
   ========================================= */

const toolCategories = [
  { key: "core",  name: "Core Recon",     tools: ["nmap","subfinder","amass","assetfinder","findomain","httpx","naabu","dnsx","chaos","shuffledns"] },
  { key: "web",   name: "Web Discovery",  tools: ["katana","hakrawler","gospider","gau","waybackurls","ffuf","gobuster","feroxbuster","dirsearch","wfuzz"] },
  { key: "vuln",  name: "Vulnerability",  tools: ["nuclei","nikto","dalfox","xsstrike","sqlmap","arjun","wapiti","commix","wpscan","wafw00f"] },
  { key: "osint", name: "OSINT",          tools: ["theharvester","spiderfoot","exiftool","gitdorker","trufflehog"] }
];

const tools = {

  /* ===================== CORE RECON ===================== */

  nmap: {
    title: "Nmap Generator",
    description: "Network discovery and port scanner.",
    category: "core",
    fields: `
      <input id="target" type="text" placeholder="Target IP / Domain">
      <div class="options">
        <label><input id="syn" type="checkbox"> SYN Scan (-sS)</label>
        <label><input id="service" type="checkbox"> Service Detection (-sV)</label>
        <label><input id="script" type="checkbox"> Default Scripts (-sC)</label>
        <label><input id="os" type="checkbox"> OS Detection (-O)</label>
        <label><input id="aggressive" type="checkbox"> Aggressive (-A)</label>
        <label><input id="pn" type="checkbox"> Skip Host Discovery (-Pn)</label>
        <label><input id="verbose" type="checkbox"> Verbose (-v)</label>
        <label><input id="top1000" type="checkbox"> Top 1000 Ports</label>
        <label><input id="allports" type="checkbox"> All Ports (-p-)</label>
        <label><input id="timing" type="checkbox"> Timing T4 (-T4)</label>
      </div>`,
    generate(data) {
      let cmd = "nmap";
      if (data.syn) cmd += " -sS";
      if (data.service) cmd += " -sV";
      if (data.script) cmd += " -sC";
      if (data.os) cmd += " -O";
      if (data.aggressive) cmd += " -A";
      if (data.pn) cmd += " -Pn";
      if (data.verbose) cmd += " -v";
      if (data.top1000) cmd += " --top-ports 1000";
      if (data.allports) cmd += " -p-";
      if (data.timing) cmd += " -T4";
      if (data.target) cmd += " " + data.target;
      return cmd;
    }
  },

  subfinder: {
    title: "Subfinder Generator",
    description: "Passive subdomain enumeration.",
    category: "core",
    fields: `
      <input id="target" type="text" placeholder="Target Domain">
      <div class="options">
        <label><input id="recursive" type="checkbox"> Recursive</label>
        <label><input id="all" type="checkbox"> All Sources</label>
        <label><input id="silent" type="checkbox"> Silent</label>
      </div>`,
    generate(data) {
      let cmd = "subfinder";
      if (data.target) cmd += " -d " + data.target;
      if (data.recursive) cmd += " -recursive";
      if (data.all) cmd += " -all";
      if (data.silent) cmd += " -silent";
      return cmd;
    }
  },

  amass: {
    title: "Amass Generator",
    description: "In-depth attack surface mapping and asset discovery.",
    category: "core",
    fields: `
      <input id="target" type="text" placeholder="example.com">
      <div class="options">
        <label><input id="passive" type="checkbox"> Passive</label>
        <label><input id="brute" type="checkbox"> Brute Force</label>
      </div>`,
    generate(data) {
      let cmd = "amass enum";
      if (data.passive) cmd += " -passive";
      if (data.brute) cmd += " -brute";
      if (data.target) cmd += " -d " + data.target;
      return cmd;
    }
  },

  assetfinder: {
    title: "Assetfinder Generator",
    description: "Find related domains and subdomains.",
    category: "core",
    fields: `
      <input id="target" type="text" placeholder="example.com">
      <div class="options">
        <label><input id="subsonly" type="checkbox"> Subdomains Only (--subs-only)</label>
      </div>`,
    generate(data) {
      let cmd = "assetfinder";
      if (data.subsonly) cmd += " --subs-only";
      if (data.target) cmd += " " + data.target;
      return cmd;
    }
  },

  findomain: {
    title: "Findomain Generator",
    description: "Fast cross-platform subdomain enumerator.",
    category: "core",
    fields: `
      <input id="target" type="text" placeholder="example.com">
      <input id="output" type="text" placeholder="Output file (optional)">
      <div class="options">
        <label><input id="quiet" type="checkbox"> Quiet</label>
        <label><input id="resolved" type="checkbox"> Resolve IPs (-r)</label>
      </div>`,
    generate(data) {
      let cmd = "findomain";
      if (data.target) cmd += " -t " + data.target;
      if (data.resolved) cmd += " -r";
      if (data.quiet) cmd += " -q";
      if (data.output) cmd += " -u " + data.output;
      return cmd;
    }
  },

  httpx: {
    title: "httpx Generator",
    description: "Fast and multi-purpose HTTP probing tool.",
    category: "core",
    fields: `
      <input id="target" type="text" placeholder="Target Domain">
      <div class="options">
        <label><input id="status" type="checkbox"> Status Code</label>
        <label><input id="title" type="checkbox"> Page Title</label>
        <label><input id="tech" type="checkbox"> Technology Detection</label>
        <label><input id="server" type="checkbox"> Web Server</label>
        <label><input id="follow" type="checkbox"> Follow Redirects</label>
      </div>`,
    generate(data) {
      let cmd = "httpx";
      if (data.target) cmd += " -u " + data.target;
      if (data.status) cmd += " -status-code";
      if (data.title) cmd += " -title";
      if (data.tech) cmd += " -tech-detect";
      if (data.server) cmd += " -web-server";
      if (data.follow) cmd += " -follow-redirects";
      return cmd;
    }
  },

  naabu: {
    title: "Naabu Generator",
    description: "Fast port scanner.",
    category: "core",
    fields: `
      <input id="target" type="text" placeholder="Target">
      <div class="options">
        <label><input id="topports" type="checkbox"> Top 1000 Ports</label>
        <label><input id="verify" type="checkbox"> Verify Open Ports</label>
      </div>`,
    generate(data) {
      let cmd = "naabu";
      if (data.target) cmd += " -host " + data.target;
      if (data.topports) cmd += " -top-ports 1000";
      if (data.verify) cmd += " -verify";
      return cmd;
    }
  },

  dnsx: {
    title: "dnsx Generator",
    description: "Fast and multi-purpose DNS toolkit.",
    category: "core",
    fields: `
      <input id="target" type="text" placeholder="example.com">
      <div class="options">
        <label><input id="resp" type="checkbox"> Show Response</label>
        <label><input id="aaaa" type="checkbox"> Query AAAA Record</label>
      </div>`,
    generate(data) {
      let cmd = "dnsx";
      if (data.target) cmd += " -d " + data.target;
      if (data.resp) cmd += " -resp";
      if (data.aaaa) cmd += " -aaaa";
      return cmd;
    }
  },

  chaos: {
    title: "Chaos Generator",
    description: "ProjectDiscovery Chaos subdomain intelligence dataset.",
    category: "core",
    fields: `
      <input id="target" type="text" placeholder="example.com">
      <div class="options">
        <label><input id="silent" type="checkbox"> Silent</label>
        <label><input id="count" type="checkbox"> Show Count</label>
      </div>`,
    generate(data) {
      let cmd = "chaos";
      if (data.target) cmd += " -d " + data.target;
      if (data.silent) cmd += " -silent";
      if (data.count) cmd += " -count";
      return cmd;
    }
  },

  shuffledns: {
    title: "Shuffledns Generator",
    description: "Wrapper around massdns for DNS brute forcing / resolving.",
    category: "core",
    fields: `
      <input id="target" type="text" placeholder="example.com">
      <input id="wordlist" type="text" placeholder="/path/to/wordlist.txt">
      <input id="resolvers" type="text" placeholder="/path/to/resolvers.txt">
      <div class="options">
        <label><input id="silent" type="checkbox"> Silent</label>
      </div>`,
    generate(data) {
      let cmd = "shuffledns";
      if (data.target) cmd += " -d " + data.target;
      if (data.wordlist) cmd += " -w " + data.wordlist;
      if (data.resolvers) cmd += " -r " + data.resolvers;
      if (data.silent) cmd += " -silent";
      return cmd;
    }
  },

  /* ===================== WEB DISCOVERY ===================== */

  katana: {
    title: "Katana Generator",
    description: "Next-gen crawling and spidering framework.",
    category: "web",
    fields: `
      <input id="target" type="text" placeholder="https://target.com">
      <div class="options">
        <label><input id="depth3" type="checkbox"> Depth 3</label>
        <label><input id="js" type="checkbox"> Crawl JavaScript</label>
        <label><input id="silent" type="checkbox"> Silent</label>
      </div>`,
    generate(data) {
      let cmd = "katana";
      if (data.target) cmd += " -u " + data.target;
      if (data.depth3) cmd += " -depth 3";
      if (data.js) cmd += " -jc";
      if (data.silent) cmd += " -silent";
      return cmd;
    }
  },

  hakrawler: {
    title: "Hakrawler Generator",
    description: "Simple, fast web crawler.",
    category: "web",
    fields: `
      <input id="target" type="text" placeholder="https://target.com">
      <div class="options">
        <label><input id="depth" type="checkbox"> Depth 2 (-d 2)</label>
        <label><input id="forms" type="checkbox"> Include Forms (-subs)</label>
      </div>`,
    generate(data) {
      let cmd = "hakrawler";
      if (data.target) cmd += " -url " + data.target;
      if (data.depth) cmd += " -d 2";
      if (data.forms) cmd += " -subs";
      return cmd;
    }
  },

  gospider: {
    title: "GoSpider Generator",
    description: "Fast web spider written in Go.",
    category: "web",
    fields: `
      <input id="target" type="text" placeholder="https://target.com">
      <div class="options">
        <label><input id="depth2" type="checkbox"> Depth 2</label>
        <label><input id="sitemap" type="checkbox"> Parse Sitemap</label>
        <label><input id="robots" type="checkbox"> Parse robots.txt</label>
      </div>`,
    generate(data) {
      let cmd = "gospider";
      if (data.target) cmd += " -s " + data.target;
      if (data.depth2) cmd += " -d 2";
      if (data.sitemap) cmd += " --sitemap";
      if (data.robots) cmd += " --robots";
      return cmd;
    }
  },

  gau: {
    title: "GAU (GetAllUrls) Generator",
    description: "Fetch known URLs from AlienVault OTX, Wayback Machine, and Common Crawl.",
    category: "web",
    fields: `
      <input id="target" type="text" placeholder="example.com">
      <div class="options">
        <label><input id="subs" type="checkbox"> Include Subdomains</label>
        <label><input id="providers" type="checkbox"> All Providers</label>
      </div>`,
    generate(data) {
      let cmd = "gau";
      if (data.subs) cmd += " --subs";
      if (data.providers) cmd += " --providers wayback,commoncrawl,otx,urlscan";
      if (data.target) cmd += " " + data.target;
      return cmd;
    }
  },

  waybackurls: {
    title: "Waybackurls Generator",
    description: "Fetch known URLs from the Wayback Machine.",
    category: "web",
    fields: `
      <input id="target" type="text" placeholder="example.com">
      <div class="options">
        <label><input id="dates" type="checkbox"> Show Dates (--dates)</label>
      </div>`,
    generate(data) {
      let cmd = "waybackurls";
      if (data.dates) cmd += " --dates";
      if (data.target) cmd += " " + data.target;
      return cmd;
    }
  },

  ffuf: {
    title: "FFUF Generator",
    description: "Fast web fuzzer.",
    category: "web",
    fields: `
      <input id="url" type="text" placeholder="https://target.com/FUZZ">
      <input id="wordlist" type="text" placeholder="/usr/share/wordlists/dirb/common.txt">
      <div class="options">
        <label><input id="mc" type="checkbox"> Match Codes 200,204,301,302,307</label>
        <label><input id="recursion" type="checkbox"> Recursive</label>
      </div>`,
    generate(data) {
      let cmd = "ffuf";
      if (data.url) cmd += " -u " + data.url;
      if (data.wordlist) cmd += " -w " + data.wordlist;
      if (data.mc) cmd += " -mc 200,204,301,302,307";
      if (data.recursion) cmd += " -recursion";
      return cmd;
    }
  },

  gobuster: {
    title: "Gobuster Generator",
    description: "Directory / file brute-forcer.",
    category: "web",
    fields: `
      <input id="url" type="text" placeholder="https://target.com">
      <input id="wordlist" type="text" placeholder="/usr/share/wordlists/dirb/common.txt">
      <div class="options">
        <label><input id="statuscodes" type="checkbox"> Show Status Codes</label>
      </div>`,
    generate(data) {
      let cmd = "gobuster dir";
      if (data.url) cmd += " -u " + data.url;
      if (data.wordlist) cmd += " -w " + data.wordlist;
      if (data.statuscodes) cmd += " -s 200,204,301,302,307,401,403";
      return cmd;
    }
  },

  feroxbuster: {
    title: "Feroxbuster Generator",
    description: "Fast, recursive content discovery tool written in Rust.",
    category: "web",
    fields: `
      <input id="url" type="text" placeholder="https://target.com">
      <input id="wordlist" type="text" placeholder="/usr/share/wordlists/dirb/common.txt">
      <div class="options">
        <label><input id="recursive" type="checkbox"> Recursive</label>
        <label><input id="quiet" type="checkbox"> Quiet</label>
      </div>`,
    generate(data) {
      let cmd = "feroxbuster";
      if (data.url) cmd += " -u " + data.url;
      if (data.wordlist) cmd += " -w " + data.wordlist;
      if (!data.recursive) cmd += " -n";
      if (data.quiet) cmd += " -q";
      return cmd;
    }
  },

  dirsearch: {
    title: "Dirsearch Generator",
    description: "Web path scanner.",
    category: "web",
    fields: `
      <input id="url" type="text" placeholder="https://target.com">
      <input id="ext" type="text" placeholder="Extensions e.g. php,html,js">
      <div class="options">
        <label><input id="recursive" type="checkbox"> Recursive (-r)</label>
      </div>`,
    generate(data) {
      let cmd = "dirsearch";
      if (data.url) cmd += " -u " + data.url;
      if (data.ext) cmd += " -e " + data.ext;
      if (data.recursive) cmd += " -r";
      return cmd;
    }
  },

  wfuzz: {
    title: "Wfuzz Generator",
    description: "Web application fuzzer.",
    category: "web",
    fields: `
      <input id="url" type="text" placeholder="https://target.com/FUZZ">
      <input id="wordlist" type="text" placeholder="/usr/share/wordlists/dirb/common.txt">
      <div class="options">
        <label><input id="hidecode" type="checkbox"> Hide 404 (--hc 404)</label>
      </div>`,
    generate(data) {
      let cmd = "wfuzz";
      if (data.wordlist) cmd += " -w " + data.wordlist;
      if (data.hidecode) cmd += " --hc 404";
      if (data.url) cmd += " " + data.url;
      return cmd;
    }
  },

  /* ===================== VULNERABILITY ===================== */

  nuclei: {
    title: "Nuclei Generator",
    description: "Template-based vulnerability scanner.",
    category: "vuln",
    fields: `
      <input id="target" type="text" placeholder="https://target.com">
      <input id="templates" type="text" placeholder="Template path or tag (optional)">
      <div class="options">
        <label><input id="severity" type="checkbox"> Critical/High Severity Only</label>
        <label><input id="silent" type="checkbox"> Silent</label>
      </div>`,
    generate(data) {
      let cmd = "nuclei";
      if (data.target) cmd += " -u " + data.target;
      if (data.templates) cmd += " -t " + data.templates;
      if (data.severity) cmd += " -severity critical,high";
      if (data.silent) cmd += " -silent";
      return cmd;
    }
  },

  nikto: {
    title: "Nikto Generator",
    description: "Web server scanner.",
    category: "vuln",
    fields: `
      <input id="target" type="text" placeholder="https://target.com">
      <div class="options">
        <label><input id="ssl" type="checkbox"> Force SSL (-ssl)</label>
        <label><input id="tuning" type="checkbox"> Tuning 1,2,3 (info/misconfig/disclosure)</label>
      </div>`,
    generate(data) {
      let cmd = "nikto";
      if (data.target) cmd += " -h " + data.target;
      if (data.ssl) cmd += " -ssl";
      if (data.tuning) cmd += " -Tuning 1,2,3";
      return cmd;
    }
  },

  dalfox: {
    title: "Dalfox Generator",
    description: "Powerful XSS scanner.",
    category: "vuln",
    fields: `
      <input id="target" type="text" placeholder="https://target.com/?q=test">
      <div class="options">
        <label><input id="silent" type="checkbox"> Silent</label>
        <label><input id="mining" type="checkbox"> Mine DOM (--mining-dom)</label>
      </div>`,
    generate(data) {
      let cmd = "dalfox url";
      if (data.target) cmd += " " + data.target;
      if (data.silent) cmd += " -S";
      if (data.mining) cmd += " --mining-dom";
      return cmd;
    }
  },

  xsstrike: {
    title: "XSStrike Generator",
    description: "Advanced XSS detection suite.",
    category: "vuln",
    fields: `
      <input id="target" type="text" placeholder="https://target.com/?q=test">
      <div class="options">
        <label><input id="crawl" type="checkbox"> Crawl (--crawl)</label>
        <label><input id="blind" type="checkbox"> Blind XSS</label>
      </div>`,
    generate(data) {
      let cmd = "python3 xsstrike.py";
      if (data.target) cmd += " -u " + data.target;
      if (data.crawl) cmd += " --crawl";
      if (data.blind) cmd += " --blind";
      return cmd;
    }
  },

  sqlmap: {
    title: "SQLMap Generator",
    description: "Automated SQL injection detection tool.",
    category: "vuln",
    fields: `
      <input id="target" type="text" placeholder="https://target.com/page?id=1">
      <div class="options">
        <label><input id="dbs" type="checkbox"> Enumerate DBs (--dbs)</label>
        <label><input id="batch" type="checkbox"> Batch Mode (--batch)</label>
        <label><input id="risk" type="checkbox"> Risk 2 / Level 2</label>
      </div>`,
    generate(data) {
      let cmd = "sqlmap";
      if (data.target) cmd += " -u " + data.target;
      if (data.dbs) cmd += " --dbs";
      if (data.batch) cmd += " --batch";
      if (data.risk) cmd += " --risk=2 --level=2";
      return cmd;
    }
  },

  arjun: {
    title: "Arjun Generator",
    description: "HTTP parameter discovery suite.",
    category: "vuln",
    fields: `
      <input id="target" type="text" placeholder="https://target.com/endpoint">
      <div class="options">
        <label><input id="stable" type="checkbox"> Stable Mode</label>
      </div>`,
    generate(data) {
      let cmd = "arjun";
      if (data.target) cmd += " -u " + data.target;
      if (data.stable) cmd += " --stable";
      return cmd;
    }
  },

  wapiti: {
    title: "Wapiti Generator",
    description: "Web application vulnerability scanner.",
    category: "vuln",
    fields: `
      <input id="target" type="text" placeholder="https://target.com">
      <div class="options">
        <label><input id="verbose" type="checkbox"> Verbose (-v 2)</label>
      </div>`,
    generate(data) {
      let cmd = "wapiti";
      if (data.target) cmd += " -u " + data.target;
      if (data.verbose) cmd += " -v 2";
      return cmd;
    }
  },

  commix: {
    title: "Commix Generator",
    description: "Automated command injection testing tool.",
    category: "vuln",
    fields: `
      <input id="target" type="text" placeholder="https://target.com/page?cmd=test">
      <div class="options">
        <label><input id="batch" type="checkbox"> Batch Mode (--batch)</label>
      </div>`,
    generate(data) {
      let cmd = "commix";
      if (data.target) cmd += " --url=" + data.target;
      if (data.batch) cmd += " --batch";
      return cmd;
    }
  },

  wpscan: {
    title: "WPScan Generator",
    description: "WordPress security scanner.",
    category: "vuln",
    fields: `
      <input id="target" type="text" placeholder="https://target.com">
      <div class="options">
        <label><input id="enumall" type="checkbox"> Enumerate All (-e vp,vt,u)</label>
        <label><input id="randomua" type="checkbox"> Random User-Agent</label>
      </div>`,
    generate(data) {
      let cmd = "wpscan";
      if (data.target) cmd += " --url " + data.target;
      if (data.enumall) cmd += " -e vp,vt,u";
      if (data.randomua) cmd += " --random-user-agent";
      return cmd;
    }
  },

  wafw00f: {
    title: "Wafw00f Generator",
    description: "Web application firewall (WAF) fingerprinting tool.",
    category: "vuln",
    fields: `
      <input id="target" type="text" placeholder="https://target.com">
      <div class="options">
        <label><input id="findall" type="checkbox"> Find All WAFs (-a)</label>
      </div>`,
    generate(data) {
      let cmd = "wafw00f";
      if (data.findall) cmd += " -a";
      if (data.target) cmd += " " + data.target;
      return cmd;
    }
  },

  /* ===================== OSINT ===================== */

  theharvester: {
    title: "theHarvester Generator",
    description: "Email, subdomain, and name gathering tool.",
    category: "osint",
    fields: `
      <input id="target" type="text" placeholder="example.com">
      <input id="sources" type="text" placeholder="Sources e.g. google,bing,crtsh">
      <div class="options">
        <label><input id="limit" type="checkbox"> Limit 500 Results</label>
      </div>`,
    generate(data) {
      let cmd = "theHarvester";
      if (data.target) cmd += " -d " + data.target;
      if (data.sources) cmd += " -b " + data.sources; else cmd += " -b all";
      if (data.limit) cmd += " -l 500";
      return cmd;
    }
  },

  spiderfoot: {
    title: "SpiderFoot Generator",
    description: "Open-source OSINT automation tool.",
    category: "osint",
    fields: `
      <input id="target" type="text" placeholder="example.com">
      <div class="options">
        <label><input id="allmodules" type="checkbox"> All Modules (-m all)</label>
      </div>`,
    generate(data) {
      let cmd = "sf";
      if (data.target) cmd += " -s " + data.target;
      if (data.allmodules) cmd += " -m all";
      return cmd;
    }
  },

  exiftool: {
    title: "ExifTool Generator",
    description: "Read and write metadata in files.",
    category: "osint",
    fields: `
      <input id="target" type="text" placeholder="/path/to/file_or_directory">
      <div class="options">
        <label><input id="recursive" type="checkbox"> Recursive (-r)</label>
        <label><input id="gps" type="checkbox"> GPS Only</label>
      </div>`,
    generate(data) {
      let cmd = "exiftool";
      if (data.recursive) cmd += " -r";
      if (data.gps) cmd += ' -GPS*';
      if (data.target) cmd += " " + data.target;
      return cmd;
    }
  },

  gitdorker: {
    title: "GitDorker Generator",
    description: "GitHub dorking automation tool.",
    category: "osint",
    fields: `
      <input id="target" type="text" placeholder="Organization or Target Name">
      <input id="tokenfile" type="text" placeholder="/path/to/tokens.txt">
      <div class="options">
        <label><input id="allDorks" type="checkbox"> All Dork Files (-d Dorks/*)</label>
      </div>`,
    generate(data) {
      let cmd = "python3 GitDorker.py";
      if (data.tokenfile) cmd += " -tf " + data.tokenfile;
      if (data.target) cmd += " -q " + data.target;
      if (data.allDorks) cmd += " -d Dorks/*";
      return cmd;
    }
  },

  trufflehog: {
    title: "TruffleHog Generator",
    description: "Find secrets and credentials in git repositories.",
    category: "osint",
    fields: `
      <input id="target" type="text" placeholder="https://github.com/org/repo or path">
      <div class="options">
        <label><input id="onlyverified" type="checkbox"> Only Verified Secrets</label>
      </div>`,
    generate(data) {
      let cmd = "trufflehog git";
      if (data.target) cmd += " " + data.target;
      if (data.onlyverified) cmd += " --only-verified";
      return cmd;
    }
  }

};
