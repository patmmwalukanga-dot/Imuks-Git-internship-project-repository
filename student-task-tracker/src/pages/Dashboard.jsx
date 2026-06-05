import { useState, useEffect } from 'react';

export default function Dashboard() {
  // Hardcoded active user session for portfolio display (In production, this comes from an Auth token/context)
  const currentUser = 'student_session_01';

  // Load tasks dynamically based on the active user partition
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(`${currentUser}_tasks`);
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, title: 'Database Systems Unit 4 Assignment', description: 'Review relational algebra keys and indexing strategies.', deadline: '2026-06-12', priority: 'High', status: 'Pending' },
      { id: 2, title: 'Build React Frontend Components', description: 'Implement mockup layouts with Tailwind and interactive hover configurations.', deadline: '2026-06-15', priority: 'Medium', status: 'Completed' }
    ];
  });

  // Input fields state tracking
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [editingId, setEditingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  // Persist data securely to this specific user's local storage key
  useEffect(() => {
    localStorage.setItem(`${currentUser}_tasks`, JSON.stringify(tasks));
  }, [tasks, currentUser]);

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim() || !deadline) return;

    if (editingId) {
      setTasks(tasks.map(task => 
        task.id === editingId 
          ? { ...task, title: taskTitle, description, deadline, priority } 
          : task
      ));
      setEditingId(null);
    } else {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        description,
        deadline,
        priority,
        status: 'Pending'
      };
      setTasks([newTask, ...tasks]);
    }

    setTaskTitle('');
    setDescription('');
    setDeadline('');
    setPriority('Medium');
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setTaskTitle(task.title);
    setDescription(task.description);
    setDeadline(task.deadline);
    setPriority(task.priority);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTaskTitle('');
    setDescription('');
    setDeadline('');
    setPriority('Medium');
  };

  const toggleStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' } 
        : task
    ));
  };

  const deleteTask = (id) => {
    if (editingId === id) cancelEdit();
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (statusFilter === 'Pending') return task.status === 'Pending';
    if (statusFilter === 'Completed') return task.status === 'Completed';
    return true;
  });

  return (
    <div className="bg-bg-pure text-text-main min-h-[calc(100vh-73px)] p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* DASHBOARD HEADER */}
        <header className="mb-10 border-b border-border-subtle pb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">STUDENT TASK WORKSPACE</h1>
          <p className="text-xs text-text-muted uppercase tracking-widest mt-1">Project Status & Task Management Console</p>
        </header>

        {/* STATS SUMMARY ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-card-dark border border-border-subtle p-6 rounded-2xl">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-1">Total Tasks</span>
            <div className="text-3xl font-black tracking-tight">{tasks.length}</div>
          </div>
          <div className="bg-card-dark border border-border-subtle p-6 rounded-2xl">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-1">Pending</span>
            <div className="text-3xl font-black tracking-tight text-amber-400">{tasks.filter(t => t.status === 'Pending').length}</div>
          </div>
          <div className="bg-card-dark border border-border-subtle p-6 rounded-2xl">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-1">Completed</span>
            <div className="text-3xl font-black tracking-tight text-text-main">{tasks.filter(t => t.status === 'Completed').length}</div>
          </div>
        </div>

        {/* INTERFACE SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: INPUT FORM */}
          <div className="bg-card-dark border border-border-subtle p-6 rounded-2xl lg:col-span-1">
            <h2 className="text-xs font-bold tracking-widest text-text-muted uppercase mb-6 pb-2 border-b border-border-subtle">
              {editingId ? '// UPDATE DATA BLOCK' : '// INJECT PIPELINE'}
            </h2>
            
            <form onSubmit={handleSaveTask} className="flex flex-col gap-4">
              <div>
                <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Task Title</label>
                <input 
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Task title..."
                  className="w-full bg-bg-pure border border-border-subtle text-sm text-text-main rounded-xl px-4 py-3 focus:outline-none focus:border-interactive-blue transition duration-300 placeholder:text-text-muted/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task details..."
                  rows="3"
                  className="w-full bg-bg-pure border border-border-subtle text-sm text-text-main rounded-xl px-4 py-3 focus:outline-none focus:border-interactive-blue transition duration-300 placeholder:text-text-muted/30 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Due Date</label>
                  <input 
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-bg-pure border border-border-subtle text-xs text-text-main rounded-xl px-3 py-2.5 focus:outline-none focus:border-interactive-blue transition duration-300 color-scheme-dark"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Priority</label>
                  <select 
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-bg-pure border border-border-subtle text-xs text-text-main rounded-xl px-3 py-2.5 focus:outline-none focus:border-interactive-blue transition duration-300 appearance-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <button 
                  type="submit"
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider bg-text-main text-bg-pure rounded-xl border border-transparent transition-all duration-300 hover:bg-bg-pure hover:text-interactive-blue hover:border-interactive-blue hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
                >
                  {editingId ? 'Apply Update' : 'Add Task'}
                </button>
                {editingId && (
                  <button type="button" onClick={cancelEdit} className="text-xs text-text-muted hover:text-text-main mt-1">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* RIGHT: TASK STREAM */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            
            {/* FILTER ENGINE BAR */}
            <div className="flex items-center justify-between bg-card-dark border border-border-subtle px-4 py-2 rounded-xl">
              <span className="text-[11px] font-mono uppercase text-text-muted">Active Scope:</span>
              <div className="flex gap-1">
                {['All', 'Pending', 'Completed'].map((filterOption) => (
                  <button
                    key={filterOption}
                    onClick={() => setStatusFilter(filterOption)}
                    className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all duration-200 ${
                      statusFilter === filterOption 
                        ? 'bg-text-main text-bg-pure border-text-main' 
                        : 'bg-transparent text-text-muted border-transparent hover:text-interactive-blue'
                    }`}
                  >
                    {filterOption}
                  </button>
                ))}
              </div>
            </div>

            {/* LIVE DISPLAY */}
            <div className="flex flex-col gap-3">
              {filteredTasks.length === 0 ? (
                <div className="bg-card-dark/40 border border-dashed border-border-subtle rounded-2xl p-12 text-center text-sm text-text-muted">
                  No records stored for this active status filter.
                </div>
              ) : (
                filteredTasks.map((task) => {
                  const isCompleted = task.status === 'Completed';
                  return (
                    <div key={task.id} className={`bg-card-dark border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-border-subtle ${isCompleted ? 'opacity-40' : ''}`}>
                      <div className="flex items-start gap-4 flex-grow">
                        <button 
                          onClick={() => toggleStatus(task.id)}
                          className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${isCompleted ? 'bg-text-main border-text-main text-bg-pure' : 'border-text-muted hover:border-interactive-blue'}`}
                        >
                          {isCompleted && (
                            <svg className="w-3 h-3 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>

                        <div>
                          <h3 className={`text-sm font-semibold tracking-wide ${isCompleted ? 'line-through text-text-muted' : 'text-text-main'}`}>
                            {task.title}
                          </h3>
                          <p className="text-xs text-text-muted mt-1 leading-relaxed">{task.description}</p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-[11px] text-text-muted uppercase font-mono">
                            <span>Due: {task.deadline}</span>
                            <span>•</span>
                            <span className={task.priority === 'High' ? 'text-red-400' : task.priority === 'Medium' ? 'text-amber-400' : 'text-text-muted'}>
                              [{task.priority}]
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col gap-2 justify-end shrink-0 w-full sm:w-auto">
                        <button onClick={() => startEdit(task)} className="px-3 py-1.5 text-[11px] font-bold text-text-muted border border-border-subtle rounded-lg hover:border-interactive-blue hover:text-interactive-blue">
                          Edit
                        </button>
                        <button onClick={() => deleteTask(task.id)} className="px-3 py-1.5 text-[11px] font-bold text-text-muted/60 border border-border-subtle rounded-lg hover:border-red-500/40 hover:text-red-400">
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}