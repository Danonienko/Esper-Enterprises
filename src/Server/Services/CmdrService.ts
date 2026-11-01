import { Cmdr } from "@rbxts/cmdr";
import { ReplicatedStorage } from "@rbxts/services";

Cmdr.RegisterDefaultCommands();
Cmdr.RegisterCommandsIn(ReplicatedStorage.TS.Cmdr.Commands);

export = {};
