let labs = JSON.parse(localStorage.getItem("labs")) || [];
let editIndex = null; // store which row is being edited

function showLabs(){
    let data="";
    labs.forEach((l,i)=>{
        data+=`<tr>
        <td>${l.no}</td>
        <td>${l.in}</td>
        <td>${l.pc}</td>
        <td>
            <button class='btn btn-primary btn-sm me-1' onclick='editLab(${i})'>Edit</button>
            <button class='btn btn-danger btn-sm' onclick='delLab(${i})'>Delete</button>
        </td>
        </tr>`;
    });
    document.getElementById("labTable").innerHTML=data;
}
showLabs();

function addLab(){
    let no = document.getElementById("labNo").value;
    let incharge = document.getElementById("labIncharge").value;
    let pc = document.getElementById("labPc").value;

    if(editIndex === null){
        // add new
        labs.push({no: no, in: incharge, pc: pc});
    } else {
        // edit existing
        labs[editIndex] = {no: no, in: incharge, pc: pc};
        editIndex = null; // reset
    }

    localStorage.setItem("labs", JSON.stringify(labs));
    location.reload();
}

function delLab(i){
    labs.splice(i,1);
    localStorage.setItem("labs", JSON.stringify(labs));
    showLabs();
}

function editLab(i){
    editIndex = i;
    let lab = labs[i];
    document.getElementById("labNo").value = lab.no;
    document.getElementById("labIncharge").value = lab.in;
    document.getElementById("labPc").value = lab.pc;
    // open modal
    let modal = new bootstrap.Modal(document.getElementById('labModal'));
    modal.show();
}
