import React, { useState } from 'react';
import { useItem } from '../../context/ItemContext';
import TaskForm from '../../components/TodoList/TaskForm';
import { addItem, deleteItem } from '../../services/item';
import TodoList from '../../components/TodoList/TodoList';

export default function Home() {
  const { item } = useItem();
  console.log('item', item);
  const [isFormVisible, setFormVisible] = useState(false);

  const handleAdd = async (title, description) => {
    await addItem(title, description);
    setFormVisible(false);
  };

  const handleDelete = async (item) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`))
      await deleteItem(item.id);
  };

  return (
    <>
      <h2>Tasks</h2>
      {item ? (
        <TodoList item={item.data} onDelete={handleDelete} />
      ) : (
        <p>Let's add some tasks to do!</p>
      )}
      <button onClick={() => setFormVisible((prevState) => !prevState)}>
        {isFormVisible ? 'Cancel' : 'Add Task'}
      </button>
      {isFormVisible && <TaskForm item={item.data} onSubmit={handleAdd} />}
    </>
  );
}
