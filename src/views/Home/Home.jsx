import React, { useState } from 'react';
import { useItem } from '../../context/ItemContext';
import TaskForm from '../../components/TodoList/TaskForm';
import { addItems, deleteItems } from '../../services/item';
import TodoList from '../../components/TodoList/TodoList';

export default function Home() {
  const { item } = useItem();
  const [isFormVisible, setFormVisible] = useState(false);

  const handleAdd = async (title, description) => {
    await addItems(title, description);
    setFormVisible(false);
  };

  const handleDelete = async (item) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`))
      await deleteItems(item.id);
  };

  return (
    <>
      <h2>Tasks</h2>
      <TodoList item={item.data} onDelete={handleDelete} />
      <button onClick={() => setFormVisible((prevState) => !prevState)}>
        {isFormVisible ? 'Cancel' : 'Add Task'}
      </button>
      {isFormVisible && <TaskForm item={item.data} onSubmit={handleAdd} />}
    </>
  );
}
