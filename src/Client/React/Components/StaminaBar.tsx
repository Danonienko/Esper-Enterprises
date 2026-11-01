import { useEventListener, useSpring } from "@rbxts/pretty-react-hooks";
import React, { useState } from "@rbxts/react";
import type Stamina from "Client/Classes/Character/Components/Stamina";

type Props = {
	Stamina: Stamina;
};

export default function StaminaBar({ Stamina }: Props) {
	const [currentStamina, setCurrentStamina] = useState(Stamina.GetCurrentStamina());
	const [maxStamina, setMaxStamina] = useState(Stamina.MaxStamina.GetValue());

	useEventListener(Stamina.StaminaChanged, (_, newStamina) => setCurrentStamina(newStamina));
	useEventListener(Stamina.MaxStamina.StatChanged, (_, newMaxStamina) => setMaxStamina(newMaxStamina));

	const currentStaminaSpring = useSpring(maxStamina > 0 ? currentStamina / maxStamina : 0);
	const transparencySpring = useSpring(currentStamina < maxStamina ? 0 : 1);

	return (
		<frame
			AnchorPoint={new Vector2(0.5, 0.5)}
			Position={UDim2.fromScale(0.5, 0.8)}
			Size={currentStaminaSpring.map((value) => UDim2.fromScale(math.clamp(value * 0.5, 0, 0.5), 0.01))}
			Transparency={transparencySpring}
		/>
	);
}
