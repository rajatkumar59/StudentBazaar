const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN": {
        console.log(action.payload);
        return {
          currentUser: action.payload,
        };
      }
      case "LOGOUT": {
        return {
          currentUser: null,
        };
      }
      default:
        return state;
    }
  };
  
  export default AuthReducer;