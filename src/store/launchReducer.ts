import type { Launch } from "../types/launch";

type State = {
  currentLaunches: Launch[] | null;
  modalOpen: boolean;
  selectedLaunch: Launch | null;
};
type Action =
  | { type: 'set_launches'; payload: Launch[] }
  | { type: 'openModal'; payload: Launch }
  | { type: 'closeModal' };
  
export const initialState: State = {
  currentLaunches: null,
  modalOpen: false,
  selectedLaunch: null,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set_launches':
      return {
        ...state,
        currentLaunches: action.payload,
      };
    case 'openModal':
      return {
        ...state,
        modalOpen: true,
        selectedLaunch: action.payload,
      };
    case 'closeModal':
      return {
        ...state,
        modalOpen: false,
        selectedLaunch: null,
      };

    default:
      return state;
  }
};