export type SquareType = { // tá em SquareType
	row: number,
	column: number,
	state: string, //Pode ser: closed, opened, flagged
	hasMine: boolean,
	nearMines: number, //Número de minas em volta
}

export const modeloSquareType : SquareType = {
    row : 0,
    column : 0,
    state : "closed",
    hasMine : false,
    nearMines: 0,
}
 
export function retornaMatriz(numLinhas : number, numColunas : number) : SquareType[][] {
    let matSquareTypes : SquareType[][] = [];

    for(let i = 0; i < numLinhas; i++){
        matSquareTypes[i] = [];
        for(let j = 0; j < numColunas; j++){
            matSquareTypes[i][j] = {
                ...modeloSquareType,
                row : i,
                column : j,
                };
        }
    }
    return matSquareTypes;
}

export function sorteiaMinas(matriz: SquareType[][], quantMinas : number) : void{
    let quantAtualMinas = 0;
    while(quantAtualMinas < quantMinas){
        
        let linhaSorteada : number = Math.floor(Math.random() * matriz.length);
        let colunaSorteada : number = Math.floor(Math.random() * matriz[0].length);
        if(!matriz[linhaSorteada][colunaSorteada].hasMine){
            matriz[linhaSorteada][colunaSorteada].hasMine = true;
            quantAtualMinas++;
        }

    }
    
}

export function minasAdjacentes(matriz : SquareType[][], nLinha : number, nColuna: number) : void{
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

   export function contarBombas(matriz : SquareType[][]) : void{
        for(let i = 0; i < matriz.length; i++){
            for(let j = 0; j < matriz[0].length; j++){
                minasAdjacentes(matriz, i, j);
            }
        }
    }

   export function imprimirMatriz(matriz : SquareType[][]) : void { // resolver: console pula linha
        
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


    const campoMinado : SquareType[][] = retornaMatriz(3,3);

    const gabaritoCampoMinado : SquareType[][] = JSON.parse(JSON.stringify(campoMinado));


    sorteiaMinas(gabaritoCampoMinado, 4);
    contarBombas(gabaritoCampoMinado);

    imprimirMatriz(campoMinado);
    imprimirMatriz(gabaritoCampoMinado);

    export{}