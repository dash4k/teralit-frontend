import { useEffect, useState } from 'react';
import { listSessions } from '../utils/api/session';
import ResultContainer from '../components/ResultContainer.jsx';
import LoadingIcon from '../components/LoadingIcon.jsx';
import toast from 'react-hot-toast';

const ResultsPage = () => {
  const [sessions, setSessions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { sessions } = await listSessions();
        console.log(sessions);
        setSessions(sessions);
        toast.success('Data loaded successfully');
      } catch (error) {
        toast.error(error?.message ?? 'Error while trying to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <section className="w-full min-h-dvh lg:h-auto px-container-margin mx-auto flex flex-col justify-center items-center text-on-surface dark:text-inverse-on-surface">
      <LoadingIcon />
    </section>
  );

  return (
    <section className="w-full min-h-dvh lg:h-auto px-container-margin mx-auto flex flex-col justify-center items-center">
      <div className="w-full h-auto flex flex-col items-center justify-center gap-container-margin">
        {sessions.map((session) => (
          <ResultContainer
            session={session}
            key={session.id}
          />
        ))}
      </div>
    </section>
  );
};

export default ResultsPage;
