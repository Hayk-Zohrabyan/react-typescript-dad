import React, { memo } from 'react';
import styles from './index.module.css';
import { useDrag } from 'react-dnd';

export interface DraggableProps {
  name: string;
  type: string;
}

export const Draggable: React.FunctionComponent<DraggableProps> = memo(({ name, type }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name, type },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type],
  );

  return (
    <div ref={drag} className={styles.draggable} style={{ opacity }} data-testid="box">
      {name}
    </div>
  );
});
