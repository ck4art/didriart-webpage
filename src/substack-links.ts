type Publication = {
    publicationUrl: string;
    postPaths: Record<string, string>;
    checkoutPaths: { monthly?: string; yearly?: string };
};

export function publicationLinks(config: Publication, slug: string, annual: boolean) {
    const path = config.postPaths[slug];
    if (!config.publicationUrl || !path?.startsWith("/p/")) return undefined;

    try {
        const publication = new URL(config.publicationUrl);
        const post = new URL(path, publication.origin);
        const plan = annual ? config.checkoutPaths.yearly : config.checkoutPaths.monthly;
        const checkout = new URL(plan || "/subscribe", publication.origin);
        if (publication.protocol !== "https:" || post.origin !== publication.origin || checkout.origin !== publication.origin) return undefined;
        return { post: post.href, checkout: checkout.href };
    } catch {
        return undefined;
    }
}
