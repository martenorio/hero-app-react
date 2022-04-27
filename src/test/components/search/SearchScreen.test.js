import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

const mockNavigate = jest.fn();

//El mock es necesario, por que dentro de la función 
//se ejecuta navigate de  useNavigate que forma parte de 
//react-router-dom y para que la prueba 
//no tenga errores con la funcion de navigate se simula la ejecución
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

describe('Search Screen tests', () => {
    
    test('Should display correctly default values', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Buscar un héroe')
    })
    test('should display batman and set queryString values on input', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen />
            </MemoryRouter>
        )
        expect(wrapper.find('input').prop('value')).toBe('batman');
    })
    test('should show an error if the hero is not found', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchScreen />
            </MemoryRouter>
        );
        expect(wrapper.find('.alert-danger').text().trim()).toBe('No hay resultados : batman123');
    })
    test('should execute navigate to new screen', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        );
        wrapper.find('input').simulate('change',{ 
            target:{ 
                name:'searchText',
                value:'batman'
            }
        });
        wrapper.find('form').prop('onSubmit')({
            preventDefault:()=>{} 
        });
        expect( mockNavigate ).toHaveBeenCalled();
        expect( mockNavigate ).toHaveBeenCalledWith('?q=batman')
    });
})