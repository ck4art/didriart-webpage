import type { ArticleContentBlock } from "./App";
const snow = new URL("../images/drone-fieldnotes/snow.webp", import.meta.url).href;
const sunset = new URL("../images/drone-fieldnotes/sunset.webp", import.meta.url).href;
const fieldsPoster = new URL("../images/drone-fieldnotes/fields.webp", import.meta.url).href;
const mountainPoster = new URL("../images/drone-fieldnotes/mountain.webp", import.meta.url).href;

export const droneCover = sunset;
export const droneContent: ArticleContentBlock[] = [
    "Look at the two photographs below. In the winter frame the bare trees have enough dark branches to stand out against the snow. At sunset the trees nearly disappear into the hillside, but the gap between two ridges catches the last light. The camera in both files is the same DJI Hasselblad L1D-20c. What changes is where the eye can land.",
    { type: "image-grid", images: [
        { src: snow, alt: "Bare trees scattered across a snow-covered hillside under broken clouds", caption: "Against snow, even the smallest branches draw a readable line." },
        { src: sunset, alt: "Low sun above a green valley and a succession of darker ridges", caption: "At sunset, the outlines of the hills carry the composition." }
    ] },
    { type: "heading", text: "Decide what the viewer should see move" },
    "Watch the edge of the field in this clip, then watch the distant ridge. The near ground travels across the frame much faster. That difference, called parallax, gives a flat screen a sense of depth. A field boundary or a row of trees can do more for a shot than another fifty metres of altitude.",
    { type: "video", src: new URL("../images/AI_images_videos/DJI_0111.MP4", import.meta.url).href, poster: fieldsPoster, label: "A pass across open fields. Follow the near edge of the field, then the skyline." },
    "Before recording, choose the first and last frame. For one take, hold the gimbal angle steady and fly a single slow line. For another, keep the aircraft still and tilt the camera. Leave a few quiet seconds at both ends. In the edit, those seconds give you somewhere to cut before the aircraft brakes or the gimbal changes direction.",
    { type: "heading", text: "Give a vertical frame a foreground" },
    "The Zhangjiajie clip has a natural subject for a phone screen. A single sandstone pillar fills the middle of the frame while a second wall of rock sits behind it. Watch the gap on either side of the pillar as the view changes. When planning a vertical cut from landscape footage, leave room around the subject for precisely that movement.",
    { type: "video", src: new URL("../images/China-Reise/FamousAvatarMountain.mp4", import.meta.url).href, poster: mountainPoster, label: "Zhangjiajie, China. The trees on the nearest pillar give the distant cliffs their scale." },
    { type: "link", href: "https://www.instagram.com/ck_4rt/reel/DAzaxL0IDNG/", label: "Watch the Zhangjiajie reel on Instagram" },
    { type: "heading", text: "Three flights to watch on Instagram" },
    "These were the three most-viewed reels visible on @ck_4rt on 24 November 2026. Try watching them back to back. The castle gives your eye a fixed landmark, a time-lapse makes movement on a bridge legible, and a stream supplies its own line through a frame.",
    { type: "link", href: "https://www.instagram.com/ck_4rt/reel/CT7aUuIJ3oy/", label: "Schloss Lichtenstein · 4,752 views" },
    { type: "link", href: "https://www.instagram.com/ck_4rt/reel/CPqammIi8I-/", label: "Würzburg time-lapse · 1,396 views" },
    { type: "link", href: "https://www.instagram.com/ck_4rt/reel/CP52zitCnCh/", label: "Summer stream · 1,150 views" },
    { type: "link", href: "https://www.instagram.com/ck_4rt/reels/", label: "See more reels from @ck_4rt" },
    { type: "heading", text: "A DJI check before take-off" },
    "Walk the launch area. Look for wires against the sky, bare branches, people, and a clear alternative landing spot. Check wind and gusts for the return leg, the condition of the propellers, the battery, and space on the card. If the wind picks up, shorten the flight while there is still plenty of charge to land.",
    "In your DJI app, confirm that the recorded home point is actually where you want to land. Review the signal-loss action and the return path for your model. A return height that clears a tree on one side of the valley may still put the aircraft below the slope on the other. Choose a route that gives you clearance within the permitted height, and keep the aircraft in sight.",
    { type: "link", href: "https://support.dji.com/help/content?customId=01700006776&lang=en&paperDocType=ARTICLE&re=GB&spaceId=17", label: "DJI support · Check return-to-home behaviour for your model" },
    { type: "heading", text: "Expose for the sky, then check the ground" },
    "Snow and low sun are good tests of exposure. If your app offers a histogram or overexposure warnings, check the bright areas before the take. Once the framing is set, lock white balance and exposure for a test pass so the colours and brightness stay consistent through the move. Play the clip back and look for detail in the snow and in the trees.",
    "For video at 25 frames per second, try a shutter speed around 1/50 second as a starting point for natural motion blur. An ND filter can make that possible in bright light. For a still of branches moving in wind, a faster shutter may give a cleaner result. Compare the files at full size before committing the rest of a flight to one setting.",
    { type: "heading", text: "Check the location before you pack" },
    "In the EU open category, plan to keep the aircraft in visual line of sight, within 120 metres of the nearest ground, and away from assemblies of people. The rules for nearby individuals depend on the aircraft and subcategory. A camera on a non-toy drone normally triggers operator registration even below 250 grams. In Germany, check that your liability insurance covers the flight and consult the official geographical-zone map for the specific site.",
    { type: "link", href: "https://www.easa.europa.eu/en/domains/drones-air-mobility/operating-drone/open-category-low-risk-civil-drones", label: "EASA · Find the rules for your drone class" },
    { type: "link", href: "https://maptool-dipul.dfs.de/", label: "Germany · Check the dipul geographical-zone map" },
    { type: "link", href: "https://www.dipul.de/homepage/en/information/general/first-steps/quick-guide-for-drone-operations-not-barrier-free.pdf?cid=145", label: "Germany · Registration, insurance and pre-flight checks" },
    "For a trip abroad, check the destination’s aviation authority and the site operator before travelling. The Zhangjiajie footage documents a visit in 2024. Park access and flight permissions can change. Give people privacy when framing and publishing footage, and leave wildlife room to move undisturbed.",
    { type: "heading", text: "Keep the original take" },
    "When you copy the card, keep an untouched original and a second copy before formatting it. Export the landscape cut and the vertical reel separately. A few notes about light, wind and the move that worked will be more useful on the next flight than a folder full of files named DJI_0001."
];
