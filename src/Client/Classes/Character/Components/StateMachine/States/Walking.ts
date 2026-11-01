import { ReplicatedStorage } from "@rbxts/services";
import CharacterStateBase from "./CharacterStateBase";
import type { StateName } from ".";
import type Sprint from "../../Sprint";
import type Character from "Client/Classes/Character";
import type StateMachine from "..";

export default class Walking extends CharacterStateBase {
	private readonly _sprint: Sprint;

	public constructor(context: StateMachine, character: Character) {
		super(context, character);

		this._sprint = character.GetComponent("Sprint");
		assert(this._sprint, "Walking state requires the Sprint component");
	}

	public override Enter(): void {}

	public override Update(): StateName | void {
		if (this.Character.Humanoid.MoveDirection.Magnitude < 0.1) return "Idle";

		const wantsToSprint = ReplicatedStorage.TS.Inputs.CharacterContext.SprintAction.GetState() === true;
		if (wantsToSprint && this._sprint.CanStartSprint()) return "Running";
	}

	public override Exit(): void {}
}
