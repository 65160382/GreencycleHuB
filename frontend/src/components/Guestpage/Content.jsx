// import "./Content.css";
import Slideshow from "./Slideshow";
import IntroSection from "./IntroSection";
import StepGuides from "./StepGuides";
import WastetypeCard from "./WastetypeCard";


const Content = () => {
  return (
    <div className="content">
      <Slideshow />
      <IntroSection/>
      <StepGuides/>
      <WastetypeCard/>
    </div>
  )
}

export default Content