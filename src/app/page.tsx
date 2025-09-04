import Controls from "@/components/Control";
import Preview from "@/components/Preview";
import { HeadlineProvider } from "@/context/headline-context";

export default function Home() {
	return (
		<HeadlineProvider>
			<div className="min-h-screen w-full bg-gradient-to-b from-white to-slate-50 text-slate-900">
				<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-4 md:grid-cols-[380px_1fr] md:p-10">
					{/* Controls */}
					<Controls />

					{/* Preview */}
					<Preview />
				</div>
			</div>
		</HeadlineProvider>
	);
}
