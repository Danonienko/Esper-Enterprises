import { RunService } from "@rbxts/services";
import type Character from "..";
import CharacterComponentBase from "Shared/Classes/CharacterComponentBase";
import type Stamina from "./Stamina";
import Signal from "@rbxts/signal";
import Stat from "Shared/Classes/Stat";

const RUN_SERVICE_BIND = "StaminaRegenerator";

export default class StaminaRegenerator extends CharacterComponentBase<Character> {
	public readonly RegenerationStarted: Signal = this.Janitor.Add(new Signal());
	public readonly RegenerationStopped: Signal = this.Janitor.Add(new Signal());

	public readonly RegenerationStrength: Stat = new Stat(1);
	public readonly RegenerationSpeed: Stat = new Stat(0.1);
	public readonly RegenerationDelay: Stat = new Stat(1);

	private readonly _stamina: Stamina = this.Character.GetComponent("Stamina");

	private _isRegenerating: boolean = false;

	private _drainTimer: number = 0;

	private _delayTask?: thread;

	public constructor(character: Character) {
		super(character);

		this.Janitor.Add(this._stamina.StaminaSubtracted.Connect(() => this._delay()));
		this.Janitor.Add(() => RunService.UnbindFromRenderStep(RUN_SERVICE_BIND));
		this.Janitor.Add(() => {
			if (this._delayTask) task.cancel(this._delayTask);
		});
	}

	public StartRegeneration(): void {
		if (this._isRegenerating || !this.CanRegenerate()) return;

		this._isRegenerating = true;
		this._drainTimer = 0;
		this.RegenerationStarted.Fire();

		RunService.BindToRenderStep(RUN_SERVICE_BIND, Enum.RenderPriority.Character.Value, (dt) => this._tick(dt));
	}

	public StopRegeneration(): void {
		if (!this._isRegenerating) return;

		this._isRegenerating = false;
		this.RegenerationStopped.Fire();

		RunService.UnbindFromRenderStep(RUN_SERVICE_BIND);
	}

	public IsRegenerating(): boolean {
		return this._isRegenerating;
	}

	public CanRegenerate(): boolean {
		return (
			this._stamina.GetCurrentStamina() < this._stamina.MaxStamina.GetValue() &&
			this.Character.Humanoid.Health > 0
		);
	}

	private _delay(): void {
		this.StopRegeneration();

		if (this._delayTask) task.cancel(this._delayTask);
		this._delayTask = task.delay(this.RegenerationDelay.GetValue(), () => this.StartRegeneration());
	}

	private _tick(dt: number): void {
		if (!this._isRegenerating) return;
		if (!this.CanRegenerate()) return this.StopRegeneration();

		this._drainTimer += dt;
		if (this._drainTimer >= this.RegenerationSpeed.GetValue()) {
			this._drainTimer -= this.RegenerationSpeed.GetValue();
			this._stamina.AddStamina(this.RegenerationStrength.GetValue());
		}
	}
}
