import type { CommandDefinition } from "@rbxts/cmdr";
import Signals from "Shared/Signals";

export = {
	Name: "disconnectDevPanel",
	Description: "[DEV] Disconnects an Iris panel",
	Args: [],
	ClientRun: (): string => {
		return Signals.Client.Iris.Disconnect.Invoke();
	},
} satisfies CommandDefinition;
