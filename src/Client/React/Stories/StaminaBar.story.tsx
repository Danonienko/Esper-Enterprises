import React, { useEffect } from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { CreateReactStory } from "@rbxts/ui-labs";
import type Stamina from "Client/Classes/Character/Components/Stamina";
import StaminaBar from "../Components/StaminaBar";
import Signal from "@rbxts/signal";

const StaminaChanged = new Signal<(oldStamina: number, newStamina: number) => void>();
const MaxStaminaChanged = new Signal<(oldMaxStamina: number, newMaxStamina: number) => void>();

let currentStamina = 50;
let maxStamina = 100;

const mockStamina = {
	StaminaChanged,
	MaxStaminaChanged,

	GetCurrentStamina: () => currentStamina,
	GetMaxStamina: () => maxStamina,
} as unknown as Stamina;

export = CreateReactStory(
	{
		react: React,
		reactRoblox: ReactRoblox,
		controls: {
			CurrentStamina: 50,
			MaxStamina: 100,
		},
	},
	(props) => {
		useEffect(() => {
			const oldStamina = currentStamina;
			currentStamina = props.controls.CurrentStamina;
			StaminaChanged.Fire(oldStamina, currentStamina);
		}, [props.controls.CurrentStamina]);

		useEffect(() => {
			const oldMaxStamina = maxStamina;
			maxStamina = props.controls.MaxStamina;
			MaxStaminaChanged.Fire(oldMaxStamina, maxStamina);
		}, [props.controls.MaxStamina]);

		return <StaminaBar Stamina={mockStamina} />;
	},
);
