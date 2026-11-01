import Make from "@rbxts/make";
import { RunService } from "@rbxts/services";

const IsClient = RunService.IsClient();

const Signals = {
	Client: {
		Iris: {
			Connect: Make("BindableFunction", {
				Name: "Client/Iris/Connect",
				Parent: IsClient ? script : undefined,
			}) as BindableFunction<() => string>,

			Disconnect: Make("BindableFunction", {
				Name: "Client/Iris/Disconnect",
				Parent: IsClient ? script : undefined,
			}) as BindableFunction<() => string>,
		},
	},
	Server: {},
} as const;

export default Signals;
