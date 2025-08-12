type Square = {
	row: number,
	column: number,
	state: string, //Pode ser: closed, opened, flagged
	hasMine: boolean,
	nearMines: number, //Número de minas em volta
}

const modeloSquare : Square = {
    row : 0,
    column : 0,
    state : "closed",
    hasMine : false,
    nearMines: 0,
}
 
function retornaMatriz(numLinhas : number, numColunas : number) : Square[][] {
    let matSquares : Square[][] = [];

    for(let i = 0; i < numLinhas; i++){
        matSquares[i] = [];
        for(let j = 0; j < numColunas; j++){
            matSquares[i][j] = {
                ...modeloSquare,
                row : i,
                column : j,
                };
        }
    }
    return matSquares;
}

function sorteiaMinas(matriz: Square[][], quantMinas : number) : void{
    let quantAtualMinas = 0;
    while(quantAtualMinas < quantMinas){
        
        let linhaSorteada : number = (Math.random() * matriz.length);
        let colunaSorteada : number = (Math.random() * matriz[0].length);
        if(!matriz[linhaSorteada][colunaSorteada].hasMine){
            matriz[linhaSorteada][colunaSorteada].hasMine = true;
            quantAtualMinas++;
        }

    }
    
}

function minasAdjacentes(matriz : Square[][], nLinha : number, nColuna: number) : void{
    let cont = 0;
    for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
           
         const vizinhoLinha = nLinha + i;
            const vizinhoColuna = nColuna + j;

            if (vizinhoLinha >= 0 && vizinhoLinha < matriz.length && vizinhoColuna >= 0 && vizinhoColuna < matriz[0].length) {
                if (matriz[vizinhoLinha][vizinhoColuna].hasMine) {
                    cont++;

                }
            }
        }
    matriz[nLinha][nColuna].nearMines = cont;
       
    }
    
    }

    function contarBombas(matriz : Square[][]) : void{
        for(let i = 0; i < matriz.length; i++){
            for(let j = 0; j < matriz[0].length; j++){
                minasAdjacentes(matriz, i, j);
            }
        }
    }

    function imprimirMatriz(matriz : Square[][]) : void { // resolver: console pula linha
        
        for(let i = 0; i < matriz.length; i++){
            let textoLinha = " ";
            for(let j = 0; j < matriz[0].length; j++){
                if(matriz[i][j].hasMine){
                    textoLinha += " [*] ";
                    //console.log(" [*] ");
                }
                else{
                    textoLinha += " [";
                    textoLinha += matriz[i][j].nearMines;
                    textoLinha += "] "
                }
            }
            console.log(textoLinha);

        }
        console.log();
    }


    const campoMinado : Square[][] = retornaMatriz(3,3);

    const gabaritoCampoMinado : Square[][] = JSON.parse(JSON.stringify(campoMinado));


    sorteiaMinas(gabaritoCampoMinado, 4);
    contarBombas(gabaritoCampoMinado);

    imprimirMatriz(campoMinado);
    imprimirMatriz(gabaritoCampoMinado);

    export{}