import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (options = {}) => {
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasAnimated) {
                setHasAnimated(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1, ...options });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [hasAnimated, options]);

    return [ref, hasAnimated] as const;
};

export default useIntersectionObserver;
