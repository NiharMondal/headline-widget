import { useHeadline } from "@/context/headline-context";
import React, { useMemo, useRef, useState } from "react";

export default function Exportable() {
	const jsonAreaRef = useRef(null);
	const [isCopy, setIsCopy] = useState(false);
	const { state } = useHeadline();

	const config = useMemo(
		() => ({
			text: state.text,
			fontSize: state.fontSize,
			fontFamily: state.fontFamily,
			fontWeight: state.fontWeight,
			gradient: {
				enabled: state.useGradient,
				direction: state.gradientDir,
				from: state.fromColor,
				to: state.toColor,
				fallback: state.solidColor,
			},
			effects: {
				animatePerLetter: state.animatePerLetter,
				fadeIn: state.fadeIn,
				hoverGlow: state.hoverGlow,
				outline: state.outline,
			},
			segments: {
				highlightWord: state.highlightWord,
				underlineWord: state.underlineWord,
				blockWord: state.blockWord,
				blockBg: state.blockBg,
			},
		}),
		[
			state.text,
			state.fontSize,
			state.fontFamily,
			state.fontWeight,
			state.useGradient,
			state.gradientDir,
			state.fromColor,
			state.toColor,
			state.solidColor,
			state.animatePerLetter,
			state.fadeIn,
			state.hoverGlow,
			state.outline,
			state.highlightWord,
			state.underlineWord,
			state.blockWord,
			state.blockBg,
		]
	);

	const json = JSON.stringify(config, null, 2);

	const handleCopy = async (el: HTMLTextAreaElement | null) => {
		if (!el) return;
		try {
			await navigator.clipboard.writeText(json);
			setIsCopy(true);
			setTimeout(() => setIsCopy(false), 5000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};
	return (
		<div className="space-y-2 rounded-xl border border-slate-200 p-3">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium">Export</span>
				<button
					className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
					onClick={() => handleCopy(jsonAreaRef.current)}
				>
					{isCopy ? "Copied" : "Copy JSON"}
				</button>
			</div>
			<textarea
				ref={jsonAreaRef}
				value={json}
				readOnly
				rows={6}
				className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-2 font-mono text-xs"
			/>
		</div>
	);
}
