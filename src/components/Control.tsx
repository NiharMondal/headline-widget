"use client";

import { useHeadline } from "@/context/headline-context";
import { useMemo } from "react";
import Exportable from "./Exportable";

export default function Controls() {
	const { state, setHeadline } = useHeadline();
	const words = useMemo(() => {
		// Keep spaces by splitting and re-inserting them
		const parts: { token: string; isSpace: boolean }[] = [];
		state.text.split(/(\s+)/).forEach((seg) => {
			if (seg.trim() === "") parts.push({ token: seg, isSpace: true });
			else parts.push({ token: seg, isSpace: false });
		});
		return parts;
	}, [state.text]);

	const visualWordCount = useMemo(
		() => words.filter((w) => !w.isSpace).length,
		[words]
	);

	return (
		<aside className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur">
			<h2 className="mb-3 text-lg font-semibold">Controls</h2>

			<div className="space-y-4">
				{/* Text */}
				<div>
					<label className="mb-1 block text-sm font-medium">
						Headline Text
					</label>
					<textarea
						value={state.text}
						onChange={(e) => setHeadline("text", e.target.value)}
						rows={3}
						className="w-full resize-y rounded-xl border border-slate-200 bg-white p-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-slate-400"
					/>
				</div>

				{/* Typography */}
				<div className="grid grid-cols-2 gap-3">
					<div className="col-span-2">
						<label className="mb-1 block text-sm font-medium">
							Font Family
						</label>
						<select
							value={state.fontFamily}
							onChange={(e) =>
								setHeadline("fontFamily", e.target.value)
							}
							className="w-full rounded-xl border border-slate-200 bg-white p-2 text-sm"
						>
							<option
								value={
									"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans, sans-serif"
								}
							>
								Inter / Sans
							</option>
							<option
								value={
									"Georgia, ui-serif, Cambria, Times New Roman, Times, serif"
								}
							>
								Georgia / Serif
							</option>
							<option
								value={
									"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
								}
							>
								Monospace
							</option>
						</select>
					</div>
					<div>
						<label className="mb-1 block text-sm font-medium">
							Font Size ({state.fontSize}px)
						</label>
						<input
							type="range"
							min={20}
							max={128}
							value={state.fontSize}
							onChange={(e) =>
								setHeadline(
									"fontSize",
									parseInt(e.target.value)
								)
							}
							className="w-full"
						/>
					</div>
					<div>
						<label className="mb-1 block text-sm font-medium">
							Weight ({state.fontWeight})
						</label>
						<input
							type="range"
							min={100}
							max={900}
							step={100}
							value={state.fontWeight}
							onChange={(e) =>
								setHeadline(
									"fontWeight",
									parseInt(e.target.value)
								)
							}
							className="w-full"
						/>
					</div>
				</div>

				{/* Gradient */}
				<div className="rounded-xl border border-slate-200 p-3">
					<div className="mb-2 flex items-center justify-between">
						<span className="text-sm font-medium">
							Gradient Fill
						</span>
						<label className="inline-flex cursor-pointer items-center gap-2 text-sm">
							<input
								type="checkbox"
								checked={state.useGradient}
								onChange={(e) =>
									setHeadline("useGradient", e.target.checked)
								}
							/>
							<span>{state.useGradient ? "On" : "Off"}</span>
						</label>
					</div>

					{state.useGradient ? (
						<div className="grid grid-cols-2 gap-3">
							<div>
								<label className="mb-1 block text-xs">
									Direction
								</label>
								<select
									value={state.gradientDir}
									onChange={(e) =>
										setHeadline(
											"gradientDir",
											e.target.value as
												| "to-l"
												| "to-r"
												| "to-t"
												| "to-b"
										)
									}
									className="w-full rounded-xl border border-slate-200 bg-white p-2 text-sm"
								>
									<option value="to-l">← Left</option>
									<option value="to-r">→ Right</option>
									<option value="to-t">↑ Up</option>
									<option value="to-b">↓ Down</option>
								</select>
							</div>
							<div>
								<label className="mb-1 block text-xs">
									From
								</label>
								<input
									type="color"
									value={state.fromColor}
									onChange={(e) =>
										setHeadline("fromColor", e.target.value)
									}
									className="h-9 w-full rounded-xl border border-slate-200"
								/>
							</div>
							<div>
								<label className="mb-1 block text-xs">To</label>
								<input
									type="color"
									value={state.toColor}
									onChange={(e) =>
										setHeadline("toColor", e.target.value)
									}
									className="h-9 w-full rounded-xl border border-slate-200"
								/>
							</div>
						</div>
					) : (
						<div>
							<label className="mb-1 block text-xs">
								Solid Color
							</label>
							<input
								type="color"
								value={state.solidColor}
								onChange={(e) =>
									setHeadline("solidColor", e.target.value)
								}
								className="h-9 w-full rounded-xl border border-slate-200"
							/>
						</div>
					)}
				</div>

				{/* Segment styling */}
				<div className="rounded-xl border border-slate-200 p-3">
					<div className="mb-2 text-sm font-medium">
						Word / Segment Styling
					</div>
					<p className="mb-2 text-xs text-slate-500">
						Word indexes are 0 … {Math.max(0, visualWordCount - 1)}
					</p>
					<div className="grid grid-cols-3 gap-3">
						<div>
							<label className="mb-1 block text-xs">
								Highlight idx
							</label>
							<input
								type="number"
								className="w-full rounded-xl border border-slate-200 p-2 text-sm"
								value={state.highlightWord}
								onChange={(e) =>
									setHeadline(
										"highlightWord",
										parseInt(e.target.value)
									)
								}
							/>
						</div>
						<div>
							<label className="mb-1 block text-xs">
								Underline idx
							</label>
							<input
								type="number"
								className="w-full rounded-xl border border-slate-200 p-2 text-sm"
								value={state.underlineWord}
								onChange={(e) =>
									setHeadline(
										"underlineWord",
										parseInt(e.target.value)
									)
								}
							/>
						</div>
						<div>
							<label className="mb-1 block text-xs">
								Block idx
							</label>
							<input
								type="number"
								className="w-full rounded-xl border border-slate-200 p-2 text-sm"
								value={state.blockWord}
								onChange={(e) =>
									setHeadline(
										"blockWord",
										parseInt(e.target.value)
									)
								}
							/>
						</div>
						<div className="col-span-3">
							<label className="mb-1 block text-xs">
								Highlight/Block Color
							</label>
							<input
								type="color"
								value={state.blockBg}
								onChange={(e) =>
									setHeadline("blockBg", e.target.value)
								}
								className="h-9 w-full rounded-xl border border-slate-200"
							/>
						</div>
					</div>
				</div>

				{/* Effects */}
				<div className="grid grid-cols-2 gap-3">
					<label className="inline-flex items-center gap-2 text-sm">
						<input
							type="checkbox"
							checked={state.animatePerLetter}
							onChange={(e) =>
								setHeadline(
									"animatePerLetter",
									e.target.checked
								)
							}
						/>
						Per-letter anim
					</label>
					<label className="inline-flex items-center gap-2 text-sm">
						<input
							type="checkbox"
							checked={state.fadeIn}
							onChange={(e) =>
								setHeadline("fadeIn", e.target.checked)
							}
						/>
						Fade in
					</label>
					<label className="inline-flex items-center gap-2 text-sm">
						<input
							type="checkbox"
							checked={state.hoverGlow}
							onChange={(e) =>
								setHeadline("hoverGlow", e.target.checked)
							}
						/>
						Glow / hover pop
					</label>
					<label className="inline-flex items-center gap-2 text-sm">
						<input
							type="checkbox"
							checked={state.outline}
							onChange={(e) =>
								setHeadline("outline", e.target.checked)
							}
						/>
						Outline
					</label>
				</div>

				{/* Export */}
				<Exportable />
			</div>
		</aside>
	);
}
