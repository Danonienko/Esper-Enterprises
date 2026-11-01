import type CharacterStateBase from "./CharacterStateBase";
import Idle from "./Idle";
import Running from "./Running";
import Walking from "./Walking";

export type StateName = "Idle" | "Walking" | "Running";

const States = [
	["Idle", Idle],
	["Walking", Walking],
	["Running", Running],
] as const satisfies [StateName, typeof CharacterStateBase][];

export type StateMap = { [K in (typeof States)[number] as K[0]]: InstanceType<K[1]> };

export default States;
