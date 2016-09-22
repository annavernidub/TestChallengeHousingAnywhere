const TOGGLE_BUTTON = 'TestChallenge/step2/TOGGLE_BUTTON';

const initialState = {
  B1: false,
  B2: false,
  isStepValid: false,
};

export default function step2(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_BUTTON: {
      let updatedState;

      if (action.name === 'B1') {
        updatedState = {
          B1: !state.B1,
          B2: state.B1,
        };
      }

      if (action.name === 'B2') {
        updatedState = {
          B1: state.B2,
          B2: !state.B2,
        };
      }

      return {
        ...updatedState,
        isStepValid: true,
      };
    }

    default:
      return state;
  }
}

/*  ACTION CREATORS */
export function toggleButton(name) {
  return {
    name,
    type: TOGGLE_BUTTON,
  };
}
/*  ACTION CREATORS */
