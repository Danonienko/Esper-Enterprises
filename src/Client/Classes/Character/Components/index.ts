import type Character from "..";
import type CharacterComponentBase from "Shared/Classes/CharacterComponentBase";
import JumpPower from "./JumpPower";
import MovementSpeed from "./MovementSpeed";
import Sprint from "./Sprint";
import Stamina from "./Stamina";
import StateMachine from "./StateMachine";
import StaminaRegenerator from "./StaminaRegenerator";

const Components = [
	["Stamina", Stamina],
	["StaminaRegenerator", StaminaRegenerator],
	["MovementSpeed", MovementSpeed],
	["JumpPower", JumpPower],
	["Sprint", Sprint],
	["StateMachine", StateMachine],
] as const satisfies [string, new (character: Character) => CharacterComponentBase<Character>][];

export default Components;
