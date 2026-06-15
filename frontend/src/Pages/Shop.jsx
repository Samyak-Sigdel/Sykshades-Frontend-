import React from 'react'

import { Popular } from "../Components/Popular";
import { Offers } from "../Components/Offers";
import { NewCollections } from '../Components//NewCollections'
import { Newsletter } from '../Components/Newsletter'
import { HeroSection } from '../Components/HeroSection';

export const Shop = () => {
  return (
    <div>
       <HeroSection/>
       <Popular/>
       <Offers/>
       <NewCollections/>
       {/* <Newsletter/> */}
    </div>
  )
}