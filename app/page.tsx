import React from 'react'
import Hero from "../components/hero";
import ProductSection from "../components/product1";
import S1 from "../components/showcase1";
import Fabric from "../components/ComforterSet";
import Showcase2 from "../components/showcase2";
import Singal from "../components/SinglePair";
import Quality from "../components/quality";

const page = () => {
  return (
    <div>
      <Hero/>
      <ProductSection/>
      <S1/>
      <Fabric/>
      <Showcase2/>
      <Singal/>
      <Quality/>
    </div>
  )
}

export default page