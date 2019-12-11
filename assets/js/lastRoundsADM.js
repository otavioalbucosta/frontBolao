window.onload = () =>{
    $(document).ready(function () {
        axios.get("https://bolao2019otavio.herokuapp.com/rounds/all")
            .then((ans)=>{
                for (comps of ans.data) {
                    console.log(comps.competitionName)
                    $("#sel").append('<option id="'+comps.competitionName +'">'+comps.competitionName+'</option>');
                }
                
                
            })
            $("#sel").change(()=>{
                
                axios.post("https://bolao2019otavio.herokuapp.com/rounds/allByName",{
                    
                    competitionName : $("#sel").children("option:selected").text()
                })
                .then((ans)=>{
                    console.log(ans.data)
                    $("#listTimes").empty();
                    for (team of ans.data) {
                        $("#listTimes").append('<li class="list-group-item"><h4>'+team.rank +' &emsp;</h4><img src = '+team.team.img+'> &emsp;'+ team.team.name+'</li>')
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
            })
    });
}

