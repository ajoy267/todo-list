import React, { useEffect, useState } from 'react';
import TodoList from '../../components/TodoList/TodoList';
import { useItem } from '../../context/ItemContext';
import { getUserItems } from '../../services/item';

export default function Home() {
  const { item, setItem } = useItem();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserItems();
      setItem(data);
      setLoading(false);
      console.log('data', data);
    };
    fetchData();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return <TodoList item={item} />;
}
