import React from 'react';

export default function TodoList({ item }) {
  console.log('item', item);
  return (
    <ul>
      {item.map((task) => (
        <li key={task.id}>
          <article>
            <h4>{task.title}</h4>
          </article>
        </li>
      ))}
    </ul>
  );
}
