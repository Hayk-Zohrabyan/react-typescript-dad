import React, { memo, useCallback } from 'react';
import styles from './index.module.css';
import { useDrop } from 'react-dnd';
import AddIcon from '../../../assets/icons/AddIcon';

interface Item {
  id: number,
  type: string;
  value: string;
}
export interface BoardProps {
  accept: string[];
  onChange: (arg: { value: string; item: Item }) => void;
  items: Item[];
  onDrop: (item: any) => void;
}

export const Board: React.FunctionComponent<BoardProps> = memo(({
  accept,
  onChange,
  items,
  onDrop,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const onChangeValues = (value: string, item: Item) => {
    onChange({ value, item });
  };

  return (
    <div className={styles.container} ref={drop} data-testid="dustbin">
      {items.map(item => (
        <div key={item.id}  className={styles.block}>
          {item.type === 'image' && (!item.value ? (
            <label className={styles.labelButton}>
              <AddIcon />
              <input onChange={e => onChangeValues(URL.createObjectURL(e.target.files![0]), item)} style={{ display: 'none' }} type="file" accept="image/png, image/jpeg" />
            </label>
          ) : (
            <img className={styles.itemImage} src={item.value} alt="example" />
          ))}

          {item.type === 'text' && <textarea value={item.value} onChange={e => onChangeValues(e.target.value, item)} style={{ width: '100%' }} rows={5} />}
        </div>
      ))}
    </div>
  );
});
