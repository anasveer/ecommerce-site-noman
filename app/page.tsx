import React from 'react'
import Hero from "../components/hero";
import ProductSection from "../components/product1";
import Fabric from "../components/ComforterSet";
import Singal from "../components/SinglePair";
import Quality from "../components/quality";

const page = () => {
  return (
    <div>
      <Hero/>
      <ProductSection/>
      <Fabric/>
      <Singal/>
      <Quality/>
    </div>
  )
}

export default page