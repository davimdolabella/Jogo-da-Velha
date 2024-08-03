window.onload = () =>{
    let jogo_container = document.getElementById('jogo_container');
    let jogador = 'x';
    let single = document.getElementsByClassName('single');
    let peca = document.getElementsByClassName('peca');
    let pontos_x = 0;
    let pontos_o = 0;
    let x_pontos_c = document.getElementById('x');
    let o_pontos_c = document.getElementById('o');
    

    function tela_fim(valor){
        let continuar = document.getElementsByClassName('continuar');
        let tela_fundo = document.getElementById('tela_fim_fundo');
        let tela_velha = document.getElementById('velha');
        let tela_vitoria = document.getElementById('vitoria');
        let peca_vitoria = document.getElementById('peca_vitoria');
        tela_fundo.style.display = 'block';
        if (valor == 'velha'){
            tela_velha.style.display = 'flex';
        }else if(valor == 'x'){
            tela_vitoria.style.display = 'flex';
            peca_vitoria.style.backgroundImage = "url('./img/o.png')";
            pontos_o ++;
        }else if(valor == 'o'){
            tela_vitoria.style.display = 'flex';
            peca_vitoria.style.backgroundImage = "url('./img/x.png')"
            pontos_x ++;
        }
        for(let i = 0; i < 2; i++){
            continuar[i].onclick = () =>{
                tela_fundo.style.display = 'none';
                tela_velha.style.display = 'none';
                tela_vitoria.style.display = 'none';
                jogador = 'x';
                start();
                clicar();
            }
        }
            
    }
        
    
    function start(){
        jogo_container.innerHTML = '';
        for(let i =0; i < 9; i++ ){
            jogo_container.innerHTML += `
            <div class="single" id = "${i}" >
                    <div class="peca n"></div>
            </div>
            `;
        }
        x_pontos_c.innerHTML = pontos_x;
        o_pontos_c.innerHTML = pontos_o;
       
    }
    function atualizar(){
        for(let i = 0; i< single.length ; i++){
            if(peca[i].classList.contains('x')){
                peca[i].style.backgroundImage = "url(./img/x.png)";
            }else if(peca[i].classList.contains('o')){
                peca[i].style.backgroundImage = "url(./img/o.png)";
            }else{
                peca[i].style.backgroundImage = "none";
            }
        }
    }
    function verificar(){
        let c = 0;
        let acabou = false;
        const combinacoes = [
            [0,1,2],[3,4,5],[6,7,8], //horizontal
            [0,3,6],[1,4,7],[2,5,8], //vertical
            [0,4,8], [2,4,6]    //diagonal
        ]
        combinacoes.forEach((combinacao) =>{
            let [a,b,c] = combinacao;
            if(!peca[a].classList.contains('n') && peca[a].className == peca[b].className && peca[b].className == peca[c].className){
                acabou = true;
            }
            
        })
        for(let i = 0; i < peca.length; i++){
            if(!peca[i].classList.contains('n')){
                c++;
            };
        }
        if(acabou == true){
            tela_fim(jogador);
        }else if(c == 9){
            tela_fim('velha');
        }  
    }
    
    function clicar (){
        for(let i = 0; i < single.length; i++){
            single[i].onclick = () =>{
                if(peca[i].classList.contains('n')){
                    if(jogador == 'x'){
                        single[i].innerHTML =`
                            <div class="peca x"></div>
                        `
                        jogador = 'o'
                    }else if(jogador == 'o'){
    
                        single[i].innerHTML =`
                            <div class="peca o"></div>
                        `
                        jogador = 'x'
                    }
                    atualizar();
                    verificar();
                    
                }
            }
           
        }
    }
   
    start();
    clicar();
}
