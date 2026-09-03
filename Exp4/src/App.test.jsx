import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeAll, afterAll, afterEach } from "vitest";
import App from "./App";
import { server } from "./mocks/server";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Interactive Calendar", () => {
  test("renders calendar heading", () => {
    render(<App />);

    expect(
      screen.getByText("Interactive Calendar")
    ).toBeInTheDocument();
  });

  test("loads events from API", async () => {
    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText("Team Meeting")
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText("Project Review")
    ).toBeInTheDocument();
  });

  test("renders multiple events", async () => {
    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText("Presentation")
      ).toBeInTheDocument();
    });
  });
});
