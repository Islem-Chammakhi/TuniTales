import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MapView from "@/components/ui/map-view";
import { Button } from "@/components/ui/button";
import { monumentCategories } from "@/lib/monuments";
import PatternBackground from "@/components/ui/pattern-background";
import { Helmet } from "react-helmet";
import { getMonuments } from "@/lib/monumentsService";
import { Monument } from "@/types/monument";

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Monuments");
  const [selectedMonumentId, setSelectedMonumentId] = useState<number | null>(
    null
  );
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadMonuments() {
      try {
        setIsLoading(true);
        const data = await getMonuments();
        setMonuments(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load monuments")
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadMonuments();
  }, []);

  return (
    <>
      <Helmet>
        <title>TuniTales</title>
        <meta
          name="description"
          content="Explore Tunisian monuments on an interactive map. Discover the geographical distribution of historical sites, ruins, and architectural masterpieces across Tunisia."
        />
        <meta
          property="og:title"
          content="Interactive Monument Map - TuniTales"
        />
        <meta
          property="og:description"
          content="Explore Tunisian monuments on an interactive map."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="relative">
        <PatternBackground />

        <div className="container mx-auto px-8 lg:px-24 py-16 lg:py-24 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold font-el-messiri text-terracotta mb-4">
              Explore Tunisian Monuments
            </h1>
            <p className="text-lg text-dark-brown/70 max-w-3xl mx-auto">
              Discover the geographical distribution of historical sites, ruins,
              and architectural masterpieces across Tunisia
            </p>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            {isLoading ? (
              <div className="bg-gray-100 h-[600px] rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-terracotta mx-auto mb-4"></div>
                  <p className="text-dark-brown/70">
                    Loading map and monuments...
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 h-[400px] rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-red-500 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">
                    Failed to Load Monuments
                  </h3>
                  <p className="text-dark-brown/70">
                    Unable to load the monument data. Please try again later.
                  </p>
                </div>
              </div>
            ) : (
              <MapView
                monuments={monuments}
                selectedMonumentId={selectedMonumentId}
              />
            )}
          </motion.div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-[#fff8eb] rounded-xl p-6 shadow-md "
          >
            <h2 className="text-xl font-bold font-el-messiri text-terracotta mb-4">
              Map Legend
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <img
                  src="https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
                  alt="Red marker"
                  className="h-6 mr-2"
                />
                <span>Monument Location</span>
              </div>
              <div className="flex items-center">
                <img
                  src="https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png"
                  alt="Blue marker"
                  className="h-6 mr-2"
                />
                <span>Selected Monument</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-terracotta mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                <span>Click markers to see monument details</span>
              </div>
            </div>
          </motion.div>

          {/* Monument List for the Selected Category */}
          {!isLoading && !error && monuments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-bold font-el-messiri text-terracotta mb-4">
                {selectedCategory} ({monuments.length})
              </h2>
              <div className="bg-[#fff8eb] rounded-xl shadow-md overflow-hidden border">
                <div className="max-h-80 overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-sand top-0">
                      <tr>
                        <th className="px-4 py-3 text-left text-dark-brown/80 font-medium">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-dark-brown/80 font-medium hidden md:table-cell">
                          Location
                        </th>
                        <th className="px-4 py-3 text-left text-dark-brown/80 font-medium hidden lg:table-cell">
                          Era
                        </th>
                        <th className="px-4 py-3 text-center text-dark-brown/80 font-medium">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {monuments.map((monument: any) => (
                        <tr
                          key={monument.id}
                          className={`border-t border-gray-200 hover:bg-sand/50 ${
                            selectedMonumentId === monument.id
                              ? "bg-sand/70"
                              : ""
                          }`}
                        >
                          <td className="px-4 py-3">
                            <div className="font-medium text-dark-brown">
                              {monument.name}
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell text-dark-brown/70">
                            {monument.location}
                          </td>
                          <td className="px-4 py-3 hidden lg:table-cell text-dark-brown/70">
                            {monument.era}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-azure-blue border-azure-blue hover:bg-azure-blue hover:text-white"
                              onClick={() => setSelectedMonumentId(monument.id)}
                            >
                              Locate
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
