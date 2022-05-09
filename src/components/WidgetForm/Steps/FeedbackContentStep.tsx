import { ArrowLeft } from "phosphor-react";
import { ChangeEvent, useCallback, useMemo, useState, FormEvent } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import CloseButton from "../../CloseButton";
import Loading from "../../Loading";
import ScreenshotButton from "../ScreenshotButton";

interface Props {
  feedbackType: FeedbackType;
  onFeedbackReset: () => void;
  onFeedbackSent: () => void;
}

function FeedbackContentStep({
  feedbackType,
  onFeedbackSent,
  onFeedbackReset,
}: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const handleFeedbackComment = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setFeedbackComment(e.target.value);
    },
    []
  );

  const feedbackTypeInfo = useMemo(
    () => feedbackTypes[feedbackType],
    [feedbackType]
  );

  const handleSetScreenshot = useCallback((screenshot: string | null) => {
    setScreenshot(screenshot);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      setIsSendingFeedback(true);

      const data = {
        type: feedbackTypeInfo.title,
        comment: feedbackComment,
        screenshot,
      };

      await api.post("feedbacks", data);
      setIsSendingFeedback(false);
      onFeedbackSent();
    },
    [feedbackTypeInfo.title, feedbackComment, screenshot]
  );

  return (
    <>
      <header className="flex items-center gap-2">
        <button
          onClick={onFeedbackReset}
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <img
          className="w-6 h-6"
          src={feedbackTypeInfo.image.source}
          alt={feedbackTypeInfo.image.alt}
        />
        <span className="text-xl leading-6"> {feedbackTypeInfo.title}</span>
        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmit}>
        <textarea
          value={feedbackComment}
          onChange={handleFeedbackComment}
          className="
          placeholder-zinc-400
          text-zinc-100
          border-zinc-600
          bg-transparent
          focus:border-brand-500
          focus:ring-brand-500
          focus:ring-1
          resize-none
          rounded-md
          min-w-[304px] 
          w-full 
          min-h-[112px] 
          text-sm
          scrollbar-thumb-zinc-700
          scrollbar-track-transparent
          scrollbar-thin
          "
          placeholder="Conte com detalhes o que está acontecendo...."
          name="feedback-textarea"
          id="feedback-textarea"
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotChange={handleSetScreenshot}
          />

          <button
            disabled={!feedbackComment || isSendingFeedback}
            type="submit"
            className="
              p-2
              bg-brand-500
              border-transparent
              rounded-md
              flex-1
              flex
              justify-center
              items-center
              text-sm
              hover:bg-brand-300
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-offset-zinc-900
              focus:ring-brand-500
              transition-colors
              disabled:opacity-50
              disabled:cursor-not-allowed
          "
          >
            {isSendingFeedback ? <Loading /> : "Enviar"}
          </button>
        </footer>
      </form>
    </>
  );
}

export default FeedbackContentStep;
