import "./Home.css";

import { Showcase, About, Categories } from "../../components";

export const Home = () => {
  return (
    <main className="home_container">
      <Showcase />
      <About />
      <Categories />
    </main>
  );
};
