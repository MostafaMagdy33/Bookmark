// 6-valdition

var nameInpt = document.querySelector("#nameInpt");
var urlInpt = document.querySelector("#urlInpt");
var btnSubmit = document.querySelector("#btnSubmit");
var tableSubmit = document.querySelector("#tableSubmit");
var closeBtn = document.querySelector("#closeBtn")
var errorsec = document.querySelector("#errorsec")





if(localStorage.getItem("Data")!== null){
    var arrayOfData = JSON.parse(localStorage.getItem("Data"))
    showData();
}else{
    var arrayOfData = [];
}


//valditionForm

function valditionForm(regex , inputValue , inputName ){

if(regex.test(inputValue)){
    inputName.classList.add("is-valid")
    inputName.classList.remove("is-invalid")
    return true;


}else{
    inputName.classList.add("is-invalid");
    inputName.classList.remove("is-valid");
    return false;
}

}
urlInpt.addEventListener("blur" , function(){
    valditionForm(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g , urlInpt.value  , urlInpt )
})
nameInpt.addEventListener("blur" , function(){
    valditionForm(/^\w{3,20}$/g, nameInpt.value  , nameInpt )
})


//add data 
function addBookmark(){

    var bookmark = {

        name: nameInpt.value,
        url: urlInpt.value
      
      };

if(valditionForm(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g , urlInpt.value  , urlInpt )&&valditionForm(/^\w{3,20}$/g , nameInpt.value  , nameInpt )){


arrayOfData.push(bookmark)


localStorage.setItem("Data" ,JSON.stringify(arrayOfData))

console.log(arrayOfData);
clearInput()
showData()

}else{
    
    errorsec.classList.remove("d-none")

}

    }
 




//btnSubmit on click
btnSubmit.addEventListener("click" , addBookmark)





//show data
function showData(){
var show = "";    
for(var i = 0 ; i <arrayOfData.length ; i++ ){
show += `
<tr>

<th>${i}</th>
<td>${arrayOfData[i].name}</td>
<td><a target="_blank" href="${arrayOfData[i].url}"><button class="btn btn-visit"><i class="fas fa-eye accordion-body pe-2"></i>Visit</button></a></td>
<td><button onclick='deleteBtn(${i})' class="btn btn-danger"><i class="fas fa-trash pe-2"></i>Delete</button></td>
        
</tr>

`
}
tableSubmit.innerHTML= show;

}

//clear Input 
function clearInput(){
    
    nameInpt.value= "";
    urlInpt.value = "";

}





//delete data
function deleteBtn(index){

arrayOfData.splice(index , 1)
localStorage.setItem("Data" ,JSON.stringify(arrayOfData))
showData()


}

closeBtn.addEventListener("click" , function(){
    errorsec.classList.add("d-none")
})

