'use client';

import { useState, useEffect } from 'react';
import {
    ShieldCheck,
    Lock,
    User,

    Factory
} from 'lucide-react';


export default function Purchase() {


    return (


        <div className="w-full max-w-md"
        >
            <div className="text-center mb-10">
                <div

                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-container text-primary mb-6 shadow-sm"
                >
                    <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black tracking-tight text-on-surface mb-2">Secure Login</h2>
                <p className="text-secondary font-medium">Enter your credentials to access the console</p>
            </div>

            <form className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant ml-1">
                        Username
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-secondary group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full pl-11 pr-4 py-4 bg-surface-container-low border-2 border-transparent rounded-2xl text-on-surface font-semibold placeholder:text-secondary/50 focus:outline-none focus:border-primary/30 focus:bg-white transition-all shadow-sm"
                            placeholder="username"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant ml-1">
                        Password
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-secondary group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full pl-11 pr-4 py-4 bg-surface-container-low border-2 border-transparent rounded-2xl text-on-surface font-semibold placeholder:text-secondary/50 focus:outline-none focus:border-primary/30 focus:bg-white transition-all shadow-sm"
                            placeholder="••••••••"
                        />
                    </div>
                </div>



                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative group bg-primary hover:bg-primary-dim text-on-primary py-4 px-6 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                >

                </button>
            </form>

            <div className="mt-12 pt-8 border-t border-surface-container text-center">
                <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">
                    Industrial Ledger &copy; 2023 Digital Foreman Systems
                </p>
            </div>
        </div>
    );
}