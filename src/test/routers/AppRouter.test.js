import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";
import { AppRouter } from "../../routers/AppRouter";

describe("AppRouter tests", () => {
    
    test("should show login if it isn't authenticated", () => {
        const contextValue = {
            user:{
                logged: false
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('LoginScreen')
    })
    test('should show marvel component if it is authenticated', () => {
        const contextValue = {
            user:{
                logged: true,
                name: 'John'
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        )
        // console.log(wrapper.html());
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBe(true);// toBeTruthy(); 
    })
})