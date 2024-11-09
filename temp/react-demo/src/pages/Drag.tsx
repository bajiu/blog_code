import useDrag from "../hooks/useDrag.tsx";
import {useRef, useState} from "react";
import {IPosition} from "../types/IDrag.ts";


const Drag: React.FC = () => {
    const draggableRef = useRef(null);
    const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });

    const handleDragChange = (newPosition: IPosition) => {
        console.log('当前位置', newPosition);
        setCurrentPosition(newPosition);
    };
    const {  handleMouseDown } = useDrag(draggableRef, handleDragChange);
    return (
        <div style={{ position: "relative", width: "400px", height: "400px", border: "1px solid #ccc" }}>
            <div
                ref={draggableRef}
                onMouseDown={handleMouseDown}
                style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "lightblue",
                    cursor: "grab",
                }}
            >
                拖动我
            </div>
            <div style={{ marginTop: "20px" }}>
                当前相对位置: X: {currentPosition.x}, Y: {currentPosition.y}
            </div>
        </div>
    );

}

export default Drag;