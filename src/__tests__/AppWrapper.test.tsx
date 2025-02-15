import { render } from "@testing-library/react"
import { AppWrapper } from "../AppWrapper"
import { vi, describe, it, expect } from "vitest"

vi.mock("./App", () => ({
  __esModule: true,
  default: () => <div>Welcome to Event Planner</div>,
}))

describe("AppWrapper", () => {
  it("renders App component within BrowserRouter", () => {
    const { getByText } = render(<AppWrapper />)
    expect(getByText("Welcome to Event Planner")).toBeInTheDocument()
  })
})
