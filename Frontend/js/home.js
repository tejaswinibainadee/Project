// Load Labs and PCs
let labs = JSON.parse(localStorage.getItem("labs")) || [];
let pcs = JSON.parse(localStorage.getItem("pcs")) || [];

// Counts
document.getElementById("totalLabs").innerText = labs.length;
document.getElementById("totalPCs").innerText = pcs.length;

// Issues
let openIssues = pcs.filter(p => p.issue && p.issue.toLowerCase() != "none");
let solvedIssues = pcs.filter(p => !p.issue || p.issue.toLowerCase() == "none");

document.getElementById("openIssues").innerText = openIssues.length;
document.getElementById("solvedIssues").innerText = solvedIssues.length;

// Recent Activity
let recent = [];
labs.forEach((l,i) => recent.push({text:`Added Lab ${l.no}`, time: new Date().toLocaleString()}));
pcs.forEach((p,i) => recent.push({text:`Added PC ${p.id}`, time: new Date().toLocaleString()}));
openIssues.forEach((p,i) => recent.push({text:`New Issue: ${p.issue} on PC ${p.id}`, time: new Date().toLocaleString()}));

let recentTbody = document.getElementById("recentActivity");
recentTbody.innerHTML = "";
recent.slice(-5).reverse().forEach((r,i) => {
    recentTbody.innerHTML += `<tr>
        <td>${i+1}</td>
        <td>${r.text}</td>
        <td>${r.time}</td>
    </tr>`;
});
