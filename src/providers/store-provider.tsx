"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { hydrateCompany } from "@/store/slices/company-slice";
import { hydratePortalSession } from "@/store/slices/portal-session-slice";
import { setSelectedNiche } from "@/store/slices/niche-slice";

function StoreHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(hydrateCompany());
    dispatch(hydratePortalSession());
    const nicheId = store.getState().company.nicheId;
    if (nicheId) dispatch(setSelectedNiche(nicheId));
  }, [dispatch]);
  return children;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StoreHydrator>{children}</StoreHydrator>
    </Provider>
  );
}
