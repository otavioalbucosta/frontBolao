window.onload = () =>{
    $(document).ready(function () {
        axios.get("https://bolao2019otavio.herokuapp.com/rounds/all")
            .then((ans)=>{
                for (comps of ans.data) {
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
                    $("#hintTimes").empty();
                    $("#listTimes").empty();
                    $("#sp").empty();
                    $("#bp").empty();
                    $("#sa").empty();
                    $("#ba").empty();
                    $("#sp").append("Sua pontuação: ");
                    $("#bp").append("<li>Melhor pontuação:</li> ");
                    $("#sa").append("Seus acertos: ");
                    $("#ba").append("<li>Maiores acertos:</li> ");
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

                        axios.post("https://bolao2019otavio.herokuapp.com/scores/rankings",{
                        competitionName: $("#sel").children("option:selected").text()
                        }, {headers: {
                            "x-access-token" : localStorage.getItem("token")
                        }})
                        .then(ans=>{
                            console.log(ans.data)
                            var topscore = ans.data.sort((a,b)=>{
                                return a.score - b.score
                            })
                            var topshits = ans.data.sort((a,b)=>{
                                return a.hits - b.hits
                            })
                            
                            $("#bp").append("<li>"+topscore.reverse()[0].score +"</li>")
                            $("#bp").append("<li>"+topscore.reverse()[1].score +"</li>")
                            $("#bp").append("<li>"+topscore.reverse()[2].score +"</li>")
                            $("#ba").append("<li>"+topshits.reverse()[0].hits +"</li>")
                            $("#ba").append("<li>"+topshits.reverse()[1].hits +"</li>")
                            $("#ba").append("<li>"+topshits.reverse()[2].hits +"</li>")

                        })
                        
                    })
                })
                .catch((err)=>{
                    console.log(err)
                })


            })
    });
}