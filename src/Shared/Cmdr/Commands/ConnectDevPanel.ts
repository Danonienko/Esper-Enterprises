import type { CommandDefinition } from "@rbxts/cmdr";
import Signals from "Shared/Signals";

export = {
	Name: "connectDevPanel",
	Description: "[DEV] Connects an Iris panel for development purposes",
	Args: [],
	ClientRun: (): string => {
		return Signals.Client.Iris.Connect.Invoke();
	},
} satisfies CommandDefinition;
