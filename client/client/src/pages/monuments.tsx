import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { monumentCategories } from "@/lib/monuments";
import { getMonuments } from "@/lib/monumentsService";
import MonumentCard from "@/components/ui/monument-card";
import PatternBackground from "@/components/ui/pattern-background";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";
import { Helmet } from "react-helmet";
import { Monument } from "../types/monument";

export default function Monuments() {
  const [selectedCategory, setSelectedCategory] = useState("All Monuments");
  const [visibleCount, setVisibleCount] = useState(6);
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

  const filteredMonuments = monuments
    ? selectedCategory === "All Monuments"
      ? monuments
      : monuments.filter((m: any) => m.category === selectedCategory)
    : [];

  const displayMonuments = filteredMonuments.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <Helmet>
        <title>TuniTales</title>
        <meta
          name="description"
          content="Explore the most iconic landmarks and monuments of Tunisia's rich heritage. Browse our gallery of ancient Roman ruins, Islamic architecture, coastal villages, and historical cities."
        />
        <meta
          property="og:title"
          content="Tunisian Monuments Gallery - TuniTales"
        />
        <meta
          property="og:description"
          content="Explore the most iconic landmarks and monuments of Tunisia's rich heritage."
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
              Discover Tunisian Monuments
            </h1>
            <p className="text-lg text-dark-brown/70 max-w-2xl mx-auto">
              Explore the most iconic landmarks and monuments of Tunisia's rich
              heritage
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            className="flex overflow-x-auto scrollbar-hidden py-4 mb-8 gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>

          {/* Gallery Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <Skeleton className="w-full h-48" />
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <Skeleton className="h-6 w-2/3" />
                      <Skeleton className="h-5 w-1/4 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-5/6 mt-1" />
                    <div className="mt-4 flex justify-between items-center">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center p-8 bg-destructive/10 rounded-lg">
              <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
              <h3 className="text-xl font-bold">Failed to load monuments</h3>
              <p className="text-muted-foreground">Please try again later</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {displayMonuments.map((monument: any) => (
                <motion.div key={monument.id} variants={itemVariants}>
                  <Link href={`/monuments/${monument.id}`}>
                    <MonumentCard monument={monument} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Load More Button */}
          {!isLoading && !error && visibleCount < filteredMonuments.length && (
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                onClick={handleLoadMore}
                className="px-8 py-6 rounded-full bg-sand border-2 border-terracotta text-terracotta font-medium hover:bg-terracotta hover:text-white transition-colors shadow-md flex items-center justify-center mx-auto"
              >
                <span>Load More Monuments</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
