import { RouterProvider } from "react-router";
import { router } from "./routes";
import { BleMicProvider } from "./contexts/BleMicContext";

export default function App() {
  return (
    <BleMicProvider>
      <RouterProvider router={router} />
    </BleMicProvider>
  );
}
