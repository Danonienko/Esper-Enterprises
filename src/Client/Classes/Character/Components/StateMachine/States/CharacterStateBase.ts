import Disposable from "Shared/Classes/Disposable";
import type StateMachine from "..";
import type Character from "Client/Classes/Character";
import type { StateName } from ".";

export default abstract class CharacterStateBase extends Disposable {
	protected readonly Context: StateMachine;
	protected readonly Character: Character;

	public constructor(context: StateMachine, character: Character) {
		super();

		this.Context = context;
		this.Character = character;
	}

	public abstract Enter(): void;
	public abstract Update(): StateName | void;
	public abstract Exit(): void;
}
