import { useNavigate } from 'react-router-dom';
import { FaBrain, FaChevronRight } from 'react-icons/fa6';
import SessionStatus from './SessionStatus.jsx';
import { CLASSLABEL } from '../utils/utilities/classification.js';

const ResultContainer = ({ session }) => {
  const navigate = useNavigate();
  const onResultClick = () => {
    navigate(`/results/${session.id}`);
  };

  return (
    <div
      onClick={onResultClick}
      className="relative w-full bg-surface dark:bg-inverse-surface hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer rounded-lg border border-outline overflow-hidden"
    >
      <div className="h-0.5 w-full bg-primary" />
      <div className="p-md flex items-center justify-between gap-md">
        <div className="flex items-center gap-md flex-1 min-w-0">
          <div className="w-11 h-11 rounded bg-surface-container-low dark:bg-outline-variant flex items-center justify-center shrink-0">
            <span className="text-primary text-headline-md">
              <FaBrain />
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-body-md font-body-md text-on-surface dark:text-inverse-on-surface font-medium mb-0.5 truncate">
              {CLASSLABEL[session.diagnosis] ?? 'Pending analysis'}
            </p>
            <p className="text-label-bold font-label-bold text-on-surface-variant dark:text-inverse-on-surface mb-sm">
            ID: {session.id}
            </p>
            <div className="flex flex-wrap gap-md">
              <span className="text-label-md font-label-md text-on-surface-variant dark:text-inverse-on-surface">
              Created: {new Date(session.createdAt).toLocaleString()}
              </span>
              <span className="text-label-md font-label-md text-on-surface-variant dark:text-inverse-on-surface">
              Updated: {new Date(session.updatedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-sm shrink-0">
          <SessionStatus status={session.status} />
          <span className="text-on-surface-variant dark:text-inverse-on-surface text-sm">
            <FaChevronRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultContainer;
