$(document).ready(()=> {
    $('button[type="button"]').click(()=>{
        axios.post("https://bolao2019otavio.herokuapp.com/users/login",{
            email: $('input[type="email"]').val(),
            password: $('input[type="password"').val()
        })
        .then(ans=>{
            console.log(ans.data)
            localStorage.setItem("token",ans.data)
            axios.get("https://bolao2019otavio.herokuapp.com/users/profile", {headers: {
                'x-access-token': localStorage.getItem("token")
            }}).then((ans)=>{
                console.log(ans.data.isAdmin)
                if (ans.data.isAdmin == true){
                    window.location.href = "profileADM.html"
                }else{
                    window.location.href = "profile.html"
                }
            })
            
        })
    })
});