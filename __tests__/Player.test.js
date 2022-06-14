const { JestHook } = require('jest-watcher');
const Player = require('../lib/Player');
const Potion = require('../lib/Potion');
jest.mock('../lib/Potion');

test('creates a new player', () => {
	const player = new Player('Dave');

	expect(player.name).toBe('Dave');
	expect(player.health).toEqual(expect.any(Number));
	expect(player.strength).toEqual(expect.any(Number));
	expect(player.agility).toEqual(expect.any(Number));

	expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));
});

test('gets player stats as an object', () => {
	const player = new Player('Dave');

	expect(player.getStats()).toHaveProperty('potions');
	expect(player.getStats()).toHaveProperty('health');
	expect(player.getStats()).toHaveProperty('strength');
	expect(player.getStats()).toHaveProperty('agility');
});

test('get player inventory or if invetory is empty return false', () => {
	const player = new Player('Dave');

	expect(player.getInventory()).toEqual(expect.any(Array));

	player.inventory = [];

	expect(player.getInventory()).toEqual(false);
});

test('get player health value', () => {
	const player = new Player('Dave');

	expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test('check to see if the playe is alive', () => {
	const player = new Player('Dave');

	expect(player.isAlive()).toBeTruthy();

	player.health = 0;

	expect(player.isAlive()).toBeFalsy();
});

test('subtract from player health', () => {
	const player = new Player('Dave');
	const oldHealth = player.health;

	player.reduceHealth(5);

	expect(player.health).toBe(oldHealth - 5);

	player.reduceHealth(99999);

	expect(player.health).toBe(0);
});
