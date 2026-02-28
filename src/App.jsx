import React from 'react'
import Navbar from '../components/navbar/navbar'
import BlurText from "../components/BlurText/BlurText";
import './App.css'
// import LightPillar from '../components/LightPillar/LightPillar';
import TiltedCard from '../components/TiltedCard/TiltedCard';
import profilePhoto from "./assets/Profile-photo.jpeg";
import { ArrowUpRight, Mouse, } from 'lucide-react';
import DarkVeil from '../components/DarkVeil/DarkVeil';
import InfiniteMenu from '../components/InfiniteMenu/InfiniteMenu';
import Beams from '../components/Beams/Beams';
import FMGG from './assets/FMGG-Logo-Full-Color-Square.png';
import Bavts from './assets/Bavts Icon.png';
import { useState } from 'react';

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};


function App() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const items = [
    {
      image: FMGG,
      link: 'https://freezerministry.org/',
      title: 'Freezer Ministry',
      description: 'Lead Developer'
    },
    {
      image: Bavts,
      link: 'https://bethlehemavts.org/',
      title: 'Bethlehem AVTS',
      description: 'Developer'
    },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section>
        <Navbar />

        
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: '0', pointerEvents: 'none', zIndex: 0 }}>
          <DarkVeil
            hueShift={316}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={1.3}
            scanlineFrequency={0.5}
            warpAmount={0}
          />
        </div>
      </section>

      <section className='section main relative z-20 md:static md:z-0'>
        <BlurText
          text="Trust and Learn."
          delay={300}
          animateBy="words"
          direction="bottom"
          onAnimationComplete={handleAnimationComplete}
          className="text-3xl sm:text-4xl md:text-5xl mb-8 text-center px-4"
        />

        <a href="/html/previous.html" className='group transition'>
          Past Projects
          <ArrowUpRight className='group-hover:stroke-purple-800 transition' />
        </a>

        <Mouse size={40} className='absolute bottom-20 hidden sm:block' />
      </section>

      {/* ── About ── */}
      <section className="flex flex-col md:flex-row px-6 md:px-[2vw] pt-20 md:pt-30 justify-center gap-12 md:gap-24 items-center">
        <div className='max-w-[1280px] w-full flex flex-col md:flex-row justify-between items-center gap-12'>

          <div className="max-w-md text-center md:text-left">
            <h2 className="text-2xl md:text-3xl text-white font-bold mb-3">
              A Little About Me
            </h2>
            <p className="text-white leading-relaxed pt-4 text-sm md:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div className="shadow-fuchsia-400">
            <TiltedCard
              imageSrc={profilePhoto}
              altText="Isaiah Thomas"
              captionText="Isaiah Thomas"
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip
              displayOverlayContent
              overlayContent={
                <div className="bg-black/50 backdrop-blur-sm text-white px-5 py-3 rounded-xl font-semibold">
                  Isaiah Thomas
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="px-6 md:px-20 space-y-6 flex py-20 md:py-30 justify-center">
        <div className='max-w-[1280px] w-full flex flex-col md:flex-row gap-10 md:gap-2'>

          <div className='flex flex-col w-full md:w-6/12 justify-between gap-5 md:gap-0'>
            {[
              { label: 'HTML', pct: '85%' },
              { label: 'CSS', pct: '75%' },
              { label: 'JS', pct: '35%' },
              { label: 'Graphic Design', pct: '80%' },
              { label: 'React', pct: '40%' },
              { label: 'Tailwind CSS', pct: '50%' },
            ].map(({ label, pct }) => (
              <div className='w-full' key={label}>
                <div className="mb-1 text-sm font-medium text-white">{label}</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: pct }} />
                </div>
              </div>
            ))}
          </div>

          {/* Hide beams on small screens to avoid layout issues */}
          <div className='hidden md:block w-6/12' style={{ height: '300px', position: 'relative' }}>
            <Beams
              beamWidth={3.8}
              beamHeight={30}
              beamNumber={41}
              lightColor="#e100ff"
              speed={2}
              noiseIntensity={1.75}
              scale={0.2}
              rotation={316}
            />
          </div>
        </div>
      </section>

      {/* ── Past Projects ── */}
      <section className='flex flex-col items-center py-20 md:py-30 gap-10 justify-center w-full px-4'>
        <h1 className='text-white text-3xl md:text-5xl'>Past projects</h1>

        <div
          className='w-full max-w-[1280px]'
          style={{ height: '400px', position: 'relative', color: 'white' }}
        >
          <InfiniteMenu items={items} scale={1} />
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="section contact py-20 md:py-30 px-6 md:px-0">
        <div className="section-content contact-content flex flex-col md:flex-row gap-10">

          <div className="flex flex-col w-full md:w-6/12">
            <h4 className="text-xl md:text-2xl" data-aos="fade-up">Have questions?</h4>
            <h1 className="text-4xl md:text-6xl mt-2" data-aos="fade-up" data-aos-delay="200">Get in touch!</h1>
            <h4 className="text-xl md:text-2xl opacity-80 mt-2" data-aos="fade-up" data-aos-delay="600">I'm happy to help</h4>
            <p className="mt-10 md:mt-20 text-xl md:text-2xl opacity-80 font-light" data-aos="fade-up" data-aos-delay="400">
              or, say hi at{' '}
              <a href="mailto:nazariil@conecteer.com" className="font-medium opacity-100 underline">
                nazariil@conecteer.com
              </a>
            </p>
          </div>

          <form className="flex flex-col w-full md:w-6/12 gap-4" data-aos="fade-up">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-2 w-full sm:w-6/12">
                <label>First Name:</label>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  required
                  placeholder="John"
                  className="input py-3 pl-3 border border-fuchsia-400 rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-6/12">
                <label>Last Name:</label>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  required
                  placeholder="Smith"
                  className="input py-3 pl-3 border border-gray-400 rounded-lg"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Email:</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="email@example.com"
                className="input py-3 pl-3 border border-gray-400 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Message:</label>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Your message..."
                className="resize-none h-40 py-3 pl-3 border input border-gray-400 rounded-lg"
              />
            </div>
            <button
              disabled={!firstName || !lastName || !email || !message}
              className="bg-white text-black py-3 rounded-lg cursor-pointer transition hover:bg-gray-400 disabled:opacity-50 disabled:hover:bg-white"
            >
              Send!
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default App
