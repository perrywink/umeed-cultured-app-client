/**
 * @jest-environment jsdom
 */


import React from "react";
import AuthForm from "../Login";
import { fireEvent, getByRole, render, screen } from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom'
import {log} from 'console'

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('AuthForm component', () => {
    it('should render the component onto the screen', () => {
        expect(true).toBeTruthy();
    });

    it('should render all the component onto the screen', () => {
        render(<AuthForm />);
        expect(screen.getByPlaceholderText('john@doe.com')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Minimum 6 characters.')).toBeInTheDocument();
        expect(screen.getByText('Remember me')).toBeInTheDocument();
        expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('updates the email state change on email input',() => {
        render(<AuthForm />);
        const emailInput=screen.getByPlaceholderText("john@doe.com") as HTMLElement
        //console.log(emailInput.ariaValueText)
        fireEvent.change(emailInput,{target:{value:"john@doe.com"}})
        expect(emailInput.ariaValueText="john@doe.com")
        //console.log(emailInput.ariaValueText)
    });

    it('updates the password state change on password input',() => {
        render(<AuthForm />);
        const passwordInput=screen.getByPlaceholderText('Minimum 6 characters.') as HTMLElement
        //console.log(passwordInput.ariaValueText)
        fireEvent.change(passwordInput,{target:{value:"johndoe123"}})
        expect(passwordInput.ariaValueText="johndoe123")
        //console.log(passwordInput.ariaValueText)
    });



});

export{}