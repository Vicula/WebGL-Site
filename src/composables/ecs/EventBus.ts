export function useEventBus() {

    const
        __subscribers = [];


    return {
        Reset: () => {
            // subscribers.clear();
        },
        SubscribeToEvent: (ownerInstance: any, callbackFunction: () => void) => {
            //     if (!subscribers[typeid(TEvent)].get()) {
            //         subscribers[typeid(TEvent)] = std:: make_unique<HandlerList>();
            //     }
            // auto subscriber = std:: make_unique<EventCallback<TOwner, TEvent>>(ownerInstance, callbackFunction);
            //     subscribers[typeid(TEvent)] -> push_back(std:: move(subscriber));
        },
        EmitEvent: <TArgs>(...args: TArgs[]) => {
            // auto handlers = subscribers[typeid(TEvent)].get();

            // if (handlers) {
            //     for (auto it = handlers -> begin(); it != handlers -> end(); it++)
            //     {
            //         auto handler = it -> get();
            //         TEvent event(std:: forward<TArgs>(args)...);
            //         handler -> Execute(event);
            //     }
            // }
        }
    }
}