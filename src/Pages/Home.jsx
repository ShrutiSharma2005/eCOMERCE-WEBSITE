import React from 'react';
import HeroBanner from '../components/HeroBanner';
import TopSellers from '../components/TopSellers';
import MidBanner from '../components/MidBanner';
import NewCollection from '../components/NewCollection';
import NewsLetter from '../components/NewsLetter';
import Meta from '../components/Meta';

const Home = () => {
  return (
    <div>
      <Meta />
      <HeroBanner />
      <TopSellers />
      <MidBanner />
      <NewCollection />
      <NewsLetter />
    </div>
  );
};

export default Home;
