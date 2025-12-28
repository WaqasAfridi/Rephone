import Navbar from '../components/shared/Navbar'
import Banner from '../components/home-sections/Banner'
import CommonRepairs from '../components/home-sections/Common-repairs'
import HowItWorks from '../components/home-sections/HowItWorks'
import Footer from '../components/shared/Footer'

function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Banner />
        <CommonRepairs />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}

export default Home;
