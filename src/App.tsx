import "regenerator-runtime/runtime";
import { RouterProvider } from "react-router-dom";
import { router } from "routes";
import { MaterialUIControllerProvider } from "context";
// import { SocketProvider } from "context/SocketProvider";

function App() {
  return (
    // <SocketProvider>
    <MaterialUIControllerProvider>
      <RouterProvider router={router} />;
    </MaterialUIControllerProvider>
    // </SocketProvider>
  );
}

export default App;
