import { WINNER_COMBOS } from "../constants"

export const checkWinnerFrom = (boardToCheck) => {
    // Revisamos todas las combinaciones ganadoras
    for (const combo of WINNER_COMBOS){
        const [a, b, c] = combo
        if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
        ){
        return boardToCheck[a]
        }
    }
    return null
}