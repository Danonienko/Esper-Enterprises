/* eslint-disable roblox-ts/lua-truthiness */
import Iris from "@rbxts/iris";
import Signals from "Shared/Signals";

export default function MainIris(): void {
	const isOpened = Iris.State(true);

	Iris.Window(["Esper Enterprises – Developer Panel v1.0"], { isOpened });
	{
		Iris.Text(["Hello, world!"]);

		const buttonDisconnect = Iris.Button(["Disconnect"]);
		if (buttonDisconnect.clicked()) Signals.Client.Iris.Disconnect.Invoke();
	}
	Iris.End();

	if (isOpened.get() === false) {
		const buttonOpen = Iris.Button(["Open"]);
		if (buttonOpen.clicked()) isOpened.set(true);
	}
}
