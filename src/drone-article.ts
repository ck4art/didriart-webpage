import type { ArticleContentBlock } from "./App";
const snow = new URL("../images/drone-fieldnotes/snow.webp", import.meta.url).href;
const sunset = new URL("../images/drone-fieldnotes/sunset.webp", import.meta.url).href;
const harbourPoster = new URL("../images/drone-fieldnotes/harbour-orbit.webp", import.meta.url).href;

export const droneCover = sunset;
export const droneContent: ArticleContentBlock[] = [
    "Look at the two photographs below. In the winter frame the bare trees have enough dark branches to stand out against the snow. At sunset the trees nearly disappear into the hillside, but the gap between two ridges catches the last light. The camera in both files is the same DJI Hasselblad L1D-20c. What changes is where the eye can land.",
    { type: "image-grid", images: [
        { src: snow, alt: "Bare trees scattered across a snow-covered hillside under broken clouds", caption: "Against snow, even the smallest branches draw a readable line." },
        { src: sunset, alt: "Low sun above a green valley and a succession of darker ridges", caption: "At sunset, the outlines of the hills carry the composition." }
    ] },
    { type: "heading", text: "Follow the harbour wall" },
    "The harbour wall gives this short film a shape you can follow all the way around. First it separates the turquoise water from the boats. A few seconds later the same curve points back towards the town. Watch the end of the breakwater as the camera turns and the shot changes direction.",
    { type: "video", src: new URL("../videos/harbour-orbit.mp4", import.meta.url).href, poster: harbourPoster, label: "Harbour orbit · 13 seconds. A coastal quickshot with its original soundtrack." },
    { type: "heading", text: "Above the sandstone pillars of Zhangjiajie" },
    "Look at the trees growing on top of the nearest pillar. Their size gives the first hint of how tall the rock towers are. As the camera moves, watch the gap open between that pillar and the cliffs behind it.",
    { type: "instagram-reels", reels: [
        { id: "DAzaxL0IDNG", title: "Watch the Zhangjiajie film on Instagram", after: "." }
    ] },
    { type: "heading", text: "Three ways to frame a landscape" },
    { type: "instagram-reels", reels: [
        { id: "CT7aUuIJ3oy", title: "Schloss Lichtenstein", after: " gives the eye a fixed point above the trees." },
        { id: "CPqammIi8I-", title: "The Würzburg time-lapse", after: " lets movement across the bridge set the pace." },
        { id: "CP52zitCnCh", title: "The summer stream", after: " draws a line through the greenery." }
    ] },
    { type: "linked-paragraph", parts: ["Find more flights on ", { text: "@ck_4rt", href: "https://www.instagram.com/ck_4rt/reels/" }, "."] },
    { type: "heading", text: "A DJI check before take-off" },
    "Walk the launch area. Look for wires against the sky, bare branches, people, and a clear alternative landing spot. Check wind and gusts for the return leg, the condition of the propellers, the battery, and space on the card. If the wind picks up, shorten the flight while there is still plenty of charge to land.",
    { type: "linked-paragraph", parts: [
        "Before take-off, check the home point on the map in your DJI app. This is the point the aircraft heads towards when Return to Home (RTH) is active. Read ",
        { text: "DJI’s Return to Home guide for your model", href: "https://support.dji.com/help/content?customId=01700006776&lang=en&paperDocType=ARTICLE&re=GB&spaceId=17" },
        " to see how it chooses its return path. Check the signal-loss setting separately. A return height that clears the trees at take-off may still leave a hillside in the way farther along the route."
    ] },
    { type: "heading", text: "Expose for the sky, then check the ground" },
    "Snow and low sun are good tests of exposure. If your app offers a histogram or overexposure warnings, check the bright areas before the take. Once the framing is set, lock white balance and exposure for a test pass so the colours and brightness stay consistent through the move. Play the clip back and look for detail in the snow and in the trees.",
    "For video at 25 frames per second, try a shutter speed around 1/50 second as a starting point for natural motion blur. An ND filter can make that possible in bright light. For a still of branches moving in wind, a faster shutter may give a cleaner result. Compare the files at full size before committing the rest of a flight to one setting.",
    { type: "heading", text: "Check the location before you pack" },
    { type: "linked-paragraph", parts: [
        "In the EU open category, keep the aircraft in sight, stay within 120 metres of the nearest ground and avoid flying over crowds. ",
        { text: "EASA’s guide by drone class", href: "https://www.easa.europa.eu/en/domains/drones-air-mobility/operating-drone/open-category-low-risk-civil-drones" },
        " explains how close you may fly to other people and when you need to register. Even below 250 grams, a camera on a non-toy drone usually means the operator must register."
    ] },
    { type: "linked-paragraph", parts: [
        "For a flight in Germany, look up the site on the ",
        { text: "official drone-zone map", href: "https://maptool-dipul.dfs.de/" },
        " and select the marked areas to read the restrictions. The ",
        { text: "German pre-flight checklist (PDF)", href: "https://www.dipul.de/homepage/en/information/general/first-steps/quick-guide-for-drone-operations-not-barrier-free.pdf?cid=145" },
        " covers operator registration, liability insurance and what to check before take-off."
    ] },
    "For a trip abroad, check the destination’s aviation authority and the site operator before travelling. The Zhangjiajie footage documents a visit in 2024. Park access and flight permissions can change. Give people privacy when framing and publishing footage, and leave wildlife room to move undisturbed.",
    { type: "heading", text: "Keep the original take" },
    "When you copy the card, keep an untouched original and a second copy before formatting it. Export the landscape cut and the vertical reel separately. A few notes about light, wind and the move that worked will be more useful on the next flight than a folder full of files named DJI_0001."
];
