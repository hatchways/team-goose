import { useState, useEffect } from "react";

import { TEAM_CODE } from "../game_lobby/team_select/TeamPresets";

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
  BACKGROUND: "",
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

export function useDialogType(type, player, isSender = false) {
  const [showFrom, setShowFrom] = useState(true);
  const [style, setStyle] = useState("");
  const [direction, setDirection] = useState(DIRECTION.LEFT);
  const [spacing, setSpacing] = useState(3);
  const [justify, setJustify] = useState(JUSTIFY.FLEX_START);

  useEffect(() => {
    let backgroundColor = "";

    player.team === TEAM_CODE.RED
      ? (backgroundColor = "bg-red")
      : (backgroundColor = "bg-blue");

    SENDER_DIALOG_STYLE.BACKGROUND = backgroundColor;
  }, [player.team]);

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
