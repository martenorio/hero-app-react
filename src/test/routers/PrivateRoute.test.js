import { AuthContext } from "../../auth/authContext";
import { mount } from "enzyme";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../../routers/PrivateRoute";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Saliendo...</span>
}))

describe('PrivateRoute tests',()=>{
    
    Storage.prototype.setItem = jest.fn();

    test('Should display the component if it has been authenticated and save localstorage',()=>{
        const contextValue = {
            user: {
                logged:true,
                name: 'John'
            }
        };
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={ ['/']}>
                    <PrivateRoute>
                        <h1>Private component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(wrapper.text().trim()).toBe('Private component');
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath','/');
    });
    test("Should block the component if it hasn't been authenticated",()=>{
        const contextValue = {
            user: {
                logged:false
            }
        };
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={ ['/']}>
                    <PrivateRoute>
                        <h1>Private component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(wrapper.text().trim()).toBe('Saliendo...');
    });
})