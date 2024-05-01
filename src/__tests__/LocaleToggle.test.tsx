import { act } from "react";
import { render, fireEvent, screen } from "../utils/test-utils";
import LocaleToggle from "../components/LocaleToggle";

const mockToggleLocale = jest.fn();
jest.mock("../contexts/ConfigContext", () => ({
  useConfig: () => ({
    locale: "en-US",
    toggleLocale: mockToggleLocale,
  }),
}));

describe("LocaleToggle component", () => {
  test("renders correctly", () => {
    render(<LocaleToggle />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  test("switches locale when clicked", () => {
    act(() => {
      render(<LocaleToggle />);
    });
    const switchComponent = screen.getByRole("switch");
    fireEvent.click(switchComponent);
    expect(mockToggleLocale).toHaveBeenCalled();
  });
});
