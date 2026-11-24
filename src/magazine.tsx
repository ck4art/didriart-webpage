import React, { useState } from "react";
import publication from "./substack.json";
import { publicationLinks } from "./substack-links";
import "./magazine.css";

type Language = "en" | "ch";
type Copy = { title: string; category: string; date: string; deck: string; preview: string[] };
type Story = {
    slug: string;
    cover: string;
    en: Copy;
    ch: Copy;
};

// Store only the public excerpt here. The remaining paragraphs belong in the paid Substack post.
export const paidStories: Story[] = [{
    slug: "reading-a-generated-image",
    cover: new URL("../images/image_slider/Astronaute_horse_brown.png", import.meta.url).href,
    en: {
        category: "Generative art",
        date: "November 24, 2026",
        title: "Reading a generated image",
        deck: "An astronaut, a horse and a second look at what makes a picture work.",
        preview: [
            "The horse has lifted one foreleg. The astronaut sits almost motionless. Behind them, a bright crescent cuts into the black sky. Even at thumbnail size, those three shapes tell most of the story.",
            "Cover the moon with your hand. The rider suddenly feels heavier, closer to the ground. Uncover it and the eye moves in a triangle, from the helmet to the crescent and down to the shadow of the hoof. That small experiment says more about the composition than a list of words in the prompt.",
            "There is a useful distinction here for anyone comparing two generated images: a picture can contain every object you asked for and still send your eye to the wrong place."
        ]
    },
    ch: {
        category: "生成艺术",
        date: "2026年11月24日",
        title: "如何细读一幅生成图像",
        deck: "从宇航员、马和月亮开始，看一幅画的构图如何引导视线。",
        preview: [
            "马抬起一条前腿，宇航员几乎一动不动。身后，一弯亮月划破夜空。即使把图片缩小，这三个轮廓也足以讲出大半个故事。",
            "试着用手遮住月亮。骑手忽然显得更沉，更贴近地面。移开手，目光便沿着一个三角形移动：从头盔到月亮，再落到马蹄的影子上。",
            "比较两幅生成图像时，这个小实验很有用。即使画面包含提示词中的每个物体，视线依然可能落在意料之外的地方。"
        ]
    }
}];

export function SubscriptionOffer({ slug, language }: { slug: string; language: Language }) {
    const [annual, setAnnual] = useState(false);
    const zh = language === "ch";
    const links = publicationLinks(publication, slug, annual);
    return (
        <div className="subscription-offer">
            <div className="mag-blur" aria-hidden="true"><i /><i /><i /></div>
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
        </div>
    );
}
