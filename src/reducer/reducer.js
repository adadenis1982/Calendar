export const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'EDIT_EVENT':
      return { ...state, events: state.events.map((el) => {
        if (el.id === action.payload.id) {
          el.title = action.payload.title;
          el.description = action.payload.description;
        }
        return el;
      })};
    case 'DELETE_EVENT':
      return { ...state, events: state.events.filter((event) => event.id !== action.payload) };
    default:
      return state;
  }
};
