import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import publication from "./substack.json";
import { publicationLinks } from "./substack-links";
import "./magazine.css";

type Language = "en" | "ch";
type Copy = { title: string; deck: string; preview: string[]; caption: string };
type Story = {
    slug: string;
    cover: string;
    en: Copy;
    ch: Copy;
};

// Store only the public excerpt here. The remaining paragraphs belong in the paid Substack post.
const stories: Story[] = [{
    slug: "reading-a-generated-image",
    cover: new URL("../images/image_slider/Astronaute_horse_brown.png", import.meta.url).href,
    en: {
        title: "Reading a generated image",
        deck: "An astronaut, a horse and a second look at what makes a picture work.",
        caption: "Detail from the astronaut and horse series in the didri.art gallery.",
        preview: [
            "The horse has lifted one foreleg. The astronaut sits almost motionless. Behind them, a bright crescent cuts into the black sky. Even at thumbnail size, those three shapes tell most of the story.",
            "Cover the moon with your hand. The rider suddenly feels heavier, closer to the ground. Uncover it and the eye moves in a triangle, from the helmet to the crescent and down to the shadow of the hoof. That small experiment says more about the composition than a list of words in the prompt.",
            "There is a useful distinction here for anyone comparing two generated images: a picture can contain every object you asked for and still send your eye to the wrong place."
        ]
    },
    ch: {
        title: "如何细读一幅生成图像",
        deck: "从宇航员、马和月亮开始，看一幅画的构图如何引导视线。",
        caption: "细节选自 didri.art 画廊的宇航员与马系列。",
        preview: [
            "马抬起一条前腿，宇航员几乎一动不动。身后，一弯亮月划破夜空。即使把图片缩小，这三个轮廓也足以讲出大半个故事。",
            "试着用手遮住月亮。骑手忽然显得更沉，更贴近地面。移开手，目光便沿着一个三角形移动：从头盔到月亮，再落到马蹄的影子上。",
            "比较两幅生成图像时，这个小实验很有用。即使画面包含提示词中的每个物体，视线依然可能落在意料之外的地方。"
        ]
    }
}];

export const featuredStory = stories[0];
export const storyPath = (slug: string) => "/magazine/" + slug;

export function Magazine({ language }: { language: Language }) {
    const { slug } = useParams();
    const story = stories.find(entry => entry.slug === slug);
    const [annual, setAnnual] = useState(false);
    const zh = language === "ch";

    if (!story) {
        return <main className="magazine"><h1>{zh ? "找不到这篇文章" : "Article not found"}</h1>
            <Link to="/">{zh ? "返回首页" : "Back to didri.art"}</Link></main>;
    }

    const copy = story[language];
    const links = publicationLinks(publication, story.slug, annual);
    return (
        <main className="magazine" lang={zh ? "zh" : "en"}>
            <article>
                <header className="mag-lead">
                    <div className="mag-heading">
                        <span className="mag-label">didri.art / {zh ? "杂志" : "Magazine"}</span>
                        <h1>{copy.title}</h1>
                        <p>{copy.deck}</p>
                    </div>
                    <figure>
                        <img src={story.cover} alt={zh ? "宇航员骑着一匹马，身后是一弯明月" : "An astronaut on a horse with a crescent moon behind them"} />
                        <figcaption>{copy.caption}</figcaption>
                    </figure>
                </header>
                <div className="mag-reading">
                    {copy.preview.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                    <div className="mag-blur" aria-hidden="true"><i /><i /><i /></div>
                </div>
                <section className="mag-offer" aria-labelledby="mag-offer-title">
                    <div className="mag-intro">
                        <h2 id="mag-offer-title">{zh ? "继续阅读" : "Continue reading"}</h2>
                        <p>{zh ? "订阅可解锁本篇全文和杂志中的所有付费文章。" : "One subscription opens the rest of this essay and every paid article in the magazine."}</p>
                        {links && <a className="mag-existing" href={links.post}>{zh ? "已订阅？在 Substack 阅读全文 ↗" : "Already subscribed? Read on Substack ↗"}</a>}
                    </div>
                    <div className="mag-plans">
                        <fieldset className="mag-switch">
                            <legend className="visually-hidden">{zh ? "付费周期" : "Billing interval"}</legend>
                            {([false, true] as const).map(year => (
                                <label key={String(year)}>
                                    <input type="radio" name="billing-interval" checked={annual === year} onChange={() => setAnnual(year)} />
                                    <span>{year ? (zh ? "年付" : "Yearly") : (zh ? "月付" : "Monthly")}</span>
                                </label>
                            ))}
                        </fieldset>
                        <div aria-live="polite" aria-atomic="true" className="mag-price-details">
                            <p className="mag-price"><strong>{annual ? "30 €" : "5 €"}</strong> {annual ? (zh ? "/ 年" : "/ year") : (zh ? "/ 月" : "/ month")}</p>
                            <p>{annual ? (zh ? "每年支付 30 €，相当于每月 2.50 €，节省 50%。" : "Billed yearly. Equivalent to €2.50 per month. Save 50% over twelve monthly payments.") : (zh ? "每月支付 5 €。" : "Billed monthly at €5 per payment.")}</p>
                        </div>
                        {links ? <>
                            <a className="mag-cta" href={links.checkout}>{zh ? "在 Substack 选择方案 ↗" : "Choose plan on Substack ↗"}</a>
                            <small>{zh ? "登录后确认付费周期。" : "Sign in with your email and confirm your billing interval there."}</small>
                        </> : <p className="mag-pending">{zh ? "订阅预览 · 付费订阅尚未开放。" : "Membership preview · Paid subscriptions are not open yet."}</p>}
                    </div>
                </section>
                <Link className="mag-free" to="/beyond-average-taste">{zh ? "阅读免费文章" : "Read a free essay"} · Beyond Average Taste →</Link>
            </article>
        </main>
    );
}
