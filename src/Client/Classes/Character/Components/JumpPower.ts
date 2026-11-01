import StatComponentBase from "Shared/Classes/StatComponentBase";
import type Character from "..";

export default class JumpPower extends StatComponentBase<Character> {
	public constructor(character: Character) {
		super(character, 50);
		this.Refresh();
	}

	protected Write(value: number): void {
		this.Character.Humanoid.JumpPower = value;
	}
}
