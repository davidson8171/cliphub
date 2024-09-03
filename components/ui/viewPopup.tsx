import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  id: number;
  viewCount: number;
  top: string;
  left: string;
  delay: number;
}

export default function ViewPopup(props: Props) {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, [props.viewCount, props.top, props.left]);

  return (
    <div
      key={animationKey}
      className="fixed flex items-center h-max animate-jumpFade delay-100 opacity-0"
      style={{
        top: props.top,
        left: props.left,
        animationDelay: `${props.delay}ms`,
        zIndex: 0,
      }}
    >
      <h2 className="text-muted-foreground text-base">
        {"+ " + props.viewCount + "k"}
      </h2>
      <Eye className="h-4 w-4 text-muted-foreground ml-1" />
    </div>
  );
}
