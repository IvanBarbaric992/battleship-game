interface StatCardProps {
  value: string | number;
  label: string;
  colorClass: string;
}

const StatCard = ({ value, label, colorClass }: StatCardProps) => (
  <div className='rounded-xl bg-white p-4 text-center shadow-md'>
    <div
      className={`
        text-2xl font-extrabold
        ${colorClass}
      `}
    >
      {value}
    </div>
    <div className='text-sm font-medium text-ship-600'>{label}</div>
  </div>
);

export default StatCard;
