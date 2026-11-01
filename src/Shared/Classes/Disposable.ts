import { Janitor } from "@rbxts/janitor";
import Signal from "@rbxts/signal";

export default abstract class Disposable {
	protected readonly Janitor: Janitor = new Janitor();

	public readonly Destroying: Signal = this.Janitor.Add(new Signal());

	public Destroy(): void {
		this.Destroying.Fire();
		this.Janitor.Destroy();
		table.clear(this);
		setmetatable(this, undefined);
	}
}
