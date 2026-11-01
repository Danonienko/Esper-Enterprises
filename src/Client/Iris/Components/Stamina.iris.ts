import Iris from "@rbxts/iris";
import type Stamina from "Client/Classes/Character/Components/Stamina";

export default function StaminaIris(stamina: Stamina): void {
	const maxStamina = Iris.State(stamina.MaxStamina.GetBase());
	maxStamina.onChange((value) => stamina.MaxStamina.SetBase(value));

	const progress = Iris.State(stamina.GetCurrentStamina() / stamina.MaxStamina.GetValue());
	progress.set(stamina.GetCurrentStamina() / stamina.MaxStamina.GetValue());

	Iris.ProgressBar(["Stamina"], { progress });
	Iris.SeparatorText(["Settings"]);

	const inputNumMaxStamina = Iris.InputNum({ 1: "Max Stamina", 3: 1, 5: "%d", 6: true }, { number: maxStamina });
	if (inputNumMaxStamina.hovered()) Iris.Tooltip(["Set the BASE amount of max stamina"]);
}
