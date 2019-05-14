import { SubscriptionLike } from 'rxjs';
import 'reflect-metadata';

export interface DestroySubscriptionsParams {
    destroyFunction: string;
}

const DEFAULT_PARAMS: DestroySubscriptionsParams = {
    destroyFunction: 'ngOnDestroy',
};

export function DestroySubscriptions(params: DestroySubscriptionsParams = DEFAULT_PARAMS) {
    return (target) => {

        const subscriptions: SubscriptionLike[] = [];
        const subscriber: string = Reflect.getMetadata('subscription:name', target.prototype, 'subscriber');

        Object.defineProperty(target.prototype, subscriber ? subscriber : 'subscriber', {
            get: () => subscriptions,
            set: (_) => subscriptions.push(_),
        });

        if (typeof target.prototype[params.destroyFunction] !== 'function') {
            throw new Error(`${target.prototype.constructor.name} must implement ${params.destroyFunction}() lifecycle hook`);
        }

        target.prototype[params.destroyFunction] = ngOnDestroyDecorator(target.prototype[params.destroyFunction]);

        function ngOnDestroyDecorator(f) {
            return function() {
                unsubscribe();
                return f.apply(this, arguments);
            };
        }

        function unsubscribe() {
            console.log(`Removing ${ subscriptions.length } subscriptions...`);
            subscriptions.forEach(s => {
                s.unsubscribe();
            });

            subscriptions.splice(0, subscriptions.length);
        }

        return target;
    };
}

export function CombineSubscriptions(params?) {
    return function(target, propertyKey: string | symbol) {
        Reflect.defineMetadata('subscription:name', propertyKey, target, 'subscriber');
    };
}
