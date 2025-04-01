import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import bgImage from '../assets/bgimage.jpg';
import "../index.css";
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <div className='relative'>

      {/* Hero Section */}
      <section
        className="text-white body-font bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container relative z-10 mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-5xl text-4xl mb-6 font-bold">
              Aahara: Share More, Waste Less
            </h1>
            <p className="mb-8 leading-relaxed text-xl text-center md:text-left">
              Be the reason someone doesn’t sleep hungry. Share surplus food with nearby people in need, and help build a compassionate community.
            </p>
            <Button variant='contained' color='success' onClick={() => navigate('/login')}>
            Get Started
          </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="text-gray-600 body-font relative z-10">
        <div className="container px-5 py-20 mx-auto">
          <h1 className="text-white text-4xl pb-10 font-bold">How It Works</h1>
          <div className="flex flex-wrap -m-4">
            {[
              {
                title: "Post Surplus Food",
                desc: "Got extra meals or groceries? Just list them on Aahara and let nearby people in need benefit.",
              },
              {
                title: "Connect with Nearby Users",
                desc: "Your food becomes visible to users around you. Let those who need it request and connect with you.",
              },
              {
                title: "Handover with Kindness",
                desc: "Once approved, hand over the food in a simple, safe, and friendly way. Every bit helps!",
              }
            ].map((card, idx) => (
              <div key={idx} className="p-4 md:w-1/3">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  {/* Image removed */}
                  <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">STEP {idx + 1}</h2>
                    <h1 className="title-font text-xl font-semibold text-white mb-3">{card.title}</h1>
                    <p className="leading-relaxed mb-3">{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 text-gray-600 body-font">
        <div className="container px-5 py-20 mx-auto">
          <h1 className="text-white text-4xl pb-10 font-bold">Benefits of Food Sharing</h1>
          <div className="flex flex-wrap -m-4">
            {[
              {
                title: "Reduce Waste, Help Others",
                desc: "Every shared meal reduces landfill burden and fills an empty stomach. Make every bite count.",
              },
              {
                title: "Build a Kind Community",
                desc: "Aahara creates a ripple of generosity. Connect with locals and grow a compassionate network.",
              },
              {
                title: "Track Your Impact",
                desc: "See the number of meals you’ve shared, people you’ve helped, and your environmental impact.",
              }
            ].map((card, idx) => (
              <div key={idx} className="p-4 lg:w-1/3">
                <div
                  className="h-full px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative"
                  style={{ backgroundColor: "rgba(134, 239, 172, 0.8)" }}
                >
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-700 mb-1">BENEFIT {idx + 1}</h2>
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{card.title}</h1>
                  <p className="leading-relaxed mb-3 text-gray-800">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="text-gray-600 body-font relative z-10">
        <div className="container px-5 py-20 mx-auto">
          <h1 className="text-white text-4xl pb-10 font-bold">What People Say</h1>
          <div className="flex flex-wrap -m-4">
            {[
              {
                name: "Anita Joshi",
                role: "Student, Mumbai",
                img: "https://randomuser.me/api/portraits/women/65.jpg",
                quote: "Aahara helped me find food during a tough time. I’m so thankful for this platform and the kind-hearted people using it.",
              },
              {
                name: "Ramesh Iyer",
                role: "IT Professional, Bangalore",
                img: "https://randomuser.me/api/portraits/men/75.jpg",
                quote: "I used to throw away leftovers often. Now I share it on Aahara, and it feels great knowing I’m helping someone.",
              }
            ].map((t, idx) => (
              <div key={idx} className="p-4 md:w-1/2 w-full">
                <div className="h-full bg-gray-100 p-8 rounded">
                  <p className="leading-relaxed mb-6">"{t.quote}"</p>
                  <div className="inline-flex items-center">
                    <img alt="testimonial" src={t.img} className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex flex-col pl-4">
                      <span className="title-font font-medium text-gray-900">{t.name}</span>
                      <span className="text-gray-500 text-sm">{t.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
