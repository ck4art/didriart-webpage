import { tasteContent, tasteHero } from "./beyond-average-taste";
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

const chinaImageModules = import.meta.glob("../images/China-Reise/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
    eager: true,
    query: "?url",
    import: "default"
}) as Record<string, string>;

const chinaImage = (...terms: string[]) => {
    const match = Object.entries(chinaImageModules).find(([path]) => {
        const normalizedPath = path.toLowerCase();
        return terms.every((term) => normalizedPath.includes(term.toLowerCase()));
    });

    return match?.[1] ?? travelImage;
};

const chinaAnflugImage = chinaImage("anflug");
const chinaWindImage = chinaImage("wind");
const qingdaoCafeImage = chinaImage("qingdao", "cafe");
const qingdaoSkylineImage = chinaImage("skyline", "night");
const zhangjiajieParkImage = chinaImage("zhangjiajie", "national", "forest", "park");
const zhangjiajieFoodImage = chinaImage("zhangjiajie", "cityfood");
const zhangjiajieWunschImage = chinaImage("wunsch");
const chongqingTrainImage = chinaImage("trainto");
const chongqingFoodImage = chinaImage("imbiss");
const chongqingBridgeImage = chinaImage("br", "chongqing");
const chongqingRiverImage = chinaImage("river");
const chongqingLocalsImage = chinaImage("locals1chongqing1");
const chongqingPanoramaVideo = new URL("../images/China-Reise/ChongQingPanorma.mp4", import.meta.url).href;

const portfolioCards = [
    { title: "Speedpainting Videos", subtitle: "Capture the drawing process", image: speedpaintingImage, route: "/speedpainting" },
    { title: "AI Art", subtitle: "Images & Videos", image: aiArtImage, route: "/ai-art" },
    { title: "Drone Videos", subtitle: "Art of the landscape", image: droneImage, route: "/drone-videos" }
];

const blogPosts = [
    { title: "Beyond Average Taste", category: "AI, aesthetics & creative control", image: tasteHero, route: "/beyond-average-taste", meta: "October 21, 2026" },
    { title: "How Systems Evolve: A Dive into Diffusion Processes", category: "Diffusion and dissipative processes", image: diffusionImage, route: "/diffusion" },
    { title: "Traveling through China: Experiences Part 1", category: "Exploring China", image: travelImage, route: "/travel", meta: "China, January 31, 2025" },
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
        contactLead: "Collaborations, AI art projects, blog ideas, and visual commissions.",
        heroMotionLabel: "Hero motion",
        heroMotionOn: "On",
        heroMotionOff: "Off"
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
        contactLead: "合作、AI 艺术项目、博客想法和视觉委托。",
        heroMotionLabel: "动画",
        heroMotionOn: "开",
        heroMotionOff: "关"
    }
} as const;

type Language = keyof typeof translations;

function scrollToPageTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

function forceScrollToPageTop() {
    scrollToPageTop();
    window.requestAnimationFrame(() => {
        scrollToPageTop();
        window.requestAnimationFrame(scrollToPageTop);
    });
    window.setTimeout(scrollToPageTop, 100);
    window.setTimeout(scrollToPageTop, 300);
}

function AnimatedHeroWordmark({ enabled }: { enabled: boolean }) {
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
            {enabled ? (
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
            ) : (
                <span className="text-animate text-animate-static">didri.art</span>
            )}
        </div>
    );
}

function ScrollManager() {
    const location = useLocation();

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    useLayoutEffect(() => {
        scrollToPageTop();

        const frame = window.requestAnimationFrame(() => {
            scrollToPageTop();
        });

        return () => window.cancelAnimationFrame(frame);
    }, [location.pathname, location.search, location.hash, location.key]);

    useEffect(() => {
        scrollToPageTop();

        const frame = window.requestAnimationFrame(() => {
            scrollToPageTop();
            window.requestAnimationFrame(scrollToPageTop);
        });
        const timeout = window.setTimeout(scrollToPageTop, 150);

        return () => {
            window.cancelAnimationFrame(frame);
            window.clearTimeout(timeout);
        };
    }, [location.pathname, location.search, location.hash, location.key]);

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
                <button type="button" className="brand brand-button" onClick={() => goToSection("hero")}>didri.art</button>
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
    setLanguage,
    isDarkMode,
    setIsDarkMode
}: {
    children: React.ReactNode;
    language: Language;
    setLanguage: (lang: Language) => void;
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <div className="app-shell">
            <SiteNav language={language} setLanguage={setLanguage} />
            {children}
            <Footerdemo isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div>
    );
}

function HomePage({
    language,
    setLanguage,
    isDarkMode,
    setIsDarkMode
}: {
    language: Language;
    setLanguage: (lang: Language) => void;
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const copy = translations[language];
    const navigate = useNavigate();
    const [heroMotionEnabled, setHeroMotionEnabled] = useState(true);
    const heroVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = heroVideoRef.current;
        if (!video) {
            return;
        }

        if (heroMotionEnabled) {
            void video.play().catch(() => undefined);
            return;
        }

        const freezeVideo = () => {
            video.pause();
            try {
                video.currentTime = Math.min(0.05, video.duration || 0.05);
            } catch {
                // Keep the first visible frame if seeking is temporarily blocked.
            }
        };

        if (video.readyState >= 2) {
            freezeVideo();
            return;
        }

        video.addEventListener("loadeddata", freezeVideo, { once: true });
        return () => video.removeEventListener("loadeddata", freezeVideo);
    }, [heroMotionEnabled]);

    return (
        <Layout language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
            <section className="hero-section" id="hero">
                <video
                    ref={heroVideoRef}
                    className="hero-video"
                    src={heroVideo}
                    autoPlay={heroMotionEnabled}
                    muted
                    loop={heroMotionEnabled}
                    playsInline
                    preload="metadata"
                />
                <div className="hero-overlay" />
                <div className="hero-motion-toggle" role="group" aria-label={copy.heroMotionLabel}>
                    <span className="hero-motion-label">{copy.heroMotionLabel}</span>
                    <button
                        type="button"
                        className={`hero-motion-button ${heroMotionEnabled ? "is-enabled" : ""}`}
                        aria-pressed={heroMotionEnabled}
                        onClick={() => setHeroMotionEnabled((current) => !current)}
                    >
                        <span className="hero-motion-track" aria-hidden="true">
                            <span className="hero-motion-thumb" />
                        </span>
                        <span>{heroMotionEnabled ? copy.heroMotionOn : copy.heroMotionOff}</span>
                    </button>
                </div>
                <div className="hero-copy container">
                    <AnimatedHeroWordmark enabled={heroMotionEnabled} />
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
                                <Link
                                    to={post.route}
                                    className="card-link"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        navigate(post.route);
                                        forceScrollToPageTop();
                                    }}
                                >
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

export type ArticleContentBlock =
    | { type: "references"; entries: Array<{ author: string; year: string; title: string; publication: string; href: string }> }
    | { type: "heading"; text: string }
    | string
    | {
        type: "image";
        src: string;
        alt: string;
        caption?: string;
        compact?: boolean;
    }
    | {
        type: "image-grid";
        images: Array<{
            src: string;
            alt: string;
            caption?: string;
        }>;
    }
    | {
        type: "video";
        src: string;
        label: string;
    }
    | {
        type: "link";
        href: string;
        label: string;
    }
    | {
        type: "embed-link";
        href: string;
        label: string;
        image: string;
        title: string;
        description: string;
    };

function ArticleImageBlock({ src, alt, caption, compact }: { src: string; alt: string; caption?: string; compact?: boolean }) {
    return (
        <figure className={`media-block ${compact ? "media-block-compact" : ""}`}>
            <img src={src} alt={alt} className="article-inline-image" loading="lazy" />
            {caption ? <figcaption>{caption}</figcaption> : null}
        </figure>
    );
}

function ArticleImageGrid({ images }: { images: Array<{ src: string; alt: string; caption?: string }> }) {
    return (
        <div className="article-image-grid">
            {images.map((image) => (
                <ArticleImageBlock
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    caption={image.caption}
                    compact
                />
            ))}
        </div>
    );
}

function ArticleExternalLink({ href, label }: { href: string; label: string }) {
    return (
        <p className="article-link-block">
            <a href={href} target="_blank" rel="noreferrer">
                {label}
            </a>
        </p>
    );
}

function ArticleEmbedLink({
    href,
    label,
    image,
    title,
    description
}: {
    href: string;
    label: string;
    image: string;
    title: string;
    description: string;
}) {
    return (
        <a href={href} target="_blank" rel="noreferrer" className="article-embed-link">
            <img src={image} alt={title} loading="lazy" />
            <span className="article-embed-link-copy">
                <span>{label}</span>
                <strong>{title}</strong>
                <small>{description}</small>
            </span>
        </a>
    );
}

const chinaTravelPart1Content: ArticleContentBlock[] = [
    "Vom 25. September bis 7. Oktober 2024 war ich in China unterwegs. Der ursprüngliche Anlass der Reise war eigentlich ganz einfach: Ich bin über Peking nach Qingdao geflogen, um dort einen Freund für zehn Tage zu besuchen. Schon die Vorbereitung war überraschend unkompliziert. Für deutsche Staatsangehörige war damals bei einem Aufenthalt von bis zu 15 Kalendertagen unter bestimmten Bedingungen keine klassische Visumsbeantragung nötig. Trotzdem sollte man so etwas immer vorab noch einmal prüfen. Wichtig war vor allem, dass der Reisepass noch mindestens sechs Monate gültig ist.",
    "Auch sonst war die Vorbereitung überschaubar. Die Landeswährung ist der Renminbi (RMB), und umgerechnet entsprach 1 Euro zu der Zeit etwa 7,4 RMB. Bargeld dabeizuhaben ist zwar nicht verkehrt, aber in der Praxis läuft in China fast alles digital. Bezahlt wird vielerorts über Alipay oder WeChat Pay, während klassische Kreditkarten deutlich weniger verbreitet sind als man es aus Europa kennt. Gerade als Reisender lohnt es sich deshalb, sich vorab mit den digitalen Zahlungsmöglichkeiten zu beschäftigen. Ebenfalls sinnvoll: ein VPN vor der Reise installieren, da viele westliche Dienste wie Google, WhatsApp, Instagram oder YouTube in China nicht ohne Weiteres funktionieren. Für Kommunikation und viele Alltagsfunktionen ist WeChat dort ohnehin fast unverzichtbar.",
    "Schon der Anflug war spannend. Was mir direkt auffiel, war die ganz andere Art von Architektur und Stadtplanung. Vieles wirkte großflächiger, dichter und gleichzeitig stärker durchgeplant, als ich es aus vielen westlichen Städten kenne. Außerdem sind mir die vielen Windräder aufgefallen - ein Bild, das so gar nicht zu dem im Westen oft verbreiteten Klischee vom ausschließlich schmutzigen China passen wollte.",
    {
        type: "image-grid",
        images: [
            { src: chinaAnflugImage, alt: "Anflug auf China mit dichter Stadtstruktur", caption: "Dichte, Maßstab und andere Stadtmuster aus der Luft." },
            { src: chinaWindImage, alt: "Windräder beim Anflug auf China", caption: "Windräder als sichtbarer Kontrast zu verbreiteten China-Klischees." }
        ]
    },
    "In Qingdao kam ich spät am Abend an meiner Unterkunft an. Wirklich Zeit, um mich vom langen Flug zu erholen, blieb aber erst einmal nicht: Noch am selben Abend ging es mit meinem Freund zum Geburtstag eines Bekannten. Danach war Schlaf wegen des Jetlags zwar dringend nötig, aber der Einstieg in die Reise hätte kaum direkter sein können.",
    "Die nächsten zwei Tage verbrachten wir in Qingdao selbst - mit Stadtbummel, Cafés, Küste und Skyline. Qingdao ist ziemlich interessant. Die Stadt wirkt modern und lebendig, gleichzeitig gibt es noch sichtbare Spuren ihrer Vergangenheit als deutsche Kolonie zur Zeit des Kaiserreichs. Das erkennt man an manchen Kirchen, Gebäuden und nicht zuletzt an der bekannten Bierkultur der Stadt. Dieser Kontrast aus chinesischer Großstadt und europäischen Einflüssen macht Qingdao besonders.",
    { type: "image", src: qingdaoCafeImage, alt: "Café in Qingdao", caption: "Qingdao zwischen Küstenstadt, Alltag und europäisch geprägten Spuren." },
    "Am meisten beeindruckt hat mich aber die Strand-Skyline am Abend. Wenn die miteinander verbundenen Fassaden der Hochhäuser in synchronisierten Lichtinstallationen aufleuchten, entsteht eine fast surreale Atmosphäre - irgendwo zwischen futuristisch und leicht cyberpunkig. Dort habe ich auch einen Drohnenpiloten aus Peking getroffen, der mit seinen zwei DJI-Drohnen Zeitrafferaufnahmen vom Sonnenuntergang gemacht hat. Wir sind dann eine Weile gemeinsam geflogen. Generell ist das Drohnenfliegen in China nicht grundsätzlich unmöglich, aber man sollte sich vorher gut informieren, wo es erlaubt ist und wo nicht. Wenn man sich daran hält, gibt es in der Regel keine Probleme.",
    { type: "image", src: qingdaoSkylineImage, alt: "Nächtliche Skyline von Qingdao", caption: "Die Strand-Skyline von Qingdao am Abend." },
    "Was mir in diesen ersten Tagen ebenfalls positiv aufgefallen ist: Die Menschen habe ich insgesamt als sehr höflich und respektvoll erlebt. Auch wenn Englisch nicht überall verbreitet ist, funktioniert vieles mit Übersetzungs-Apps erstaunlich gut. Aber dennoch lohnt es sich ein paar Standardbegriffe parat zu haben."
];

const chinaTravelPart2Content: ArticleContentBlock[] = [
    "Am dritten Tag ging es schon weiter: mit dem Flugzeug nach Zhangjiajie, wo wir die nächsten Tage im National Forest Park und am Tianmen Mountain verbringen wollten. Schon dort merkte man, dass sich die Atmosphäre deutlich von Qingdao unterschied. Alles wirkte weniger großstädtisch, bodenständiger und stärker vom Alltag der lokalen Bevölkerung geprägt. Gleichzeitig war die Region auch bei chinesischen Urlaubern sehr beliebt, und da die Golden Week kurz bevorstand, mussten wir schon ein wenig darauf achten, nicht mitten in die Hauptreisezeit hineinzurutschen.",
    "Unterwegs haben wir uns ein Mittagessen geholt, das fast wie aus einer Arbeiterkantine wirkte - einfach, schnell und für umgerechnet ein bis zwei Euro erstaunlich günstig. Solche Momente fand ich besonders spannend, weil man dabei einen viel direkteren Eindruck vom Alltag bekommt als in touristisch komplett durchinszenierten Orten.",
    { type: "image", src: zhangjiajieFoodImage, alt: "Einfaches Essen in Zhangjiajie", caption: "Ein schneller, günstiger und sehr direkter Eindruck vom Alltag vor Ort." },
    "Die Weiterfahrt zur Unterkunft war ebenfalls besonders: Man kam nur über mehrere Stationen und mit der Seilbahn dorthin. Unsere Unterkunft lag direkt im Park, was ein echter Vorteil war. Dadurch konnten wir viele der großen Touristenströme umgehen und morgens deutlich entspannter in den Tag starten. Gerade in beliebten chinesischen Naturregionen kann das einen riesigen Unterschied machen.",
    "Im Park trafen wir außerdem auf eine internationale Gruppe von Studierenden aus der Nähe von Shanghai, die ihre semesterfreie Zeit zum Reisen nutzten. Mit ihnen haben wir uns zusammengeschlossen und in den nächsten zwei Tagen gemeinsam den Park erkundet. Das hat die Reise noch einmal deutlich interessanter gemacht, weil wir so nicht nur die Landschaft gesehen, sondern auch viele Gespräche über Alltag, Studium und Reisen in China geführt haben.",
    "Natürlich sind wir auch zu den berühmten Felsformationen gegangen, die viele mit dem Avatar Mountain verbinden. Auch wenn man die Bilder vorher kennt, wirken diese steilen, fast schwebend aussehenden Sandsteinsäulen in echt noch einmal ganz anders. Ich habe dort auch eine Drohnenaufnahme gemacht, was für mich eines der Highlights des gesamten Trips war.",
    {
        type: "embed-link",
        href: "https://www.instagram.com/p/DAzaxL0IDNG/",
        label: "Watch the drone clip on Instagram",
        image: zhangjiajieParkImage,
        title: "Famous Avatar Mountain drone clip",
        description: "Open the Instagram video in a new tab."
    },
    { type: "image", src: zhangjiajieWunschImage, alt: "Wunschbänder im Zhangjiajie National Forest Park", caption: "Zhangjiajie: Landschaft, Ritual und touristische Wege im Nationalpark." },
    "Am nächsten Tag ging es weiter zum Tianmen Mountain. Die Aussicht dort war extrem beeindruckend, auch wenn das Wetter leider nicht perfekt mitgespielt hat und zeitweise ziemlich viel Nebel hing. Trotzdem hatte der Ort gerade dadurch fast etwas Unwirkliches. China hat in solchen Landschaften eine Größe und Dramatik, die sich auf Fotos nur schwer vollständig einfangen lässt.",
    "Gerade auf Reisen durch China merkt man schnell, wie wichtig gute Organisation im Hintergrund ist. Der öffentliche Verkehr ist meist günstig und effizient, vor allem in Städten. Für längere Strecken sind Inlandsflüge und Schnellzüge oft die beste Wahl. Ich selbst bin zwar später nicht mit einem der ganz modernen Hochgeschwindigkeitszüge gefahren, aber selbst jenseits dieser Prestigeverbindungen funktioniert das Reisen erstaunlich gut. Man sollte nur wissen, dass Englisch nicht überall selbstverständlich ist. Eine Adresse oder wichtige Infos auf Chinesisch dabei zu haben, ist deshalb oft hilfreich."
];

const chinaTravelPart3Content: ArticleContentBlock[] = [
    "Nach den Tagen in Zhangjiajie ging es am Nachmittag weiter zur nächsten Station: Chongqing. Dafür nahmen wir den Zug, diesmal mit Schlafabteilen. Es war nicht einer der ultramodernen Züge, für die China oft bekannt ist, aber gerade deshalb war die Fahrt interessant. Man bekommt viel mehr vom Reisealltag der Menschen mit, sieht Familien, Pendler, Gruppenreisende und bekommt ein Gespür dafür, wie groß und mobil das Land ist.",
    { type: "image", src: chongqingTrainImage, alt: "Zugfahrt nach Chongqing", caption: "Mit dem Zug weiter Richtung Chongqing." },
    "Als wir am Abend ankamen, gingen wir direkt essen - in Chongqing natürlich fast schon obligatorisch: Hot Pot. Die Stadt ist berühmt für ihre besonders scharfe Variante, und man merkt schnell, dass Essen hier nicht einfach nur Nahrungsaufnahme ist, sondern ein sozialer Mittelpunkt. Generell ist chinesisches Essen unglaublich vielfältig, aber eben nicht immer an westliche Geschmäcker angepasst. Gerade das macht den Reiz aus. Man sollte nur bei Schärfe lieber vorher einmal nachfragen.",
    { type: "image", src: chongqingFoodImage, alt: "Imbiss in Chongqing", caption: "Essen als sozialer Mittelpunkt in Chongqing." },
    "Chongqing selbst war für mich architektonisch wahrscheinlich der faszinierendste Ort der Reise. Die Stadt liegt in einer bergigen Landschaft, und genau das prägt auch ihre Bauweise. Es gibt Ebenen, Brücken, Hochhäuser, Straßen und Treppen, die sich auf eine Art überlagern, die man aus Europa so kaum kennt. Besonders bekannt ist ein Ort, den man auch oft in sozialen Medien sieht: Man meint zunächst, ebenerdig zu stehen, läuft dann aber bis an den Rand - und merkt plötzlich, dass es noch unzählige Stockwerke nach unten geht. Dieses Spiel mit Höhe, Perspektive und Dichte macht Chongqing fast unwirklich.",
    { type: "video", src: chongqingPanoramaVideo, label: "Panorama view over Chongqing." },
    { type: "image", src: chongqingBridgeImage, alt: "Brücke und urbane Ebenen in Chongqing", caption: "Chongqing: Brücken, Ebenen und urbane Tiefe." },
    "Neben Hot Pot haben wir auch einiges an Streetfood probiert, was ich insgesamt positiv in Erinnerung habe. Spannend war auch, dass wir dort von lokalen Informatikstudierenden angesprochen und interviewt wurden, die Touristen befragten.",
    { type: "image", src: chongqingLocalsImage, alt: "Lokale Begegnung in Chongqing", caption: "Begegnungen und Gespräche in Chongqing." },
    "Ein weiteres Highlight war ein Café beziehungsweise eine Bar mit Restaurant am Rand der Stadt, von wo aus wir einen atemberaubenden Blick über diese riesige Metropole hatten. Chongqing gilt nicht ohne Grund als eine der größten Städte der Welt. Gerade während der beginnenden Urlaubszeit war dort zeitweise allerdings so viel los, dass man sich nur noch langsam durch die Menschenmengen bewegen konnte. Für westliche Touristen kann das stellenweise schon ziemlich überwältigend sein.",
    { type: "image", src: chongqingRiverImage, alt: "Blick über Chongqing und den Fluss", caption: "Blick über Chongqing: Maßstab, Dichte und Topografie." },
    "Trotzdem habe ich China insgesamt als sehr sicheres Reiseland erlebt. Natürlich sollte man in großen Städten immer aufmerksam bleiben, aber ich hatte deutlich weniger das Gefühl permanenter Unsicherheit als in manchen europäischen Großstädten. Gleichzeitig merkt man schnell, dass bestimmte Regeln ernster genommen werden als anderswo. Dazu gehört auch, sich politisch oder gesellschaftlich respektvoll zu verhalten. Generell habe ich den Umgang der Menschen untereinander als höflich erlebt.",
    "Nach drei Tagen in Chongqing flogen wir wieder zurück nach Qingdao. Dort verbrachte ich die letzten Tage etwas ruhiger, bevor es schließlich von Qingdao über Peking zurück nach Deutschland ging. Rückblickend war die Reise für mich vor allem deshalb so spannend, weil sie viele verschiedene Seiten Chinas gezeigt hat: die moderne Küstenstadt Qingdao, die dramatische Natur rund um Zhangjiajie und die fast überwältigende urbane Wucht von Chongqing.",
    "Gerade diese enorme Größe, Geschwindigkeit und Dichte haben bei mir auch noch einmal einen anderen Gedanken angestoßen: Wenn man heute durch chinesische Städte reist, bekommt man zumindest eine Ahnung davon, wie dynamisch sich das Land in den letzten zwei Jahrzehnten entwickelt hat. Der wirtschaftliche Aufstieg Chinas wurde vor allem durch massive Industrialisierung, hohe Investitionen in Infrastruktur, starke Exportorientierung, rasante Urbanisierung und eine langfristiger angelegte staatliche Entwicklungsstrategie getragen. Gleichzeitig zeigt sich der Wandel heute nicht nur in klassischen Kennzahlen, sondern ganz konkret im Alltag - in Verkehrsnetzen, digitaler Bezahlkultur, Stadtentwicklung und technologischem Anspruch. Ob China die USA als führende Hegemonialmacht tatsächlich in den nächsten Jahrzehnten ablösen wird, bleibt offen, aber das Potenzial dafür ist aus heutiger Sicht zumindest klar erkennbar. Das wäre allerdings ein eigenes Kapitel und würde hier den Rahmen sprengen."
];

function TextArticlePage({
    title,
    image,
    dateLabel,
    paragraphs,
    content,
    next,
    language,
    setLanguage,
    isDarkMode,
    setIsDarkMode
}: {
    title: string;
    image: string;
    dateLabel?: string;
    paragraphs: string[];
    content?: ArticleContentBlock[];
    next?: { label: string; route: string };
    language: Language;
    setLanguage: (lang: Language) => void;
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        scrollToPageTop();
    }, [title]);

    useEffect(() => {
        const frame = window.requestAnimationFrame(scrollToPageTop);
        const timeout = window.setTimeout(scrollToPageTop, 150);

        return () => {
            window.cancelAnimationFrame(frame);
            window.clearTimeout(timeout);
        };
    }, [title]);

    return (
        <Layout language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
            <ArticleHero title={title} image={image} dateLabel={dateLabel} />
            <section className="content-section">
                <div className="container article-container">
                    {(content ?? paragraphs).map((block, index) => {
                        if (typeof block === "string") {
                            return <p key={`${block.slice(0, 40)}-${index}`}>{block}</p>;
                        }

                        if (block.type === "references") {
                            return (
                                <section className="article-references" aria-label="References" key={`references-${index}`}>
                                    <h2>References</h2>
                                    <ol>
                                        {block.entries.map((entry) => (
                                            <li key={entry.href}>
                                                {entry.author} ({entry.year}). <a href={entry.href} target="_blank" rel="noreferrer"><cite>{entry.title}</cite></a>. <span>{entry.publication.replace(/\.$/, "")}.</span>
                                            </li>
                                        ))}
                                    </ol>
                                </section>
                            );
                        }

                        if (block.type === "heading") {
                            return <h2 key={`heading-${index}`}>{block.text}</h2>;
                        }

                        if (block.type === "image-grid") {
                            return <ArticleImageGrid key={`image-grid-${index}`} images={block.images} />;
                        }

                        if (block.type === "video") {
                            return <VideoBlock key={`${block.src}-${index}`} src={block.src} label={block.label} />;
                        }

                        if (block.type === "link") {
                            return <ArticleExternalLink key={`${block.href}-${index}`} href={block.href} label={block.label} />;
                        }

                        if (block.type === "embed-link") {
                            return (
                                <ArticleEmbedLink
                                    key={`${block.href}-${index}`}
                                    href={block.href}
                                    label={block.label}
                                    image={block.image}
                                    title={block.title}
                                    description={block.description}
                                />
                            );
                        }

                        return (
                            <ArticleImageBlock
                                key={`${block.src}-${index}`}
                                src={block.src}
                                alt={block.alt}
                                caption={block.caption}
                                compact={block.compact}
                            />
                        );
                    })}
                </div>
            </section>
            {next ? (
                <section className="content-section pt-0">
                    <div className="container next-link-block">
                        <span>Next article</span>
                        <NavLink
                            to={next.route}
                            onClick={(event) => {
                                event.preventDefault();
                                navigate(next.route);
                                forceScrollToPageTop();
                            }}
                        >
                            {next.label}
                        </NavLink>
                    </div>
                </section>
            ) : null}
        </Layout>
    );
}

function SpeedpaintingPage({
    language,
    setLanguage,
    isDarkMode,
    setIsDarkMode
}: {
    language: Language;
    setLanguage: (lang: Language) => void;
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <Layout language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
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

function DroneVideosPage({
    language,
    setLanguage,
    isDarkMode,
    setIsDarkMode
}: {
    language: Language;
    setLanguage: (lang: Language) => void;
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <Layout language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
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

function AiArtPage({
    language,
    setLanguage,
    isDarkMode,
    setIsDarkMode
}: {
    language: Language;
    setLanguage: (lang: Language) => void;
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <Layout language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
            <ArticleHero title="AI Art" image={aiArtImage} dateLabel="March 2026" />
            <section className="content-section">
                <div className="container article-container wide">
                    <p>The AI work on the site is less about automation than about curation and direction. Prompting, iteration, image selection, and post-processing each shape the final result. What matters is not the tool by itself, but the visual language that emerges from repeated refinement.</p>
                    <p>These studies sit between image selection, movement, and landscape composition.</p>
                    <AiArtGallerySection />
                    <VideoBlock src={diffusionVideo} label="Diffusion study focused on transformation, texture, and temporal flow." />
                    <VideoBlock src={genVideo} label="Generated sequence emphasizing motion design and composited image flow." />
                </div>
            </section>
        </Layout>
    );
}

function AppRoutes({
    language,
    setLanguage,
    isDarkMode,
    setIsDarkMode
}: {
    language: Language;
    setLanguage: (lang: Language) => void;
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <>
            <ScrollManager />
            <Routes>
                <Route path="/" element={<HomePage language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
                <Route path="/speedpainting" element={<SpeedpaintingPage language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
                <Route path="/ai-art" element={<AiArtPage language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
                <Route path="/drone-videos" element={<DroneVideosPage language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
                <Route path="/diffusion" element={<TextArticlePage language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} title="How Systems Evolve: A Dive into Diffusion Processes" image={diffusionImage} paragraphs={["This article looks at diffusion and dissipative systems as both scientific concepts and visual metaphors. Diffusion describes spread, transfer, and smoothing across time. Dissipative systems remain open, exchanging matter or energy with their surroundings and evolving through that openness.", "What makes these ideas artistically interesting is the way they sit between order and instability. Forms appear, dissolve, and reorganize. Small local actions become large-scale patterns. That movement is useful for thinking about image making, process, and change.", "The page acts as a conceptual bridge between art, physics, and animation: how systems shift, how structures emerge, and how visual motion can borrow from those dynamics."]} next={{ label: "Traveling through China: Experiences Part 1", route: "/travel" }} />} />
                <Route path="/travel" element={<TextArticlePage language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} title="Traveling through China: Experiences Part 1" image={travelImage} dateLabel="September 25 - October 7, 2024" paragraphs={[]} content={chinaTravelPart1Content} next={{ label: "Traveling through China: Experiences Part 2", route: "/travel-part-2" }} />} />
                <Route path="/travel-part-2" element={<TextArticlePage language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} title="Traveling through China: Experiences Part 2" image={zhangjiajieParkImage} dateLabel="Zhangjiajie, 2024" paragraphs={[]} content={chinaTravelPart2Content} next={{ label: "Traveling through China: Experiences Part 3", route: "/travel-part-3" }} />} />
                <Route path="/travel-part-3" element={<TextArticlePage language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} title="Traveling through China: Experiences Part 3" image={chongqingRiverImage} dateLabel="Chongqing, 2024" paragraphs={[]} content={chinaTravelPart3Content} next={{ label: "traditional art vs AI art", route: "/traditional-art-vs-ai-art" }} />} />
                <Route path="/beyond-average-taste" element={<TextArticlePage language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} title="Beyond Average Taste" image={tasteHero} dateLabel="October 21, 2026 · AI, aesthetics & creative control" paragraphs={[]} content={tasteContent} next={{ label: "traditional art vs AI art", route: "/traditional-art-vs-ai-art" }} />} />
                <Route path="/traditional-art-vs-ai-art" element={<TextArticlePage language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} title="traditional art vs AI art" image={traditionalImage} paragraphs={["Traditional art and AI art are often framed as opposites, but the more useful comparison is between their constraints. Traditional media resist through the hand, the surface, and the material. AI systems relocate that resistance into prompting, curation, iteration, and post-processing.", "That means both can contain real authorship, but it becomes visible in different places. In one medium, labor is embedded in the stroke and the irreversible mark. In the other, it can be embedded in selection, sequencing, and refinement across generations.", "The argument is not that the media are identical. It is that legitimacy depends less on the tool itself and more on what kind of visual thinking, decision making, and responsibility the work actually shows."]} next={{ label: "FLUX.2 [klein] Tutorial", route: "/flux-2-klein-tutorial" }} />} />
                <Route path="/flux-2-klein-tutorial" element={<TextArticlePage language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} title="FLUX.2 [klein] Tutorial" image={fluxImage} dateLabel="January 2026" paragraphs={["This tutorial page is meant to document a repeatable setup for FLUX.2 [klein]: start with a narrow prompt target, stabilize composition early, and refine by selective reruns instead of endlessly appending descriptors.", "A practical workflow usually begins with a small number of strong visual anchors and a clear decision about what should remain stable between generations. Once the model begins producing useful structure, iteration becomes more about editing direction than about adding more words.", "The page can function as a living tutorial log: prompt fragments, settings, failed attempts, and the final images that emerge from the process."]} next={{ label: "Personalens", route: "/personalens" }} />} />
                <Route path="/personalens" element={<TextArticlePage language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} title="Personalens" image={personalensImage} paragraphs={["Personalens can be read as a study of how identity is staged through images. A portrait, figure, or mask is never only descriptive. It also organizes distance: what is revealed, what is stylized, and what remains withheld.", "That makes this kind of work useful for thinking about self-presentation across media. The image is not just about a person. It is about the lens through which a person becomes legible and the way persona is assembled through visual choices.", "As an article, the page holds the reflective layer behind the work: references, artistic intent, and the balance between intimacy and construction."]} next={{ label: "Home", route: "/" }} />} />
            </Routes>
        </>
    );
}

export default function App() {
    const [language, setLanguage] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem("language");
        return savedLanguage === "ch" ? "ch" : "en";
    });
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    useEffect(() => {
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    return <HashRouter><AppRoutes language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} /></HashRouter>;
}
