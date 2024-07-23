import React from "react";
import { act, render, screen } from "@testing-library/react";
import App from "../Loader";

const mockData = {
  products: [
    {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/1/1.jpg",
        "https://cdn.dummyjson.com/product-images/1/2.jpg",
        "https://cdn.dummyjson.com/product-images/1/3.jpg",
        "https://cdn.dummyjson.com/product-images/1/4.jpg",
        "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      ],
    },
  ],
};
describe("Unity ", () => {
  test("API call fullfilled screen", async () => {
    globalThis.fetch = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => {
          Promise.resolve({
            aaaa: mockData.products,
          });
        },
      });
    });

    await act(async () => render(<App />));
  });

  test("API call rejected screen", async () => {
    globalThis.fetch = jest.fn().mockImplementationOnce(() => Promise.reject());

    await act(async () => render(<App />));
  });
});
