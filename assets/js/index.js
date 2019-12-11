$(document).ready(()=>{
    $("#butreg").click((e)=> { 
        e.preventDefault();
        email = $('input[type="email"]').val();
        console.log(email)
        localStorage.setItem("email",email);
        window.location.href = "register.html";

    });
})