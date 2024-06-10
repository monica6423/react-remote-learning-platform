import React from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

function Slick() {
  let settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <Slider {...settings}>
      <Link to="/register">
        <div className="top">
          <div className=" top1">
            <div className="top-group top-group1 m-1 p">Coding</div>
            <div className="px text-light">
              Join the 9,000 students that use coding group to improve their
              coding skill
            </div>
          </div>
        </div>
      </Link>

      <Link to="/register">
        <div className="top">
          <div className=" top2">
            <div className="top-group top-group2 m-1 p">Finance</div>
            <div className="px text-light">
              Join the 9,000 students that use finance group to improve their
              finance skill
            </div>
          </div>
        </div>
      </Link>

      <Link to="/register">
        <div className="top">
          <div className="top3">
            <div className="top-group top-group3 m-1 p">Language</div>
            <div className="px text-light">
              Join the 9,000 students that use language group to improve their
              language skill
            </div>
          </div>
        </div>
      </Link>

      <Link to="/register">
        <div className="top">
          <div className=" top1">
            <div className="top-group top-group1 m-1 p">Art</div>
            <div className="px text-light">
              Join the 9,000 students that use art group to improve their art
              skill
            </div>
          </div>
        </div>
      </Link>
    </Slider>
  )
}

export default Slick
