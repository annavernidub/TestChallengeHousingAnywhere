const TOGGLE_CHECKBOX = 'TestChallenge/step1/TOGGLE_CHECKBOX';

const initialState = {
  A1: false,
  A2: false,
  isStepValid: false,
};

export default function step1(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_CHECKBOX: {
      const updatedState = {
        ...state,
        [action.name]: !state[action.name],
      }

      return {
        ...updatedState,
        isStepValid: updatedState.A1 || updatedState.A2,
      };
    }

    default:
      return state;
  }
}

/*  ACTION CREATORS */
export function toggleCheckbox(name) {
  return {
    name,
    type: TOGGLE_CHECKBOX,
  };
}
/*  ACTION CREATORS */
