/*
=========================================
ReconCG v2.1
Author: ammsec

Multi Tool Recon Command Generator
=========================================
*/


let currentTool = "nmap";



const fields = {


nmap: `

<input id="target" placeholder="Target IP / Domain">


<label>
<input id="syn" type="checkbox">
SYN Scan (-sS)
</label>


<label>
<input id="service" type="checkbox">
Service Detection (-sV)
</label>


<label>
<input id="script" type="checkbox">
Default Scripts (-sC)
</label>


<label>
<input id="os" type="checkbox">
OS Detection (-O)
</label>


<label>
<input id="aggressive" type="checkbox">
Aggressive (-A)
</label>


<label>
<input id="pn" type="checkbox">
No Ping (-Pn)
</label>


<label>
<input id="verbose" type="checkbox">
Verbose (-v)
</label>

`,



subfinder: `

<input id="target" placeholder="Domain">


<label>
<input id="recursive" type="checkbox">
Recursive
</label>


<label>
<input id="all" type="checkbox">
All Sources
</label>

`,



httpx:`

<input id="target" placeholder="Domain">


<label>
<input id="status" type="checkbox">
Status Code
</label>


<label>
<input id="title" type="checkbox">
Title
</label>


<label>
<input id="tech" type="checkbox">
Technology Detection
</label>

`,



ffuf:`

<input id="url" placeholder="https://site.com">


<input id="wordlist" placeholder="wordlist.txt">

`,



gobuster:`

<input id="url" placeholder="https://site.com">


<input id="wordlist" placeholder="wordlist.txt">

`,



katana:`

<input id="target" placeholder="URL">

`,



nuclei:`

<input id="target" placeholder="Target">


<select id="severity">

<option value="">
Severity
</option>

<option value="low">
Low
</option>

<option value="medium">
Medium
</option>

<option value="high">
High
</option>

<option value="critical">
Critical
</option>

</select>

`,



amass:`

<input id="target" placeholder="Domain">

`


};






const tools = {



nmap:{


title:"Nmap Generator",


description:
"Network scanner for discovering hosts, ports and services.",



generate(data){


let cmd="nmap ";



if(data.syn)
cmd+="-sS ";


if(data.service)
cmd+="-sV ";


if(data.script)
cmd+="-sC ";


if(data.os)
cmd+="-O ";


if(data.aggressive)
cmd+="-A ";


if(data.pn)
cmd+="-Pn ";


if(data.verbose)
cmd+="-v ";


cmd+=data.target;


return cmd;


}

},




subfinder:{


title:"Subfinder Generator",


description:
"Finds subdomains using passive reconnaissance sources.",



generate(data){


let cmd=`subfinder -d ${data.target}`;



if(data.recursive)
cmd+=" -recursive";



if(data.all)
cmd+=" -all";



return cmd;


}

},




httpx:{


title:"httpx Generator",


description:
"HTTP probing tool for identifying live web services.",



generate(data){


let cmd=`echo ${data.target} | httpx`;



if(data.status)
cmd+=" -status-code";


if(data.title)
cmd+=" -title";


if(data.tech)
cmd+=" -tech-detect";


return cmd;


}

},




ffuf:{


title:"ffuf Generator",


description:
"Fast web fuzzing tool for content discovery.",



generate(data){


return `ffuf -u ${data.url}/FUZZ -w ${data.wordlist}`;


}

},




gobuster:{


title:"Gobuster Generator",


description:
"Directory and DNS brute forcing tool.",



generate(data){


return `gobuster dir -u ${data.url} -w ${data.wordlist}`;


}

},




katana:{


title:"Katana Generator",


description:
"Web crawler for discovering URLs and endpoints.",



generate(data){


return `katana -u ${data.target}`;


}

},




nuclei:{


title:"Nuclei Generator",


description:
"Template based vulnerability scanner.",



generate(data){


let cmd=`nuclei -u ${data.target}`;



if(data.severity)
cmd+=` -severity ${data.severity}`;



return cmd;


}

},




amass:{


title:"Amass Generator",


description:
"Advanced attack surface mapping tool.",



generate(data){


return `amass enum -d ${data.target}`;


}

}



};







function selectTool(tool,button){


currentTool = tool;



document
.querySelectorAll(".tool-btn")
.forEach(btn=>{

btn.classList.remove("active");

});



if(button)
button.classList.add("active");



document.getElementById("toolTitle").innerText =
tools[tool].title;



document.querySelector(".explanation").innerText =
tools[tool].description;



document.getElementById("dynamicFields").innerHTML =
fields[tool];


}









function generateCommand(){


let data={};



document
.querySelectorAll("#dynamicFields input, #dynamicFields select")
.forEach(element=>{


if(element.type==="checkbox"){


data[element.id]=element.checked;


}

else{


data[element.id]=element.value;


}


});




let command =
tools[currentTool].generate(data);



document.getElementById("output").value =
command;


}









function copyCommand(){


let output =
document.getElementById("output");



if(output.value===""){


alert("Generate command first");

return;


}



navigator.clipboard.writeText(output.value)
.then(()=>{


alert("Command copied!");



})
.catch(()=>{


output.select();

document.execCommand("copy");


alert("Command copied!");


});


}









function resetForm(){


document
.querySelectorAll("#dynamicFields input")
.forEach(input=>{


if(input.type==="checkbox"){


input.checked=false;


}
else{


input.value="";


}


});



document
.querySelectorAll("#dynamicFields select")
.forEach(select=>{


select.value="";


});



document.getElementById("output").value="";


}









document.addEventListener("DOMContentLoaded",()=>{


selectTool(
"nmap",
document.querySelector(".tool-btn")
);



console.log("ReconCG v2.1 Loaded 🚀");


});