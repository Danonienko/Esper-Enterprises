import React, { useEffect } from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { CreateReactStory } from "@rbxts/ui-labs";
import type Stamina from "Client/Classes/Character/Components/Stamina";
import StaminaBar from "../Components/StaminaBar";
import Signal from "@rbxts/signal";

const StaminaChanged = new Signal<(oldStamina: number, newStamina: number) => void>();
const StatChanged = new Signal<(oldValue: number, newValue: number) => void>();

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
			const oldStamina = props.controls.CurrentStamina;
			StaminaChanged.Fire(oldStamina, props.controls.CurrentStamina);
		}, [props.controls.CurrentStamina]);

		useEffect(() => {
			const oldMaxStamina = props.controls.MaxStamina;
			StatChanged.Fire(oldMaxStamina, props.controls.MaxStamina);
		}, [props.controls.MaxStamina]);

		return (
			<StaminaBar
				Stamina={
					{
						StaminaChanged,
						MaxStamina: {
							StatChanged,
							GetValue: () => props.controls.MaxStamina,
						},

						GetCurrentStamina: () => props.controls.CurrentStamina,
					} as unknown as Stamina
				}
			/>
		);
	},
);
