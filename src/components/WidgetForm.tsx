import CloseButton from "./CloseButton";

const feedbackTypes = {
  BUG: {
    title: "Problema",
  },
  IDEA: {
    title: "Ideia",
  },
  OTHER: {
    title: "Outro",
  },
};

function WidgetForm() {
  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      <header className="w-full px-4 flex">
        <span className="text-xl leading-6 px-10">Deixe seu feedback</span>
        <CloseButton />
      </header>

      <div className="flex py-8 gap-2 w-full"></div>

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
