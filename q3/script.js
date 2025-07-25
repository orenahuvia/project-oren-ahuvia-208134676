//#region
const OboxID=document.getElementById('boxID');
const OboxColor=document.getElementById('boxColor');
const OtoneOfVoice=document.getElementById('toneOfVoice');
const OmailAmount=document.getElementById('mailAmount');
const OuserType=document.getElementById('userType');
const OemailAddress=document.getElementById('emailAddress');
const submitBtn=document.getElementById('submitBtn');
const form=document.getElementById('form');
const complaintKey = 'complaints';
function CheckIfId(input){
    const inputReg = /^\d{5}$/;
    return inputReg.test(input);
}
function CheckIfNumber(input){
    const inputReg = /^\d+$/;
    return inputReg.test(input);
}
function CheckIfEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
if(form)
{
form.addEventListener("submit", function (event){
event.preventDefault();
const boxID=OboxID.value.trim();
const boxColor=OboxColor.value.trim();
const toneOfVoice=OtoneOfVoice.value;
const mailAmount=OmailAmount.value.trim();
const isClosed = document.querySelectorAll('input[name="mailBoxStatus]');
const userType=OuserType.value;
const emailAddress=OemailAddress.value.trim();

const errorMessage=document.getElementById('errorMessage');
if(!CheckIfId(boxID))
{
    errorMessage.innerHTML = "Must enter valid Mail Box ID, which is a 5 charcter number";
    return;
}
if(!CheckIfEmail(emailAddress))
{
        errorMessage.innerHTML = "Must enter valid Email Addres";
        return;
}

if(mailAmount)
{
    if(!CheckIfNumber(mailAmount))
        {
            errorMessage.innerHTML = "Mail Amount must be a number";
            return;
        }
}
errorMessage.innerHTML ='success';
let isClosedValue;
isClosed.forEach(element => {
    if(element.checked)
    {
        isClosedValue=element.value;
    }
});

const newComplaint = {
    complaintId: FindNextComplaintId() ,
    boxID: boxID,
    boxColor: boxColor,
    toneOfVoice: toneOfVoice,
    mailAmount: mailAmount,
    isClosed: isClosedValue,
    userType: userType,
    emailAddress: emailAddress,
};
SaveItem(newComplaint);
ResetInput();
});
}
//#endregion
//#region 
function FindNextComplaintId(){
    const allComplaints = JSON.parse(localStorage.getItem(complaintKey))||[];
    let complaintId;
    if(allComplaints.length===0)
    {
        complaintId=1;
    }
    else
    {
        if(allComplaints[allComplaints.length - 1].complaintId)
            {
                complaintId=allComplaints[allComplaints.length - 1].complaintId+1;
            }
            else
            {
                complaintId=1;
            }
    }
    return complaintId;
}
function SaveNewComplaints(allComplaints){
    localStorage.setItem(complaintKey, JSON.stringify(allComplaints));
}
function SaveItem(newComplaint){
    const allComplaints = JSON.parse(localStorage.getItem(complaintKey))||[];
    allComplaints.push(newComplaint);
    SaveNewComplaints(allComplaints);
    errorMessage.innerHTML='saved';
}
function ResetInput(){
const isClosed = document.getElementById('closed');
OboxID.value = '';
OboxColor.value = '';
OtoneOfVoice.selectedIndex = 0;
OmailAmount.value = '';
isClosed.checked =true;
OuserType.selectedIndex = 0;
OemailAddress.value = '';
}
function LoadItems(){
    const allComplaints = JSON.parse(localStorage.getItem(complaintKey))||[];
    RenderItems(allComplaints);
}
function RenderItems(allComplaints){
    const complaintSection = document.getElementById("complaintSection");
if(!allComplaints) return;
    complaintSection.innerHTML ='';

    allComplaints.forEach(function(complaint){
        const card = document.createElement("div");
        card.className="card";
        const complaintId=complaint.complaintId;
        const boxID=complaint.boxID;
        let boxColor=complaint.boxColor;
        if(!boxColor || boxColor==='')
        {
            boxColor = 'No Color specified';
        }
        const toneOfVoice = complaint.toneOfVoice;
        let mailAmount=complaint.mailAmount;
        if(!mailAmount || mailAmount==='')
        {
            mailAmount = 'No Color specified';
        }
        const isClosed = complaint.isClosed;
        const userType = complaint.userType;
        const emailAddress = complaint.emailAddress;
        card.innerHTML=`
        <div class="cardInfo">
                        <h3 class="cID">Complaint ID: ${complaintId}</h3>
                        <h3 class="cID">Mail Box ID: ${boxID}</h3>
                        <p class="cItem">Color: ${boxColor}</p>
                        <p class="cItem">Tone of voice: ${toneOfVoice}</p>
                        <p class="cItem">Mail amount: ${mailAmount}</p>
                        <p class="cItem">Mail Box is: ${isClosed}</p>
                        <p class="cItem">User type: ${userType}</p>
                        <p class="cItem">User email: ${emailAddress}</p>
                        </div>
                        <div class="cardAction">
                        </div>
                            <div class="cardActions">

                        <button onclick="deleteItem(${complaintId})" class="cardBtn deleteBtn">delete</button>
                        <select id="atitudeChange${complaintId}" name="atitudeChange">
                            <option value="Furius">Furius</option>
                            <option value="Polite">Polite</option>
                            <option value="Mild">Mild</option>
                        </select>
                        <button id="updateBtn${complaintId}" onclick="updateItem(${complaintId}, ...)" class="cardBtn updateBtn">Fix your attitude</button>
                        </div>
        `;
        complaintSection.appendChild(card);
        const updateButton = document.getElementById(`updateBtn${complaintId}`);
        updateButton.addEventListener('click', function() {
            const selectElement = document.getElementById(`atitudeChange${complaintId}`);
            const selectedValue = selectElement.value;
            updateItem(complaintId, selectedValue);
        });
    });
}
function deleteItem(id){
    let allComplaints = JSON.parse(localStorage.getItem(complaintKey))||[];

    allComplaints = allComplaints.filter(complaint => complaint.complaintId !== id);
    SaveNewComplaints(allComplaints);
    LoadItems();
}
function updateItem(id, changes){
    let allComplaints = JSON.parse(localStorage.getItem(complaintKey))||[];
    let updated = false;
    for (let complaint of allComplaints) {
        if (complaint.complaintId === id) {
            complaint.toneOfVoice=changes;
            updated=true;
            break;
        }
    }
    if(updated)
    {
        SaveNewComplaints(allComplaints);
        LoadItems();
    }
}
//#endregion
document.addEventListener("DOMContentLoaded", function() {
    const complaintSection = document.getElementById("complaintSection");
    if (complaintSection) { 
        LoadItems();
    }});



