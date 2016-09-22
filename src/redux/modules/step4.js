const SELECT_OPTION = 'TestChallenge/step4/SELECT_OPTION';

const initialState = {
  selectedOption: null,
  isStepValid: false,
};

export default function step2(state = initialState, action = {}) {
  switch (action.type) {
    case SELECT_OPTION: {
      return {
        selectedOption: action.option,
        isStepValid: true,
      };
    }

    default:
      return state;
  }
}

/*  ACTION CREATORS */
export function selectOption(option) {
  return {
    type: SELECT_OPTION,
    option,
  };
}
/*  ACTION CREATORS */
