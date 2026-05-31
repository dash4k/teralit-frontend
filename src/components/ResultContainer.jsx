import { useNavigate } from 'react-router-dom';
import BodyText from './BodyText.jsx';
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
      className="relative w-full h-auto flex flex-row justify-between items-center bg-surface-container dark:bg-inverse-surface hover:-translate-y-1/12 hover:drop-shadow-lg transition-all duration-200 shadow-inverse-surface dark:shadow-surface hover:cursor-pointer"
    >
      <div className="flex-1 flex flex-col justify-center items-start border border-primary border-dashed p-2 rounded-DEFAULT">
        <BodyText>{CLASSLABEL[session.diagnosis]}</BodyText>
        <p className="text-label-bold font-label-bold text-on-surface dark:text-inverse-on-surface">ID: {session.id}</p>
        <div className="flex flex-row justify-center items-start gap-container-margin">
          <BodyText>Created at: {new Date(session.createdAt).toLocaleString()}</BodyText>
          <BodyText>Updated at: {new Date(session.updatedAt).toLocaleString()}</BodyText>
        </div>
      </div>
      <div className="absolute top-0 right-0">
        <SessionStatus status={session.status} />
      </div>
    </div>
  );
};

export default ResultContainer;
