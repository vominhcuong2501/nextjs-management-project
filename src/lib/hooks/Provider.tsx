"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { PropsWithChildren } from "react";
import { useState } from "react";

function Providers({ children }: PropsWithChildren) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}

export default Providers;
