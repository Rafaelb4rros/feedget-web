import { FeedbackType, feedbackTypes } from "..";

interface Props {
  onFeedbackTypeChange: (type: FeedbackType) => void;
}

function FeedbackTypeStep({ onFeedbackTypeChange }: Props) {
  return (
    <>
      <span className="text-xl leading-6">Deixe seu feedback</span>
      <div className="flex flex-wrap gap-2 py-8 w-full">
        {Object.entries(feedbackTypes).map(([key, { title, image }]) => (
          <button
            onClick={() => onFeedbackTypeChange(key as FeedbackType)}
            className="
            bg-zinc-800
            rounded-lg
            py-5
            w-24 
            flex-1 
            flex
            flex-col
            items-center
            gap-2 border-2
            border-transparent
            hover:border-brand-500
            focus:border-brand-500
            focus:outline-none
          "
            key={title}
            title={title}
          >
            <img src={image.source} alt={image.alt} />
            <span>{title}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default FeedbackTypeStep;
