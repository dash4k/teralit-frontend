import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { listSessions } from '../utils/api/session';
import { FaFileMedical, FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
import LoadingIcon from '../components/LoadingIcon.jsx';
import ResultContainer from '../components/ResultContainer.jsx';
import Heading from '../components/Heading.jsx';
import Button from '../components/Button.jsx';

const ResultsPage = () => {
  const [sessions, setSessions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);
  const limit = 5;

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await listSessions({ page, limit });
        const { sessions, totalPages } = data;
        setSessions(sessions);
        setTotalPages(totalPages);
      } catch (error) {
        toast.error(error?.message ?? 'Error while trying to load data');
      } finally {
        setDisablePrev(false);
        setDisableNext(false);
        setLoading(false);
        if (page === 1) setDisablePrev(true);
        if (page >= totalPages) setDisableNext(true);
      }
    };

    fetchData();
  }, [page]);

  if (loading) return (
    <section className="w-full min-h-dvh lg:h-auto px-container-margin mx-auto flex flex-col justify-center items-center text-on-surface dark:text-inverse-on-surface">
      <LoadingIcon />
    </section>
  );

  return (
    <section className="w-full min-h-dvh lg:h-auto px-container-margin mx-auto flex flex-col justify-center items-center">
      <div className="w-full h-auto flex flex-col gap-lg">
        <div>
          <div className="flex items-center gap-sm mb-xs">
            <Heading>My Results</Heading>
          </div>
          <p className="text-label-md font-label-md text-primary dark:text-inverse-primary flex gap-sm">Your past analysis sessions <FaFileMedical /></p>
        </div>
        <div className="w-full flex flex-col gap-sm">
          {sessions.map((session) => (
            <ResultContainer
              session={session}
              key={session.id}
            />
          ))}
        </div>
        <div className="flex flex-row justify-end items-center w-full h-auto gap-2">
          <Button
            onClick={prevPage}
            disabled={disablePrev}
            variant='outlined'
            startIcon={<FaChevronLeft />}
          >
            Prev
          </Button>
          <Button
            onClick={nextPage}
            disabled={disableNext}
            endIcon={<FaChevronRight />}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResultsPage;
