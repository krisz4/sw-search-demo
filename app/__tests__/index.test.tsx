import axiosService from "@/apis/axiosService";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import Home from "../index";

// Mock the axiosService instance
jest.mock("@/apis/axiosService", () => {
  const axiosInstanceMock = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  };
  return {
    __esModule: true,
    default: {
      instance: axiosInstanceMock,
    },
    API: {
      get: axiosInstanceMock.get,
      post: axiosInstanceMock.post,
      put: axiosInstanceMock.put,
      patch: axiosInstanceMock.patch,
      delete: axiosInstanceMock.delete,
    },
  };
});

// Mock the useQuery hook from @tanstack/react-query to prevent actual API calls during testing
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(async ({ queryKey, queryFn }) => {
    const result = await queryFn();
    return {
      data: { results: result || { count: 0, results: [] } },
      isFetching: false,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    };
  }),
}));

describe("Home Component", () => {
  beforeEach(() => {
    const axiosInstanceMock = axiosService.instance as jest.Mocked<
      typeof axiosService.instance
    >;
    axiosInstanceMock.get.mockReset();

    axiosInstanceMock.get.mockResolvedValue({
      data: {
        count: 0,
        results: [],
      },
    });
  });

  it("renders the TextInput with correct placeholder", () => {
    const { getByPlaceholderText } = render(<Home />);

    const input = getByPlaceholderText("Type character name...");
    expect(input).toBeTruthy();
  });

  it("updates query state on text change", () => {
    const { getByPlaceholderText } = render(<Home />);

    const input = getByPlaceholderText("Type character name...");
    fireEvent.changeText(input, "Luke Skywalker");

    expect(input.props.value).toBe("Luke Skywalker");
  });

  it("updates query state on text change and calls correct API URL", async () => {
    const { getByPlaceholderText } = render(<Home />);

    const input = getByPlaceholderText("Type character name...");

    // Simulate text change
    fireEvent.changeText(input, "Luke Skywalker");

    // Wait for the debounce period and subsequent API call
    await waitFor(() => {
      expect(axiosService.instance.get).toHaveBeenCalledWith(
        expect.stringContaining("search=Luke+Skywalker")
      );
    });
  });
});
