import { mount } from "enzyme";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { Navbar } from "../../../components/ui/Navbar";
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

describe('Navbar test', () => {
    const contextValue = {
        user:{
            logged: true,
            name: 'John'
        }, 
        dispatch : jest.fn()
    }
    const wrapper = mount( 
        <AuthContext.Provider value={contextValue} >
            <MemoryRouter initialEntries={ ['/'] }>
                <Routes>
                    <Route path="/" element={<Navbar />}></Route>
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );
    test('should display correctly', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toEqual('John');
    })
    test('should call logout, navigate, and dispatch with arguments',()=>{
        // wrapper.find('button').prop('onClick')();
        wrapper.find('button').simulate('click');
        expect(contextValue.dispatch).toHaveBeenCalled();
        expect(contextValue.dispatch).toHaveBeenCalledWith({'type':types.logout});
        expect(mockNavigate).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/login',{ replace: true });
    })
})