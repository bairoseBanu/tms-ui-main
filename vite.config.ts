import { UserConfigExport, defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config: UserConfigExport = {
    plugins: [react()],
    resolve: {
      alias: {
        assets: path.resolve(__dirname, "./src/assets"),
        routes: path.resolve(__dirname, "./src/routes"),
        components: path.resolve(__dirname, "./src/components"),
        context: path.resolve(__dirname, "./src/context"),
        layouts: path.resolve(__dirname, "./src/layouts"),
        examples: path.resolve(__dirname, "./src/examples"),
        validations: path.resolve(__dirname, "./src/validations"),
        screens: path.resolve(__dirname, "./src/screens"),
        data: path.resolve(__dirname, "./src/data"),
        type: path.resolve(__dirname, "./src/types"),
        lib: path.resolve(__dirname, "./src/lib"),
        apis: path.resolve(__dirname, "./src/apis"),
        hooks: path.resolve(__dirname, "./src/hooks"),
      },
    },
  };

  // Added to Support Enums in Vite
  //https://stackoverflow.com/questions/74125205/vite-typescript-const-enum-are-not-inlined
  if (command === "build")
    config.define = {
      "TestConstEnum.Test1": 0,
      "TestConstEnum.Test2": 1,
      "TestConstEnum.Test3": 2,
    };
  return config;
});
