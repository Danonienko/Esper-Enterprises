interface ReplicatedStorage {
	readonly TS: {
		readonly Inputs: {
			readonly CharacterContext: InputContext & {
				readonly SprintAction: InputAction;
			};
		};

		readonly Cmdr: {
			readonly Commands: Folder;
			readonly Hooks: Folder;
			readonly Types: Folder;
		};
	};
}
