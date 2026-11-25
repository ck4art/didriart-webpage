import React, { useEffect, useRef, useState } from "react";

export type Reel = { id: string; title: string; after: string };
const instagramOrigin = "https://www.instagram.com";

export function InstagramReel({ reel }: { reel: Reel }) {
    const frame = useRef<HTMLIFrameElement>(null);
    const [height, setHeight] = useState<number>();

    useEffect(() => {
        const resize = (event: MessageEvent) => {
            if (event.origin !== instagramOrigin || event.source !== frame.current?.contentWindow) return;
            let message = event.data;
            if (typeof message === "string") {
                try { message = JSON.parse(message); } catch { return; }
            }
            const size = message?.details?.height;
            if (message?.type === "MEASURE" && Number.isFinite(size) && size > 100 && size < 3000) {
                setHeight(Math.ceil(size));
            }
        };
        window.addEventListener("message", resize);
        return () => window.removeEventListener("message", resize);
    }, []);

    return (
        <figure>
            <iframe ref={frame} title={`${reel.title} on Instagram`}
                src={`${instagramOrigin}/reel/${reel.id}/embed/`}
                loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin" style={{ height }} />
            <figcaption>
                <a href={`${instagramOrigin}/ck_4rt/reel/${reel.id}/`} target="_blank" rel="noreferrer">{reel.title}</a>{reel.after}
            </figcaption>
        </figure>
    );
}
