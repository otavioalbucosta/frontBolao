$(document).ready(()=> {
    $("#logout").click(()=>{
        localStorage.removeItem("token")
        window.location.href = "index.html"
    })
});