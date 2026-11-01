import { RunService } from "@rbxts/services";
import type Character from "../..";
import CharacterComponentBase from "Shared/Classes/CharacterComponentBase";
import type CharacterStateBase from "./States/CharacterStateBase";
import type { Logger } from "@rbxts/log";
import Log from "@rbxts/log";
import States, { type StateName } from "./States";

export default class StateMachine extends CharacterComponentBase<Character> {
	private readonly _logger: Logger = Log.ForContext(StateMachine);
	private readonly _states: Record<string, CharacterStateBase> = {};

	private _currentState!: CharacterStateBase;
	private _currentStateName!: StateName;

	public constructor(character: Character) {
		super(character);

		this._loadStates();

		RunService.BindToRenderStep("StateMachine", Enum.RenderPriority.Character.Value, () => this._onUpdate());
		this.Janitor.Add(() => RunService.UnbindFromRenderStep("StateMachine"));

		this.TransitionTo("Idle");
	}

	public TransitionTo(state: StateName): void {
		if (state === this._currentStateName) return;

		const nextState = this._states[state];
		if (nextState === undefined) {
			this._logger.Error("Cannot transition to {State}: state failed to load", state);
			return;
		}

		this._currentState?.Exit();
		this._currentState = nextState;
		this._currentState.Enter();

		this._currentStateName = state;
	}

	public GetState(): StateName {
		return this._currentStateName;
	}

	private _onUpdate(): void {
		const nextState = this._currentState.Update();
		if (nextState === undefined || nextState === this._currentStateName) return;
		this.TransitionTo(nextState);
	}

	private _loadStates(): void {
		for (const [name, state] of States) {
			try {
				this._states[name] = this.Janitor.Add(new state(this, this.Character));
				this._logger.Debug("Loaded {State} state", name);
			} catch (err) {
				this._logger.Error("Error loading {State} state: {Error}", name, err);
			}
		}
	}
}
