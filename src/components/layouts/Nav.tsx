import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Activity, Menu } from "lucide-react";
import { Button } from "../ui/button";

const Nav = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const isHome = location.pathname === "/";

    return (
        <header className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300 py-2",
                scrolled || !isHome
                    ? "bg-background/95 backdrop-blur border-b shadow-sm"
                    : "bg-transparent"
            )}>
            <div className="container flex h-16 items-center mx-10 justify-between">
                <Link to="/" className="mr-6">
                    <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg">
                            <Activity className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className={cn(
                                "text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-colors duration-300",
                                !scrolled && isHome && "text-white"
                            )}>
                                Job Market Analytics
                            </h1>
                            <p className={cn(
                                "font-medium transition-colors duration-300",
                                scrolled || !isHome 
                                    ? "text-gray-600" 
                                    : "text-white/90"
                            )}>
                                Vietnam & Global Employment Insights
                            </p>
                        </div>
                    </div>
                </Link>

                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link to="/">
                                <NavigationMenuLink
                                    className={cn(
                                        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                                        scrolled || !isHome
                                            ? "hover:bg-accent hover:text-accent-foreground"
                                            : "hover:bg-white/20 text-white",
                                        isActive("/") &&
                                            (scrolled || !isHome
                                                ? "bg-accent text-accent-foreground"
                                                : "bg-white/20 text-white")
                                    )}
                                >
                                    Home
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/analytics">
                                <NavigationMenuLink
                                    className={cn(
                                        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                                        scrolled || !isHome
                                            ? "hover:bg-accent hover:text-accent-foreground"
                                            : "hover:bg-white/20 text-white",
                                        isActive("/data") &&
                                            (scrolled || !isHome
                                                ? "bg-accent text-accent-foreground"
                                                : "bg-white/20 text-white")
                                    )}
                                >
                                    Analytics
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/find-jobs">
                                <NavigationMenuLink
                                    className={cn(
                                        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                                        scrolled || !isHome
                                            ? "hover:bg-accent hover:text-accent-foreground"
                                            : "hover:bg-white/20 text-white",
                                        isActive("/find-jobs") &&
                                            (scrolled || !isHome
                                                ? "bg-accent text-accent-foreground"
                                                : "bg-white/20 text-white")
                                    )}
                                >
                                    Find Jobs
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/search-skills">
                                <NavigationMenuLink
                                    className={cn(
                                        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                                        scrolled || !isHome
                                            ? "hover:bg-accent hover:text-accent-foreground"
                                            : "hover:bg-white/20 text-white",
                                        isActive("/search-skills") &&
                                            (scrolled || !isHome
                                                ? "bg-accent text-accent-foreground"
                                                : "bg-white/20 text-white")
                                    )}
                                >
                                    Search Skills
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/about">
                                <NavigationMenuLink
                                    className={cn(
                                        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                                        scrolled || !isHome
                                            ? "hover:bg-accent hover:text-accent-foreground"
                                            : "hover:bg-white/20 text-white",
                                        isActive("/about") &&
                                            (scrolled || !isHome
                                                ? "bg-accent text-accent-foreground"
                                                : "bg-white/20 text-white")
                                    )}
                                >
                                    About Us
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/contact">
                                <NavigationMenuLink
                                    className={cn(
                                        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                                        scrolled || !isHome
                                            ? "hover:bg-accent hover:text-accent-foreground"
                                            : "hover:bg-white/20 text-white",
                                        isActive("/contact") &&
                                            (scrolled || !isHome
                                                ? "bg-accent text-accent-foreground"
                                                : "bg-white/20 text-white")
                                    )}
                                >
                                    Contact
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Mobile Navigation Trigger */}
                <div className="md:hidden">
                    <Button 
                        variant="outline" 
                        size="sm"
                        className={cn(
                            "transition-colors duration-300",
                            scrolled || !isHome
                                ? "border-gray-300"
                                : "border-white/30 text-white hover:bg-white/20"
                        )}
                    >
                        <Menu className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Nav;
