const CODES = [
	"Space", "Enter", "Escape",
	"ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
	"ShiftLeft", "ShiftRight", "ControlLeft", "ControlRight", "AltLeft", "AltRight",
	...Array.from({ length: 26 }, (_, i) => "Key" + String.fromCharCode(65 + i)),
	...Array.from({ length: 10 }, (_, i) => "Digit" + i),
];

export const Key = Object.freeze(Object.fromEntries(CODES.map((c, i) => [c, i])));
export const KEY_COUNT = CODES.length;

const ID_BY_CODE = new Map(CODES.map((c, i) => [c, i]));
export const idOf = (code) => ID_BY_CODE.get(code);

export const Mouse = Object.freeze({ Left: 0, Middle: 1, Right: 2 });