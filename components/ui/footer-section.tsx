"use client";

import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Instagram, Linkedin, Moon, Send, Sun, Youtube } from "lucide-react";

function Footerdemo() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const goToSection = (sectionId: string) => {
        if (location.pathname !== "/") {
            navigate("/", { state: { scrollTo: sectionId } });
            return;
        }

        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <footer
            id="contact"
            className="relative border-t bg-background text-foreground transition-colors duration-300"
        >
            <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="relative">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight">Stay Connected</h2>
                        <p className="mb-6 text-muted-foreground">
                            Join the didri.art newsletter for new portfolio work, essays, travel writing, and AI art updates.
                        </p>
                        <form className="relative" onSubmit={(event) => event.preventDefault()}>
                            <Input type="email" placeholder="Enter your email" className="pr-12 backdrop-blur-sm" />
                            <Button
                                type="submit"
                                size="icon"
                                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
                            >
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Subscribe</span>
                            </Button>
                        </form>
                        <Textarea
                            className="mt-4 min-h-24 resize-none"
                            placeholder="Optional message or collaboration idea"
                        />
                        <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
                        <nav className="space-y-2 text-sm">
                            <button type="button" onClick={() => goToSection("hero")} className="block bg-transparent p-0 text-left transition-colors hover:text-primary">Home</button>
                            <button type="button" onClick={() => goToSection("about")} className="block bg-transparent p-0 text-left transition-colors hover:text-primary">About</button>
                            <button type="button" onClick={() => goToSection("portfolio")} className="block bg-transparent p-0 text-left transition-colors hover:text-primary">Portfolio</button>
                            <button type="button" onClick={() => goToSection("news")} className="block bg-transparent p-0 text-left transition-colors hover:text-primary">Blog Posts</button>
                            <Link to="/ai-art" className="block transition-colors hover:text-primary">AI Art Gallery</Link>
                        </nav>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Contact me</h3>
                        <address className="space-y-2 text-sm not-italic text-muted-foreground">
                            <p>Tuebingen, Germany</p>
                            <p>Artist portfolio, essays, speedpainting, and AI image work.</p>
                            <p>Email: info@company.com</p>
                            <p>Instagram: @ck_4rt</p>
                        </address>
                    </div>
                    <div className="relative">
                        <h3 className="mb-4 text-lg font-semibold">Follow me</h3>
                        <div className="mb-6 space-y-5">
                            <div>
                                <p className="mb-2 text-sm font-semibold">Private</p>
                                <div className="flex space-x-4">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="icon" className="rounded-full" asChild>
                                                    <a href="https://www.instagram.com/ck_4rt" target="_blank" rel="noreferrer">
                                                        <Instagram className="h-4 w-4" />
                                                        <span className="sr-only">Private Instagram</span>
                                                    </a>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Private Instagram</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="icon" className="rounded-full" asChild>
                                                    <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                                                        <Linkedin className="h-4 w-4" />
                                                        <span className="sr-only">Private LinkedIn</span>
                                                    </a>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Private LinkedIn</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                            <div>
                                <p className="mb-2 text-sm font-semibold">didri.art</p>
                                <div className="flex space-x-4">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="icon" className="rounded-full" asChild>
                                                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                                                        <Instagram className="h-4 w-4" />
                                                        <span className="sr-only">didri.art Instagram</span>
                                                    </a>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>didri.art Instagram</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                            <div>
                                <p className="mb-2 text-sm font-semibold">Personalens</p>
                                <div className="flex flex-wrap gap-4">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="icon" className="rounded-full font-semibold" asChild>
                                                    <a href="https://x.com/" target="_blank" rel="noreferrer">
                                                        <span className="text-sm">X</span>
                                                        <span className="sr-only">Personalens X</span>
                                                    </a>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Personalens on X</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="icon" className="rounded-full" asChild>
                                                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                                                        <Instagram className="h-4 w-4" />
                                                        <span className="sr-only">Personalens Instagram</span>
                                                    </a>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Personalens Instagram</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="icon" className="rounded-full" asChild>
                                                    <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                                                        <Youtube className="h-4 w-4" />
                                                        <span className="sr-only">Personalens YouTube</span>
                                                    </a>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Personalens YouTube</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="icon" className="rounded-full font-semibold text-[0.68rem]" asChild>
                                                    <a href="https://www.xiaohongshu.com/" target="_blank" rel="noreferrer">
                                                        <span>R</span>
                                                        <span className="sr-only">Personalens Rednote</span>
                                                    </a>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Personalens Rednote</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Sun className="h-4 w-4" />
                            <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                            <Moon className="h-4 w-4" />
                            <Label htmlFor="dark-mode" className="sr-only">
                                Toggle dark mode
                            </Label>
                        </div>
                    </div>
                </div>
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-input pt-8 text-center md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        © 2026 didri.art. All rights reserved.
                    </p>
                    <nav className="flex gap-4 text-sm">
                        <a href="#" className="transition-colors hover:text-primary">Privacy Policy</a>
                        <a href="#" className="transition-colors hover:text-primary">Terms of Service</a>
                        <a href="#" className="transition-colors hover:text-primary">Cookie Settings</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
}

export { Footerdemo };
