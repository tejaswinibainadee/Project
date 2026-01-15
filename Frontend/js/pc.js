let pcs = JSON.parse(localStorage.getItem("pcs")) || [];
let editIndexPc = null;

function showPc(){
    let h="";
    pcs.forEach((p,i)=>{
        h+=`<tr>
        <td>${i+1}</td>
        <td>${p.id}</td>
        <td>${p.issue}</td>
        <td>
            <button class='btn btn-primary btn-sm me-1' onclick='editPc(${i})'>Edit</button>
            <button class='btn btn-danger btn-sm' onclick='delPc(${i})'>Delete</button>
        </td>
        </tr>`;
    });
    document.getElementById("pcTable").innerHTML=h;
}
showPc();

function addPc(){
    let id = document.getElementById("pcId").value;
    let issue = document.getElementById("pcIssue").value;

    if(editIndexPc === null){
        pcs.push({id: id, issue: issue});
    } else {
        pcs[editIndexPc] = {id: id, issue: issue};
        editIndexPc = null;
    }

    localStorage.setItem("pcs",JSON.stringify(pcs));
    location.reload();
}

function delPc(i){
    pcs.splice(i,1);
    localStorage.setItem("pcs",JSON.stringify(pcs));
    showPc();
}

function editPc(i){
    editIndexPc = i;
    let pc = pcs[i];
    document.getElementById("pcId").value = pc.id;
    document.getElementById("pcIssue").value = pc.issue;
    let modal = new bootstrap.Modal(document.getElementById('pcModal'));
    modal.show();
}
