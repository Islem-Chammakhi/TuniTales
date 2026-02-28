import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function PatternSection() {
  return (
    <section className="lg:px-14 py-16 bg-white relative">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-el-messiri text-terracotta mb-6">
              Tunisian Patterns & Heritage
            </h2>
            <p className="text-lg text-dark-brown/80 mb-8">
              Tunisia's rich cultural heritage is reflected in its beautiful
              traditional patterns and mosaics. These designs tell stories of
              the many civilizations that have shaped Tunisia's identity over
              millennia.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <motion.div
                whileHover={{ borderColor: "#D97706" }}
                transition={{ duration: 0.3 }}
                className="bg-sand rounded-lg p-6 border border-transparent"
              >
                <div className="bg-terracotta/10 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-terracotta"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg font-el-messiri text-terracotta mb-1">
                  Geometric Patterns
                </h3>
                <p className="text-sm text-dark-brown/70">
                  Reflect Islamic artistic tradition with complex mathematical
                  designs.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ borderColor: "#3B82F6" }}
                transition={{ duration: 0.3 }}
                className="bg-sand rounded-lg p-6 border border-transparent"
              >
                <div className="bg-azure-blue/10 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-azure-blue"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg font-el-messiri text-azure-blue mb-1">
                  Colorful Mosaics
                </h3>
                <p className="text-sm text-dark-brown/70">
                  Roman and Byzantine influence seen in detailed tilework.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ borderColor: "#4B5563" }}
                transition={{ duration: 0.3 }}
                className="bg-sand rounded-lg p-6 border border-transparent"
              >
                <div className="bg-olive-green/10 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-olive-green"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg font-el-messiri text-olive-green mb-1">
                  Floral Motifs
                </h3>
                <p className="text-sm text-dark-brown/70">
                  Stylized representations of natural elements and plants.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ borderColor: "#D97706" }}
                transition={{ duration: 0.3 }}
                className="bg-sand rounded-lg p-6 border border-transparent"
              >
                <div className="bg-terracotta/10 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-terracotta"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg font-el-messiri text-terracotta mb-1">
                  Berber Symbols
                </h3>
                <p className="text-sm text-dark-brown/70">
                  Ancient indigenous designs with deep cultural meaning.
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="columns-2 gap-4 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Pattern 4: Carved wooden door */}
            <motion.img
              src="https://www.traveladventures.org/countries/tunisia/images/tunisian-doors01.jpg"
              alt="Intricate carved wooden door with Tunisian patterns"
              className="rounded-lg shadow-md w-full h-auto hover-card"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            />

            {/* Pattern 2: Ceramic pottery */}
            <motion.img
              src="https://i.pinimg.com/originals/5b/89/a9/5b89a95a5249fab91715a2f61efe64c7.jpg"
              alt="Colorful ceramic pottery with traditional Tunisian designs"
              className="rounded-lg shadow-md w-full h-auto mt-8 hover-card"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            />

            {/* Pattern 3: Tunisian zellige tilework */}
            <motion.img
              src="https://tunisie.co/uploads/images/content/zellige-120421-1.jpg"
              alt="Detailed Tunisian zellige tilework"
              className="rounded-lg shadow-md w-full h-auto mt-8 hover-card"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            />

            {/* Pattern 1: Traditional Tunisian mosaic pattern */}
            <motion.img
              src="https://i.etsystatic.com/25539663/r/il/104f65/3174558696/il_fullxfull.3174558696_6qaa.jpg"
              className="rounded-lg shadow-md w-full h-auto hover-card"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
