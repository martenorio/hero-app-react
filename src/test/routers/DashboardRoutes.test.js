import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../auth/authContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";


describe('DashboardRoutes tests', () => {
    const contextValue = {
        user: {
            logged:true,
            name: 'John'
        }
    }

    test('should display correctly - Marvel', () => {
        const wrapper = mount( 
            <AuthContext.Provider value={contextValue} >
                <MemoryRouter initialEntries={ ['/'] }>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('John')  
        expect(wrapper.find('h1').text().trim()).toBe('Marvel');
    })
    test('should display correctly - DC', () => {
        const wrapper = mount( 
            <AuthContext.Provider value={contextValue} >
                <MemoryRouter initialEntries={ ['/dc'] }>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('DCscreen');
    })
})