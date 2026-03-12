import React from "react";
import InteractiveBentoGallery from "../components/ui/interactive-bento-gallery";

const dji0111 = new URL("../images/AI_images_videos/DJI_0111.MP4", import.meta.url).href;
const dji0114 = new URL("../images/AI_images_videos/DJI_0114.JPG", import.meta.url).href;
const dji0116 = new URL("../images/AI_images_videos/DJI_0116.JPG", import.meta.url).href;
const dji0117 = new URL("../images/AI_images_videos/DJI_0117.JPG", import.meta.url).href;
const dji0141 = new URL("../images/AI_images_videos/DJI_0141.JPG", import.meta.url).href;
const dji0142 = new URL("../images/AI_images_videos/DJI_0142.MP4", import.meta.url).href;

const mediaItems = [
    { id: 1, type: "video", title: "Drone motion 0111", desc: "AI_images_videos clip 0111.", url: dji0111, span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2" },
    { id: 2, type: "image", title: "Drone still 0114", desc: "High-resolution still from the AI_images_videos collection.", url: dji0114, span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2" },
    { id: 3, type: "image", title: "Drone still 0116", desc: "AI_images_videos still 0116.", url: dji0116, span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2" },
    { id: 4, type: "image", title: "Drone still 0117", desc: "AI_images_videos still 0117.", url: dji0117, span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2" },
    { id: 5, type: "image", title: "Drone still 0141", desc: "High-resolution still from the AI_images_videos collection.", url: dji0141, span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2" },
    { id: 6, type: "video", title: "Drone motion 0142", desc: "Looping motion study from the AI_images_videos collection.", url: dji0142, span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2" }
];

export function AiArtGallerySection() {
    return (
        <InteractiveBentoGallery
            mediaItems={mediaItems}
            title="Gallery Shots Collection"
            description="Drag and explore the local AI_images_videos gallery."
        />
    );
}
