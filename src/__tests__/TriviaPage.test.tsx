import {mount, shallow} from "enzyme";

import TriviaPage from "../components/TriviaPage";


describe('TriviaPage Test Suite', () => {

    afterEach(() =>{
        jest.resetAllMocks();
    });

    it('TriviaPage renders successfully', () => {

        //Mock up the props
        let mockCurrentUser = undefined;
        let mockSetCurrentUserFn = jest.fn();
        let mockCurrentSet = undefined;
        let mockSetCurrentSetFn = jest.fn();


        const wrapper = shallow(<TriviaPage currentUser={mockCurrentUser} setCurrentUser={mockSetCurrentUserFn} currentSet={mockCurrentSet} setCurrentSet={mockSetCurrentSetFn} />);

        expect(wrapper).toBeTruthy();

        
    });


});
