


import React from 'react';
import { ReactTyped } from "react-typed";
import { useTranslation } from "react-i18next"; // ✅ import i18n

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-10 mt-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className='mt-10'>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            {t("hero.title")} <ReactTyped
              className='text-blue-700'
              strings={["Day","Week","Month","Year"]}
              typeSpeed={110}
              loop
            /> <br />
            <span className="text-blue-600">
              {t("hero.subtitle")} <ReactTyped
                className='text-black'
                strings={["Today","Weekly","Monthly","Yearly"]}
                typeSpeed={120}
                loop
              />
            </span>
          </h1>

          <p className="text-black-600 mt-4 text-lg font-semibold">
            {t("hero.description")}
          </p>

      

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white border rounded-xl p-4 shadow-sm text-center">
              <p className="font-semibold text-gray-800">{t("hero.features.instant")}</p>
              <p className="text-gray-500 text-sm">{t("hero.features.instantDesc")}</p>
            </div>
            <div className="bg-white border rounded-xl p-4 shadow-sm text-center">
              <p className="font-semibold text-gray-800">{t("hero.features.daily")}</p>
              <p className="text-gray-500 text-sm">{t("hero.features.dailyDesc")}</p>
            </div>
            <div className="bg-white border rounded-xl p-4 shadow-sm text-center">
              <p className="font-semibold text-gray-800">{t("hero.features.fast")}</p>
              <p className="text-gray-500 text-sm">{t("hero.features.fastDesc")}</p>
            </div>
          </div>
        </div>

        {/* Right Side Illustration */}
        <div className="bg-gradient-to-b from-white to-blue-50 rounded-[3rem] shadow-2xl shadow-blue-700/60 ring-1 ring-blue-500 flex items-center justify-center min-h-[300px] relative">
          <img src="/eee.jpg" className="rounded-[2rem]" />
        </div>

      </div>
    </section>
  );
}

export default Hero;
