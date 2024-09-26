import "./QuestionTile.scss";

interface QuestionTileProps {
    type: string;
    broken: boolean;
    clicked: boolean;
    onClick?: (e: any) => void;
}

export function QuestionTile(props: QuestionTileProps) {
    return <div className={`question-tile ${props.broken ? 'BROKEN' : props.type} ${props.clicked && 'CLICKED'}`}
                onClick={(e) => props.onClick && props.onClick(e)} />
}