const userName = 'Imm';

console.log(typeof userName); //javascript operator

type UserName = typeof userName; // typescript identifier

const settings = {
    difficulty: 'easy',
    minLevel: 10,
    didStart: false,
    players: ['John', 'Jane']
}

type Settings = typeof settings; // A more useful example