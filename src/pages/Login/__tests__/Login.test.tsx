/**
 * @jest-environment jsdom
 */


import React from "react";
import AuthForm from "../Login";
import { getByRole, render, screen } from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom'

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
        const { getByLabelText, getByText } = render(<AuthForm />);
        expect(screen.getByPlaceholderText('john@doe.com')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Minimum 6 characters.')).toBeInTheDocument();
        expect(screen.getByText('Remember me')).toBeInTheDocument();
        expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

});

export{}