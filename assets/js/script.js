/*
=========================================
ReconCG v2.0
Author: ammsec

Multi Tool Recon Command Generator
=========================================
*/


let currentTool = "nmap";



const tools = {


nmap: {

title:"Nmap Generator",

description:
"Network scanner for discovering hosts, ports and services.",


generate(data){

let cmd="nmap ";


if(data.syn) cmd += "-sS ";
if(data.service) cmd += "-sV ";
if(data.os) cmd += "-O ";
if(data.aggressive) cmd += "-A ";
if(data.verbose) cmd += "-v ";
if(data.pn) cmd += "-Pn ";


cmd += data.target;


return cmd;

}

},





subfinder: {

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





httpx: {

title:"httpx Generator",

description:
"HTTP probing tool for identifying live web services.",


generate(data){


let cmd=
`echo ${data.target} | httpx`;


if(data.status)
cmd+=" -status-code";


if(data.title)
cmd+=" -title";


if(data.tech)
cmd+=" -tech-detect";


return cmd;


}

},





ffuf: {

title:"ffuf Generator",

description:
"Fast web fuzzing tool for content discovery.",


generate(data){


return `ffuf -u ${data.url}/FUZZ -w ${data.wordlist}`;


}

},






gobuster: {

title:"Gobuster Generator",

description:
"Directory and DNS brute forcing tool.",


generate(data){


return `gobuster dir -u ${data.url} -w ${data.wordlist}`;


}

},





katana: {

title:"Katana Generator",

description:
"Web crawler for discovering URLs and endpoints.",


generate(data){


return `katana -u ${data.target}`;


}

},





nuclei: {

title:"Nuclei Generator",

description:
"Template based vulnerability scanner.",


generate(data){


let cmd=
`nuclei -u ${data.target}`;


if(data.severity)
cmd+=` -severity ${data.severity}`;


return cmd;


}

},





amass: {

title:"Amass Generator",

description:
"Advanced attack surface mapping tool.",


generate(data){


return `amass enum -d ${data.target}`;


}

}


};








function selectTool(tool){


currentTool = tool;



document.querySelectorAll(".tool-btn")
.forEach(btn=>{

btn.classList.remove("active");

});



event.target.classList.add("active");



document.getElementById("toolTitle").innerText =
tools[tool].title;



document.querySelector(".explanation").innerText =
tools[tool].description;



}









function generateCommand(){



let data={



target:
document.getElementById("target").value.trim(),


url:
document.getElementById("url").value.trim(),


wordlist:
document.getElementById("wordlist").value.trim(),




syn:
document.getElementById("syn").checked,


service:
document.getElementById("service").checked,


os:
document.getElementById("os").checked,


aggressive:
document.getElementById("aggressive").checked,


verbose:
document.getElementById("verbose").checked,


pn:
document.getElementById("pn").checked,



recursive:
document.getElementById("recursive").checked,


all:
document.getElementById("all").checked,


status:
document.getElementById("status").checked,


title:
document.getElementById("title").checked,


tech:
document.getElementById("tech").checked,



severity:
document.getElementById("severity").value



};





if(!data.target && !data.url){

alert("Enter target or URL");

return;

}




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



document.querySelectorAll("input")
.forEach(input=>{


if(input.type==="checkbox"){

input.checked=false;

}

else{

input.value="";

}


});



document.querySelectorAll("select")
.forEach(select=>{

select.value="";

});



document.getElementById("output").value="";


}








document.addEventListener("DOMContentLoaded",()=>{


console.log("ReconCG v2.0 Loaded 🚀");



});