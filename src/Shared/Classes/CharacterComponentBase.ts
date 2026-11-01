import Disposable from "Shared/Classes/Disposable";

/**
 * Base class for components attached to a character. Each realm supplies its own character type,
 * so this class has no dependency on client or server code.
 */
export default abstract class CharacterComponentBase<TCharacter> extends Disposable {
	protected readonly Character: TCharacter;

	public constructor(character: TCharacter) {
		super();

		this.Character = character;
	}
}
