import RegisterComponent from "../components/RegisterComponent";
import {shallow} from "enzyme";
import {Typography} from "@material-ui/core";
import React from "react";
import ErrorMessage from "../components/ErrorMessage";
import {registerNewUser} from "../remote/user-service";


describe('RegisterComponent Test Suite', ()=>{


    afterEach(() => {

    })

    it('Register Component renders successfully', () =>{
        let mockUser = undefined;

        const wrapper = shallow(<RegisterComponent currentUser={mockUser}/>);


        expect(wrapper).toBeTruthy()



    })


    it("Renders the Register header", () =>{
        let mockUser = undefined;

        const wrapper = shallow(<RegisterComponent currentUser={mockUser}/>);

        const expectedHeader = <Typography variant='h2'>Register Page</Typography>

        expect(wrapper.contains(expectedHeader)).toEqual(true);


    });


    it("Register fields are empty", ()=>{
        let mockUser = undefined;

        const wrapper = shallow(<RegisterComponent currentUser={mockUser}/>);
        let firstNameInputWrapper = wrapper.find('#firstName-input');
        let lastNameInputWrapper = wrapper.find('#lastName-input');
        let emailInputWrapper = wrapper.find('#email-input');
        let usernameInputWrapper = wrapper.find('#username-input');
        let passwordInputWrapper = wrapper.find('#password-input');

        expect(firstNameInputWrapper.text()).toBe('');
        expect(lastNameInputWrapper.text()).toBe('');
        expect(emailInputWrapper.text()).toBe('');
        expect(usernameInputWrapper.text()).toBe('');
        expect(passwordInputWrapper.text()).toBe('');

    });


    it("Clicking register button with missing form field values desplays error message", ()=>{
        let mockUser = undefined;

        const wrapper = shallow(<RegisterComponent currentUser={mockUser}/>);

        let registerButtonWrapper = wrapper.find('#register-button').at(0);
        registerButtonWrapper.simulate('click')


        let expectedErrorComponent = <ErrorMessage errorMessage={"You must fill in all the fields."}/>;
        expect(wrapper.contains(expectedErrorComponent)).toBe(true);


    });


    it('Clicking register button with valid values attempts to login', ()=>{
        let mockUser = undefined;

        const wrapper = shallow(<RegisterComponent currentUser={mockUser}/>);

        let firstNameInput = wrapper.find('#firstName-input').at(0).find('input');
        let lastNameInput =  wrapper.find('#lastName-input').at(0).find('input');
        let emailInput =  wrapper.find('#email-input').at(0).find('input');
        let usernameInput =  wrapper.find('#username-input').at(0).find('input');
        let passwordInput =  wrapper.find('#password-input').at(0).find('input');


        firstNameInput.simulate('change', {target: {name: 'firstName-input', value: 'test-firstName'}});
        lastNameInput.simulate('change', {target: {name: 'lastName-input', value: 'test-lastName'}});
        emailInput.simulate('change', {target: {name: 'email-input', value: 'test-email'}});
        usernameInput.simulate('change', {target: {name: 'username-input', value: 'test-username'}});
        passwordInput.simulate('change', {target: {name: 'password-input', value: 'test-password'}});

        console.log(firstNameInput.text)

        let loginButtonWrapper = wrapper.find('#regiter-button').at(0);
        loginButtonWrapper.simulate('click')

        expect(registerNewUser).toBeCalledTimes(1);


    });



});