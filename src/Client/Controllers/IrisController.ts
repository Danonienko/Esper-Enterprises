import Iris from "@rbxts/iris";
import MainIris from "Client/Iris/Main.iris";
import Signals from "Shared/Signals";

class IrisController {
	private _connection?: () => void;

	public constructor() {
		Iris.Init();

		Signals.Client.Iris.Connect.OnInvoke = () => this._handleConnect();
		Signals.Client.Iris.Disconnect.OnInvoke = () => this._handleDisconnect();
	}

	public Connect(): void {
		if (this.IsConnected()) return;
		this._connection = Iris.Connect(() => MainIris());
	}

	public Disconnect(): void {
		if (!this.IsConnected()) return;
		this._connection!();
		this._connection = undefined;
	}

	public IsConnected(): boolean {
		return !!this._connection;
	}

	private _handleConnect(): string {
		if (this.IsConnected()) return "The Iris panel is already connected";
		this.Connect();
		return "Successfully connected Iris panel";
	}

	private _handleDisconnect(): string {
		if (!this.IsConnected()) return "The Iris panel is already disconnected";
		this.Disconnect();
		return "Successfully disconnected Iris panel";
	}
}

const ic = new IrisController();
type ic = IrisController;
export { ic as IrisController };
