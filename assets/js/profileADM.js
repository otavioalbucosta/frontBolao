window.onload = ()=>{
    $(document).ready(function () {
        axios.get("https://bolao2019otavio.herokuapp.com/rounds/all")
        .then((ans)=>{
            for (comps of ans.data) {
                console.log(comps.competitionName)
                $("#select").append('<option id="'+comps.competitionName +'">'+comps.competitionName+'</option>');
            }

            $("#select").change(()=>{
                console.log("foi???")
                axios.delete("https://bolao2019otavio.herokuapp.com/rounds/del/",
               {headers: {
                    'x-access-token' : localStorage.getItem("token"),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }, 
                data: { 
                    competitionName: $("#select").children("option:selected").text()
                }
                } )
                .then(ans=>{
                    console.log(ans)
                    window.location.reload()
                })
                .catch(err=>{
                    console.log(err)
                })
            })
            
            })
        $("#roundgen").click(()=>{
            axios.post("https://bolao2019otavio.herokuapp.com/rounds/generate")
            .then((ans)=>{
                console.log("feito")
            })
        
    
    
        });
        

        
    })
}

