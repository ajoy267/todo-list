import React from 'react';
import { useForm } from '../../hooks/useForm';

export default function TaskForm({ item, onSubmit }) {
  const { formState, formError, handleFormChange, setFormError } = useForm({
    title: item?.title || '',
    description: item?.description || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = formState;

    try {
      setFormError('');
      if (!title) throw new Error('Please enter a task title');
      await onSubmit(title, description);
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <section>
          <label>Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formState.title}
            onChange={handleFormChange}
          />
        </section>
        <section>
          <label>Description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={formState.description}
            onChange={handleFormChange}
          />
        </section>
        <button type="submit">Save</button>
        {formError && <p>{formError}</p>}
      </fieldset>
    </form>
  );
}
