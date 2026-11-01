import Signal from "@rbxts/signal";

/**
 * A change to a stat's value. All fields are optional.
 *
 * Applied in this order: `add` is summed onto the base, `multiply` values are multiplied together,
 * then the result is limited by the lowest `cap`.
 */
export type StatModifier = {
	add?: number;
	multiply?: number;
	cap?: number;
};

/**
 * A numeric value that modifiers can change. Use it directly for components with several values
 * that don't map to a single Humanoid property. For a single bound stat, use `StatComponentBase`.
 *
 * Listeners are notified through signals. `StatChanged` fires only when the computed value differs
 * from before the change, while `ModifierAdded` and `ModifierRemoved` fire for every modifier change.
 */
export default class Stat {
	/** Fires with the old and new value when a change alters `GetValue`. */
	public readonly StatChanged: Signal<(oldValue: number, newValue: number) => void> = new Signal();
	/** Fires when `AddModifier` is called, including when it replaces an existing modifier with the same id. */
	public readonly ModifierAdded: Signal<(id: string, modifier: StatModifier) => void> = new Signal();
	/** Fires when `RemoveModifier` removes a modifier. Does not fire if the id was not present. */
	public readonly ModifierRemoved: Signal<(id: string) => void> = new Signal();

	private readonly _base: number;
	private readonly _modifiers: Map<string, StatModifier> = new Map();

	/** Creates a stat whose value before any modifiers is `base`. */
	public constructor(base: number) {
		this._base = base;
	}

	/** Adds or replaces the modifier stored under `id`. */
	public AddModifier(id: string, modifier: StatModifier): void {
		const oldValue = this.GetValue();

		this._modifiers.set(id, modifier);
		this.ModifierAdded.Fire(id, modifier);
		this._fireIfChanged(oldValue);
	}

	/** Removes the modifier stored under `id`. Does nothing if no such modifier exists. */
	public RemoveModifier(id: string): void {
		if (!this._modifiers.has(id)) return;

		const oldValue = this.GetValue();

		this._modifiers.delete(id);
		this.ModifierRemoved.Fire(id);
		this._fireIfChanged(oldValue);
	}

	/** Returns the value with all modifiers applied: `(base + sum of add) * product of multiply`, limited by the lowest cap, never below 0. */
	public GetValue(): number {
		let value = this._base;
		let multiplier = 1;
		let cap = math.huge;

		for (const [, modifier] of this._modifiers) {
			value += modifier.add ?? 0;
			multiplier *= modifier.multiply ?? 1;
			cap = math.min(cap, modifier.cap ?? math.huge);
		}

		return math.max(math.min(value * multiplier, cap), 0);
	}

	private _fireIfChanged(oldValue: number): void {
		const newValue = this.GetValue();
		if (newValue !== oldValue) this.StatChanged.Fire(oldValue, newValue);
	}
}
