import { useState } from "react";
import './Converter.scss';

interface ConverterProps {
    symbol: string;
    price: number;
}

enum Direction {
    FROM = 'FROM',
    TO = 'TO'
}

const getCleanValue = (value: string | number): number => {
    const strValue = `${value}`;
    return  Math.round(parseFloat(strValue) * 100) / 100;
}

export function Converter(props: ConverterProps) {
    const [coinValue, setCoinValue] = useState(0);
    const [moValue, setMoValue] = useState(0);
    const convertFrom = (value: string, direction: Direction) => {
        const cleanValue = getCleanValue(value);
        if (direction === Direction.FROM) {
            setCoinValue(cleanValue);
            const convertedValue = cleanValue * props.price;
            setMoValue(getCleanValue(convertedValue));
        }
        else {
            setMoValue(cleanValue);
            const convertedValue = cleanValue * props.price;
            setCoinValue(getCleanValue(convertedValue));
        }
    }

    return (
        <div className="converter">
            <div className="converter-input">
                <input id={`converter_${props.symbol}_to_MO`} type="number" value={coinValue} onChange={(e) => convertFrom(e.target.value, Direction.FROM)}/>
                <label htmlFor={`converter_${props.symbol}_to_MO`}>{props.symbol}</label>
            </div>
            <span>&larr;&rarr;</span>
            <div className="converter-input">
                <input id={`converter_MO_to_${props.symbol}`} type="number" value={moValue} onChange={(e) => convertFrom(e.target.value, Direction.TO)}/>
                <label htmlFor={`converter_MO_to_${props.symbol}`}>MO</label>
            </div>
        </div>
    )
}