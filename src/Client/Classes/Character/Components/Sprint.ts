import Signal from "@rbxts/signal";
import { RunService } from "@rbxts/services";
import CharacterComponentBase from "Shared/Classes/CharacterComponentBase";
import type Stamina from "./Stamina";
import type MovementSpeed from "./MovementSpeed";
import type Character from "..";
import Stat from "Shared/Classes/Stat";

const RUN_SERVICE_BIND = "SprintComponent";

export default class Sprint extends CharacterComponentBase<Character> {
	public readonly SprintStarted: Signal = this.Janitor.Add(new Signal());
	public readonly SprintEnded: Signal = this.Janitor.Add(new Signal());

	public readonly SpeedBoost: Stat = new Stat(30);
	public readonly StaminaUseStrength: Stat = new Stat(1);
	public readonly StaminaUseSpeed: Stat = new Stat(0.1);

	private readonly _stamina: Stamina = this.Character.GetComponent("Stamina");
	private readonly _movementSpeed: MovementSpeed = this.Character.GetComponent("MovementSpeed");
	private readonly _minStaminaToStart: number = 10;

	private _isSprinting: boolean = false;

	private _drainTimer: number = 0;

	public constructor(character: Character) {
		super(character);

		// Stop on destroy so the render step is unbound and the sprint modifier is removed.
		this.Janitor.Add(() => this.StopSprint());
	}

	public StartSprint(): void {
		if (this._isSprinting || !this.CanSprint()) return;

		this._isSprinting = true;
		this._drainTimer = 0;

		this._movementSpeed.Value.AddModifier("sprint", { add: this.SpeedBoost.GetValue() });
		RunService.BindToRenderStep(RUN_SERVICE_BIND, Enum.RenderPriority.Character.Value, (dt) => this._tick(dt));
		this.SprintStarted.Fire();
	}

	public StopSprint(): void {
		if (!this._isSprinting) return;

		this._isSprinting = false;
		RunService.UnbindFromRenderStep(RUN_SERVICE_BIND);
		this._movementSpeed.Value.RemoveModifier("sprint");
		this.SprintEnded.Fire();
	}

	public CanSprint(): boolean {
		return this._stamina.GetCurrentStamina() > 0 && this.Character.Humanoid.Health > 0;
	}

	public CanStartSprint(): boolean {
		const threshold = math.max(this._minStaminaToStart, this._stamina.GetMaxStamina() * 0.2);
		return this._stamina.GetCurrentStamina() >= threshold && this.Character.Humanoid.Health > 0;
	}

	public IsSprinting(): boolean {
		return this._isSprinting;
	}

	private _tick(dt: number): void {
		if (!this._isSprinting) return;
		if (!this.CanSprint()) return this.StopSprint();

		this._drainTimer += dt;
		if (this._drainTimer >= this.StaminaUseSpeed.GetValue()) {
			this._drainTimer -= this.StaminaUseSpeed.GetValue();
			this._stamina.SubtractStamina(this.StaminaUseStrength.GetValue());
		}
	}
}
