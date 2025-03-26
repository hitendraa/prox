"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6"
            >
                <h1 className="text-9xl font-bold text-primary">404</h1>
                <h2 className="text-3xl font-semibold text-foreground">
                    Oops! Page Not Found
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved to another
                    location.
                </p>
                <Button asChild className="mt-8">
                    <Link href="/">
                        Return Home
                    </Link>
                </Button>
            </motion.div>
        </div>
    );
}