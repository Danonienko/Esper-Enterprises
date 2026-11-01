import type { StateName } from ".";
import CharacterStateBase from "./CharacterStateBase";

export default class Idle extends CharacterStateBase {
	public override Enter(): void {}

	public override Update(): StateName | void {
		if (this.Character.Humanoid.MoveDirection.Magnitude > 0.1) return "Walking";
	}

	public override Exit(): void {}
}
