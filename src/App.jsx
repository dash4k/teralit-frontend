import PageFooter from './components/PageFooter';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen w-full">
      <Navigation />
      <main>
      </main>
      <PageFooter />
    </div>
  );
}

export default App;
