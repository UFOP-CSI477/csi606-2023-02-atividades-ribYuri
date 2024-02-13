import "./About.css";

import { Title } from "../index";
import { AboutCard } from "./AboutCard";
import { BsTelephoneOutbound, BsBoxSeam } from "react-icons/bs";
import { TbPlant } from "react-icons/tb";

export const About = () => {
  return (
    <section className="about_container">
      <div className="title">
        <Title
          className="title_container"
          title="About Us"
          description="Order now and appreciate the beauty of nature"
        />
      </div>
      <div className="advantages_container">
        <AboutCard
          className="about_card"
          icon={<TbPlant />}
          title="Large Assortment"
          description="we offer many different types of products with fewer variations in each category."
        />
        <AboutCard
          className="about_card"
          icon={<BsBoxSeam />}
          title="Fast & Free Shipping"
          description="4-day or less delivery time, free shipping and an expedited delivery option."
        />
        <AboutCard
          className="about_card"
          icon={<BsTelephoneOutbound />}
          title="24/7 Support"
          description="answers to any business related inquiry 24/7 and in real-time."
        />
      </div>
    </section>
  );
};
