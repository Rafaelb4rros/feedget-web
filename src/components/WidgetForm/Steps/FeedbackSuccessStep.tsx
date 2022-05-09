import CloseButton from "../../CloseButton";

import successImage from "../../../assets/success.svg";

interface Props {
  onFeedbackReset: () => void;
}

function FeedbackSuccessStep({ onFeedbackReset }: Props) {
  return (
    <>
      <header>
        <CloseButton />
      </header>
      <div className="flex flex-col items-center py-10 w-[304px]">
        <img src={successImage} alt="success" />

        <span className="text-xl mt-2">Agradecemos o feedback</span>

        <button
          type="button"
          onClick={onFeedbackReset}
          className="
              py-2 
              px-6 
              mt-6 
              bg-zinc-800 
              rounded-md 
              border-transparent 
              text-sm 
              leading-6 
              hover:bg-zinc-700 
              transition-colors  
              focus:ring-2
              focus:ring-offset-2
              focus:ring-offset-zinc-900
              focus:ring-brand-500"
        >
          Enviar outro
        </button>
      </div>
    </>
  );
}

export default FeedbackSuccessStep;
