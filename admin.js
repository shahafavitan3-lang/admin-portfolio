/* ============================= */
/* ADMIN PASSWORD */
/* ============================= */


const ADMIN_PASSWORD = "Shahaf123";







/* ============================= */
/* ELEMENTS */
/* ============================= */


const login =
document.getElementById("login");


const dashboard =
document.getElementById("dashboard");


const password =
document.getElementById("password");


const loginBtn =
document.getElementById("loginBtn");


const error =
document.getElementById("error");


const logout =
document.getElementById("logout");


const messages =
document.getElementById("messages");


const total =
document.getElementById("total");


const newMessages =
document.getElementById("new");


const done =
document.getElementById("done");


const search =
document.getElementById("search");


const filter =
document.getElementById("filter");


const deleteAll =
document.getElementById("deleteAll");




let requests = [];









/* ============================= */
/* LOGIN */
/* ============================= */


loginBtn.addEventListener(
"click",
()=>{


let value =
password.value.trim();



if(value === ADMIN_PASSWORD){


localStorage.setItem(
"adminLogin",
"true"
);



openDashboard();



}

else{


error.textContent =
"Incorrect password";


}



});









window.addEventListener(
"load",
()=>{


if(
localStorage.getItem("adminLogin")
===
"true"
){


openDashboard();


}


});









function openDashboard(){



login.style.display="none";


dashboard.classList.remove(
"hidden"
);



loadMessages();



}









/* ============================= */
/* LOAD MESSAGES */
/* ============================= */


function loadMessages(){



requests =

JSON.parse(
localStorage.getItem("requests")
)
||
[];





updateStats();


displayMessages(
requests
);



}









/* ============================= */
/* DISPLAY MESSAGES */
/* ============================= */


function displayMessages(list){



messages.innerHTML="";




if(list.length === 0){



messages.innerHTML=`

<div class="message">

<h3>
No messages
</h3>

<p>
There are no contact requests yet.
</p>

</div>

`;

return;


}







list
.slice()
.reverse()
.forEach(
(item)=>{



let card =
document.createElement(
"div"
);



card.className =
"message";





card.innerHTML = `


<h3>

${item.name}

</h3>



<p>
📧 Email:
${item.email}
</p>



<p>
📱 Phone:
${item.phone || "Not provided"}
</p>



<p>
💬 Message:
${item.message}
</p>



<p>
📅 Date:
${item.date}
</p>



<div class="status ${item.status}">

${item.status}

</div>



<div class="buttons">


<button class="done-btn">

Mark Done

</button>



<button class="delete-btn">

Delete

</button>


</div>


`;






card
.querySelector(".done-btn")
.onclick=()=>{


markDone(
item.id
);



};







card
.querySelector(".delete-btn")
.onclick=()=>{


deleteMessage(
item.id
);



};





messages.appendChild(card);



});



}









/* ============================= */
/* MARK DONE */
/* ============================= */


function markDone(id){



let data =

JSON.parse(
localStorage.getItem("requests")
)
||
[];





data =
data.map(
item=>{


if(item.id === id){


item.status="Done";


}


return item;


});






localStorage.setItem(
"requests",
JSON.stringify(data)
);





loadMessages();



}









/* ============================= */
/* DELETE MESSAGE */
/* ============================= */


function deleteMessage(id){



let data =

JSON.parse(
localStorage.getItem("requests")
)
||
[];





data =
data.filter(
item =>
item.id !== id
);





localStorage.setItem(
"requests",
JSON.stringify(data)
);





loadMessages();



}









/* ============================= */
/* DELETE ALL */
/* ============================= */


deleteAll.addEventListener(
"click",
()=>{


let confirmDelete =
confirm(
"Delete all messages?"
);



if(confirmDelete){


localStorage.removeItem(
"requests"
);



loadMessages();



}



});









/* ============================= */
/* SEARCH */
/* ============================= */


search.addEventListener(
"input",
filterMessages
);



filter.addEventListener(
"change",
filterMessages
);







function filterMessages(){



let result =
requests;



let text =
search.value.toLowerCase();






if(text){


result =
result.filter(
item =>


item.name
.toLowerCase()
.includes(text)

||

item.email
.toLowerCase()
.includes(text)

||

item.message
.toLowerCase()
.includes(text)


);



}






if(
filter.value !== "all"
){


result =
result.filter(
item=>

item.status === filter.value

);


}





displayMessages(
result
);



}









/* ============================= */
/* STATS */
/* ============================= */


function updateStats(){



total.textContent =
requests.length;




newMessages.textContent =

requests.filter(
item=>

item.status === "New"

)
.length;






done.textContent =

requests.filter(
item=>

item.status === "Done"

)
.length;



}









/* ============================= */
/* LOGOUT */
/* ============================= */


logout.addEventListener(
"click",
()=>{


localStorage.removeItem(
"adminLogin"
);



location.reload();



});