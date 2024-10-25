"use client"
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from "next/link";
import { BorderBeam } from '../magicui/border-beam';
import { Button } from "../ui/button";

export default function HeroSection() {
    return (
        <div className='flex flex-col items-center justify-center mt-4' style={{width:"99vw"}}>
            <h1 className="scroll-m-20 text-3xl sm:text-3xl md:text-5xl font-semibold tracking-tight lg:text-5xl text-center max-w-[550px]">
                DEMO SUB DOMAINS
            </h1>
            <div className="flex gap-3">
                <Link href="/cms" className="mt-5">
                    <Button size="sm" className="animate-buttonheartbeat rounded-md bg-blue-600 hover:bg-blue-400 text-sm font-semibold text-white">GO TO Dashboard</Button>
                </Link>
            
            </div>
        </div>
    )
}
