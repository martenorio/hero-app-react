import { mount } from "enzyme";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

//El mock es necesario, por que dentro de la función 
//se ejecuta navigate de  useNavigate que forma parte de 
//react-router-dom y para que la prueba 
//no tenga errores con la funcion de navigate se simula la ejecución
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

describe('LoginScreen tests', () => {
    const contextValue = {
        dispatch : jest.fn(),
        user : {
            logged : false
        }
    }
    const wrapper = mount(
        <AuthContext.Provider value={contextValue} >
            <MemoryRouter initialEntries={ ['/login'] }>
                <Routes>
                    <Route path="/login" element={<LoginScreen />}></Route>
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    )

    test('should be match with snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('should do the dispatch and the navigation', () => {
        const handleClick = wrapper.find('button').prop('onClick');
        
        handleClick();
        
        expect(contextValue.dispatch).toHaveBeenCalledWith(
            {type: types.login, payload:{ name: 'miguel tenorio'}}
        );
        
        expect(mockNavigate).toHaveBeenCalledWith('/marvel',{ replace: true });
        
        localStorage.setItem('lastPath','/dc');
        
        handleClick();

        expect(mockNavigate).toHaveBeenCalledWith('/dc',{ replace: true });
    })
})