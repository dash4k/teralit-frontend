const SessionStatus = ({ status }) => {
  const COLOR = {
    pending: 'bg-tertiary-fixed-dim text-on-tertiary-fixed',
    completed: 'bg-primary-fixed-dim text-on-primary-fixed',
    failed: 'bg-error text-on-error'
  };

  return (
    <p className={`w-auto p-1 ${COLOR[status]} rounded-DEFAULT font-label-bold text-label-bold`}>
      {status.toUpperCase()}
    </p>
  );
};

export default SessionStatus;
