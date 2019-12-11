

window.onload=()=>{

    $(document).ready(()=>{
        $( function() {
            $( "#sortable" ).sortable();
            $( "#sortable" ).disableSelection();
          });
        axios.get("https://bolao2019otavio.herokuapp.com/rounds/all")
        .then(answ=>{
            let regex = /\d+/g;
            let lastround="round0";
            for(round of answ.data){
                if(lastround.match(regex)[0] < round.competitionName.match(regex)[0]){
                    lastround = round.competitionName
                }
            }
            axios.post("https://bolao2019otavio.herokuapp.com/hints/allByName", {
                competitionName : lastround
            }, {headers:{
                "x-access-token": localStorage.getItem("token")
            }})
            .then(ans=>{
                console.log(ans.data)
                if(ans.data != "Não há palpites desse usuário para esta rodada"){
                    $("#sortable").append('<li class="list-group-item"><h3>Você já fez palpites por essa rodada!</h3></li>');
                }else{
                    axios.get('https://bolao2019otavio.herokuapp.com/teams/all')
                        .then((ans)=> {
                            console.log(ans.data);
                            for (team of ans.data) {
                                $("#sortable").append('<li class="list-group-item" id="'+team.id+'"><img src = '+team.img+'> &emsp;'+ team.name+'</li>');
                                
                            }
            
                            })
                            .catch((err)=>{
                                console.log(err);
                            })

                    $("#sendButton").click(()=>{
                        var pos = $("#sortable").sortable("toArray")
                        console.log(pos)
                        var regex = /\d+/g;
                        var values = []
                        var lastround="round0";
                        var usId;
                        axios.get("https://bolao2019otavio.herokuapp.com/rounds/all")
                            .then((ans)=>{
                                for(round of ans.data){
                                    if(lastround.match(regex)[0] < round.competitionName.match(regex)[0]){
                                        lastround = round.competitionName
                                        console.log(lastround)
                                    }
                                }
                                axios.get("https://bolao2019otavio.herokuapp.com/users/profile",{headers: {"x-access-token": localStorage.getItem("token")}})
                                .then(res=>{
                                    usId = res.data.id;
                                    console.log(usId)
                                    for (posit of pos) {
                                        obj = {
                                            competitionName: lastround,
                                            rank: pos.indexOf(posit)+1,
                                            TeamId: parseInt(posit),
                                            UserId : parseInt(usId)
                                        }
                                        values.push(obj)
                                        
                                    }
                                    console.log(values)
                                    axios.post("https://bolao2019otavio.herokuapp.com/hints/registerHint",values)
                                        .then(ans=>{
                                            console.log(ans)
                                            axios.post("https://bolao2019otavio.herokuapp.com/score/calculate",{
                                                competitionName: lastround
                                            }, {headers:{
                                                "x-access-token" : localStorage.getItem("token")
                                            }})
                                            .then(ans=>{
                                                window.location.href = "lastRounds.html"
                                            })
                                            

                                            
                                        })
                                })
                                .catch(err=>{
                                    console.log(err)
                                })
                            })
                            .catch(erro=>{
                                console.log(erro)
                            })
                            
                        
                        
                    })
        
                    
                }
            })
        })
        

        
    })
    
};


