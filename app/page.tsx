import React from 'react'
import Hero from "../components/hero";
import ProductSection from "../components/product1";
import Showcase3 from "../components/showcase3";
import S1 from "../components/showcase1";
import Fabric from "../components/ComforterSet";
import Showcase2 from "../components/showcase2";
import Singal from "../components/SinglePair";
import DigitalArtistryShowcase from "../components/pixel";
import Look from "../components/look";
import Quality from "../components/quality";

const page = () => {
  return (
    <div>
      <Hero/>
      <ProductSection/>
      <Showcase3/>
      <S1/>
      <Fabric/>
      <Showcase2/>
      <Singal/>
      <DigitalArtistryShowcase/>
        <Look/>
      <Quality/>
    </div>
  )
}

export default page