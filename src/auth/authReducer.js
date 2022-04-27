import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...action.payload,
                logged: true
            }
        case types.logout:
            return {
                logged: false
            }
        default:
            return state;
    }
}

// example
// const state = {
//     name:'Miguel',
//     logged:true
// }
// example
// const loginAction = {
//     type: types.login,
//     payload: {
//         name:'miguel',
//         email: 'miguel@gmail.com'
//     }
// }