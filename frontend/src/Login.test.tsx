import axios from "axios";

import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Login, LOGIN_URL } from "./Login";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedPost = mockedAxios.post as jest.Mock;

describe("Login component", () => {
  const setLoggedInMock = jest.fn();

  it("should render the form correctly", () => {
    render(<Login setLoggedIn={setLoggedInMock} />);

    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should show error message when username is not provided", async () => {
    render(<Login setLoggedIn={setLoggedInMock} />);
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText(
      "Username and password are required!"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("should show error message when password is not provided", async () => {
    render(<Login setLoggedIn={setLoggedInMock} />);
    const usernameInput = screen.getByLabelText("Username:");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText(
      "Username and password are required!"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("should call setLoggedIn on successful login", async () => {
    mockedPost.mockReturnValueOnce({ data: {} });

    render(<Login setLoggedIn={setLoggedInMock} />);
    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(LOGIN_URL, {
        username: "testuser",
        password: "testpassword",
      });
      expect(setLoggedInMock).toHaveBeenCalledWith(true);
    });
  });

  it("should show error message on failed login", async () => {
    const errorMessage = "Invalid username or password";
    mockedPost.mockRejectedValueOnce({
      response: { data: { error: errorMessage } },
    });
    mockedAxios.isAxiosError.mockReturnValueOnce(true);

    render(<Login setLoggedIn={setLoggedInMock} />);
    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    const errorMessageElement = await screen.findByText(errorMessage);
    expect(errorMessageElement).toBeInTheDocument();
  });
});
