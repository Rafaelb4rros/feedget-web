import { useCallback, useState } from "react";

import BugImage from "../../assets/bug.svg";
import IdeiaImage from "../../assets/idea.svg";
import EmojiImage from "../../assets/emoji.svg";

import FeedbackTypeStep from "./Steps/FeedbackTypeStep";
import FeedbackContentStep from "./Steps/FeedbackContentStep";
import FeedbackSuccessStep from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: BugImage,
      alt: "Inseto",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: IdeiaImage,
      alt: "Lampada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      source: EmojiImage,
      alt: "Balão de pensamento",
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleSendFeedback = useCallback(() => setFeedbackSent(true), []);

  const handleFeedbackType = useCallback((type: FeedbackType) => {
    setFeedbackType(type);
  }, []);

  const handleResetFeedback = useCallback(() => {
    setFeedbackType(null);
    setFeedbackSent(false);
  }, []);

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {!feedbackType ? (
        <FeedbackTypeStep onFeedbackTypeChange={handleFeedbackType} />
      ) : !feedbackSent ? (
        <FeedbackContentStep
          onFeedbackSent={handleSendFeedback}
          onFeedbackReset={handleResetFeedback}
          feedbackType={feedbackType}
        />
      ) : (
        <FeedbackSuccessStep onFeedbackReset={handleResetFeedback} />
      )}

      <footer className="text-xs">
        Made with 💖 by
        <a
          className="underline underline-offset-2"
          target="_blank"
          href="https://www.github.com/rafaelb4rros"
        >
          {" "}
          Rafael Barros
        </a>
      </footer>
    </div>
  );
}

export default WidgetForm;
