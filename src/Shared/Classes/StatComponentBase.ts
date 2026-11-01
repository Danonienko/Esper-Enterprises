import CharacterComponentBase from "Shared/Classes/CharacterComponentBase";
import Stat from "Shared/Classes/Stat";

/**
 * Base class for components that expose one stat bound to a Humanoid property or other value.
 *
 * Subclasses pass the character and base value to the constructor, implement `Write`, and call `Refresh()` once in
 * their own constructor to write the initial value. `Write` then runs on every change to the stat.
 */
export default abstract class StatComponentBase<TCharacter> extends CharacterComponentBase<TCharacter> {
	/** The underlying stat. Modify it with `Value.AddModifier` and `Value.RemoveModifier`. */
	public readonly Value: Stat;

	/** Applies the computed value to whatever this stat controls, such as a Humanoid property. */
	protected abstract Write(value: number): void;

	public constructor(character: TCharacter, baseValue: number) {
		super(character);

		this.Value = new Stat(baseValue);
		this.Janitor.Add(this.Value.StatChanged.Connect((_, newValue) => this.Write(newValue)));
	}

	/** Writes the current value. Call once in the subclass constructor, after `super()`. */
	protected Refresh(): void {
		this.Write(this.Value.GetValue());
	}
}
