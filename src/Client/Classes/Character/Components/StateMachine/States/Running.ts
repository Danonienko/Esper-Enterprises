import { ReplicatedStorage } from "@rbxts/services";
import CharacterStateBase from "./CharacterStateBase";
import type { StateName } from ".";
import type Sprint from "../../Sprint";
import type Character from "Client/Classes/Character";
import type StateMachine from "..";

export default class Running extends CharacterStateBase {
	private readonly _sprint: Sprint;

	public constructor(context: StateMachine, character: Character) {
		super(context, character);

		this._sprint = character.GetComponent("Sprint");
		assert(this._sprint, "Running state requires the Sprint component");
	}

	public override Enter(): void {
		this._sprint.StartSprint();
	}

	public override Update(): StateName | void {
		if (!this._sprint.CanSprint()) return "Walking";
		if (this.Character.Humanoid.MoveDirection.Magnitude < 0.1) return "Idle";
		if (ReplicatedStorage.TS.Inputs.CharacterContext.SprintAction.GetState() !== true) return "Walking";
	}

	public override Exit(): void {
		this._sprint.StopSprint();
	}
}
