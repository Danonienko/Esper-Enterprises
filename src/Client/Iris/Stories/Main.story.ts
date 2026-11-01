import Iris from "@rbxts/iris";
import { CreateIrisStory } from "@rbxts/ui-labs";
import MainIris from "../Main.iris";

export = CreateIrisStory(
	{
		iris: Iris,
		name: "Main",
	},
	() => Iris.Connect(() => MainIris()),
);
