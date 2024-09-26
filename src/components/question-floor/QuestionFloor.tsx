import "./QuestionFloor.scss";
import type { QTile } from "../../interfaces/qtile.interface.ts";
import { QuestionTile } from "../question-tile/QuestionTile.tsx";
import { useEffect, useReducer, useState } from "react";

interface QuestionFloorProps {
    maze: QTile[][]
}

const getNextBox = (x: number, y: number, direction: string, board: QTile[][]) => {
    switch (direction) {
        case "TL":
            x -= 1;
            y -= 1;
            break;
        case "TR":
            x += 1;
            y -= 1;
            break;
        case "BR":
            x += 1;
            y += 1;
            break;
        case "BL":
            x -= 1;
            y += 1;
            break;
    }
    if (x >= 0 && x < board[0].length && y >= 0 && y < board.length) {
        return board[y][x];
    }
    return null;
}

export function QuestionFloor(props: QuestionFloorProps) {
    const [iMaze, setIMaze] = useState<QTile[][]>([]);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const stepOnTile = (tile: QTile) => {
        tile.clicked = true;
        const nextBox = tile.next()
        if (nextBox !== null) {
            popTile(nextBox, 0);
        }
        else {
            refreshMaze();
        }
    }

    const popTile = (tile: QTile, recursion: number) => {
        if (recursion > 100) {
            refreshMaze();
            return;
        }
        const nextBox = tile.next()
        tile.broken = true;
        if (nextBox !== null) {
            popTile(nextBox, recursion + 1);
        }
        else {
            refreshMaze();
        }
    }

    const refreshMaze = () => {
        setIMaze(props.maze);
        forceUpdate();
    }

    const resetBoard = () => {
        props.maze.forEach((mazeRow: QTile[]) => {
            mazeRow.forEach((mazeBox: QTile) => {
                mazeBox.broken = false;
                mazeBox.clicked = false;
            })
        })
        refreshMaze();
    }

    useEffect(() => {
        for (let y = 0; y < props.maze.length; y++) {
            for (let x = 0; x < props.maze[0].length; x++) {
                let nextBox: QTile | null = getNextBox(x, y, props.maze[y][x].type, props.maze);
                props.maze[y][x].next = (() => nextBox);
            }
        }
        refreshMaze()
    }, [])

    return (
        <>
            <div className="question-floor">
                { iMaze.map((row: QTile[], idx: number) => {
                    return (
                        <div className="question-row" key={idx}>
                            { row.map((tile: QTile, idy: number) => {
                                return <QuestionTile
                                    key={idy}
                                    type={tile.type}
                                    broken={tile.broken}
                                    clicked={tile.clicked}
                                    onClick={() => stepOnTile(tile)} />
                            }) }
                        </div>
                    );
                })}
            </div>
            <div className="actions">
                <button className="reset-button" onClick={() => resetBoard()}><span>&#8634; Reset</span></button>
            </div>
        </>
    )
}