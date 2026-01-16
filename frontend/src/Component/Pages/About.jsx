import React from "react";
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();
  const offers = t("about.offers", { returnObjects: true });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pt-20">

      {/* Hero */}
      <section className="bg-white py-16 text-center shadow-sm">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          {t("about.title")}
        </h1>
        <p className="max-w-2xl mx-auto text-lg">
          {t("about.subtitle")}
        </p>
      </section>

      {/* Description */}
      <section className="py-12 px-6 md:px-20">
        <p className="max-w-3xl mx-auto text-lg text-center leading-relaxed">
          {t("about.description")}
        </p>
      </section>

      {/* Mission */}
      <section className="bg-blue-50 py-12 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">
          {t("about.missionTitle")}
        </h2>
        <p className="max-w-2xl mx-auto text-lg">
          {t("about.mission")}
        </p>
      </section>

      {/* What We Offer */}
      <section className="py-12 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
          {t("about.offerTitle")}
        </h2>

        {Array.isArray(offers) && (
          <ul className="max-w-2xl mx-auto space-y-3 text-lg list-disc list-inside">
            {offers.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="bg-blue-50 py-12 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">
          {t("about.whyTitle")}
        </h2>
        <p className="max-w-3xl mx-auto text-lg">
          {t("about.whyText")}
        </p>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">
          {t("about.joinTitle")}
        </h2>
        <p className="max-w-2xl mx-auto text-lg mb-8">
          {t("about.joinText")}
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition">
          {t("about.button")}
        </button>
      </section>

    </div>
  );
}

export default About;
