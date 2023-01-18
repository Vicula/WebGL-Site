import {
    createApp,
    type App as Application,
    type ComponentPublicInstance
} from "vue";
import App from "@/App.vue";
import { router } from "./router";
import { createPinia } from "pinia";

const pinia = createPinia();



export class AppModule {
    private _app!: Application<Element>;
    public app!: ComponentPublicInstance;

    constructor() {
        this.init();
    }

    public mount(id: string): void {
        this.app = this._app.mount(id);
    }

    private setRouter(): void {
        this._app.use(router);
    }

    private setStore(): void {
        this._app.use(pinia);
    }

    private init() {
        this._app = createApp(App);

        this.setStore();
        this.setRouter();
    }
}

const Site = new AppModule();


Site.mount("#app");