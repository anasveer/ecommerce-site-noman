import type { Metadata } from 'next';
import React from 'react'
import Hero from "../components/hero";
import CategoryShowcase from "../components/CategoryShowcase";
import Showcase3 from "../components/showcase3";
import S1 from "../components/showcase1";
import Fabric from "../components/ComforterSet";
import Showcase2 from "../components/showcase2";
import Singal from "../components/SinglePair";
import ThreePcsBedsheet from "../components/ThreePcsBedsheet";
import WaterProofMattressCover from "../components/WaterProofMattressCover";
import DigitalArtistryShowcase from "../components/pixel";
import Room from "../components/room";
import Look from "../components/look";
import Quality from "../components/quality";
import Testimonials from "../components/Testimonials";

export const metadata: Metadata = {
  title: 'Universal Bedding | Premium Bedsheets, Comforter Sets & Mattress Covers Pakistan',
  description: 'Universal Bedding Pakistan — Shop premium 3pcs bedsheets, single pair bedsheets, comforter sets and waterproof mattress covers. Crystal cotton fabric, lifetime colour guarantee, wholesale rates. Fast delivery across Pakistan.',
  keywords: [
    'bedsheet pakistan', '3pcs bedsheet', 'comforter set pakistan', 'single pair bedsheet',
    'waterproof mattress cover', 'crystal cotton bedsheet', 'premium bedding pakistan',
    'universal bedding', 'bedsheet online pakistan', 'luxury bedsheet', 'wholesale bedsheet pakistan',
    'bedding store pakistan', 'cotton bedsheet', 'velour bedsheet', 'king size bedsheet pakistan'
  ],
  alternates: { canonical: 'https://universalbedding.pk' },
  openGraph: {
    title: 'Universal Bedding | Premium Bedsheets & Comforter Sets Pakistan',
    description: 'Shop premium quality bedsheets, comforter sets and mattress covers. Crystal cotton fabric with lifetime colour guarantee. Fast delivery across Pakistan.',
    url: 'https://universalbedding.pk',
    images: [{ url: '/logo.png', alt: 'Universal Bedding Pakistan' }]
  }
};

 



const page = () => {
  return (
    <div>
       <Hero />
      <CategoryShowcase />
       <ThreePcsBedsheet />
    
      <Showcase3 />
      <S1 />
       <Fabric /> 
       <Showcase2 />
        <Singal />
       <WaterProofMattressCover />
      <DigitalArtistryShowcase />
      <Room />
      <Look />
      <Testimonials />
      <Quality />  
        
  
    </div>
  );
}

export default page