import Disposable from "Shared/Classes/Disposable";
import type CharacterComponentBase from "Shared/Classes/CharacterComponentBase";
import Components from "./Components";
import type { Logger } from "@rbxts/log";
import Log from "@rbxts/log";

type ComponentMap = { [K in (typeof Components)[number] as K[0]]: InstanceType<K[1]> };

export default class Character extends Disposable {
	public readonly Model: Model;
	public readonly Humanoid: Humanoid;

	private readonly _logger: Logger = Log.ForContext(Character);
	private readonly _components: Record<string, CharacterComponentBase<Character>> = {};

	public constructor(model: Model) {
		super();

		this.Model = model;
		this.Humanoid = this._getHumanoid(model);

		this._loadComponents();
	}

	public GetComponent<T extends keyof ComponentMap>(component: T): ComponentMap[T] {
		return this._components[component] as ComponentMap[T];
	}

	private _getHumanoid(model: Model): Humanoid {
		const humanoid = model.FindFirstChildOfClass("Humanoid");
		assert(humanoid, "Failed to get Humanoid from character model");
		return humanoid;
	}

	private _loadComponents(): void {
		this._logger.Debug("Loading character components...");

		for (const [name, component] of Components) {
			try {
				this._components[name] = this.Janitor.Add(new component(this));

				this._logger.Debug("Loaded {Component} component", name);
			} catch (err) {
				this._logger.Error("Error loading {Component} component: {Error}", name, err);
			}
		}

		this._logger.Debug("Finished loading character components");
	}
}
