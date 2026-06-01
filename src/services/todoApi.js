const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error('API request failed');
  }
  return response.json();
};

export const fetchTodos = async () => {
  const response = await fetch(`${BASE_URL}?_limit=12`);
  return await handleResponse(response);
};

export const fetchTodoById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  return await handleResponse(response);
};

export const createTodo = async (todo) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  return await handleResponse(response);
};

export const updateTodo = async (id, updates) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  return await handleResponse(response);
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  return { id };
};
