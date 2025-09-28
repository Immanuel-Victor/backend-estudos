// const appUser = {
//     name: "Imm",
//     age: 22,
//     permissions: [{ id: 'p1', tittle: 'Admin', description: 'Access'}]
// }

//type AppUser = typeof appUser;

type AppUser = {
    name: string;
    age: number;
    permissions: {
        id: string;
        tittle: string;
        description: string;
    }[]
}

type Perms = AppUser['permissions']
type Perm = Perms[number];

type Names = string[];
type Name = Names[number];