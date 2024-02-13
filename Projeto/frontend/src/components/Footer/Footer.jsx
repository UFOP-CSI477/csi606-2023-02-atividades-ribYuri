import "./Footer.css";
import { Infos } from "./Infos";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer className="footer display_flex">
        <div className="container_footer display_flex">
          <div className="brand display_flex">
            <h3>Greenmind</h3>
            <p>We help you find your dream plant</p>
            <div className="social_brand display_flex">
              <Link to="https://rethink.dev/" target="_blank">
                <button type="button" className="social_button">
                  <BiWorld className="social_icon" />
                </button>
              </Link>

              <Link
                to="https://www.instagram.com/rethink.digital/"
                target="_blank"
              >
                <button type="button" className="social_button">
                  <AiFillInstagram className="social_icon" />
                </button>
              </Link>

              <Link
                to="https://www.linkedin.com/company/rethinkdigitalco/mycompany/"
                target="_blank"
              >
                <button type="button" className="social_button">
                  <FaLinkedinIn className="social_icon" />
                </button>
              </Link>
            </div>
          </div>

          <div className="container_infos">
            <Link to="#">
              <Infos
                className="info_component"
                title="Information"
                text1="About"
                text2="Product"
                text3="Blog"
              />
            </Link>
            <Link to="#">
              <Infos
                className="info_component"
                title="Company"
                text1="Community"
                text2="Career"
                text3="Our story"
              />
            </Link>
            <Link to="#">
              <Infos
                className="info_component"
                title="Contact"
                text1="Getting Started"
                text2="Pricing"
                text3="Resources"
              />
            </Link>
          </div>
        </div>

        <p>2023 all Right Reserved Term of use GREENMIND</p>
      </footer>
    </>
  );
};
