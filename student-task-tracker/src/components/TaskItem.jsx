export default function TaskItem({ task, onDelete, onToggleStatus }) {
  const priorityColors = {
    Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    High: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
  };

  return (
    <div className={`p-5 bg-slate-900/40 border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition shadow-md ${task.status === 'Completed' ? 'border-slate-800 opacity-60' : 'border-slate-800'}`}>
      <div className="space-y-1.5 flex-1">
        <div className="flex items-center gap-3 flex-wrap">
          <h4 className={`font-semibold text-base tracking-tight ${task.status === 'Completed' ? 'line-through text-slate-500' : 'text-white'}`}>
            {task.title}
          </h4>
          <span className={`px-2 py-0.5 text-xs font-medium border rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${task.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'}`}>
            {task.status}
          </span>
        </div>
        {task.description && <p className="text-sm text-slate-400 max-w-xl">{task.description}</p>}
        <p className="text-xs text-indigo-400 font-medium">📅 Due: {task.dueDate}</p>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center">
        <button
          onClick={() => onToggleStatus(task.id)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${task.status === 'Completed' ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-500'}`}
        >
          {task.status === 'Completed' ? 'Reopen' : '✓ Complete'}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 rounded-lg text-xs font-semibold transition"
        >
          ✕ Delete
        </button>
      </div>
    </div>
  );
}