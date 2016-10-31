import {IAppTab, AppTab} from "./AppTab";
import {MainPage2} from "./MainPage2";
import {MainPage3} from "./MainPage3";


export class App {
    mainPage:MainPage3;

    // openTab(tab: IAppTab): AppTab {
    //     let newTab = new AppTab(tab);
    //     this.mainPage.tabInstance.addItem();
    //     this.tabs.push(newTab);
    //     return newTab;
    // }
    //
    // handleCloseTab(){
    //
    // }
}

export let app = new App();
