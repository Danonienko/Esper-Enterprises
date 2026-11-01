/* eslint-disable roblox-ts/lua-truthiness */
import Iris from "@rbxts/iris";
import StaminaIris from "./Components/Stamina.iris";
import { CharacterController } from "Client/Controllers/CharacterController";
import HomeIris from "./Components/Home.iris";

export default function MainIris(): void {
	const isOpened = Iris.State(true);
	const currentPage = Iris.State<() => void>(HomeIris);

	Iris.Window(["Esper Enterprises – Developer Panel v1.0"], { isOpened });
	{
		Iris.MenuBar();
		{
			Iris.Menu(["Character"]);
			{
				const menuItemStamina = Iris.MenuItem(["Stamina"]);
				if (menuItemStamina.clicked())
					currentPage.set(() => {
						const character = CharacterController.GetCharacter();
						if (character) StaminaIris(character.GetComponent("Stamina"));
					});
			}
			Iris.End();
		}
		Iris.End();

		currentPage.get()();
	}
	Iris.End();

	if (isOpened.get() === false) {
		const buttonOpen = Iris.Button(["Open"]);
		if (buttonOpen.clicked()) isOpened.set(true);
	}
}
