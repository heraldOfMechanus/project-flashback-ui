import {mount, shallow} from "enzyme";
import TriviaCardSet from "../components/TriviaCardSet";
import {Principal} from "../dtos/Principal";
import {TriviaSet} from "../dtos/TriviaSet";

describe('TriviaPageSet Test Suite', () => {

    afterEach(() =>{
        jest.resetAllMocks();
    });

    it('TriviaPageSet renders successfully', () => {

        //Mock up the props
        let mockTriviaCardSets = [new TriviaSet("123", "topic", 5)]
        let mockSetTriviaCardSetsFn = jest.fn();
        let mockCurrentSet = new TriviaSet("123", "topic", 5);
        let mockSetCurrentSetFn = jest.fn();
        let mockUser = new Principal(
            "1234",
            "username",
            "admin",
            "token",
            "firstname",
            "lastname",
            "string@string.com",
            4,
            "reg date"
        );
        let mockDone = false;
        let mockSetDoneFn = jest.fn();

        const wrapper = shallow(<TriviaCardSet triviaCardSets={mockTriviaCardSets} setTriviaCardSets={mockSetTriviaCardSetsFn} currentSet={mockCurrentSet} setCurrentSet={mockSetCurrentSetFn} user={mockUser} done={mockDone} setDone={mockSetDoneFn}/>);

        expect(wrapper).toBeTruthy();

    });

});
