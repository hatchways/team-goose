import { useState, useEffect } from "react";

const DIRECTION = {
  LEFT: "row",
  RIGHT: "row-reverse",
};

const JUSTIFY = {
  FLEX_START: "flex-start",
  CENTER: "center",
};

const SENDER_DIALOG_STYLE = {
  TEXT: "message-out",
  BACKGROUND: "bg-red", // TODO: will need to assign background color depending on player's team color
};

const SYSTEM_DIALOG_STYLE = {
  INFO: "system-message",
  ACTION: "system-message action",
};

export const MESSAGE_TYPE = {
  PLAYER: "player",
  SYSTEM_INFO: "info",
  SYSTEM_ACTION: "action",
};

export function useDialogType(type, isSender = false) {
  const [showFrom, setShowFrom] = useState(true);
  const [style, setStyle] = useState("");
  const [direction, setDirection] = useState(DIRECTION.LEFT);
  const [spacing, setSpacing] = useState(3);
  const [justify, setJustify] = useState(JUSTIFY.FLEX_START);

  useEffect(() => {
    if (type === MESSAGE_TYPE.PLAYER) {
      if (isSender.current) {
        setDirection(DIRECTION.RIGHT);
        setStyle(
          `${SENDER_DIALOG_STYLE.TEXT} ${SENDER_DIALOG_STYLE.BACKGROUND}`
        );
        setShowFrom(false);
      }
    } else if (type === MESSAGE_TYPE.SYSTEM_INFO) {
      setStyle(SYSTEM_DIALOG_STYLE.INFO);
      setSpacing(0);
      setShowFrom(false);
    } else if (type === MESSAGE_TYPE.SYSTEM_ACTION) {
      setStyle(SYSTEM_DIALOG_STYLE.ACTION);
      setSpacing(0);
      setJustify(JUSTIFY.CENTER);
      setShowFrom(false);
    }
  }, [type, isSender]);

  return { showFrom, style, direction, spacing, justify };
}
