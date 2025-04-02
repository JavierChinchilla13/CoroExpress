import { types } from "../types/authTypes";

/*
initialStateType = {

    logged : boolean,
    user: {
        id: string,
        name: string,
        }
}

actionType = {

    type: string,
    payload: user
    
}
 
*/

export const authReducer = (initialState = {}, action) => {

    switch (action.type) {
        case types.login:
            return {
                logged: true,
                user: action.payload
            };

        case types.logout:
            return {
                logged: false
            };
    
        default:
            return initialState;
    }

}