import React, { memo, useCallback, useState } from 'react';
import styles from './index.module.css';
import { Draggable } from '../../components/Draggable';
import { Board } from '../../components/Board';

export enum ItemTypes {
  TEXT ='text',
  IMAGE = 'image',
}

interface BoardItem {
  id: number,
  type: string;
  value: string;
}
interface BoardState {
  accepts: string[];
  boardItems: BoardItem[];
}
interface DraggableState {
  name: string;
  type: string;
}

export const Home: React.FunctionComponent = memo(() => {
  const [board, setBoard] = useState<BoardState>({ accepts: Object.values(ItemTypes), boardItems: [] });
  const [draggableData] = useState<DraggableState[]>([
    { name: 'Text', type: ItemTypes.TEXT },
    { name: 'Image', type: ItemTypes.IMAGE },
  ]);

  const handleDrop = useCallback(
    (item: { name: string, type: string }) => {
      const newElement = { id: board.boardItems.length + 1, type: item.type, value: '' }
      setBoard({ ...board, boardItems: [...board.boardItems, newElement] })
    },
    [board],
  );

  const onChange = useCallback(({ value, item }: { value: string, item: BoardItem }) => {
    const newBoardItems = board.boardItems.map(boardItem => {
      const newBoardItem = { ...boardItem };
      if (newBoardItem.id === item.id) {
        newBoardItem.value = value;
      }
      return newBoardItem;
    });

    setBoard({ ...board, boardItems: newBoardItems });
  }, [board]);

  console.log(board);
  return (
    <div className={styles.container}>
      <div className={styles.draggableBlock}>
        {draggableData.map(({ name, type }, index) => (
          <Draggable
            name={name}
            type={type}
            key={index}
          />
        ))}
      </div>

      <div className={styles.boardBlock}>
        <Board
          onChange={onChange}
          accept={board.accepts}
          items={board.boardItems}
          onDrop={handleDrop}
        />
      </div>
    </div>
  );
})
