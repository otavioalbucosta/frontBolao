
window.onload = () => {
    $(document).ready(()=> {
    console.log("qq")
    axios.get("https://bolao2019otavio.herokuapp.com/users/profile", {headers: {
        "x-access-token": localStorage.getItem("token")
    }})
    .then((ans)=>{
        console.log("WOO")
        console.log(ans)
        $("#nome").append(ans.data.name)
        $("#nick").append(ans.data.nickname)
        $("#email").append(ans.data.email)
    })
    .catch((err)=>{
        console.log(err)
    })
    });
}
