import React, { DragEventHandler, FC } from 'react';
import styles from './constructor-el-wrapper.module.css'
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';


import { useDispatch, useSelector } from '../../services/hooks';
import { REMOVE_COMPONENT } from '../../services/actions';

import { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { TIngredient } from '../../services/types/data';

type TProps = {
    item: TIngredient,
    index: number,
    moveCard: Function,
    type?: 'top' | 'bottom',
    isLocked?: boolean
}

export const ConstructorElementWrapper: FC<TProps> = ({ item, index, moveCard, type, isLocked }) => {
    const id = item.id;
    const dispatch = useDispatch();
    const optional = useSelector(state => state.ingredients.burgerComponents.optional)

    const removeComponent = () => dispatch({
        type: REMOVE_COMPONENT,
        item: item,
        index: optional.indexOf(item)
    });

    const ref = useRef<HTMLDivElement>(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(item: {index: number}, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset() as XYCoord;
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        }
    })
    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    if (item.type !== 'bun') drag(drop(ref));
    const preventDefault: DragEventHandler<HTMLDivElement> = (e) => e.preventDefault();
    return (
        <div ref={ref} style={{ opacity }} onDrop={preventDefault} className={styles.wrapper} data-handler-id={handlerId}>
            <div className={styles.drag}>
                <span hidden={isLocked}><DragIcon type="primary" /></span>
            </div>
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
                handleClose={removeComponent}>
            </ConstructorElement>
        </div>
    )
}

export default ConstructorElementWrapper;
