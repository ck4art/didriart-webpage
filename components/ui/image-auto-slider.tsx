import React, { useMemo, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

type SliderImage = {
    id: string;
    src: string;
    title: string;
};

const imageModules = import.meta.glob("../../images/image_slider/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP,GIF}", {
    eager: true,
    query: "?url",
    import: "default"
}) as Record<string, string>;

const formatTitle = (path: string) => {
    const fileName = path.split("/").pop() ?? "Slider image";
    return fileName.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
};

const images = Object.entries(imageModules)
    .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath, undefined, { numeric: true }))
    .map(([path, src]) => ({
        id: path,
        src,
        title: formatTitle(path)
    }));

function splitRows(items: SliderImage[]) {
    const top = items.filter((_, index) => index % 2 === 0);
    const bottom = items.filter((_, index) => index % 2 === 1);

    if (bottom.length === 0) {
        return [items, items] as const;
    }

    return [top, bottom] as const;
}

function SliderRow({
    images: rowImages,
    reverse = false,
    activeId,
    setActiveId,
    openImage
}: {
    images: SliderImage[];
    reverse?: boolean;
    activeId: string | null;
    setActiveId: (id: string | null) => void;
    openImage: (image: SliderImage) => void;
}) {
    const repeatedImages = [...rowImages, ...rowImages];

    return (
        <div className="didri-slider-mask w-full overflow-hidden">
            <div className={`didri-slider-row ${reverse ? "didri-slider-row-reverse" : ""}`}>
                {repeatedImages.map((image, index) => {
                    const isActive = activeId === image.id;

                    return (
                        <button
                            type="button"
                            key={`${image.id}-${index}`}
                            className={`didri-slider-item ${activeId && !isActive ? "is-muted" : ""} ${isActive ? "is-active" : ""}`}
                            onClick={() => openImage(image)}
                            onFocus={() => setActiveId(image.id)}
                            onBlur={() => setActiveId(null)}
                            onMouseEnter={() => setActiveId(image.id)}
                            onMouseLeave={() => setActiveId(null)}
                            onPointerDown={() => setActiveId(image.id)}
                            aria-label={`Open ${image.title}`}
                        >
                            <img src={image.src} alt={image.title} loading="lazy" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export const ImageAutoSlider = () => {
    const navigate = useNavigate();
    const [activeId, setActiveId] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<SliderImage | null>(null);
    const [topImages, bottomImages] = useMemo(() => splitRows(images), []);
    const selectedImageSlug = selectedImage?.id.toLowerCase() ?? "";
    const selectedImageLinksToAiArt = selectedImageSlug.includes("astronaute_horse_brown");

    const closeModal = () => {
        setSelectedImage(null);
        setActiveId(null);
    };

    const goToAiArt = () => {
        closeModal();
        navigate("/ai-art");
    };

    if (images.length === 0) {
        return null;
    }

    return (
        <>
            <style>{`
                @keyframes didri-slider-left {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }

                @keyframes didri-slider-right {
                    from {
                        transform: translateX(-50%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }

                .didri-slider-mask {
                    mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
                    -webkit-mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
                }

                .didri-slider-row {
                    display: flex;
                    width: max-content;
                    gap: 1.25rem;
                    animation: didri-slider-left 72s linear infinite;
                    will-change: transform;
                }

                .didri-slider-row-reverse {
                    animation-name: didri-slider-right;
                    animation-duration: 86s;
                }

                .didri-slider-stage:hover .didri-slider-row,
                .didri-slider-stage:focus-within .didri-slider-row,
                .didri-slider-stage.is-paused .didri-slider-row {
                    animation-play-state: paused;
                }

                .didri-slider-item {
                    height: 11rem;
                    width: auto;
                    flex: 0 0 auto;
                    overflow: hidden;
                    border: 0;
                    border-radius: 8px;
                    padding: 0;
                    background: transparent;
                    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.28);
                    cursor: pointer;
                    transition: filter 0.28s ease, opacity 0.28s ease, transform 0.28s ease;
                }

                .didri-slider-item img {
                    display: block;
                    height: 100%;
                    width: auto;
                    max-width: none;
                    object-fit: contain;
                }

                .didri-slider-item.is-muted {
                    opacity: 0.34;
                    filter: grayscale(0.65) brightness(0.72);
                }

                .didri-slider-item.is-active {
                    opacity: 1;
                    filter: brightness(1.06);
                    transform: scale(1.035);
                    z-index: 2;
                }

                .didri-slider-item:focus-visible {
                    outline: 2px solid #f0d599;
                    outline-offset: 4px;
                }

                @media (min-width: 768px) {
                    .didri-slider-item {
                        height: 14rem;
                    }
                }

                @media (min-width: 1200px) {
                    .didri-slider-item {
                        height: 16rem;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .didri-slider-row,
                    .didri-slider-row-reverse {
                        animation: none;
                    }
                }
            `}</style>

            <section className="relative overflow-hidden bg-black py-12">
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/90 to-black" />
                <div className={`didri-slider-stage relative z-10 flex w-full flex-col gap-5 ${activeId ? "is-paused" : ""}`}>
                    <SliderRow
                        images={topImages}
                        activeId={activeId}
                        setActiveId={setActiveId}
                        openImage={setSelectedImage}
                    />
                    <SliderRow
                        images={bottomImages}
                        reverse
                        activeId={activeId}
                        setActiveId={setActiveId}
                        openImage={setSelectedImage}
                    />
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-20 h-24 bg-gradient-to-t from-black to-transparent" />
            </section>

            {selectedImage ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <button
                        type="button"
                        className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 p-2 text-white transition-colors hover:bg-white/10"
                        onClick={closeModal}
                        aria-label="Close image view"
                    >
                        <X size={24} />
                    </button>
                    <div
                        className="flex max-h-[88vh] max-w-[94vw] flex-col items-center gap-4"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            className="max-h-[78vh] max-w-[94vw] rounded-lg object-contain shadow-2xl"
                        />
                        {selectedImageLinksToAiArt ? (
                            <button
                                type="button"
                                onClick={goToAiArt}
                                className="rounded-lg border border-[#f0d599]/30 bg-[#f0d599] px-5 py-2 text-sm font-semibold text-[#13212e] shadow-lg transition-colors hover:bg-[#e5c77e]"
                            >
                                Click here to go to content
                            </button>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </>
    );
};
