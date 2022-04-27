import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { mount } from 'enzyme';
import { HeroScreen } from '../../../components/hero/HeroScreen';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Hero Screen test', () => {
    test("shouldn't show HeroScreen if don't have a hero in URL", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path="/hero" element={<HeroScreen />} />
                    <Route path="/" element={ <h1>No hero page</h1> } />
                </Routes>
            </MemoryRouter>
        )
        expect(wrapper.find('h1').text().trim()).toBe('No hero page');
    });
    
    test("should show HeroScreen if param exist", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={<HeroScreen />} />
                    <Route path="/" element={ <h1>No hero page</h1> } />
                </Routes>
            </MemoryRouter>
        )
        expect(wrapper.find('.row').exists()).toBe(true);
    })

    test("should return previous screen", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={<HeroScreen />} />
                </Routes>
            </MemoryRouter>
        )
        wrapper.find('button').prop('onClick')();
        expect( mockNavigate ).toHaveBeenCalledWith(-1);
    })

    test("should show 'no hero page' if hero param not exist", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider654564']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={<HeroScreen />} />
                    <Route path="/" element={ <h1>No hero page</h1> } />
                </Routes>
            </MemoryRouter>
        )
        console.log(wrapper.html());
        expect(wrapper.text()).toBe('No hero page');
    })

});