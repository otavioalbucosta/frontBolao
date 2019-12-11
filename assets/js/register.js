window.onload = ()=>{
    if(localStorage.getItem("email")){
        $(document).ready(()=>{
        $('input[type="email"]').val(localStorage.getItem("email"))
        localStorage.removeItem("email");
        }
    )}
}

$(document).ready(()=> {
    $('button[type="button"]').click(()=>{
        console.log("aaaa")
        var x=true;
        $(":input").each(function() {
            if($(this).val() == ""){
            console.log("MANO")
            x = false;
        }
            
         })
        if (x==false){
            console.log("e aqui?")
            $("#pragfo").text("Preencha os campos");
        }else{
            console.log("FOI")
            axios.post("https://bolao2019otavio.herokuapp.com/users/register",{
            name : $('input[placeholder="Nome"]').val(),
            email : $('input[type="email"]').val(),
            password: $('input[type="password"]').val(),
            nickname : $('input[placeholder="Nickname"]').val(),
            isAdmin: false
        })
        .then((ans)=>{
            $("#pragfo").text("Registrado com sucesso, redirecionando");
            console.log(ans);
            window.location.href = "login.html"
            

        })
        .catch((err)=>{
            console.log(err);
        })
        }
        
    })
});