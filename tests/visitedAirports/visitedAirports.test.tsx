import { screen } from "@testing-library/react";
import { render } from "../utils/CustomRender";
import Dashboard from "@/app/dashboard/page";
import { mockUser } from "../mocks/mocks";
import VisitedAirports from "@/app/visitedAirports/page";

test("component renders with the correct username and text", () => {
  render(<VisitedAirports />, {
    user: mockUser,
    userData: {
      email: "test@gmail.com",
      visitedAirports: [
        "Chicago OHare International Airport",
        "Dallas/Fort Worth International Airport",
        "Los Angeles International Airport",
      ],
    },
  });
  expect(screen.getByText("My Visited Airports")).toBeInTheDocument();

  expect(
    screen.getByText("Chicago OHare International Airport")
  ).toBeInTheDocument();
  expect(
    screen.getByText("Dallas/Fort Worth International Airport")
  ).toBeInTheDocument();
  expect(
    screen.getByText("Los Angeles International Airport")
  ).toBeInTheDocument();
});

test("component renders with the correct username and text", () => {
  render(<VisitedAirports />, {
    user: mockUser,
    userData: {
      email: "test@gmail.com",
    },
  });
  expect(
    screen.getByText(
      "You have not added any visited airports yet. To add an Airport, go to your dashboard, click on the Airports button, and add from there."
    )
  ).toBeInTheDocument();
});
