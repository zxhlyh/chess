import React, { useContext } from 'react';
import { ThemeContext } from 'src/context/theme';
import { BoardContext } from 'src/context/board';
import { getGridAxis, toPieceImg } from 'src/operations/index';
import { xAxis, yAxis } from 'src/constant';
import PromotionModal from 'src/components/promotion-modal';
import './style.scss';
interface CellProps {
    item: any;
    rowIndex: number;
    colIndex: number;
}

const Cell = ({
    item,
    rowIndex,
    colIndex,
}: CellProps) => {
    const { theme: { blackPieceColor, blackGrid, whiteGrid, fontSize } } = useContext(ThemeContext);
    const { startPos, setStartPos, chessboard, setPromotion, setMoves } = useContext(BoardContext);
    
    let backgroundColor = blackGrid;
    if (rowIndex % 2 === 0 && colIndex % 2 === 0) {
        backgroundColor = whiteGrid
    }
    if (rowIndex % 2 !== 0 && colIndex % 2 !== 0) {
        backgroundColor = whiteGrid
    }
    return <div
        className='cell'
        style={{
            color: blackPieceColor,
            backgroundColor: backgroundColor,
            fontSize: fontSize,
        }}
        onClick={() => {
            if (startPos === undefined) {
                const from = { row: rowIndex, col: colIndex }
                setStartPos(from)
                const availableMoves = chessboard.moves({ from })
                const promotionMoves = availableMoves.filter((i: string) => i.includes('='));
                if(promotionMoves.length > 0) {
                    setPromotion(true);
                    setMoves(promotionMoves);
                }
            } else {
                const from = getGridAxis(startPos)
                const to = getGridAxis({ row: rowIndex, col: colIndex })
                chessboard.move({ from, to })
                setStartPos(undefined)
            }
        }}
    >
      {item !== null ?  <img className="no-border" src={toPieceImg(item)} alt="" /> : <span />}
    </div>
};
const ChessBoard = () => {
    const { theme: { gridSize, borderColor } } = useContext(ThemeContext);
    const { chessboard } = useContext(BoardContext);
    return <div className="board-container" style={{
        border: `1px solid ${borderColor}`,
    }}>
        <PromotionModal />
        <div
            className='left-bar'
            style={{
                height: 8 * gridSize,
            }}
        >
            {yAxis.map((i) => <span key={i}>{i}</span>)}
        </div>
        <div>
            <div
                className='top-bar'
                style={{
                    width: 8 * gridSize,
                }}
            >
                {xAxis.map((i) => <span key={i}>{i.toLowerCase()}</span>)}
            </div>

            <div className='board' style={{
                width: 8 * gridSize,
                height: 8 * gridSize,
                border: `1px solid ${borderColor}`,
            }}>
                {chessboard.board().map((row: object[], rowIndex: number) => {
                    return row.map((item: any, colIndex: number) => {
                        return <Cell
                            key={`grid-${rowIndex}-${colIndex}`}
                            item={item}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                        />
                    })
                })}
            </div>
            <div
                className='bottom-bar'
                style={{
                    width: 8 * gridSize,
                }}
            >
                {xAxis.map((i) => <span key={i}>{i}</span>)}
            </div>
        </div>
        <div
            className='right-bar'
            style={{
                height: 8 * gridSize,
            }}
        >
            {yAxis.map((i) => <span key={i}>{i}</span>)}
        </div>
    </div>
};

export default ChessBoard;
