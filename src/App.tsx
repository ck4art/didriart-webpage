import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HashRouter, Link, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AiArtGallerySection } from "./ai-art-gallery";
import { Footerdemo } from "../components/ui/footer-section";
import { ImageAutoSlider } from "../components/ui/image-auto-slider";

const heroVideo = new URL("../videos/DiscDiffReverse.mp4", import.meta.url).href;
const speedpaintingImage = new URL("../images/portfolio/didriart_c3.webp", import.meta.url).href;
const aiArtImage = new URL("../images/portfolio/AI art.png", import.meta.url).href;
const droneImage = new URL("../images/portfolio/didriart_c2.webp", import.meta.url).href;
const travelImage = new URL("../images/news/chinapage.jpg", import.meta.url).href;
const diffusionImage = new URL("../images/news/profilepic-small.png.png", import.meta.url).href;
const traditionalImage = new URL("../images/portfolio/traditional_art_vs_AI_art.jpeg", import.meta.url).href;
const fluxImage = new URL("../images/portfolio/Flux_2_klein.jpg", import.meta.url).href;
const personalensImage = new URL("../images/portfolio/Personalens.jpg", import.meta.url).href;
const portraitImage = new URL("../images/people/didriart_c4_skaliert.png", import.meta.url).href;
const doctorVideo = new URL("../videos/doctor3.mp4", import.meta.url).href;
const droneVideo = new URL("../videos/814dc43e870597176cad645798825c03.mp4", import.meta.url).href;
const diffusionVideo = new URL("../videos/DiscDiffReverse.mp4", import.meta.url).href;
const genVideo = new URL("../videos/Gen-2 64781368, Diffusion of two liq, profilepic-smallpng, M 5.mp4", import.meta.url).href;

const portfolioCards = [
    { title: "Speedpainting Videos", subtitle: "Capture the drawing process", image: speedpaintingImage, route: "/speedpainting" },
    { title: "AI Art", subtitle: "Images & Videos", image: aiArtImage, route: "/ai-art" },
    { title: "Drone Videos", subtitle: "Art of the landscape", image: droneImage, route: "/drone-videos" }
];

const blogPosts = [
    { title: "How Systems Evolve: A Dive into Diffusion Processes", category: "Diffusion and dissipative processes", image: diffusionImage, route: "/diffusion" },
    { title: "Travel blog - Traveling Through China (1): Thoughts and experiences", category: "Exploring China", image: travelImage, route: "/travel", meta: "China, January 31, 2025" },
    { title: "traditional art vs AI art", category: "art theory and opinion", image: traditionalImage, route: "/traditional-art-vs-ai-art" },
    { title: "FLUX.2 [klein] Tutorial", category: "Tutorial", image: fluxImage, route: "/flux-2-klein-tutorial", meta: "January 2026" },
    { title: "Personalens", category: "Essay", image: personalensImage, route: "/personalens" }
];

const translations = {
    en: {
        home: "Home",
        aboutMe: "About me",
        portfolio: "Portfolio",
        blogPost: "Blog Posts",
        contact: "Contact",
        language: "Language",
        english: "English",
        chinese: "Chinese",
        aboutHeader: "Hey there...",
        aboutTextOne: "Welcome to my personal homepage. Here, you'll find information about the various services I offer, along with blog posts covering a wide range of topics, from science and culture to art and medicine.",
        aboutTextTwo: "A little about me: My background is in molecular medicine (M.Sc.), and I spent time conducting research in neuroscience and psychology before transitioning into bioinformatics and data science.",
        aboutTextThree: "If this site provides value to even a few people, then its purpose is fulfilled.",
        contactLead: "Collaborations, AI art projects, blog ideas, and visual commissions."
    },
    ch: {
        home: "首页",
        aboutMe: "关于我",
        portfolio: "作品集",
        blogPost: "博客文章",
        contact: "联系",
        language: "语言",
        english: "英文",
        chinese: "中文",
        aboutHeader: "让我们一起创造一些东西...",
        aboutTextOne: "欢迎来到我的个人主页。在这里，你可以找到我提供的不同服务的信息，以及涵盖科学、文化、艺术和医学等不同主题的博客文章。",
        aboutTextTwo: "关于我自己：我拥有分子医学硕士学位，之后从事过神经科学和心理学研究，后来转向生物信息学和数据科学。",
        aboutTextThree: "如果这个网站能为哪怕少数几个人带来价值，那它就达到了自己的目的。",
        contactLead: "合作、AI 艺术项目、博客想法和视觉委托。"
    }
} as const;

type Language = keyof typeof translations;

function AnimatedHeroWordmark() {
    const sourcePieces = [
        { id: "d1", text: "d", targetId: "d1", drift: 0, opacity: 1, scale: 1 },
        { id: "i1", text: "i", targetId: "i1", drift: 0, opacity: 1, scale: 1 },
        { id: "ss", text: "sscipative ", drift: 50, opacity: 0, scale: 0.1 },
        { id: "r1", text: "r", targetId: "r1", drift: 0, opacity: 1, scale: 1 },
        { id: "rev", text: "eversed ", drift: 60, opacity: 0, scale: 0.1 },
        { id: "d2", text: "d", targetId: "d2", drift: 0, opacity: 1, scale: 1 },
        { id: "i2", text: "i", targetId: "i2", drift: 0, opacity: 1, scale: 1 },
        { id: "ff", text: "ffusers", drift: 70, opacity: 0, scale: 0.1 },
        { id: "art", text: ".art", targetId: "art", drift: 0, opacity: 1, scale: 1, art: true }
    ] as const;

    const targetPieces = [
        { id: "d1", text: "d" },
        { id: "i1", text: "i" },
        { id: "d2", text: "d" },
        { id: "r1", text: "r" },
        { id: "i2", text: "i" },
        { id: "art", text: ".art" }
    ] as const;

    const wrapperRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLSpanElement>(null);
    const sourceLineRef = useRef<HTMLSpanElement>(null);
    const targetLineRef = useRef<HTMLSpanElement>(null);
    const sourceRefs = useRef<Record<string, HTMLSpanElement | null>>({});
    const targetRefs = useRef<Record<string, HTMLSpanElement | null>>({});
    const [pieceVars, setPieceVars] = useState<Record<string, React.CSSProperties>>({});
    const [stageWidth, setStageWidth] = useState(0);

    useLayoutEffect(() => {
        const wrapper = wrapperRef.current;
        const sourceLine = sourceLineRef.current;
        const targetLine = targetLineRef.current;
        const stage = stageRef.current;

        if (!wrapper || !sourceLine || !targetLine || !stage) {
            return undefined;
        }

        const measure = () => {
            const sourceWidth = sourceLine.offsetWidth;
            const targetWidth = targetLine.offsetWidth;
            const nextStageWidth = Math.max(sourceWidth, targetWidth);
            setStageWidth(nextStageWidth);

            const nextVars: Record<string, React.CSSProperties> = {};
            for (const piece of sourcePieces) {
                const sourceEl = sourceRefs.current[piece.id];
                if (!sourceEl) {
                    continue;
                }

                const sx = sourceEl.offsetLeft;
                const targetEl = piece.targetId ? targetRefs.current[piece.targetId] : null;
                const tx = targetEl ? targetEl.offsetLeft : sx + piece.drift;

                nextVars[piece.id] = {
                    ["--sx" as never]: `${sx}px`,
                    ["--tx" as never]: `${tx}px`,
                    ["--target-opacity" as never]: piece.art ? 1 : piece.opacity,
                    ["--target-scale" as never]: piece.scale
                } as React.CSSProperties;
            }

            const wrapperWidth = wrapper.clientWidth;
            let scaleFactor = wrapperWidth / nextStageWidth;
            scaleFactor = Math.min(scaleFactor, 1);
            stage.style.transform = `scale(${scaleFactor})`;
            setPieceVars(nextVars);
        };

        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    return (
        <div id="textAnimateWrapper" ref={wrapperRef} className="text-animate-wrapper">
            <span
                id="textAnimate"
                ref={stageRef}
                className="text-animate"
                style={stageWidth ? { width: `${stageWidth}px` } : undefined}
            >
                <span ref={sourceLineRef} className="hero-measure hero-measure-source" aria-hidden="true">
                    {sourcePieces.map((piece) => (
                        <span
                            key={`source-${piece.id}`}
                            ref={(node) => {
                                sourceRefs.current[piece.id] = node;
                            }}
                        >
                            {piece.text}
                        </span>
                    ))}
                </span>
                <span ref={targetLineRef} className="hero-measure hero-measure-target" aria-hidden="true">
                    {targetPieces.map((piece) => (
                        <span
                            key={`target-${piece.id}`}
                            ref={(node) => {
                                targetRefs.current[piece.id] = node;
                            }}
                        >
                            {piece.text}
                        </span>
                    ))}
                </span>
                {sourcePieces.map((piece) => (
                    <span
                        key={piece.id}
                        className={piece.art ? "art-piece" : piece.targetId ? "letter-piece" : "word-piece"}
                        style={pieceVars[piece.id]}
                    >
                        {piece.text}
                    </span>
                ))}
            </span>
        </div>
    );
}

function ScrollManager() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [location.pathname]);

    return null;
}

function SiteNav({ language, setLanguage }: { language: Language; setLanguage: (lang: Language) => void }) {
    const navigate = useNavigate();
    const location = useLocation();
    const copy = translations[language];

    const goToSection = (sectionId: string) => {
        if (location.pathname !== "/") {
            navigate("/", { state: { scrollTo: sectionId } });
            return;
        }
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    useEffect(() => {
        const state = window.history.state?.usr as { scrollTo?: string } | undefined;
        if (location.pathname === "/" && state?.scrollTo) {
            const timer = window.setTimeout(() => {
                document.getElementById(state.scrollTo!)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 60);
            return () => window.clearTimeout(timer);
        }
        return undefined;
    }, [location]);

    return (
        <header className="site-nav">
            <div className="site-nav-inner">
                <Link to="/" className="brand">didri.art</Link>
                <nav className="nav-links">
                    <button type="button" onClick={() => goToSection("hero")}>{copy.home}</button>
                    <button type="button" onClick={() => goToSection("portfolio")}>{copy.portfolio}</button>
                    <button type="button" onClick={() => goToSection("news")}>{copy.blogPost}</button>
                    <button type="button" onClick={() => goToSection("contact")}>{copy.contact}</button>
                    <label className="language-switch">
                        <span>{copy.language}</span>
                        <select value={language} onChange={(event) => setLanguage(event.target.value as Language)}>
                            <option value="en">{copy.english}</option>
                            <option value="ch">{copy.chinese}</option>
                        </select>
                    </label>
                </nav>
            </div>
        </header>
    );
}

function Layout({
    children,
    language,
    setLanguage
}: {
    children: React.ReactNode;
    language: Language;
    setLanguage: (lang: Language) => void;
}) {
    return (
        <div className="app-shell">
            <SiteNav language={language} setLanguage={setLanguage} />
            {children}
            <Footerdemo />
        </div>
    );
}

function HomePage({ language, setLanguage }: { language: Language; setLanguage: (lang: Language) => void }) {
    const copy = translations[language];

    return (
        <Layout language={language} setLanguage={setLanguage}>
            <section className="hero-section" id="hero">
                <video className="hero-video" src={heroVideo} autoPlay muted loop playsInline />
                <div className="hero-overlay" />
                <div className="hero-copy container">
                    <AnimatedHeroWordmark />
                    <p className="hero-subtitle">I&apos;m Christoph and I&apos;m an artist.</p>
                </div>
            </section>

            <section className="content-section" id="about">
                <div className="container">
                    <div className="row align-items-center g-4">
                        <div className="col-lg-6">
                            <h2>{copy.aboutHeader}</h2>
                            <p>{copy.aboutTextOne}</p>
                            <p>{copy.aboutTextTwo}</p>
                            <p>{copy.aboutTextThree}</p>
                        </div>
                        <div className="col-lg-6">
                            <img src={portraitImage} alt="Portrait" className="feature-image" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="content-section" id="portfolio">
                <div className="container">
                    <h2 className="section-title">Portfolio</h2>
                    <div className="row g-4">
                        {portfolioCards.map((card) => (
                            <div className="col-lg-4 col-md-6" key={card.title}>
                                <Link to={card.route} className="card-link">
                                    <article className="showcase-card">
                                        <img src={card.image} alt={card.title} className="uniform-card-image" />
                                        <div className="showcase-card-body">
                                            <h3>{card.title}</h3>
                                            <p>{card.subtitle}</p>
                                        </div>
                                    </article>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ImageAutoSlider />

            <section className="content-section" id="news">
                <div className="container">
                    <h2 className="section-title">Blog posts</h2>
                    <div className="row g-4">
                        {blogPosts.map((post) => (
                            <div className="col-lg-6" key={post.title}>
                                <Link to={post.route} className="card-link">
                                    <article className="showcase-card">
                                        <img src={post.image} alt={post.title} className="uniform-card-image" />
                                        <div className="post-category">{post.category}</div>
                                        <div className="showcase-card-body">
                                            <h3>{post.title}</h3>
                                            {post.meta ? <p>{post.meta}</p> : null}
                                        </div>
                                    </article>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}

function ArticleHero({ title, image, dateLabel }: { title: string; image: string; dateLabel?: string }) {
    return (
        <section className="article-hero">
            <img src={image} alt={title} className="article-hero-image" />
            <div className="article-hero-overlay" />
            <div className="article-hero-copy container">
                <h1>{title}</h1>
                {dateLabel ? <p>{dateLabel}</p> : null}
            </div>
        </section>
    );
}

function VideoBlock({ src, label }: { src: string; label: string }) {
    return (
        <div className="media-block">
            <video src={src} controls playsInline preload="metadata" className="article-video" />
            <p>{label}</p>
        </div>
    );
}

function TextArticlePage({
    title,
    image,
    dateLabel,
    paragraphs,
    next,
    language,
    setLanguage
}: {
    title: string;
    image: string;
    dateLabel?: string;
    paragraphs: string[];
    next?: { label: string; route: string };
    language: Language;
    setLanguage: (lang: Language) => void;
}) {
    return (
        <Layout language={language} setLanguage={setLanguage}>
            <ArticleHero title={title} image={image} dateLabel={dateLabel} />
            <section className="content-section">
                <div className="container article-container">
                    {paragraphs.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
                </div>
            </section>
            {next ? (
                <section className="content-section pt-0">
                    <div className="container next-link-block">
                        <span>Next article</span>
                        <NavLink to={next.route}>{next.label}</NavLink>
                    </div>
                </section>
            ) : null}
        </Layout>
    );
}

function SpeedpaintingPage({ language, setLanguage }: { language: Language; setLanguage: (lang: Language) => void }) {
    return (
        <Layout language={language} setLanguage={setLanguage}>
            <ArticleHero title="Speedpainting Videos" image={speedpaintingImage} dateLabel="March 2026" />
            <section className="content-section">
                <div className="container article-container">
                    <p>These speedpainting clips focus on the movement from rough composition to finished image. Instead of presenting only the final artwork, the videos make the sequence of decisions visible: blocking shapes, shifting color balance, refining anatomy, and deciding when to stop.</p>
                    <p>I use these pieces both as finished works and as process documents. They record hesitation, correction, and rhythm. That makes them useful for viewers who enjoy the image itself and for anyone interested in the mechanics of digital painting.</p>
                    <VideoBlock src={doctorVideo} label="A compact study showing the evolution from sketch to a more resolved painted figure." />
                    <VideoBlock src={droneVideo} label="A second time-based study with a faster transition between broad strokes and detail work." />
                </div>
            </section>
        </Layout>
    );
}

function DroneVideosPage({ language, setLanguage }: { language: Language; setLanguage: (lang: Language) => void }) {
    return (
        <Layout language={language} setLanguage={setLanguage}>
            <ArticleHero title="Drone Videos" image={droneImage} dateLabel="March 2026" />
            <section className="content-section">
                <div className="container article-container">
                    <p>The drone work extends the portfolio from image-making into camera choreography. The goal is not only to document a place from above, but to find movements that reveal scale, repetition, and atmosphere in a way that feels painterly rather than purely documentary.</p>
                    <p>These clips sit between observation and composition. Motion, altitude changes, and framing decisions become part of the artwork, especially when landscape structures or urban geometry start to read like abstract forms.</p>
                    <VideoBlock src={droneVideo} label="A short aerial sequence focused on motion, pacing, and a cinematic view of the landscape." />
                </div>
            </section>
        </Layout>
    );
}

function AiArtPage({ language, setLanguage }: { language: Language; setLanguage: (lang: Language) => void }) {
    return (
        <Layout language={language} setLanguage={setLanguage}>
            <ArticleHero title="AI Art" image={aiArtImage} dateLabel="March 2026" />
            <section className="content-section">
                <div className="container article-container wide">
                    <p>The AI work on the site is less about automation than about curation and direction. Prompting, iteration, image selection, and post-processing each shape the final result. What matters is not the tool by itself, but the visual language that emerges from repeated refinement.</p>
                    <p>The gallery below is sourced from the current browser-displayable media inside the local <code>AI_images_videos</code> folder, so the page reflects the actual assets present in the project.</p>
                    <AiArtGallerySection />
                    <VideoBlock src={diffusionVideo} label="Diffusion study focused on transformation, texture, and temporal flow." />
                    <VideoBlock src={genVideo} label="Generated sequence emphasizing motion design and composited image flow." />
                </div>
            </section>
        </Layout>
    );
}

function AppRoutes({ language, setLanguage }: { language: Language; setLanguage: (lang: Language) => void }) {
    return (
        <>
            <ScrollManager />
            <Routes>
                <Route path="/" element={<HomePage language={language} setLanguage={setLanguage} />} />
                <Route path="/speedpainting" element={<SpeedpaintingPage language={language} setLanguage={setLanguage} />} />
                <Route path="/ai-art" element={<AiArtPage language={language} setLanguage={setLanguage} />} />
                <Route path="/drone-videos" element={<DroneVideosPage language={language} setLanguage={setLanguage} />} />
                <Route path="/diffusion" element={<TextArticlePage language={language} setLanguage={setLanguage} title="How Systems Evolve: A Dive into Diffusion Processes" image={diffusionImage} paragraphs={["This article looks at diffusion and dissipative systems as both scientific concepts and visual metaphors. Diffusion describes spread, transfer, and smoothing across time. Dissipative systems remain open, exchanging matter or energy with their surroundings and evolving through that openness.", "What makes these ideas artistically interesting is the way they sit between order and instability. Forms appear, dissolve, and reorganize. Small local actions become large-scale patterns. That movement is useful for thinking about image making, process, and change.", "The page acts as a conceptual bridge between art, physics, and animation: how systems shift, how structures emerge, and how visual motion can borrow from those dynamics."]} next={{ label: "Travel blog - Traveling Through China (1): Thoughts and experiences", route: "/travel" }} />} />
                <Route path="/travel" element={<TextArticlePage language={language} setLanguage={setLanguage} title="Travel blog - Traveling Through China (1): Thoughts and experiences" image={travelImage} dateLabel="January 31, 2025" paragraphs={["This three-part travelogue describes a two-week trip to China in late 2024. I visited a friend in Qingdao and went on a short round trip with him. Alongside the experiences, the article also collects practical tips for planning a trip to China.", "Preparation was relatively simple, but digital setup mattered. Mobile payments, maps, translation apps, and access to Western services all shape the practical side of travel there. Once in Qingdao, the city immediately stood out through the contrast between dense residential blocks, coastlines, and vibrant nightlife.", "The later part of the trip led to Zhangjiajie National Park, where cable cars, mountain formations, and the scale of the landscape made the journey worthwhile despite the long transfers. The piece is less about checklist tourism and more about what it feels like to move through those environments."]} next={{ label: "traditional art vs AI art", route: "/traditional-art-vs-ai-art" }} />} />
                <Route path="/traditional-art-vs-ai-art" element={<TextArticlePage language={language} setLanguage={setLanguage} title="traditional art vs AI art" image={traditionalImage} paragraphs={["Traditional art and AI art are often framed as opposites, but the more useful comparison is between their constraints. Traditional media resist through the hand, the surface, and the material. AI systems relocate that resistance into prompting, curation, iteration, and post-processing.", "That means both can contain real authorship, but it becomes visible in different places. In one medium, labor is embedded in the stroke and the irreversible mark. In the other, it can be embedded in selection, sequencing, and refinement across generations.", "The argument is not that the media are identical. It is that legitimacy depends less on the tool itself and more on what kind of visual thinking, decision making, and responsibility the work actually shows."]} next={{ label: "FLUX.2 [klein] Tutorial", route: "/flux-2-klein-tutorial" }} />} />
                <Route path="/flux-2-klein-tutorial" element={<TextArticlePage language={language} setLanguage={setLanguage} title="FLUX.2 [klein] Tutorial" image={fluxImage} dateLabel="January 2026" paragraphs={["This tutorial page is meant to document a repeatable setup for FLUX.2 [klein]: start with a narrow prompt target, stabilize composition early, and refine by selective reruns instead of endlessly appending descriptors.", "A practical workflow usually begins with a small number of strong visual anchors and a clear decision about what should remain stable between generations. Once the model begins producing useful structure, iteration becomes more about editing direction than about adding more words.", "The page can function as a living tutorial log: prompt fragments, settings, failed attempts, and the final images that emerge from the process."]} next={{ label: "Personalens", route: "/personalens" }} />} />
                <Route path="/personalens" element={<TextArticlePage language={language} setLanguage={setLanguage} title="Personalens" image={personalensImage} paragraphs={["Personalens can be read as a study of how identity is staged through images. A portrait, figure, or mask is never only descriptive. It also organizes distance: what is revealed, what is stylized, and what remains withheld.", "That makes this kind of work useful for thinking about self-presentation across media. The image is not just about a person. It is about the lens through which a person becomes legible and the way persona is assembled through visual choices.", "As an article, the page holds the reflective layer behind the work: references, artistic intent, and the balance between intimacy and construction."]} next={{ label: "Home", route: "/" }} />} />
            </Routes>
        </>
    );
}

export default function App() {
    const [language, setLanguage] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem("language");
        return savedLanguage === "ch" ? "ch" : "en";
    });

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    return <HashRouter><AppRoutes language={language} setLanguage={setLanguage} /></HashRouter>;
}
