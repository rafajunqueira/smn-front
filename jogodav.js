// RAFAEL REZENDE JUNQUEIRA

var letraX = 'img/letraX.png';
var letraO = 'img/letraO.png';
var turn = Boolean;
var matriz = [];
var pos = 0;
var finish = 9;
var round = 0;
var linha1 = 0;
var linha2 = 0;
var linha3 = 0;
var coluna1 = 0;
var coluna2 = 0;
var coluna3 = 0;
var diagonal1 = 0;
var diagonal2 = 0;
var vencedor = '';
var empate = 0;
var haVencedor = false;
var scoreX = 0;
var scoreO = 0;
var choosePlayer = true;


for (i = 0; i < 3; i++) {
    matriz[i] = [];
}

function RestartGame() {
    round = 0;
    finish = 9;
    document.getElementById("roundCounter").innerHTML = round;
    choosePlayer = true;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            matriz[i][j] = 0;
        }
    }
}

//JOGADOR SELECIONA SE SERÁ 'O' OU 'X'
function DefinePlayer(campo) {
    if (choosePlayer == true) {
        if (campo.id == 'playerO') {
            //  PLAYER SELECIONADO: O
            document.getElementById('playerO').style.borderColor = '#FFFFFF';
            document.getElementById('playerX').style.borderColor = '#343F44';
            //console.log("\n\n  ----------------------\n  PLAYER SELECIONADO --> O\n  ----------------------\n\n");
            turn = false;
        }
        if (campo.id == 'playerX') {
            //  PLAYER SELECIONADO: X
            document.getElementById('playerX').style.borderColor = '#FFFFFF';
            document.getElementById('playerO').style.borderColor = '#343F44';
            // console.log("\n\n  ----------------------\n  PLAYER SELECIONADO --> X\n  ----------------------\n\n");

        }
    }
}

function Jogada(campo) {
    if (haVencedor == false) {
        if (campo.innerHTML == '') {
            if (turn) {
                // Colore o painel de seleção
                document.getElementById('playerO').style.borderColor = '#FFFFFF';
                document.getElementById('playerX').style.borderColor = '#343F44';
                // Insere uma imagem dentro da div (bloco do tabuleiro)
                campo.innerHTML = `<img src="${letraX}" style="width: 100px"/>`; //vez jogador X (insere imagem X)
                choosePlayer = false;
                pos = campo.id.toString();
                // Insere o valor inteiro '1' na posição na posição onde o 'Jogador X' posicionou sua jogada
                matriz[pos[0]][pos[1]] = 1;
                round += 1;
                document.getElementById("roundCounter").innerHTML = round;
                // Alterna entre jogadores
                turn = !turn;
                finish -= 1;
                if (round >= 2) {
                    // Função para testar se há vencedores, à partir da 3a jogada
                    Resultado(matriz, finish, haVencedor);
                }
            } else if (!turn) {
                document.getElementById('playerX').style.borderColor = '#FFFFFF';
                document.getElementById('playerO').style.borderColor = '#343F44';
                campo.innerHTML = `<img src="${letraO}" style="width: 100px"/>`; //vez jogador O (insere imagem O)
                choosePlayer = false;
                pos = campo.id.toString();
                matriz[pos[0]][pos[1]] = 5;
                round += 1;
                finish -= 1;
                document.getElementById("roundCounter").innerHTML = round;
                turn = !turn;
                if (round >= 2) {
                    // Função para testar se há vencedores, à partir da 3a jogada
                    Resultado(matriz, finish, haVencedor);
                }
            }
        }
    }
}

function Resultado(matriz, finish, haVencedor) {
    linha1 = 0;
    linha2 = 0;
    linha3 = 0;
    coluna1 = 0;
    coluna2 = 0;
    coluna3 = 0;
    diagonal1 = 0;
    diagonal2 = 0;
    haVencedor = false;

    for (i = 0; i < 3; i++) {
        linha1 += matriz[0][i];
        linha2 += matriz[1][i];
        linha3 += matriz[2][i];

        coluna1 += matriz[i][0];
        coluna2 += matriz[i][1];
        coluna3 += matriz[i][2];

        diagonal1 += matriz[i][i];
        diagonal2 = matriz[0][2] + matriz[1][1] + matriz[2][0];
    }

    if (diagonal1 == 3 || diagonal2 == 3 || linha1 == 3 || linha2 == 3 || linha3 == 3 || coluna1 == 3 || coluna2 == 3 || coluna3 == 3) {
        scoreX += 1;
        document.getElementById("scoreBoardX").innerHTML = scoreX;
        vencedor = 'JOGADOR X';
        haVencedor = true;
        //FimGame(vencedor);
        LocalizaVencedor(diagonal1, diagonal2, linha1, linha2, linha3, coluna1, coluna2, coluna3);
    }

    if (diagonal1 == 15 || diagonal2 == 15 || linha1 == 15 || linha2 == 15 || linha3 == 15 || coluna1 == 15 || coluna2 == 15 || coluna3 == 15) {
        scoreO += 1;
        document.getElementById("scoreBoardO").innerHTML = scoreO;
        haVencedor = true;
        //FimGame(vencedor);
        LocalizaVencedor(diagonal1, diagonal2, linha1, linha2, linha3, coluna1, coluna2, coluna3);
    }

    // SE NÃO HÁ VENCEDORES E TODOS OS BLOCOS ESTÃO PREENCHIDOS -> EMPATE
    if (finish == 0 && haVencedor == false) {
        Empate();
    }
}


function PintaBloco(x) {
    haVencedor = true;
    switch (x) {
        case 1:
            document.getElementById('00').style.border = "thick solid #19D340";
            document.getElementById('01').style.border = "thick solid #19D340";
            document.getElementById('02').style.border = "thick solid #19D340";
            break;
        case 2:
            document.getElementById('10').style.border = "thick solid #19D340";
            document.getElementById('11').style.border = "thick solid #19D340";
            document.getElementById('12').style.border = "thick solid #19D340";
            break;
        case 3:
            document.getElementById('20').style.border = "thick solid #19D340";
            document.getElementById('21').style.border = "thick solid #19D340";
            document.getElementById('22').style.border = "thick solid #19D340";
            break;
        case 4:
            document.getElementById('00').style.border = "thick solid #19D340";
            document.getElementById('10').style.border = "thick solid #19D340";
            document.getElementById('20').style.border = "thick solid #19D340";
            break;
        case 5:
            document.getElementById('01').style.border = "thick solid #19D340";
            document.getElementById('11').style.border = "thick solid #19D340";
            document.getElementById('21').style.border = "thick solid #19D340";
            break;
        case 6:
            document.getElementById('02').style.border = "thick solid #19D340";
            document.getElementById('12').style.border = "thick solid #19D340";
            document.getElementById('22').style.border = "thick solid #19D340";
            break;
        case 7:
            document.getElementById('00').style.border = "thick solid #19D340";
            document.getElementById('11').style.border = "thick solid #19D340";
            document.getElementById('22').style.border = "thick solid #19D340";
            break;
        case 8:
            document.getElementById('20').style.border = "thick solid #19D340";
            document.getElementById('11').style.border = "thick solid #19D340";
            document.getElementById('02').style.border = "thick solid #19D340";
            break;
        case 9:
            document.getElementById('20').style.border = "thick solid #19D340";
            document.getElementById('11').style.border = "thick solid #19D340";
            document.getElementById('02').style.border = "thick solid #19D340";
            break;
        case 10:
            document.getElementById('20').style.border = "thick solid #19D340";
            document.getElementById('11').style.border = "thick solid #19D340";
            document.getElementById('02').style.border = "thick solid #19D340";
            break;
        case 11:
            document.getElementById('20').style.border = "thick solid #19D340";
            document.getElementById('11').style.border = "thick solid #19D340";
            document.getElementById('02').style.border = "thick solid #19D340";
            break;
        case 12:
            document.getElementById('20').style.border = "thick solid #19D340";
            document.getElementById('11').style.border = "thick solid #19D340";
            document.getElementById('02').style.border = "thick solid #19D340";
            break;
        case 13:
            document.getElementById('20').style.border = "thick solid #19D340";
            document.getElementById('11').style.border = "thick solid #19D340";
            document.getElementById('02').style.border = "thick solid #19D340";
            break;
        case 14:
            document.getElementById('20').style.border = "thick solid #19D340";
            document.getElementById('11').style.border = "thick solid #19D340";
            document.getElementById('02').style.border = "thick solid #19D340";
            break;
        case 15:
            document.getElementById('20').style.border = "thick solid #19D340";
            document.getElementById('11').style.border = "thick solid #19D340";
            document.getElementById('02').style.border = "thick solid #19D340";
            break;
        case 16:
            document.getElementById('20').style.border = "thick solid #19D340";
            document.getElementById('11').style.border = "thick solid #19D340";
            document.getElementById('02').style.border = "thick solid #19D340";
            break;
        default:
            break;
    }
}

function LocalizaVencedor(diagonal1, diagonal2, linha1, linha2, linha3, coluna1, coluna2, coluna3) {
    if (linha1 == 3) {
        PintaBloco(1);
    }
    if (linha2 == 3) {
        PintaBloco(2);
    }
    if (linha3 == 3) {
        PintaBloco(3);
    }
    if (coluna1 == 3) {
        PintaBloco(4);
    }
    if (coluna2 == 3) {
        PintaBloco(5);
    }
    if (coluna3 == 3) {
        PintaBloco(6);
    }
    if (diagonal1 == 3) {
        PintaBloco(7);
    }
    if (diagonal2 == 3) {
        PintaBloco(8);
    }
    //------------------------------------------------
    if (linha1 == 15) {
        PintaBloco(1);
    }
    if (linha2 == 15) {
        PintaBloco(2);
    }
    if (linha3 == 15) {
        PintaBloco(3);
    }
    if (coluna1 == 15) {
        PintaBloco(4);
    }
    if (coluna2 == 15) {
        PintaBloco(5);
    }
    if (coluna3 == 15) {
        PintaBloco(6);
    }
    if (diagonal1 == 15) {
        PintaBloco(7);
    }
    if (diagonal2 == 15) {
        PintaBloco(8);
    }
}



function Empate() {
    document.getElementById("mask").style.backgroundImage = "url('img/velha.png')";
    document.getElementById("mask").style.visibility = "visible";
    document.getElementById("mask").style.backgroundSize = "cover";
    haVencedor = false;
}


function NewGame() {

    document.getElementById("mask").style.visibility = "hidden";
    document.getElementById("mask").style.backgroundSize = "none";
    document.getElementById('00').innerHTML = '';
    document.getElementById('01').innerHTML = '';
    document.getElementById('02').innerHTML = '';
    document.getElementById('10').innerHTML = '';
    document.getElementById('11').innerHTML = '';
    document.getElementById('12').innerHTML = '';
    document.getElementById('20').innerHTML = '';
    document.getElementById('21').innerHTML = '';
    document.getElementById('22').innerHTML = '';


    document.getElementsByClassName("linha1")[0].getElementsByClassName("corner")[0].style.border = "";
    document.getElementsByClassName("linha1")[0].getElementsByClassName("corner")[1].style.border = "";
    document.getElementsByClassName("linha1")[0].getElementsByClassName("middle")[0].style.border = "";

    document.getElementsByClassName("linha2")[0].getElementsByClassName("corner")[0].style.border = "";
    document.getElementsByClassName("linha2")[0].getElementsByClassName("bloco")[0].style.border = "";
    document.getElementsByClassName("linha2")[0].getElementsByClassName("corner")[1].style.border = "";

    document.getElementsByClassName("linha3")[0].getElementsByClassName("corner")[0].style.border = "";
    document.getElementsByClassName("linha3")[0].getElementsByClassName("middle")[0].style.border = "";
    document.getElementsByClassName("linha3")[0].getElementsByClassName("corner")[1].style.border = "";


    haVencedor = false;
    RestartGame();

}
