"use client";
import { useHeadline } from "@/context/headline-context";
import React, { useCallback, useMemo } from "react";
import { motion } from "framer-motion";

export default function Preview() {
	const { state } = useHeadline();

	const directionToDeg = useCallback(
		() => (d: typeof state.gradientDir) => {
			switch (d) {
				case "to-r":
					return 90;
				case "to-l":
					return 270;
				case "to-b":
					return 180;
				case "to-t":
					return 0;
				default:
					return 90;
			}
		},
		[state]
	);
	const variants = {
		hidden: { opacity: 0, y: 12 },
		show: {
			opacity: 1,
			y: 0,
			transition: { staggerChildren: 0.02, delayChildren: 0.02 },
		},
	} as const;

	const headlineStyle: React.CSSProperties = useMemo(() => {
		const style: React.CSSProperties = {
			fontSize: `${state.fontSize}px`,
			fontFamily: state.fontFamily,
			fontWeight: state.fontWeight as number,
			lineHeight: 1.1,
			letterSpacing: "-0.02em",
			transition:
				"transform 200ms ease, filter 200ms ease, text-shadow 200ms ease",
			color: state.useGradient ? undefined : state.solidColor,
		};

		if (state.useGradient) {
			const deg = directionToDeg()(state.gradientDir);
			style.backgroundImage = `linear-gradient(${deg}deg, ${state.fromColor}, ${state.toColor})`;
			// text transparent + background-clip is handled via className
		}

		if (state.hoverGlow) {
			// A soft persistent glow that gets stronger on hover
			style.textShadow = state.outline
				? `0 0 1px rgba(0,0,0,0.25), 0 0 8px ${
						state.useGradient ? state.toColor : state.solidColor
				  }`
				: `0 0 8px ${
						state.useGradient ? state.toColor : state.solidColor
				  }`;
		} else if (state.outline) {
			style.textShadow = `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000`;
		}

		return style;
	}, [
		state.fontSize,
		state.fontFamily,
		state.fontWeight,
		state.useGradient,
		state.solidColor,
		state.gradientDir,
		state.fromColor,
		state.toColor,
		state.hoverGlow,
		state.outline,
		directionToDeg,
	]);

	const words = useMemo(() => {
		// Keep spaces by splitting and re-inserting them
		const parts: { token: string; isSpace: boolean }[] = [];
		state.text.split(/(\s+)/).forEach((seg) => {
			if (seg.trim() === "") parts.push({ token: seg, isSpace: true });
			else parts.push({ token: seg, isSpace: false });
		});
		return parts;
	}, [state.text]);

	const letterVariants = {
		hidden: { opacity: 0, y: 8, rotateX: -30 },
		show: { opacity: 1, y: 0, rotateX: 0 },
	} as const;

	const renderWord = (w: string, idx: number) => {
		const isHighlighted = idx === state.highlightWord;
		const isUnderlined = idx === state.underlineWord;
		const isBlocked = idx === state.blockWord;

		const base = "rounded-xl px-1";
		const underlineCls = isUnderlined
			? " underline decoration-2 underline-offset-4"
			: "";
		const blockCls = isBlocked ? "" : "";

		const style: React.CSSProperties = isBlocked
			? {
					background: state.blockBg,
					borderRadius: 12,
					paddingLeft: 8,
					paddingRight: 8,
			  }
			: {};

		const highlightStyle: React.CSSProperties = isHighlighted
			? { boxShadow: `inset 0 -0.6em 0 ${state.blockBg}` }
			: {};

		if (state.animatePerLetter) {
			return (
				<span
					key={`w-${idx}`}
					className={`${base}${underlineCls}${blockCls}`}
					style={{ ...style, ...highlightStyle }}
				>
					{w.split("").map((ch, i) => (
						<motion.span
							key={`c-${idx}-${i}`}
							variants={letterVariants}
							className="inline-block will-change-transform"
						>
							{ch}
						</motion.span>
					))}
				</span>
			);
		}

		return (
			<span
				key={`w-${idx}`}
				className={`${base}${underlineCls}${blockCls}`}
				style={{ ...style, ...highlightStyle }}
			>
				{w}
			</span>
		);
	};

	const indexOfWord = (untilIndexInclusive: number) => {
		let count = -1;
		for (let k = 0; k <= untilIndexInclusive; k++) {
			if (!words[k].isSpace) count++;
		}
		return count;
	};
	const renderHeadline = () => {
		return (
			<motion.h1
				initial={state.fadeIn ? "hidden" : undefined}
				animate={state.fadeIn ? "show" : undefined}
				variants={variants}
				className={
					"group select-text font-extrabold tracking-tight md:tracking-tighter " +
					(state.useGradient ? " bg-clip-text text-transparent" : "")
				}
				style={headlineStyle}
			>
				{words.map((part, i) =>
					part.isSpace ? (
						<span key={`s-${i}`}>{part.token}</span>
					) : (
						<span key={`ws-${i}`}>
							{renderWord(part.token, indexOfWord(i))}
						</span>
					)
				)}
			</motion.h1>
		);
	};
	return (
		<main className="relative flex min-h-[60vh] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm">
			<div
				className="pointer-events-none absolute inset-0 opacity-40"
				style={{
					background: `radial-gradient(600px circle at 20% 30%, ${state.fromColor}33, transparent 40%), radial-gradient(600px circle at 80% 70%, ${state.toColor}33, transparent 40%)`,
				}}
			/>

			<div className="max-w-4xl text-center">
				<div className="inline-block cursor-text select-text transition-transform duration-200 ease-out hover:scale-[1.01]">
					{renderHeadline()}
				</div>
				<p className="mt-6 text-sm text-slate-500">
					Tip: set segment indexes to -1 to disable a style.
				</p>
			</div>
		</main>
	);
}
