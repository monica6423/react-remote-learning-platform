import React, { useRef, useState, useEffect, useCallback}  from 'react';
import { Link, Redirect } from 'react-router-dom';
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import { useTrail, useSpring, animated } from 'react-spring';
import { Spring } from 'react-spring/renderprops';
import { motion } from "framer-motion";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import LandingPic1 from '../../img/l1.png'
import LandingPic2 from '../../img/l2.png'
import LandingPic3 from '../../img/l3.png'
import LandingPic4 from '../../img/l4.png'
import FeaturePic1 from '../../img/f1.png'
import FeaturePic2 from '../../img/f2.png'
import FeaturePic3 from '../../img/f3.png'
import Ending from '../../img/ending.png'
import Cross from '../../img/cross4.png'
import { Button } from "./Button";
import Slick from "./Slick"
import Map from './map.js'
import './styles.css';




/*Count Down*/
const usePercentageEffect = maxValue => {
  const [discount, setDiscount] = useState(undefined);

  useEffect(() => {
    const interval = setInterval(() => {
      if (discount < maxValue) setDiscount(discount + 23);
    }, 1);

    return () => {
      clearInterval(interval);
    };
  }, [discount]);
  return [discount, setDiscount];
};

/*Text Animated*/
const items = ["Join the largest global ", 'online study group']
const config = { mass: 900, tension: 6000, friction: 2000 }



const Landing = ({ isAuthenticated}) => {

  

  /*Background Color Animation*/
  const props = useSpring({
    from: {left: '100%', top: '0%', width: '0%', height: '0%', background: 'lightgreen' },
    to: async next => {
        await next({ left: '50%', top: '0%', width: '50%', height: '100%', background: 'lightcoral' })
        await next({ left: '50%', height: '55%', background: 'lightblue' })
    },
  });

  const [toggle, setText] = useState(true);
  const trail = useTrail(items.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 80 : 0,
    from: { opacity: 0, x: 20, height: 0 },
    delay: 1200,
   
  });

  /*Counting Animation*/
  const [discount, setDiscount] = usePercentageEffect(9896);
  const [count, setCount] = useState(0);


  // if(isAuthenticated){
  //   return <Redirect to='/dashboard' />
  // }


  /*Feature Animation*/
  const pageVariants = {
    initial: {
      y: "100%",
      opacity: 0,
      scale: 1
    },
    in: {
      y:"0%",
      opacity: 1,
      scale: 1
    }
  };
  const featureTransition = {
    type: "spring",
    stiffness: 5,
   
  };

  const endTransition = {
    type: "spring",
    stiffness: 0.7,
   
  };

  const pageStyle = {
    position: "realtive"
  };


  /*Copyright year*/
  const year = new Date().getFullYear();






  return (
    <section style={{overflow:"hidden"}} >
        <animated.div className="script-box" style={props} />
          <div  className="landing">
            <div className="landing-box">

              <div className="left-landing">
                <div className="trails-main" onClick={() => setText(state => !state)}>
                  <div className="text-ani1">
                    {trail.map(({ x, height, ...rest }, index) => (
                      <animated.div
                        key={items[index]}
                        className="trails-text"
                        style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
                        <animated.div style={{ height }}>{items[index]}</animated.div>
                      </animated.div>
                    ))}
                  </div>
                  <div className="text-ani">
                    {trail.map(({ x, height, ...rest }, index) => (
                      <animated.div
                        key={items[index]}
                        className="trails-text"
                        style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
                        <animated.div className="text-ani-inner">{items[index]}</animated.div>
                      </animated.div>
                    ))}
                  </div>
                </div>
                  <p className="lead left feature-p">Experience the best remote learning environment now</p>
                  <div className="buttons left">
                    <div >
                    <Link to="/register" >
                    <Button text={"Sign Up"} key={count} />
                    </Link>
                    </div>
                  </div>
              </div>

              <div className="right-landing" >
                <div className="book-shelf shelf1">
                <Spring
                    from={{ opacity: 0}}
                    to={{ opacity: 1}}
                    config={{ delay: 1200, duration: 1000}}
                    >
                      {props => (
                        <img style={props} className="shelf-pic" src={LandingPic2} alt=""/>
                      )}
                  </Spring>
                </div>
                <div className="book-shelf shelf2">
                <Spring
                    from={{ opacity: 0}}
                    to={{ opacity: 1}}
                    config={{ delay: 1400, duration: 1000}}
                    >
                      {props => (
                        <img style={props} className="shelf-pic" src={LandingPic4} alt=""/>
                      )}
                  </Spring>
                </div>
                <div className="book-shelf shelf1">
                <Spring
                    from={{ opacity: 0}}
                    to={{ opacity: 1}}
                    config={{ delay: 1600, duration: 1000}}
                    >
                      {props => (
                        <img style={props} className="shelf-pic" src={LandingPic3} alt=""/>
                      )}
                  </Spring>
                </div>
                <div className="book-shelf">
                <Spring
                    
                    from={{ opacity: 0, paddingTop: 3000}}
                    to={{ opacity: 1, paddingTop: 0}}>
                      {props => (
                        <img style={props} className="landing-pic" src={LandingPic1} alt=""/>
                      )}
                  </Spring>
                </div>

              </div>

            </div>
          </div>

          <div className="">
              <div className="feature">
                <Fade  onReveal={() => setDiscount(8200)}>
                <div className="count">
                  <div className="discount_percentage">
                    <div className="count-num">{discount}</div>
                    <span className="cross"> <img className="cross-pic" src={Cross} alt=""/></span>
                  </div>
                </div>
                </Fade>
                <h1 className="feature-paragraph">remote learners around the world, from New York to Cebu.</h1>
              </div>

              <h1 className="headline">Features</h1>
              <div className="card">

              <div className="feature-cards ">
              <motion.div className="feature-card"
               style={pageStyle}
               initial="initial"
               animate="in"
               variants={pageVariants}>
                <Fade bottom duration={1000}>
                    <img className="landing-pic" src={FeaturePic1} alt=""/>
                    <div className="feature-text feature-paragraph">Meet Buddy</div>
                    <div className="feature-p">Learning with people who are self-motivated like you help you build confidence</div>
                </Fade>
               </motion.div>
              </div>

              <div className="feature-show">
              <motion.div className="feature-card"
               style={pageStyle}
               initial="initial"
               animate="in"
               variants={pageVariants}>
                <Fade bottom duration={1000}>
                    <div className="feature-text feature-paragraph">Improve Quickly</div>
                    <div className="feature-p">The best new way to learn things are fun and easy. Study groups are tailored to help you efficiently.</div>
                    <img className="landing-pic" src={FeaturePic2} alt=""/>
                </Fade>
               </motion.div>
              </div>
              
              {/* Hide when size greater than medium*/}
              <div className="feature-hide">
              <motion.div className="feature-card"
               style={pageStyle}
               initial="initial"
               animate="in"
               variants={pageVariants}>
                <Fade bottom duration={1000}>
                    <img className="landing-pic" src={FeaturePic2} alt=""/>
                    <div className="feature-text feature-paragraph">Improve Quickly</div>
                    <div className="feature-p">The best new way to learn things are fun and easy. Study groups are tailored to help you efficiently.</div>
                </Fade>
               </motion.div>
              </div>

              <div className="feature-cards">
              <motion.div className="feature-card"
               style={pageStyle}
               initial="initial"
               animate="in"
               variants={pageVariants}
               transition={featureTransition}>
                <Fade bottom duration={1000}>
                    <img className="landing-pic" src={FeaturePic3} alt=""/>
                    <div className="feature-text feature-paragraph">Personalized Learning</div>
                    <div className="feature-p">Schedule your study time with displine. This gives you fully flexible opportunity of learning</div>
                </Fade>
               </motion.div>
              </div>
              </div>
          <div className="ending">
               <div className="left-ending">
               
               <motion.div className=""
               style={pageStyle}
               initial="initial"
               animate="in"
               variants={pageVariants}
               transition={endTransition}>
              <Fade bottom duration={1000}> 
                <p className="lead "> 87% of people learning for professional development report career benefits like getting a promotion, a raise, or starting a new career.</p>
                 <div className="buttons left" style={{margin:"0 auto"}} >
                    <div >
                      <Link to="/register" >
                      <Button text={"Join Us"} key={count} />
                      </Link>
                    </div>
                 </div>
                </Fade>
               </motion.div> 
               

                
               </div>
               <div className="right-ending "></div>
          </div>



        </div>


      <div className="footer">
        <p>For Personal Project only {year}</p>
        <p>Designed by Adobe XD, unDraw</p>
      </div>
    </section>

    )
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
