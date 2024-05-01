import { act } from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "../utils/test-utils";
import Dashboard from "../components/Dashboard";

describe("Dashboard component", () => {
  test("renders search input", () => {
    act(() => {
      render(<Dashboard />);
    });
    const searchInput = screen.getByPlaceholderText("Search location");
    expect(searchInput).toBeInTheDocument();
  });

  test("allows searching for locations", async () => {
    render(<Dashboard />);

    // Type 'Nai' into the search input.
    const searchInput = screen.getByPlaceholderText("Search location");
    fireEvent.change(searchInput, { target: { value: "Nai" } });

    // Wait for the asynchronous search to complete.
    await waitFor(() => {
      // Check if the card with the text 'Nairobi' is in the document.
      expect(screen.getByText("Nairobi")).toBeInTheDocument();
    });
  });

  test("renders error message if weather data fetching fails", async () => {
    // Render the component with an error prop.
    act(() => {
      render(<Dashboard />, {
        overrideState: {
          error: {
            message: "Error fetching weather data for all locations",
            code: 0,
          },
        },
      });
    });
    const errorMessage = screen.getByText(
      "Error fetching weather data for all locations"
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
