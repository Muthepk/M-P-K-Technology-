import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { PlayCircle, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface TasksProps {
  onComplete: (amount: number) => void;
}

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Watch Welcome Ad', reward: 6, durationSeconds: 60, type: 'ad', completed: false },
  { id: '2', title: 'Product Video Review', reward: 12, durationSeconds: 120, type: 'video', completed: false },
  { id: '3', title: 'AdMob Bonus Task', reward: 18, durationSeconds: 60, type: 'ad', completed: false },
  { id: '4', title: 'Daily Check-in Video', reward: 6, durationSeconds: 30, type: 'video', completed: false },
];

export const Tasks: React.FC<TasksProps> = ({ onComplete }) => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let interval: number;
    if (activeTaskId && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (activeTaskId && timeLeft === 0) {
      // Task Completed
      handleTaskCompletion(activeTaskId);
    }
    return () => clearInterval(interval);
  }, [activeTaskId, timeLeft]);

  const startTask = (task: Task) => {
    if (activeTaskId) return;
    setActiveTaskId(task.id);
    setTimeLeft(task.durationSeconds);
  };

  const handleTaskCompletion = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: true } : t));
      onComplete(task.reward);
      setActiveTaskId(null);
      alert(`Task Completed! You earned ₹${task.reward}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <PlayCircle className="text-primary" />
          Available Tasks
        </h2>
        <p className="text-gray-500 text-sm mb-6">Complete tasks to earn real money rewards. Keep the window open while the timer runs.</p>

        {activeTaskId && (
          <div className="mb-8 p-6 bg-blue-50 border border-blue-100 rounded-xl text-center animate-pulse">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Task in Progress...</h3>
            <div className="text-4xl font-mono font-bold text-blue-600 mb-2">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <p className="text-sm text-blue-700">Please do not close this tab</p>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`p-4 rounded-lg border transition-all ${
                task.completed 
                  ? 'bg-green-50 border-green-200' 
                  : activeTaskId === task.id
                    ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-100'
                    : 'bg-white border-gray-200 hover:border-primary/50 hover:shadow-md'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  {task.type === 'video' ? <PlayCircle className="w-5 h-5 text-purple-500" /> : <AlertCircle className="w-5 h-5 text-orange-500" />}
                  <span className={`font-medium ${task.completed ? 'text-green-800' : 'text-gray-800'}`}>{task.title}</span>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                  ₹{task.reward}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{Math.floor(task.durationSeconds / 60)} min {task.durationSeconds % 60 > 0 ? `${task.durationSeconds % 60}s` : ''}</span>
                </div>
                
                {task.completed ? (
                  <button disabled className="flex items-center gap-1 text-green-600 font-medium cursor-default">
                    <CheckCircle2 className="w-4 h-4" />
                    Completed
                  </button>
                ) : (
                  <button 
                    onClick={() => startTask(task)}
                    disabled={activeTaskId !== null}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-colors ${
                      activeTaskId !== null
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-amber-600'
                    }`}
                  >
                    Start Task
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};