import Iris from "@rbxts/iris";
import { CreateIrisStory } from "@rbxts/ui-labs";
import StaminaIris from "../Components/Stamina.iris";
import type Stamina from "Client/Classes/Character/Components/Stamina";

export = CreateIrisStory(
	{
		iris: Iris,
		name: "Stamina",
		controls: {
			CurrentStamina: 50,
			MaxStamina: 100,
		},
	},
	(props) =>
		Iris.Connect(() => {
			Iris.Window(["Story – Stamina"]);
			{
				StaminaIris({
					MaxStamina: {
						GetValue: () => props.controls.MaxStamina.get(),
						GetBase: () => props.controls.MaxStamina.get(),

						// Mocking setter by setting the controls breaks the story
						// e.g. (value) => props.controls.MaxStamina.set(value)
						// So this is no-op now
						SetBase: () => {},
					},

					GetCurrentStamina: () => props.controls.CurrentStamina.get(),
				} as unknown as Stamina);
			}
			Iris.End();
		}),
);
