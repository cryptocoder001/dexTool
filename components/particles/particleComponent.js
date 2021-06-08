import React from "react";
import Particles from "react-particles-js";

export default function Particle() {
  return (
  <div
  id = "backSection"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      backgroundRepeat: "round",
      backgroundImage: "url(/img/lightBackground.png)"
    }}
  >
    <Particles
      params={{
        particles: {
          number: {
            value: 20,
            density: {
              enable: true,
              value_area: 500
            }
          },
          move: {
            enable: true,
            speed: 4,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "window",
          events: {
            onhover: {
              enable: true,
              mode: "repulse"
            },
            onclick: {
              enable: true,
              mode: "grab"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 100,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      }}
    />
  </div>
)
}
