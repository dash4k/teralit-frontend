import { useNavigate } from 'react-router-dom';
import Heading from '../components/Heading.jsx';
import BodyText from '../components/BodyText.jsx';
import Button from '../components/Button.jsx';
import { FaSprayCan, FaClipboardList, FaCamera, FaMicrochip, FaRobot, FaShieldHalved } from 'react-icons/fa6';

const CONDITIONS = [
  { label: 'Chicken Pox', risk: 'medium' },
  { label: 'Melanoma', risk: 'high' },
  { label: 'Eczema', risk: 'high' },
  { label: 'Hives', risk: 'medium' },
];

const RISK_COLOR = {
  low: 'text-secondary bg-secondary-container',
  medium: 'text-tertiary bg-tertiary-container',
  high: 'text-error bg-error-container',
};

const STEPS = [
  { icon: <FaCamera />, title: 'Capture or upload a photo', desc: 'Use your camera or upload an image of the skin lesion you want analysed.' },
  { icon: <FaMicrochip />, title: 'AI classifies the lesion', desc: 'Our model analyses your image and returns a diagnosis with a confidence score and risk level.' },
  { icon: <FaRobot />, title: 'Chat with Alit', desc: 'Ask our AI chatbot questions about your result, what it means, and what steps to take next.' },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full max-w-dvh min-h-dvh px-container-margin mx-auto flex flex-col items-center">
      <div className="w-full flex flex-col">
        <div className="flex flex-col items-center text-center py-xxl gap-lg">
          <span className="inline-flex items-center gap-xs bg-surface-container-low border border-primary-fixed-dim rounded-full px-md py-xs text-label-bold font-label-bold text-primary uppercase tracking-widest">
            AI-powered skin analysis
          </span>
          <div className="flex flex-col gap-sm">
            <Heading>Skin health insights, in seconds</Heading>
            <BodyText>
              Teralit uses deep learning to classify skin lesions from a photo — giving you a diagnosis,
              confidence score, and risk level instantly.
            </BodyText>
          </div>
          <div className="flex items-center gap-sm flex-wrap justify-center">
            <Button
              onClick={() => navigate('/new')}
              startIcon={<FaSprayCan />}
            >
              Start a scan
            </Button>
            <Button
              onClick={() => navigate('/results')}
              variant="outlined"
              startIcon={<FaClipboardList />}
            >
              View results
            </Button>
          </div>
        </div>
        <div className="border border-outline rounded-lg overflow-hidden mb-xl">
          <div className="bg-primary px-md py-xs flex items-center justify-between">
            <p className="text-label-bold font-label-bold text-on-primary uppercase tracking-widest">Sample result</p>
            <span className="text-label-md font-label-md bg-primary-container text-on-primary-container rounded-full px-sm py-xs">Completed</span>
          </div>
          <div className="grid grid-cols-3 gap-sm p-md">
            {[
              { label: 'Diagnosis', value: 'Chicken Pox' },
              { label: 'Confidence', value: '92.1%' },
              { label: 'Risk Level', value: 'Medium' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-surface-container dark:bg-inverse-surface rounded p-sm"
              >
                <p className="text-label-bold font-label-bold text-on-surface-variant dark:text-inverse-on-surface uppercase tracking-widest mb-xs">{label}</p>
                <p className="text-body-md font-medium text-on-surface dark:text-inverse-on-surface">{value}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-outline px-md pb-md pt-sm">
            <div className="flex gap-sm items-start">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0 mt-xs">
                <FaRobot className="text-on-primary text-xs" />
              </div>
              <div className="bg-surface-container-low dark:bg-inverse-surface rounded-lg px-md py-sm flex-1">
                <BodyText>
                  This lesion appears benign. Melanocytic nevi are common moles. Regular monitoring
                  is advised — consult a dermatologist if you notice changes in size or color.
                </BodyText>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-xl">
          <p className="text-label-bold font-label-bold text-on-surface-variant dark:text-inverse-on-surface uppercase tracking-widest mb-md">How it works</p>
          <div className="flex flex-col gap-0">
            {STEPS.map(({ icon, title, desc }, i) => (
              <div
                key={title}
                className="flex gap-md items-start"
              >
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                    {icon}
                  </div>
                  {i < STEPS.length - 1 && <div className="w-px flex-1 bg-outline-variant min-h-6 mt-xs" />}
                </div>
                <div className="pt-xs pb-lg">
                  <p className="text-body-md font-medium text-on-surface dark:text-inverse-on-surface mb-xs">{title}</p>
                  <BodyText>{desc}</BodyText>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-xl">
          <p className="text-label-bold font-label-bold text-on-surface-variant dark:text-inverse-on-surface uppercase tracking-widest mb-md">What we detect</p>
          <div className="grid grid-cols-2 gap-sm lg:grid-cols-3">
            {CONDITIONS.map(({ label, risk }) => (
              <div
                key={label}
                className="bg-surface-container dark:bg-inverse-surface rounded flex items-center gap-sm px-md py-sm"
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${RISK_COLOR[risk]}`} />
                <BodyText>{label}</BodyText>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface-container-low dark:bg-inverse-surface border border-primary-fixed-dim rounded-lg p-md flex gap-sm items-start mb-xxl">
          <FaShieldHalved className="text-primary dark:text-inverse-primary shrink-0 mt-xs" />
          <div>
            <p className="text-label-bold font-label-bold text-primary dark:text-inverse-primary mb-xs">For informational use only</p>
            <BodyText>
              Alit is not a substitute for professional medical advice. Always consult a qualified
              dermatologist for any skin concerns.
            </BodyText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
