"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            SV Blogger Platform
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Publish bold ideas with a calm, modern storytelling canvas.
          </h1>
          <p className="text-lg text-muted-foreground">
            Create, refine, and share articles with a delightful editor, real-time
            analytics, and community feedback loops.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/register">
              <Button size="lg">Start Writing</Button>
            </Link>
            <Link href="/blogs">
              <Button size="lg" variant="ghost">
                Explore Blogs
              </Button>
            </Link>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-[32px] border bg-card p-6 shadow-soft"
        >
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Trending Now
            </p>
            <div className="space-y-3">
              {[
                "Future-proofing your writing workflow",
                "Designing with attention, not addiction",
                "How communities shape better stories"
              ].map((title) => (
                <div key={title} className="rounded-2xl border bg-background px-4 py-3">
                  <p className="font-medium">{title}</p>
                  <p className="text-xs text-muted-foreground">Reading time · 5 min</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
