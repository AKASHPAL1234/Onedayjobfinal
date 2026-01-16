import React, { useState } from "react";

// OneDayJob - Services Section (Bilingual: English + Hindi)
// Usage: import ServicesSection from './ServicesSection'; then <ServicesSection />

export default function ServicesSection({ className = "" }) {
  const [lang, setLang] = useState("en"); // en or hi

  const content = {
    en: {
      heading: "Our Services",
      sub: "Fast. Verified. Reliable — hiring simplified for employers and job seekers.",
      btn: "Learn more",
      cta: "Post a Job — Get Hired in 24h",
      services: [
        {
          id: 1,
          title: "Job Posting & Hiring",
          desc: "Post jobs and reach verified candidates instantly. Create listings in minutes and manage applicants from one dashboard.",
        },
        {
          id: 2,
          title: "Candidate Search",
          desc: "Browse curated profiles, filter by skills/location and connect directly — no middlemen, no delays.",
        },
        {
          id: 3,
          title: "KYC & Verified Profiles",
          desc: "All users go through KYC and verification — trust every hire and application you receive.",
        },
        {
          id: 4,
          title: "Instant Notifications",
          desc: "Get real-time alerts for matches, interviews and messages so you never miss an opportunity.",
        },
        {
          id: 5,
          title: "One-Day Hiring Guarantee",
          desc: "We aim to close the hiring loop within 24 hours with our accelerated matching and screening process.",
        },
        {
          id: 6,
          title: "Easy & Secure Platform",
          desc: "Mobile-first design, secure payments and encrypted data — built to scale with your business.",
        },
      ],
    },
    hi: {
      heading: "हमारी सेवाएँ",
      sub: "तेज़. भरोसेमंद. सुरक्षित — नियोक्ताओं और नौकरी तलाशने वालों के लिए आसान हायरिंग।",
      btn: "और जानें",
      cta: "जॉब पोस्ट करें — 24 घंटे में हायर करें",
      services: [
        {
          id: 1,
          title: "जॉब पोस्टिंग और हायरिंग",
          desc: "जॉब पोस्ट करें और तुरंत verified उम्मीदवारों तक पहुँचें। कुछ मिनटों में लिस्टिंग बनाएं और सभी आवेदकों को एक ही डैशबोर्ड से मैनेज करें।",
        },
        {
          id: 2,
          title: "उम्मीदवार खोज",
          desc: "प्रोफाइल ब्राउज़ करें, स्किल्स/लोकेशन के अनुसार फ़िल्टर करें और सीधे कनेक्ट करें — बिना किसी देरी के।",
        },
        {
          id: 3,
          title: "KYC और सत्यापित प्रोफाइल",
          desc: "सभी यूज़र्स का KYC और verification किया जाता है — जिससे हर हायरिंग और आवेदन पर भरोसा कर सकें।",
        },
        {
          id: 4,
          title: "तुरंत नोटिफिकेशन",
          desc: "जॉब, इंटरव्यू और मैसेज के लिए रियल-टाइम अलर्ट पाएं ताकि कोई अवसर न छूटे।",
        },
        {
          id: 5,
          title: "वन-डे हायरिंग गारंटी",
          desc: "हमारा लक्ष्य है कि हायरिंग प्रोसेस 24 घंटे में पूरा हो जाए हमारे तेज़ matching और screening सिस्टम की मदद से।",
        },
        {
          id: 6,
          title: "आसान और सुरक्षित प्लेटफॉर्म",
          desc: "मोबाइल-फ़र्स्ट डिज़ाइन, सुरक्षित भुगतान और एन्क्रिप्टेड डेटा — आपके बिज़नेस के साथ स्केल होने के लिए बनाया गया।",
        },
      ],
    },
  };

  const active = content[lang];

  return (
    <section className={`bg-white py-12 sm:py-16 mt-9 ${className}`} aria-label="OneDayJob Services">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-center flex-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold">{active.heading}</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">{active.sub}</p>
          </div>
          <div>
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="ml-4 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {lang === "en" ? "हिन्दी" : "English"}
            </button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {active.services.map((s) => (
            <article key={s.id} className="group bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-600">{s.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{s.desc}</p>
              <div className="mt-auto">
                <button className="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                  {active.btn}
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="/post-job" className="inline-block px-6 py-3 rounded-full border border-indigo-600 bg-indigo-50 text-indigo-700 font-medium hover:bg-indigo-600 hover:text-white transition-colors">
            {active.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
