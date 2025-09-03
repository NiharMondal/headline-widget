"use client";
import React, { createContext, useReducer, useContext, ReactNode } from "react";

type HeadlineState = {
	text: string;
	fontSize: number;
	fontFamily: string;
	fontWeight: number;

	useGradient: boolean;
	gradientDir: "to-r" | "to-l" | "to-t" | "to-b";
	fromColor: string;
	toColor: string;
	solidColor: string;

	animatePerLetter: boolean;
	fadeIn: boolean;
	hoverGlow: boolean;
	outline: boolean;

	highlightWord: number;
	underlineWord: number;
	blockWord: number;
	blockBg: string;
};

type Action = {
	type: "UPDATE_FIELD";
	field: keyof HeadlineState;
	value: HeadlineState[keyof HeadlineState];
};

const initialState: HeadlineState = {
	text: "Design stunning headlines ✨",
	fontSize: 64,
	fontFamily:
		"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans, sans-serif",
	fontWeight: 800,

	useGradient: true,
	gradientDir: "to-r",
	fromColor: "#6EE7F9",
	toColor: "#A78BFA",
	solidColor: "#111827",

	animatePerLetter: true,
	fadeIn: true,
	hoverGlow: true,
	outline: false,

	highlightWord: -1,
	underlineWord: -1,
	blockWord: -1,
	blockBg: "#FEF08A",
};

function reducer(state: HeadlineState, action: Action): HeadlineState {
	switch (action.type) {
		case "UPDATE_FIELD":
			return { ...state, [action.field]: action.value };
		default:
			return state;
	}
}

const HeadlineContext = createContext<
	| {
			state: HeadlineState;
			setHeadline: <K extends keyof HeadlineState>(
				field: K,
				value: HeadlineState[K]
			) => void;
	  }
	| undefined
>(undefined);

export const HeadlineProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// ✅ helper function
	const setHeadline = <K extends keyof HeadlineState>(
		field: K,
		value: HeadlineState[K]
	) => {
		dispatch({ type: "UPDATE_FIELD", field, value });
	};

	return (
		<HeadlineContext.Provider value={{ state, setHeadline }}>
			{children}
		</HeadlineContext.Provider>
	);
};

export const useHeadline = () => {
	const ctx = useContext(HeadlineContext);
	if (!ctx)
		throw new Error("useHeadline must be used within HeadlineProvider");
	return ctx;
};
