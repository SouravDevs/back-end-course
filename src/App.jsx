import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DirectoryView from "./directoryView";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <DirectoryView />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />
};

export default App;
