import Iris from "@rbxts/iris";
import Signals from "Shared/Signals";

export default function HomeIris(): void {
	Iris.Text(["Hello, world!"]);

	const buttonDisconnect = Iris.Button(["Disconnect"]);
	if (buttonDisconnect.clicked()) Signals.Client.Iris.Disconnect.Invoke();
}
