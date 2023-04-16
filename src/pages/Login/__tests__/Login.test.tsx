/**
 * @jest-environment jsdom
 */


import React from "react";
import AuthForm from "../Login";
import { fireEvent, getByRole, render, screen, waitFor } from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom';
import {log} from 'console';
import firebase from 'firebase/app';
import { auth } from "../../../config/firebase";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));


jest.mock("../../../config/firebase");
// mock firebase auth functions
// jest.mock("firebase/auth", () => ({
//     signInWithEmailAndPassword: jest.fn(),
//     auth: jest.fn().mockReturnThis(),
// }));

describe('AuthForm component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

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
        const{getByPlaceholderText} = render(<AuthForm />);
        const emailInput= getByPlaceholderText("john@doe.com") as HTMLInputElement;
        fireEvent.change(emailInput, {target: {value: "john@doe.com"}});
        expect(emailInput.value).toBe("john@doe.com");
    });

    it('updates the password state change on password input',() => {
        const{getByPlaceholderText} = render(<AuthForm />);
        const passwordInput= getByPlaceholderText('Minimum 6 characters.') as HTMLInputElement;
        fireEvent.change(passwordInput, {target: {value: "johndoe123"}});
        expect(passwordInput.value).toBe("johndoe123");

    });

});

export{}