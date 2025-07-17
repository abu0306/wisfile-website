"use client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { FileProvider } from "@/contexts/FileContext";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <FileProvider>{children}</FileProvider>
    </Provider>
  );
}
