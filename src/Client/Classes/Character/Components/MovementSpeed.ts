import StatComponentBase from "Shared/Classes/StatComponentBase";
import type Character from "..";

export default class MovementSpeed extends StatComponentBase<Character> {
	public constructor(character: Character) {
		super(character, 16);
		this.Refresh();
	}

	protected Write(value: number): void {
		this.Character.Humanoid.WalkSpeed = value;
	}
}
