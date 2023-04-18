import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { addItems, deleteItems, getItems, updateItems } from '../services/item';
import { parseItem, parseItems } from '../utils/itemParser';
import { useUser } from './UserContext';

function itemReducer(item, { type, payload }) {
  switch (type) {
    case 'create':
      return [payload, ...item];
    case 'reset':
      return [...payload];
    case 'update':
      return item.map((task) => (task.id === payload.id ? payload : task));
    case 'delete':
      return item.filter((task) => task.id !== payload.id);
    default:
      throw Error(`Unknown action ${type}`);
  }
}

export const ItemContext = createContext();

const ItemProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [itemStore, dispatch] = useReducer(itemReducer, []);
  const { user } = useUser();
  console.log('user', user);

  useEffect(() => {
    const fetchItems = async () => {
      if (user.id) {
        const items = await getItems();
        dispatch({ type: 'reset', payload: parseItems(items) });
        setLoading(false);
      }
    };
    fetchItems();
  }, [user?.id]);

  const addItem = async ({ title, description }) => {
    setLoading(true);
    try {
      const [item] = await addItems({ userId: user.id, title, description });
      const payload = parseItem(item);
      dispatch({ type: 'create', payload });
      return payload;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getItem = (id) => {
    return itemStore.find((item) => item.id === Number(id));
  };

  const updateItem = async ({ id, title, description }) => {
    setLoading(true);
    try {
      const [item] = await updateItems(id, { title, description });
      const payload = parseItem(item);
      dispatch({ type: 'update', payload });
      return parseItem(payload);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    setLoading(true);
    try {
      const [item] = await deleteItems(id);
      dispatch({ type: 'delete', payload: { id: item.id } });
      return parseItem(item);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ItemContext.Provider
      value={{
        item: { loading, error, data: itemStore },
        addItem,
        getItem,
        updateItem,
        deleteItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

const useItem = () => {
  const context = useContext(ItemContext);

  if (context === undefined) {
    throw new Error('useItem must be used within an ItemProvider');
  }
  return context;
};
export { ItemProvider, useItem };
