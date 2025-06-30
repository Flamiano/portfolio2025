"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code,
  Layout,
  Rocket,
  Edit3,
  Wrench,
  MonitorSmartphone,
  Zap,
  PlugZap,
  DatabaseZap,
} from "lucide-react";

const OfferingsPage = () => {
  const offersRef = useRef(null);
  const isInView = useInView(offersRef, { once: false, amount: 0.2 });

  const offers = [
    {
      title: "Web Development",
      icon: <Code className="text-[#5e17eb] w-10 h-10 md:w-14 md:h-14" />,
      description:
        "Responsive websites using React, Next.js, PHP, and TailwindCSS built for performance and scalability.",
    },
    {
      title: "UI/UX Design",
      icon: <Layout className="text-[#5e17eb] w-10 h-10 md:w-14 md:h-14" />,
      description:
        "Clean, intuitive interfaces that improve user engagement and usability across devices.",
    },
    {
      title: "Deployment and Optimization",
      icon: <Rocket className="text-[#5e17eb] w-10 h-10 md:w-14 md:h-14" />,
      description:
        "Optimized web deployment with fast load times, caching, SEO, and mobile-first strategies.",
    },
    {
      title: "Content Editing",
      icon: <Edit3 className="text-[#5e17eb] w-10 h-10 md:w-14 md:h-14" />,
      description:
        "Proofreading and refining content for blogs, web pages, and UX copy to sound polished and professional.",
    },
    {
      title: "Maintenance and Support",
      icon: <Wrench className="text-[#5e17eb] w-10 h-10 md:w-14 md:h-14" />,
      description:
        "Keep your site secure and up to date with bug fixes, patches, feature improvements, and support.",
    },
    {
      title: "Responsive Testing",
      icon: (
        <MonitorSmartphone className="text-[#5e17eb] w-10 h-10 md:w-14 md:h-14" />
      ),
      description:
        "Ensure compatibility across all major devices and browsers through comprehensive testing.",
    },
    {
      title: "Website Strategy and Consulting",
      icon: <Zap className="text-[#5e17eb] w-10 h-10 md:w-14 md:h-14" />,
      description:
        "Get guidance on structuring your website with strong content flow, user journeys, and conversion-focused layout.",
    },
    {
      title: "Video Editing",
      icon: <PlugZap className="text-[#5e17eb] w-10 h-10 md:w-14 md:h-14" />,
      description:
        "Transform raw footage into engaging content with professional cuts, transitions, effects, and sound design.",
    },
    {
      title: "Database Management",
      icon: (
        <DatabaseZap className="text-[#5e17eb] w-10 h-10 md:w-14 md:h-14" />
      ),
      description:
        "MySQL and MongoDB data structure design, optimization, and reliable backup handling for smooth operations.",
    },
  ];

  return (
    <section
      className="w-full px-4 md:px-10 py-30 max-w-7xl lg:max-w-full mx-auto"
      id="offerings"
      ref={offersRef}
    >
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-4 text-[#5e17eb] font-semibold text-sm uppercase tracking-wider">
          <span>OFFERS</span>
          <div className="flex-1 border-t border-[#5e17eb]/40" />
        </div>
      </motion.div>

      {/* Offers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:max-w-7xl mx-auto">
        {offers.map((offer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="group flex gap-5 items-start border border-[#5e17eb] rounded-xl p-6 bg-white hover:bg-[#f8f5ff] hover:shadow-xl transition-all duration-300"
          >
            <div className="shrink-0">{offer.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {offer.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {offer.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call-to-Action */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mt-20 text-center"
      >
        <h4 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] font-extrabold italic text-[#5e17eb] leading-tight mx-auto">
          Let’s build something impactful together
        </h4>
      </motion.div>
    </section>
  );
};

export default OfferingsPage;
