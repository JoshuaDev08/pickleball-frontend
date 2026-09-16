import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import api from "../services/api";

export type CourtStatus = "available" | "occupied" | "reserved" | "maintenance";

export type Court = {
  id: number;
  name: string;
  type: string;
  rate: number;
  description?: string | null;
  features: string[];
  image_key?: string | null;
  image_url?: string | null;
  status: CourtStatus;
  availability_label: string;
};

type CourtContextType = {
  courts: Court[];
  loading: boolean;
  error: string | null;
  refreshCourts: () => Promise<void>;
};

const CourtContext = createContext<CourtContextType | undefined>(undefined);

type CourtProviderProps = {
  children: ReactNode;
};

export const CourtProvider = ({ children }: CourtProviderProps) => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCourts = useCallback(async () => {
    try {
      setError(null);

      const response = await api.get("/courts/availability");

      setCourts(response.data.data);
    } catch (error: any) {
      console.error("Failed to load court availability:", error);

      console.error("Status:", error.response?.status);
      console.error("Response:", error.response?.data);
      console.error("URL:", error.config?.url);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourts();
  }, [loadCourts]);

  const value = useMemo(
    () => ({
      courts,
      loading,
      error,
      refreshCourts: loadCourts,
    }),
    [courts, loading, error, loadCourts]
  );

  return (
    <CourtContext.Provider value={value}>{children}</CourtContext.Provider>
  );
};

export const useCourts = () => {
  const context = useContext(CourtContext);

  if (!context) {
    throw new Error("useCourts must be used inside a CourtProvider");
  }

  return context;
};
