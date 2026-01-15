let pcs = JSON.parse(localStorage.getItem("pcs")) || [];

// Populate PC select in Add Issue modal
function populatePCs(){
    let select = document.getElementById("issuePC");
    select.innerHTML = '<option value="">Select PC</option>';
    pcs.forEach(p => {
        select.innerHTML += `<option value="${p.id}">${p.id}</option>`;
    });
}
populatePCs();

// Show Issues Table
function showIssues(){
    let h="";
    pcs.forEach((p,i)=>{
        if(p.issue && p.issue.toLowerCase() != "none"){
            h+=`<tr>
            <td>${p.id}</td>
            <td>${p.issue}</td>
            <td class="text-danger fw-bold">No</td>
            <td>
                <button class='btn btn-warning btn-sm me-1' onclick='editIssue(${i})'>
                    <i class="fa fa-edit"></i> Edit
                </button>
                <button class='btn btn-success btn-sm' onclick='solve(${i})'>
                    <i class="fa fa-check"></i> Mark Solved
                </button>
            </td>
            </tr>`;
        }
    });
    document.getElementById("issueTable").innerHTML=h;
}
showIssues();

// Add New Issue
function addIssue(){
    let pcId = document.getElementById("issuePC").value;
    let issueText = document.getElementById("issueText").value.trim();

    if(!pcId || !issueText){
        alert("Please select a PC and type the problem!");
        return;
    }

    // Find the PC and set its issue
    let pcIndex = pcs.findIndex(p => p.id === pcId);
    if(pcIndex === -1){
        alert("Selected PC not found!");
        return;
    }
    pcs[pcIndex].issue = issueText;

    localStorage.setItem("pcs", JSON.stringify(pcs));
    document.getElementById("issueText").value = "";
    document.getElementById("issuePC").value = "";
    populatePCs();
    showIssues();

    // Close modal
    let modal = bootstrap.Modal.getInstance(document.getElementById('issueModal'));
    modal.hide();
}

// Edit Issue Function
function editIssue(i){
    let newIssue = prompt("Edit Issue:", pcs[i].issue);
    if(newIssue !== null && newIssue.trim() !== ""){
        pcs[i].issue = newIssue;
        localStorage.setItem("pcs", JSON.stringify(pcs));
        showIssues();
    }
}

// Solve Issue
function solve(i){
    pcs[i].issue = "None";
    localStorage.setItem("pcs", JSON.stringify(pcs));
    showIssues();
}

// Search Table Function
function searchTable(val){
    val = val.toLowerCase();
    let rows = document.querySelectorAll("#issueTable tr");
    rows.forEach(r=>{
        r.style.display = r.innerText.toLowerCase().includes(val) ? "" : "none";
    });
}
