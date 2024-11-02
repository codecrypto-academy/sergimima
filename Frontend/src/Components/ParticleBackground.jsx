import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticleBackground() {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fullScreen: {
                    enable: true,
                    zIndex: -1
                },
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: ["#E2CBFF", "#393BB2", "#00FF9D", "#00A2FF"]
                    },
                    links: {
                        enable: true,
                        color: "#ffffff",
                        opacity: 0.5,
                        width: 1,
                        distance: 150
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: false,
                        straight: false,
                        outModes: {
                            default: "out"
                        }
                    },
                    size: {
                        value: { min: 1, max: 3 },
                        random: true
                    },
                    opacity: {
                        value: 0.8,
                        random: true,
                        animation: {
                            enable: true,
                            speed: 0.5,
                            minimumValue: 0.3,
                            sync: false
                        }
                    }
                },
                background: {
                    color: "transparent"
                },
                detectRetina: true,
                fpsLimit: 60
            }}
        />
    );
}
