export default function SummaryCards({ tasks = [] }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const pending = tasks.filter(t => t.status === 'Pending').length;

  const overdue = tasks.filter(t => {
    if (t.status === 'Completed') return false;
    if (!t.dueDate) return false;
    const today = new Date().setHours(0, 0, 0, 0);
    const taskDate = new Date(t.dueDate).setHours(0, 0, 0, 0);
    return taskDate < today;
  }).length;

  const cardData = [
    { title: 'Total Tasks', value: total, color: 'border-l-brand-gray text-brand-white' },
    { title: 'Completed Tasks', value: completed, color: 'border-l-brand-gold text-brand-gold' },
    { title: 'Pending Tasks', value: pending, color: 'border-l-brand-charcoal text-brand-gray' },
    { title: 'Overdue Tasks', value: overdue, color: 'border-l-rose-500 text-rose-400' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardData.map((card, idx) => (
        <div key={idx} className={`bg-brand-charcoal/40 p-6 rounded-xl border border-brand-charcoal border-l-4 ${card.color} shadow-lg`}>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-gray">{card.title}</p>
          <p className="text-3xl font-bold mt-2 text-white">{card.value}</p>
        </div>
      ))}
    </div>
  );
}