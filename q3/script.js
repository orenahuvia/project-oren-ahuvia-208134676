document.addEventListener("DOMContentLoaded", function () {

const submitBtn=document.getElementById('submitBtn');
const form=document.getElementById('form');
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
form.addEventListener("submit", function (event){
event.preventDefault();
const boxID=document.getElementById('boxID').value.trim();
const boxColor=document.getElementById('boxColor').value.trim();
const toneOfVoice=document.getElementById('toneOfVoice').value;
const mailAmount=document.getElementById('mailAmount').value.trim();
const isClosed = document.querySelectorAll('input[name="mailBoxStatus]')
const userType=document.getElementById('userType').value;
const emaiAddress=document.getElementById('emaiAddress').value.trim();

const errorMessage=document.getElementById('errorMessage');
if(!CheckIfId(boxID))
{
    errorMessage.innerHTML = "Must enter valid Mail Box ID, which is a 5 charcter number";
    return;
}
if(!CheckIfEmail(emaiAddress))
{
        errorMessage.innerHTML = "Must enter valid Email Addres";
        return;
}
if(!emaiAddress)
{
        errorMessage.innerHTML = "Must have Email Addres";
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
})
})