import Hero from '@/components/Home/Header/Hero';
import EmpoweringCareers from '@/components/Home/Section/EmpoweringCareers';
import WhyChooseUs from '@/components/Home/Section/WhyChooseUs';
import YourBusiness from '@/components/Home/Section/YourBusiness';
import AboutSaintHR from '@/components/Home/Section/AboutSaintHR';
import RecruitmentSolutions from '@/components/Home/Section/RecruitmentSolutions';
import Testimonial from '@/components/Home/Section/Testimonial';

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs/>
      <YourBusiness/>
      <AboutSaintHR/>
      <EmpoweringCareers/>
      <RecruitmentSolutions/>
      <Testimonial/>
    </>
  );
}
