import React from "react";
import InteractiveImageBentoGallery from "../components/ui/bento-gallery";

const imageModules = import.meta.glob("../images/AI_images_videos/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP,GIF}", {
    eager: true,
    query: "?url",
    import: "default"
}) as Record<string, string>;

const spanPattern = [
    "md:col-span-2 md:row-span-2",
    "md:row-span-1",
    "md:row-span-1",
    "md:col-span-2 md:row-span-1"
];

const formatTitle = (path: string) => {
    const fileName = path.split("/").pop() ?? "AI image";
    return fileName.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
};

const imageItems = Object.entries(imageModules)
    .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath, undefined, { numeric: true }))
    .map(([path, url], index) => ({
        id: path,
        title: formatTitle(path),
        desc: "AI image and video study.",
        url,
        span: spanPattern[index % spanPattern.length]
    }));

export function AiArtGallerySection() {
    return (
        <InteractiveImageBentoGallery
            imageItems={imageItems}
            title="Aerial Image Studies"
            description="A current selection from the AI image folder. Drag across the strip and open individual frames."
        />
    );
}
