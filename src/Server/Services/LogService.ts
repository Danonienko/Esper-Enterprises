import Log from "@rbxts/log";

Log.SetLogger(Log.Configure().WriteTo(Log.RobloxOutput()).Create());

export = {};
