import React from "react";

const images = [
    new URL("../../images/Image_slider/Astronaute_horse.png", import.meta.url).href,
    new URL("../../images/Image_slider/Astronaute_horse_brown.png", import.meta.url).href,
    new URL("../../images/Image_slider/Astronaute_horse_brown2.png", import.meta.url).href,
    new URL("../../images/Image_slider/DJI_0116.JPG", import.meta.url).href,
    new URL("../../images/Image_slider/DJI_0137.JPG", import.meta.url).href,
    new URL("../../images/Image_slider/DJI_0148.JPG", import.meta.url).href,
    new URL("../../images/Image_slider/DJI_0149.JPG", import.meta.url).href,
    new URL("../../images/Image_slider/goat_forest.jpeg", import.meta.url).href,
    new URL("../../images/Image_slider/goat_forest2.jpeg", import.meta.url).href
];

const duplicatedImages = [...images, ...images];

export const ImageAutoSlider = () => {
    return (
        <>
            <style>{`
                @keyframes didri-scroll-right {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-50%);
                  }
                }

                .didri-infinite-scroll {
                  animation: didri-scroll-right 20s linear infinite;
                }

                .didri-scroll-container {
                  mask: linear-gradient(
                    90deg,
                    transparent 0%,
                    black 10%,
                    black 90%,
                    transparent 100%
                  );
                  -webkit-mask: linear-gradient(
                    90deg,
                    transparent 0%,
                    black 10%,
                    black 90%,
                    transparent 100%
                  );
                }

                .didri-image-item {
                  transition: transform 0.3s ease, filter 0.3s ease;
                }

                .didri-image-item:hover {
                  transform: scale(1.05);
                  filter: brightness(1.08);
                }
            `}</style>

            <section className="relative overflow-hidden bg-black py-12">
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/90 to-black" />
                <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-center px-4">
                    <div className="didri-scroll-container w-full">
                        <div className="didri-infinite-scroll flex w-max gap-6">
                            {duplicatedImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="didri-image-item h-48 w-48 flex-shrink-0 overflow-hidden rounded-xl shadow-2xl md:h-64 md:w-64 lg:h-80 lg:w-80"
                                >
                                    <img
                                        src={image}
                                        alt={`Slider image ${(index % images.length) + 1}`}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-20 h-24 bg-gradient-to-t from-black to-transparent" />
            </section>
        </>
    );
};
