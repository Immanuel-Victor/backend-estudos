class User {
    public name: string;
    public age: number;
    public hobbies: string[] = [];

    constructor(name: string, age: number) {
        this.name = name
        this.age = age;
    }

    public addHobbies(hobbie: string): void {
        if(hobbie.trim() === "") {
            console.log("Você não pode adicionar nada como hobbie")
            return;
        }

        this.hobbies.push(hobbie);
    }
}

new User("Immanuel", 22);