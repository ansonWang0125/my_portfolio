import { observable } from 'mobx';
export class Bug {
  @observable id = Math.random.toString();
  @observable  name;
  
    constructor(name) {
      this.name = name;
    }
  }
  
  // class BugStore {
  //   @observable bugs: Bug[] = [new Bug('mosha')];
  
  //   // Unneeded - this is the same as .bugs
  //   // @computed get allBugs(): string[] {
  //   //   return this.Bugs;
  //   // }
  
  //   // Computed values should do more than access observables
  //   @computed get bugsByLength(): Bug[] {
  //     return this.bugs.sort((a, b) => a.name.length - b.name.length);
  //   }
  
  //   @computed get bugCount(): number {
  //     return this.bugs.length;
  //   }
  
  //   // import to bind `this`; hence the .bound on the end
  //   @action.bound
  //   addBug(name: string) {
  //     this.bugs.push(new Bug(name));
  //   }
  // }
  
  // const bugStore = new BugStore();
  
  // const { StoreContext, useStore, useStoreEffect } = createStoreContext<BugStore>(bugStore);
  
  // export { bugStore, StoreContext, useStore, useStoreEffect };
  
  export const BugStore = () => {
    return {
      bugs: [new Bug('mosha')],
  
      get bugsByLength() {
        return this.bugs.sort((a, b) => a.name.length - b.name.length);
      },
  
      get bugCount() {
        return this.bugs.length;
      },
  
      addBug(name) {
        this.bugs.push(new Bug(name));
      },
    };
  };
  