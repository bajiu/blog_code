import React, {MutableRefObject, useCallback, useEffect, useRef} from "react";
import {IPosition} from "../types/IDrag.ts";

const useDrag = (ref: MutableRefObject<HTMLElement|null> ,onDragChange?: (newPosition: IPosition) => void) => {
    const isDragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    const handleMouseDown = useCallback((event: React.MouseEvent) => {
        console.log('handleMouseDown');
        // 没传入或者没有父级元素时候返回
        if (!ref.current || !ref.current.parentElement) {
            console.error('请传入 ref 或者 ref.current.parentElement');
            return;
        }
        const elementRect = ref.current.getBoundingClientRect();
        offset.current = {
            x: event.clientX - elementRect.left,
            y: event.clientY - elementRect.top,
        };
        isDragging.current = true;
    }, [ref])

    const handleMouseMove = useCallback((event: React.MouseEvent) => {
        if (!isDragging.current  || !ref.current || !ref.current.parentElement) {
            console.error('请传入 ref 或者 ref.current.parentElement');
            return;
        }
        const parentRect = ref.current.parentElement.getBoundingClientRect();

        const newX = event.clientX - parentRect.left - offset.current.x;
        const newY = event.clientY - parentRect.top - offset.current.y;

        const newPosition = { x: newX, y: newY };

        ref.current.style.transform = `translate(${newX}px, ${newY}px)`;


        // 如果有外部回调，传递位置信息
        if (onDragChange) {
            onDragChange(newPosition);
        }
    }, [isDragging, offset, ref, onDragChange]);

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
    }, []);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

        }
    }, [handleMouseMove, handleMouseUp]);

    return {
        handleMouseDown
    }


}

export default useDrag;