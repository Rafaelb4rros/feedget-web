import { Camera, Trash } from "phosphor-react";
import { useCallback, useState } from "react";
import html2canvas from "html2canvas";
import Loading from "../Loading";

interface Props {
  onScreenshotChange: (screenshot: string | null) => void;
  screenshot: string | null;
}

function ScreenshotButton({ onScreenshotChange, screenshot }: Props) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  const handleTakeScreenshot = useCallback(async () => {
    setIsTakingScreenshot(true);
    const canvas = await html2canvas(document.querySelector("html")!);
    const base64image = canvas.toDataURL("image/png");
    onScreenshotChange(base64image);
    setIsTakingScreenshot(false);
  }, []);

  if (screenshot) {
    return (
      <button
        onClick={() => onScreenshotChange(null)}
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: `right bottom`,
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button
      onClick={handleTakeScreenshot}
      type="button"
      className="
      p-2 
      bg-zinc-800 rounded-md 
      focus:outline-none
      focus:ring-2
      focus:ring-offset-2
      focus:ring-offset-zinc-900
      focus:ring-brand-500
      border-transparent 
      hover:bg-zinc-700 
      transition-colors"
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  );
}

export default ScreenshotButton;
