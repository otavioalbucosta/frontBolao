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
                
                


                axios.post("https://bolao2019otavio.herokuapp.com/hints/allByName",{
                    competitionName : $("#sel").children("option:selected").text()
                },{headers: {
                   "x-access-token": localStorage.getItem("token")
                }})
                .then((ans)=>{
                    console.log(ans)
                    $("#hintTimes").empty();
                    $("#listTimes").empty();
                    $("#sp").empty();
                    $("#bp").empty();
                    $("#sa").empty();
                    $("#ba").empty();
                    $("#sp").append("Sua pontuação: ");
                    $("#bp").append("Melhor pontuação: ");
                    $("#sa").append("Seus acertos: ");
                    $("#ba").append("Maiores acertos: ");
                    if (ans.data == "Não há palpites desse usuário para esta rodada"){
                        $("#hintTimes").append('<li class="list-group-item">'+ans.data+'</li>')
                        $("#listTimes").append('<li class="list-group-item">Não podemos mostras o round atual pra você</li>')
                    }else{
                        for (team of ans.data) {
                        $("#hintTimes").append('<li id='+team.team.id+' class="list-group-item"><h4>'+team.rank +'&emsp;</h4><img src='+team.team.img+'>&emsp;'+team.team.name+'</li>')
                    }
                    axios.post("https://bolao2019otavio.herokuapp.com/rounds/allByName",{
                    
                    competitionName : $("#sel").children("option:selected").text()
                })
                .then((ans)=>{
                    $("#listTimes").empty();
                    for (team of ans.data) {
                        $("#listTimes").append('<li id=t'+team.team.id+' class="list-group-item"><h4>'+team.rank+'&emsp;</h4><img src='+team.team.img+'>&emsp;'+team.team.name+'</li>')
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
                }
                
                    axios.post("https://bolao2019otavio.herokuapp.com/scores/calculate", {
                        competitionName: $("#sel").children("option:selected").text()
                    },{
                        headers: {"x-access-token": localStorage.getItem("token")}
                    })
                    .then(ans=>{
                        console.log(ans)
                        $("#sp").append(ans.data.score)
                        $("#sa").append(ans.data.hits)
                        for (team of ans.data.hintsScore) {
                            $("#"+team.TeamId).attr("class", "list-group-item-success")
                            $("#t"+team.TeamId).attr("class", "list-group-item-success")
                            
                        }
                    })
                })
                .catch((err)=>{
                    console.log(err)
                })


            })
    });
}