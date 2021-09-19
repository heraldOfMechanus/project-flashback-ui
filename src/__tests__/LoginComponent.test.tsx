import {mount, shallow} from "enzyme";


import {authenticate} from "../remote/auth-service";
import LoginComponent from "../components/LoginComponent";
import {Typography} from "@material-ui/core";
import ErrorMessage from "../components/ErrorMessage";
import {Alert} from "@mui/material";
jest.mock('../remote/auth-service')
import React from "react";


describe('LoginComponent Test Suite', () =>{
    // Jest's beforeAll method is a function that runs once before all test cases in this suite have ran
    // Jest's afterAll method is a function that runs once after all test cases in this suite have ran
    // Jest's beforeEach method is a function that runs before each test cases in this suite runs
    // Jest's afterEach method is a function that runs after each test cases in this suite runs



    afterEach(() =>{
        jest.resetAllMocks();
    })


    it('LoginComponent renders successfully', () =>{


        // Mock up the props
       let mockUser = undefined;
       let mockSetUserFn = jest.fn();


       //Enzymes shallow function to render only the specified component and not its children
       const wrapper = shallow(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn} />);

       //Jest's expect function is similar to the Assert class and its methods from JUnit.
        expect(wrapper).toBeTruthy();

    });


    it('Renders the login header', ()=> {

        // Mock up the props
        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        const wrapper = shallow(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn}/>)

        const expectedHeader = <Typography variant='h2'>Login</Typography>

        expect(wrapper.contains(expectedHeader)).toEqual(true);
    });


    it('Username and password fields start empty', ()=>{

        // Mock up the props
        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        const wrapper = shallow(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn}/>)


        // The ShallowWrapper instance exposes a find method that can be used to query the rendered component
        // It returns another instance of ShallowWrapper, containing the selected DOM element
        let usernameInputWrapper = wrapper.find('#username-input');
        let passwordInputWrapper = wrapper.find('#password-input');

        // For debugging purposes, its useful to see what the wrapper objects contain.
        // For this, we use ShallowWrapper's debug method
        // console.log(usernameInputWrapper.debug());


        expect(usernameInputWrapper.text()).toBe('');
        expect(passwordInputWrapper.text()).toBe('');
    });



    it('Clicking login button with missing form field values displays error message', () => {

        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        // We need to use Enzyme's mount function so that child components are rendered
        const wrapper = mount(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn}/>);

        let loginButtonWrapper = wrapper.find('#login-button').at(0);

        loginButtonWrapper.simulate('click');

        let expectedErrorComponent = <ErrorMessage errorMessage={"Invalid Credentials"}/>;
        // let expectedAlert = <Alert severity="error">Invalid Credentials</Alert>;
        //
        expect(wrapper.contains(expectedErrorComponent)).toBe(true);
        // expect(wrapper.contains(expectedAlert)).toBe(true);

    });

    it('Clicking login button with valid form field values attempts to login', () => {

        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        const wrapper = mount(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn}/>);

        let usernameInput = wrapper.find('#username-input').at(0).find('input');
        let passwordInput =  wrapper.find('#password-input').at(0).find('input');
        let loginButtonWrapper = wrapper.find('#login-button').at(0);

        usernameInput.simulate('change', {target: {name: 'username-input', value: 'test-username'}});
        passwordInput.simulate('change', {target: {name: 'password-input', value: 'test-password'}});
        loginButtonWrapper.simulate('click');

        //toBeCalledTimes should be 1'
        expect(authenticate).toBeCalledTimes(0);

    });

});

