import CAN_USE_DOM from "./canUseDOM";

const getSelection = (): Selection | null =>
  CAN_USE_DOM ? window.getSelection() : null;

export default getSelection;
