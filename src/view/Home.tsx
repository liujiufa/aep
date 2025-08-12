import React, { useContext, useEffect, useState } from "react";
import HeaderBox from "../components/HeaderBox";
import banner from "../assets/image/Home/icon.png";
import icon3 from "../assets/image/Home/icon3.png";
import icon4 from "../assets/image/Home/icon4.png";
import icon4_dark from "../assets/image/Home/icon4_dark.png";
import icon5 from "../assets/image/Home/icon5.png";
import icon6 from "../assets/image/Home/icon6.png";
import icon7 from "../assets/image/Home/icon7.png";
import icon8 from "../assets/image/Home/icon8.png";
import icon9 from "../assets/image/Home/icon9.png";
import icon10 from "../assets/image/Home/icon10.png";
import icon11 from "../assets/image/Home/icon11.png";
import icon12 from "../assets/image/Home/icon12.png";
import icon13 from "../assets/image/Home/icon13.png";
import icon14 from "../assets/image/Home/icon14.png";
import icon14_dark from "../assets/image/Home/icon14_dark.png";
import icon15 from "../assets/image/Home/icon15.png";
import icon15_dark from "../assets/image/Home/icon15_dark.png";
import icon16 from "../assets/image/Home/icon16.png";
import icon17 from "../assets/image/Home/icon17.png";
import icon18 from "../assets/image/Home/icon18.png";
import icon19 from "../assets/image/Home/icon19.png";
import icon20 from "../assets/image/Home/icon20.png";
import icon21 from "../assets/image/Home/icon21.png";
import icon22 from "../assets/image/Home/icon22.png";
import icon23 from "../assets/image/Home/icon23.png";
import icon24 from "../assets/image/Home/icon24.png";
import icon25 from "../assets/image/Home/icon25.png";

import card1 from "../assets/image/Home/card1.gif";
import card2 from "../assets/image/Home/card2.gif";
import card3 from "../assets/image/Home/card3.gif";
import card4 from "../assets/image/Home/card4.gif";
import card5 from "../assets/image/Home/card5.gif";
import card6 from "../assets/image/Home/card6.gif";

import prev_icon from "../assets/image/Home/prev_icon.png";
import next_icon from "../assets/image/Home/next_icon.png";

import { Carousel } from "antd";
import "../assets/style/Home.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";
//@ts-ignore
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import ThemeContext from "../components/ThemeContext";
const Home = () => {
  const { t } = useTranslation();
  const token = useSelector((state: any) => state?.token);
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (!!token) {
    } else {
    }
  }, [token]);

  return (
    <div className="home all_page_conttainer">
      <HeaderBox></HeaderBox>
      <div className="home_content">
        <div className="swiperBox">
          <Carousel
            rootClassName="dots"
            effect="scrollx"
            autoplay
            autoplaySpeed={3000}
            infinite={true}
          >
            <img src={banner} alt="" />
          </Carousel>
        </div>
        <div className={theme === "light" ? "block1" : "block1 block1_dark"}>
          <div className="block1_title">
            “<span>{t("home0")}</span>
            {t("home1")}
          </div>
          <div className="block1_sub">{t("home2")}</div>
        </div>
        <div className="block2 " style={{ display: "none" }}>
          <div className="block2_title">{t("home3")}</div>
          <div className="block2_sub">{t("home4")}</div>
          <div className="block2_content">
            <img src={icon3} alt="" />
          </div>
        </div>
        <div className="block3" style={{ marginTop: "2.66667rem" }}>
          <div className="block3_title">{t("home5")}</div>
          <div className="block3_sub">{t("home6")}</div>
          <div className="block3_buttom">ChatGPT</div>
          <img src={theme === "light" ? icon4 : icon4_dark} alt="" />
          <br />
          <div className="block3_buttom">DeepSeek</div>
          <img src={icon5} alt="" />
        </div>
        <div className="video_box">
          <div className="video_title">Video</div>
          <div className="swiper_video">
            <Carousel
              autoplay
              autoplaySpeed={7000}
              prevArrow={<img src={prev_icon} />}
              nextArrow={<img src={next_icon} />}
              arrows
              // infinite={false}
              dots={false}
              infinite={true}
            >
              <div>
                <div className="video_item">
                  <video className="video" autoPlay loop muted playsInline>
                    <source
                      src={"https://oraai.io/video/video1.mp4"}
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>
              <div>
                <div className="video_item">
                  <video className="video" autoPlay loop muted playsInline>
                    <source
                      src={"https://oraai.io/video/video2.mp4"}
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>
            </Carousel>
          </div>
        </div>

        <div className="block4">
          <div className="block4_title">{t("home7")}</div>
          <div className="block4_sub">{t("home8")}</div>
          <img src={icon6} className="block4_img" alt="" />
          <div className="block4_content">
            <div className="block4_item">
              <span>{t("home9")}</span>
              ORA
            </div>
            <div className="block4_item">
              <span>{t("home10")}</span>
              1,000,000,000 (10{t("home11")})
            </div>
            <div className="block4_item2">
              <div className="block4_item2_1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <path
                    d="M25 0.75C24.9337 0.75 24.8701 0.776339 24.8232 0.823223C24.7763 0.870107 24.75 0.933696 24.75 1V8.91998C24.75 9.05805 24.8619 9.16998 25 9.16998C28.7692 9.16998 32.4146 10.5149 35.2807 12.9627C38.1468 15.4106 40.0454 18.8008 40.6351 22.5236C41.2247 26.2464 40.4666 30.0574 38.4973 33.2711C36.5279 36.4848 33.4764 38.8904 29.8917 40.0552C26.307 41.2199 22.4244 41.0673 18.9421 39.625C15.4599 38.1826 12.6065 35.545 10.8954 32.1866C9.18421 28.8283 8.7275 24.9695 9.6074 21.3045C10.4873 17.6395 12.646 14.4087 15.6954 12.1932C15.8071 12.1121 15.8318 11.9557 15.7507 11.844L11.0954 5.43664C11.0143 5.32493 10.8579 5.30017 10.7462 5.38133C6.07497 8.77519 2.76797 13.7245 1.42006 19.3389C0.0721493 24.9534 0.771782 30.8645 3.39312 36.0092C6.01446 41.1539 10.3855 45.1944 15.7199 47.404C21.0544 49.6136 27.0022 49.8473 32.4936 48.063C37.985 46.2788 42.6596 42.5937 45.6765 37.6705C48.6934 32.7474 49.8546 26.9093 48.9514 21.2064C48.0481 15.5035 45.1397 10.3101 40.7491 6.56014C36.3585 2.81024 30.774 0.75 25 0.75Z"
                    fill="#376DF7"
                    stroke="white"
                    stroke-width="0.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.3465 12.1379C15.3855 12.1916 15.4442 12.2275 15.5097 12.2379C15.5752 12.2483 15.6421 12.2322 15.6957 12.1932C18.4003 10.2283 21.6574 9.16998 25.0004 9.16998C25.1384 9.16998 25.2504 9.05805 25.2504 8.91998L25.2504 1C25.2504 0.933696 25.224 0.870107 25.1771 0.823223C25.1303 0.776339 25.0667 0.75 25.0004 0.75C19.8793 0.750003 14.8897 2.37123 10.7466 5.38133C10.693 5.4203 10.657 5.47899 10.6466 5.54447C10.6363 5.60996 10.6523 5.67689 10.6913 5.73053L15.3465 12.1379Z"
                    fill="#53B997"
                    stroke="white"
                    stroke-width="0.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="block4_item2_3">
                <div className="block4_item2_3_1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="4"
                    viewBox="0 0 21 4"
                    fill="none"
                  >
                    <rect y="1" width="21" height="2" fill="#376DF7" />
                    <rect x="6" width="9" height="4" fill="#376DF7" />
                  </svg>
                  <span>1{t("home11")}(10%):</span>
                  {t("home12")}
                </div>
                <div className="block4_item2_3_1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="4"
                    viewBox="0 0 21 4"
                    fill="none"
                  >
                    <rect y="1" width="21" height="2" fill="#53B997" />
                    <rect x="6" width="9" height="4" fill="#53B997" />
                  </svg>
                  <span>9{t("home11")}(90%):</span>
                  {t("home13")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block5">
          <div className="block5_title">{t("home14")}</div>
          <div className="block5_sub">{t("home15")}</div>
          <Swiper
            spaceBetween={14}
            slidesPerView={1.6}
            // freeMode={true}
            className="Swiper"
            loop
            loopAdditionalSlides={2}
            autoplay={{ delay: 2000 }}
            modules={[Autoplay, Pagination]}
          >
            <SwiperSlide>
              <img
                style={{ width: "100%" }}
                src={card1}
                alt=""
                className="swiper_img"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                style={{ width: "100%" }}
                src={card2}
                alt=""
                className="swiper_img"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                style={{ width: "100%" }}
                src={card3}
                alt=""
                className="swiper_img"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                style={{ width: "100%" }}
                src={card4}
                alt=""
                className="swiper_img"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                style={{ width: "100%" }}
                src={card5}
                alt=""
                className="swiper_img"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                style={{ width: "100%" }}
                src={card6}
                alt=""
                className="swiper_img"
              />
            </SwiperSlide>

            {/* <SwiperSlide>
              <img style={{ width: "100%" }} src={icon9} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img style={{ width: "100%" }} src={icon10} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img style={{ width: "100%" }} src={icon11} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img style={{ width: "100%" }} src={icon16} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img style={{ width: "100%" }} src={icon17} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img style={{ width: "100%" }} src={icon18} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img style={{ width: "100%" }} src={icon19} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img style={{ width: "100%" }} src={icon20} alt="" />
            </SwiperSlide> */}
          </Swiper>
          <div className="block5_sub">{t("home16")}</div>
          <div className="block5_botton">
            <span>200</span> {t("home17")}
          </div>
        </div>
        <div className="block4 block6">
          <div className="block4_title">{t("home18")}</div>
          <div className="block4_sub">{t("home19")}</div>
          <div className="block6_contertainer">
            <img src={icon12} className="block4_img" alt="" />
            <div className="block6_contertainer_text">{t("home20")}</div>
          </div>
        </div>
        <div className="block7">
          <div className="block7_title">
            {t("home21")}
            <span>/Initiating Organisation</span>
          </div>
          <div className="">
            <img
              src={icon13}
              style={{
                width: "11.16667rem",
                height: "4rem",
              }}
              alt=""
            />
          </div>
        </div>
        <div className="block7">
          <div className="block7_title">
            {t("home22")}
            <span>/Collaborating institution</span>
          </div>
          <div className="">
            <img
              src={theme === "light" ? icon14 : icon14_dark}
              style={{
                width: "100%",
              }}
              alt=""
            />
          </div>
        </div>
        <div className="block7">
          <div className="block7_title">
            {t("home23")}
            <span>/Partner</span>
          </div>
          <div className="">
            <img
              src={theme === "light" ? icon15 : icon15_dark}
              style={{
                width: "100%",
              }}
              alt=""
            />
          </div>
        </div>
        <div className="block7">
          <div className="block7_title">
            {t("home24")}
            <span>/Social media</span>
          </div>
          <div className="block7_social">
            <a
              href="https://x.com/ORA_Web3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={icon21} alt="" />
            </a>
            <a
              href="https://t.me/ORA_Channel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={icon22} alt="" />
            </a>
            <a
              href="https://t.me/ORA_Global"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={icon25} alt="" />
            </a>
            <a
              href="https://www.youtube.com/ORA_Web3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={icon23} alt="" />
            </a>
            <a
              href="https://linktr.ee/ORA_AI"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={icon24} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
