import React, { useState } from 'react';
import { ListTodo, Plus, X, Check, Trash2 } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: crypto.randomUUID(),
          text: newTodo.trim(),
          completed: false,
        },
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <ListTodo className="w-6 h-6 text-indigo-500" />
              Todo List
            </h1>
          </div>

          {/* Add Todo Form */}
          <form onSubmit={addTodo} className="p-6 border-b border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center gap-1"
              >
                <Plus className="w-5 h-5" />
                Add
              </button>
            </div>
          </form>

          {/* Todo List */}
          <div className="divide-y divide-gray-200">
            {todos.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                No todos yet. Add one above!
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="px-6 py-4 flex items-center gap-4 group hover:bg-gray-50 transition-colors duration-200"
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                      todo.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300 hover:border-green-500'
                    }`}
                  >
                    {todo.completed && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <span
                    className={`flex-1 text-gray-800 ${
                      todo.completed ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {todos.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 text-sm text-gray-500">
              {todos.filter((t) => t.completed).length} of {todos.length} tasks completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;