import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

describe('Auth test', () => {

    test('should return default state', () => {
        const state = authReducer({ logged: false }, {});
        expect( state ).toEqual( { logged: false } );
    })

    test('should authenticate and set user name', () => {
        const action = {
            type: types.login,
            payload: { name: 'Miguel' }
        }

        const state = authReducer({ logged: true }, action);

        expect( state ).toEqual( {
            logged: true,
            name: 'Miguel'
        } );
    })

    test('should delete user name and set logged in false', () => {
        const action = {
            type: types.logout
        }
        const state = authReducer({ logged: true }, action);
        // console.log(state);
        expect( state ).toEqual({ logged: false})
    })
})