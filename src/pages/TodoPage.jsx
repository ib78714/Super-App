import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2, Check } from 'lucide-react';

export const TodoPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'متابعة سعر الدولار اليوم', completed: false },
    { id: 2, text: 'مراجعة تسليم مشروع Front-End', completed: true },
  ]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-purple-500/10 text-purple-600 rounded-2xl">
          <CheckSquare className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">قائمة المهام اليومية</h1>
          <p className="text-sm text-slate-500">نظم مواعيدك وملاحظاتك بسهولة</p>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="إضافة مهمة جديدة..."
          className="flex-1 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm"
        />
        <button onClick={addTask} className="px-5 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700">
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleTask(task.id)}>
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center border ${task.completed ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-300'}`}>
                {task.completed && <Check size={14} />}
              </div>
              <span className={`text-sm font-semibold ${task.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                {task.text}
              </span>
            </div>
            <button onClick={() => deleteTask(task.id)} className="text-slate-400 hover:text-rose-500">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};