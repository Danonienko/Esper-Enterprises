import type { Logger } from "@rbxts/log";
import Log from "@rbxts/log";
import Signal from "@rbxts/signal";
import type Character from "..";
import { createElement } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import StaminaBar from "Client/React/Components/StaminaBar";
import Make from "@rbxts/make";
import Stat from "Shared/Classes/Stat";
import CharacterComponentBase from "Shared/Classes/CharacterComponentBase";

export default class Stamina extends CharacterComponentBase<Character> {
	public readonly Invigorated: Signal = this.Janitor.Add(new Signal());
	public readonly Exhausted: Signal = this.Janitor.Add(new Signal());
	public readonly StaminaChanged: Signal<(oldStamina: number, newStamina: number) => void> = this.Janitor.Add(
		new Signal(),
	);
	public readonly StaminaAdded: Signal<(oldStamina: number, newStamina: number) => void> = this.Janitor.Add(
		new Signal(),
	);
	public readonly StaminaSubtracted: Signal<(oldStamina: number, newStamina: number) => void> = this.Janitor.Add(
		new Signal(),
	);

	public readonly MaxStamina: Stat = new Stat(100);

	private readonly _logger: Logger = Log.ForContext(Stamina);

	private _currentStamina: number = 100;

	private _isExhausted: boolean = false;
	private _isInvigorated: boolean = false;

	public constructor(character: Character) {
		super(character);

		this.Janitor.Add(this.MaxStamina.StatChanged.Connect(() => this.SetStamina(this._currentStamina)));

		this.Janitor.Add(createRoot(Make("Folder", {})), "unmount").render(
			createPortal(
				createElement(
					"screengui",
					{ ResetOnSpawn: false, key: "StaminaBar" },
					createElement(StaminaBar, { Stamina: this }),
				),
				Players.LocalPlayer.PlayerGui,
			),
		);
	}

	public GetCurrentStamina(): number {
		return this._currentStamina;
	}

	public SetStamina(value: number): void {
		if (value < 0) return this._logger.Warn("Value cannot be less than 0");

		const oldStamina = this._currentStamina;
		this._currentStamina = math.clamp(value, 0, this.MaxStamina.GetValue());
		this.StaminaChanged.Fire(oldStamina, this._currentStamina);

		const isInvigorated = this._currentStamina >= this.MaxStamina.GetValue();
		if (isInvigorated && !this._isInvigorated) this.Invigorated.Fire();
		this._isInvigorated = isInvigorated;

		const isExhausted = this._currentStamina <= 0;
		if (isExhausted && !this._isExhausted) this.Exhausted.Fire();
		this._isExhausted = isExhausted;
	}

	public AddStamina(amount: number): void {
		if (amount < 0) return this._logger.Warn("Amount cannot be less than 0");

		const oldStamina = this._currentStamina;
		this.SetStamina(this._currentStamina + amount);
		this.StaminaAdded.Fire(oldStamina, this._currentStamina);
	}

	public SubtractStamina(amount: number): void {
		if (amount < 0) return this._logger.Warn("Amount cannot be less than 0");

		const oldStamina = this._currentStamina;
		this.SetStamina(this._currentStamina - amount);
		this.StaminaSubtracted.Fire(oldStamina, this._currentStamina);
	}
}
